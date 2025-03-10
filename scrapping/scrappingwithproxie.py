import requests
from bs4 import BeautifulSoup
import json
import re
from datetime import datetime
import time
import random
import os
import socket
import logging
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("scraper.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Configuration
BASE_URL = "https://web.archive.org/web/20240621214441/https://santamariadasvitorias.org/artigos/"
MAX_ARTICLES = 500
OUTPUT_FILE = "artigos.json"
USE_PROXY = True  # Set to False if you don't want to use proxies
PROXY_ROTATION = True  # Set to False to use a single proxy

# Free proxy list - update these with working proxies
# You can get free proxies from sources like https://proxylist.geonode.com/api/proxy-list?limit=10&page=1&sort_by=lastChecked&sort_type=desc
PROXIES = [
    "http://181.211.148.26:59842",
    "http://109.69.0.247:8741",
    "http://119.199.225.148:4145",
    "http://104.238.205.68:4003"
]

# Create a session with more aggressive retry strategy
def create_robust_session():
    session = requests.Session()
    retry_strategy = Retry(
        total=5,
        backoff_factor=1,
        status_forcelist=[429, 500, 502, 503, 504],
        allowed_methods=["GET"]
    )
    adapter = HTTPAdapter(max_retries=retry_strategy)
    session.mount("http://", adapter)
    session.mount("https://", adapter)
    return session

def get_random_proxy():
    """Return a random proxy from the list."""
    if not PROXIES:
        return None
    return random.choice(PROXIES)

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=4, max=30),
    retry=retry_if_exception_type((requests.exceptions.ConnectionError, requests.exceptions.Timeout))
)
def fetch_html(url, use_session=True, check_connectivity=True):
    """Fetch HTML content with proxy support and enhanced error handling."""
    # Check internet connectivity first
    if check_connectivity and not check_internet_connection():
        logger.error("❌ No internet connection available.")
        return None
    
    # List of common user agents to rotate through
    user_agents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0"
    ]
    
    headers = {
        "User-Agent": random.choice(user_agents),
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "Cache-Control": "max-age=0"
    }
    
    proxies = None
    if USE_PROXY:
        proxy = get_random_proxy()
        if proxy:
            proxies = {"http": proxy, "https": proxy}
            logger.info(f"Using proxy: {proxy}")
    
    try:
        if use_session:
            session = create_robust_session()
            response = session.get(
                url, 
                headers=headers, 
                proxies=proxies, 
                timeout=60
            )
        else:
            response = requests.get(
                url, 
                headers=headers, 
                proxies=proxies, 
                timeout=60
            )
        
        response.raise_for_status()
        return response.text
    except requests.exceptions.HTTPError as e:
        logger.error(f"HTTP Error: {e} for URL: {url}")
        if response.status_code == 429:  # Too Many Requests
            logger.warning("Rate limiting detected. Waiting longer...")
            time.sleep(60)
        return None
    except (requests.exceptions.ConnectionError, requests.exceptions.Timeout) as e:
        logger.error(f"Connection Error: {e} for URL: {url}")
        if USE_PROXY:
            logger.info("Switching proxy and retrying...")
            return fetch_html(url, use_session, check_connectivity)
        raise
    except Exception as e:
        logger.error(f"Unexpected Error: {e} for URL: {url}")
        return None

def check_internet_connection():
    """Check if there's an active internet connection."""
    try:
        # Try to connect to Cloudflare's DNS
        socket.create_connection(("1.1.1.1", 53), timeout=5)
        return True
    except OSError:
        return False

# Alternative method to access web archive content
def try_alternate_access(url):
    """Try to access content using alternative methods if direct access fails."""
    logger.info(f"Trying alternative access method for: {url}")
    
    # Method 1: Try different archive timestamp
    if "web.archive.org/web" in url:
        # Extract the original URL
        parts = url.split("/")
        timestamp_index = parts.index("web") + 1
        original_url = "/".join(parts[timestamp_index + 1:])
        
        # Try a different timestamp (e.g., latest)
        alt_url = f"https://web.archive.org/web/{original_url}"
        logger.info(f"Trying latest snapshot: {alt_url}")
        return fetch_html(alt_url, check_connectivity=False)
    
    return None

def get_article_links():
    """Get list of article links with enhanced error handling."""
    logger.info(f"🔍 Fetching article list from {BASE_URL}")
    html = fetch_html(BASE_URL)
    
    # If direct access fails, try alternative methods
    if not html:
        logger.warning("Failed to fetch article list page directly, trying alternative methods...")
        html = try_alternate_access(BASE_URL)
        
    if not html:
        logger.error("❌ Failed to fetch article list page after all attempts.")
        return []

    soup = BeautifulSoup(html, "html.parser")
    articles = []

    try:
        rows = soup.select("table.tab-result tr")
        if not rows:
            logger.warning("No rows found using 'table.tab-result tr' selector. Trying alternative selectors...")
            # Try alternative selectors that might find articles
            rows = soup.select("article") or soup.select(".post") or soup.select(".entry")
            
        for i, row in enumerate(rows[:MAX_ARTICLES]):
            try:
                # Try to extract link and date using various potential selectors
                link_tag = row.find("a") or row.select_one("h2 a") or row.select_one(".title a")
                date_tag = row.find("td", class_="data") or row.select_one(".date") or row.select_one(".meta time")
                
                if link_tag:
                    url = link_tag.get("href", "").strip()
                    title = link_tag.text.strip()
                    
                    # Set a default date
                    date = "2023-01-01T00:00:00Z"
                    
                    if date_tag:
                        date_text = date_tag.text.strip()
                        try:
                            # Try multiple date formats
                            date_formats = ["%d-%m-%Y", "%Y-%m-%d", "%d/%m/%Y", "%m/%d/%Y"]
                            for fmt in date_formats:
                                try:
                                    date = datetime.strptime(date_text, fmt).isoformat() + "Z"
                                    break
                                except ValueError:
                                    continue
                        except Exception as e:
                            logger.warning(f"Error parsing date '{date_text}': {e}")
                    
                    if url and title:
                        # Ensure URL is absolute
                        if not url.startswith("http"):
                            if url.startswith("/"):
                                # Extract base domain from BASE_URL
                                base_domain = "/".join(BASE_URL.split("/")[:3])
                                url = base_domain + url
                            else:
                                # Assume it's relative to the BASE_URL directory
                                url = BASE_URL.rsplit("/", 1)[0] + "/" + url
                        
                        articles.append({"url": url, "title": title, "date": date})
            except Exception as e:
                logger.warning(f"Error processing row {i}: {e}")
                continue
                
    except Exception as e:
        logger.error(f"Error parsing article list: {e}")
        
    logger.info(f"✅ Found {len(articles)} articles to process.")
    return articles

def clean_html(html):
    """Remove line breaks and extra spaces from HTML while maintaining structure."""
    html = re.sub(r"\s+", " ", html)
    return html.strip()

def remove_attributes(soup):
    """Remove all attributes from HTML tags to clean the content."""
    for tag in soup.find_all(True):
        tag.attrs = {}
    return soup

def scrape_article(url, title, date, article_id):
    """Scrape an individual article with enhanced error handling and multiple attempts."""
    logger.info(f"📄 Scraping article {article_id}: {title}")
    
    # Add delay between requests to avoid rate limiting
    time.sleep(random.uniform(1.5, 4))
    
    # Try fetching with regular method
    html = fetch_html(url)
    
    # If that fails, try alternative access methods
    if not html:
        logger.warning(f"Failed to fetch article directly, trying alternative methods for: {title}")
        html = try_alternate_access(url)
    
    if not html:
        logger.error(f"❌ Failed to fetch article after all attempts: {title}")
        return None

    soup = BeautifulSoup(html, "html.parser")
    slug = re.sub(r"[^\w\s-]", "", title).lower().replace(" ", "-")

    # Try different selectors to find article content
    article_tag = None
    for selector in ["article", ".post-content", ".entry-content", ".content", "main"]:
        article_tag = soup.select_one(selector)
        if article_tag:
            logger.info(f"Found article content using selector: {selector}")
            break
            
    if not article_tag:
        # If no suitable container found, use the whole body but try to remove navigation/header/footer
        logger.warning(f"No specific article container found for: {title}. Using filtered body content.")
        article_tag = soup.find("body")
        if article_tag:
            # Remove common non-content elements
            for element in article_tag.select("nav, header, footer, .sidebar, .widget, .comments, script, style, iframe"):
                element.decompose()

    if not article_tag:
        logger.error(f"❌ No usable content found for: {title}")
        return None

    # Try to extract date from article if available
    date_selectors = [
        "span.data-post", ".date", ".meta time", ".published", "time.entry-date",
        "[itemprop='datePublished']"
    ]
    
    for selector in date_selectors:
        date_tag = article_tag.select_one(selector)
        if date_tag:
            date_text = date_tag.text.strip()
            date_text = re.sub(r"^Posted on|^Postado em|^Date:|^Data:", "", date_text).strip()
            
            # Try multiple date formats
            date_formats = ["%d-%m-%Y", "%Y-%m-%d", "%d/%m/%Y", "%m/%d/%Y", 
                           "%B %d, %Y", "%d %B %Y", "%d de %B de %Y"]
            for fmt in date_formats:
                try:
                    date = datetime.strptime(date_text, fmt).isoformat() + "Z"
                    break
                except ValueError:
                    continue
            break

    # Extract content with different strategies
    content_tags = []
    
    # Strategy 1: Get all paragraph-like elements
    content_tags = article_tag.find_all(["p", "h2", "h3", "h4", "ul", "ol", "blockquote"])
    
    # Strategy 2: If that didn't work, try divs that might contain content
    if not content_tags:
        content_tags = [div for div in article_tag.find_all("div") 
                       if div.find("p") and not div.find(["nav", "header", "footer", ".sidebar"])]
    
    # Strategy 3: Last resort, just use the whole article container
    if not content_tags:
        content_tags = [article_tag]
        
    if not content_tags:
        logger.warning(f"⚠️ No content found inside article for: {title}")
        return None
        
    content_soup = BeautifulSoup("".join(str(tag) for tag in content_tags), "html.parser")
    content_soup = remove_attributes(content_soup)
    content_html = clean_html(str(content_soup))

    # Try to find author
    author = "Desconhecido"
    author_selectors = [".author", ".byline", "[itemprop='author']", ".meta-author"]
    for selector in author_selectors:
        author_tag = soup.select_one(selector)
        if author_tag:
            author = author_tag.text.strip()
            author = re.sub(r"^By |^Author:|^Por:", "", author).strip()
            break

    article_data = {
        "id": article_id,
        "title": title,
        "have_image": "false",
        "image": "",
        "slug": slug,
        "date": date,
        "content": content_html,
        "author": author,
        "categories": [],
        "url": url  # Store original URL for reference
    }

    logger.info(f"✅ Successfully scraped article: {title}")
    return article_data

def scrape_all_articles():
    """Scrape all articles with progressive saving of results and extensive error handling."""
    # Check if we have cached articles list
    cached_articles = []
    if os.path.exists(OUTPUT_FILE):
        try:
            with open(OUTPUT_FILE, "r", encoding="utf-8") as f:
                cached_articles = json.load(f)
                logger.info(f"Loaded {len(cached_articles)} previously scraped articles.")
        except Exception as e:
            logger.error(f"Error loading cached articles: {e}")
    
    articles_list = get_article_links()
    
    # Filter out articles we've already scraped
    cached_urls = [article.get("url", "") for article in cached_articles]
    articles_to_scrape = [article for article in articles_list if article["url"] not in cached_urls]
    
    # If no new articles to scrape, we're done
    if not articles_to_scrape:
        logger.info("No new articles found to scrape.")
        return
    
    logger.info(f"🔄 Beginning extraction of {len(articles_to_scrape)} new articles...\n")
    total_success = 0
    total_fail = 0

    for index, article in enumerate(articles_to_scrape, start=1):
        try:
            # Skip articles that were previously cached
            if article["url"] in cached_urls:
                logger.info(f"Skipping already scraped article: {article['title']}")
                continue
                
            article_data = scrape_article(article["url"], article["title"], article["date"], len(cached_articles) + total_success + 1)
            if article_data:
                cached_articles.append(article_data)
                total_success += 1
            else:
                total_fail += 1
                
            # Save progress every 5 articles
            if index % 5 == 0:
                save_progress(cached_articles)
                logger.info(f"💾 Progress saved: {index}/{len(articles_to_scrape)} new articles processed.")
                
        except Exception as e:
            logger.error(f"❌ Error processing article {article['title']}: {str(e)}")
            total_fail += 1
            
        # After every 5 articles, add a longer pause to avoid rate limiting
        if index % 5 == 0:
            pause_time = random.uniform(5, 15)
            logger.info(f"⏳ Taking a short break ({pause_time:.1f}s) to avoid rate limiting...")
            time.sleep(pause_time)
            
            # Also rotate proxy if enabled
            if USE_PROXY and PROXY_ROTATION:
                logger.info("Rotating proxy...")

    # Save final results
    save_progress(cached_articles)
    
    logger.info("\n📊 Scraping Summary:")
    logger.info(f"  Total articles found: {len(articles_list)}")
    logger.info(f"  Already cached: {len(cached_urls)}")
    logger.info(f"  Successfully scraped: {total_success}")
    logger.info(f"  Failed to scrape: {total_fail}")
    logger.info(f"\n✅ Extraction completed! Data saved to '{OUTPUT_FILE}'.")

def save_progress(articles):
    """Save current progress to avoid losing data in case of failure."""
    try:
        # Create backup first
        if os.path.exists(OUTPUT_FILE):
            backup_file = f"{OUTPUT_FILE}.bak"
            with open(backup_file, "w", encoding="utf-8") as f:
                with open(OUTPUT_FILE, "r", encoding="utf-8") as source:
                    f.write(source.read())
            logger.info(f"Created backup of existing data: {backup_file}")
            
        with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
            json.dump(articles, f, ensure_ascii=False, indent=4)
            logger.info(f"Saved {len(articles)} articles to {OUTPUT_FILE}")
    except Exception as e:
        logger.error(f"⚠️ Error saving progress: {e}")
        # Try to save to an alternative file if the main one fails
        try:
            with open(f"backup_{int(time.time())}_{OUTPUT_FILE}", "w", encoding="utf-8") as f:
                json.dump(articles, f, ensure_ascii=False, indent=4)
            logger.info(f"✅ Saved emergency backup due to error")
        except Exception as e2:
            logger.error(f"⚠️ Failed to save emergency backup: {e2}")

def try_direct_website_access():
    """Try to access the original website directly instead of via archive.org."""
    logger.info("Attempting to access the original website directly...")
    original_url = "https://santamariadasvitorias.org/artigos/"
    
    try:
        response = requests.get(original_url, timeout=30)
        if response.status_code == 200:
            logger.info("✅ Successfully accessed original website! Consider modifying the script to use this URL.")
            return True
        else:
            logger.warning(f"Original website returned status code: {response.status_code}")
            return False
    except Exception as e:
        logger.warning(f"Cannot access original website: {e}")
        return False

if __name__ == "__main__":
    try:
        logger.info("🚀 Web Scraper starting...")
        
        # Check if we can access the internet
        if not check_internet_connection():
            logger.error("❌ No internet connection available. Please check your network settings.")
            exit(1)
            
        # Try accessing the original website
        try_direct_website_access()
            
        scrape_all_articles()
    except KeyboardInterrupt:
        logger.warning("\n⚠️ Process interrupted by user. Saving current progress...")
        # Could add code here to save any partial progress
    except Exception as e:
        logger.error(f"\n❌ Fatal error: {str(e)}")