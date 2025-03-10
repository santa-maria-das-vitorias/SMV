import requests
from bs4 import BeautifulSoup
import json
import re
from datetime import datetime
import time
import random
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type

BASE_URL = "https://web.archive.org/web/20231002103058/https://santamariadasvitorias.org/artigos/"
MAX_ARTICLES = 500
OUTPUT_FILE = "artigos.json"

# Add more sophisticated retry mechanism
@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=4, max=60),
    retry=retry_if_exception_type((requests.exceptions.ConnectionError, requests.exceptions.Timeout))
)
def fetch_html(url):
    """Fetch HTML content with improved error handling and randomized user agents."""
    # List of common user agents to rotate through
    user_agents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0"
    ]
    
    headers = {"User-Agent": random.choice(user_agents)}
    
    try:
        # Add timeout to prevent hanging connections
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()  # Raise exception for 4XX/5XX status codes
        return response.text
    except requests.exceptions.HTTPError as e:
        print(f"⚠️ HTTP Error: {e} for URL: {url}")
        if response.status_code == 429:  # Too Many Requests
            print("  Rate limiting detected. Waiting longer...")
            time.sleep(60)  # Wait a full minute
        return None
    except (requests.exceptions.ConnectionError, requests.exceptions.Timeout) as e:
        print(f"⚠️ Connection Error: {e} for URL: {url}")
        # We'll let the retry decorator handle this
        raise
    except Exception as e:
        print(f"⚠️ Unexpected Error: {e} for URL: {url}")
        return None

def get_article_links():
    """Get list of article links with better error handling."""
    print(f"🔍 Fetching article list from {BASE_URL}")
    html = fetch_html(BASE_URL)
    if not html:
        print("❌ Failed to fetch article list page.")
        return []

    soup = BeautifulSoup(html, "html.parser")
    articles = []

    # Find all article links
    for row in soup.select("table.tab-result tr")[:MAX_ARTICLES]:
        link_tag = row.find("a")
        date_tag = row.find("td", class_="data")

        if link_tag and date_tag:
            url = link_tag["href"].strip()
            title = link_tag.text.strip()
            date_text = date_tag.text.strip()

            try:
                date = datetime.strptime(date_text, "%d-%m-%Y").isoformat() + "Z"
            except ValueError:
                print(f"⚠️ Invalid date format: {date_text} for article: {title}")
                date = "2023-01-01T00:00:00Z"

            articles.append({"url": url, "title": title, "date": date})

    print(f"✅ Found {len(articles)} articles to process.")
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
    """Scrape an individual article with improved error handling."""
    print(f"📄 Scraping article {article_id}: {title}")
    
    # Add delay between requests to avoid rate limiting
    time.sleep(random.uniform(1, 3))
    
    html = fetch_html(url)
    if not html:
        print(f"❌ Failed to fetch article: {title}")
        return None

    soup = BeautifulSoup(html, "html.parser")
    slug = re.sub(r"[^\w\s-]", "", title).lower().replace(" ", "-")

    # Extract article content
    article_tag = soup.find("article")
    if not article_tag:
        print(f"❌ No article content found for: {title}")
        return None

    # Date might be in the article itself, prioritize if it exists
    date_tag = article_tag.find("span", class_="data-post")
    if date_tag:
        date_text = date_tag.text.strip().replace("Postado em ", "").strip()
        try:
            date = datetime.strptime(date_text, "%d-%m-%Y").isoformat() + "Z"
        except ValueError:
            pass

    # Get all content within the <article> tags
    content_tags = article_tag.find_all(["p", "h2", "h3", "ul", "ol", "blockquote"])
    if not content_tags:
        print(f"⚠️ No content found inside article for: {title}")
        
    content_soup = BeautifulSoup("".join(str(tag) for tag in content_tags), "html.parser")
    content_soup = remove_attributes(content_soup)
    content_html = clean_html(str(content_soup))

    article_data = {
        "id": article_id,
        "title": title,
        "have_image": "false",
        "image": "",
        "slug": slug,
        "date": date,
        "content": content_html,
        "author": "Desconhecido",
        "categories": []
    }

    print(f"✅ Successfully scraped article: {title}")
    return article_data

def scrape_all_articles():
    """Scrape all articles with progressive saving of results."""
    articles_list = get_article_links()
    articles = []
    
    # If no articles found, exit early
    if not articles_list:
        print("❌ No articles found to scrape.")
        return
    
    print(f"🔄 Beginning extraction of {len(articles_list)} articles...\n")
    total_success = 0
    total_fail = 0

    for index, article in enumerate(articles_list, start=1):
        try:
            article_data = scrape_article(article["url"], article["title"], article["date"], index)
            if article_data:
                articles.append(article_data)
                total_success += 1
            else:
                total_fail += 1
                
            # Save progress every 10 articles
            if index % 10 == 0:
                save_progress(articles)
                print(f"💾 Progress saved: {index}/{len(articles_list)} articles processed.")
                
        except Exception as e:
            print(f"❌ Error processing article {article['title']}: {str(e)}")
            total_fail += 1
            
        # After every 5 articles, add a longer pause to avoid rate limiting
        if index % 5 == 0:
            pause_time = random.uniform(3, 8)
            print(f"⏳ Taking a short break ({pause_time:.1f}s) to avoid rate limiting...")
            time.sleep(pause_time)

    # Save final results
    save_progress(articles)
    
    print("\n📊 Scraping Summary:")
    print(f"  Total articles found: {len(articles_list)}")
    print(f"  Successfully scraped: {total_success}")
    print(f"  Failed to scrape: {total_fail}")
    print(f"\n✅ Extraction completed! Data saved to '{OUTPUT_FILE}'.")

def save_progress(articles):
    """Save current progress to avoid losing data in case of failure."""
    try:
        with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
            json.dump(articles, f, ensure_ascii=False, indent=4)
    except Exception as e:
        print(f"⚠️ Error saving progress: {e}")
        # Try to save to an alternative file if the main one fails
        try:
            with open(f"backup_{OUTPUT_FILE}", "w", encoding="utf-8") as f:
                json.dump(articles, f, ensure_ascii=False, indent=4)
            print(f"✅ Saved backup to 'backup_{OUTPUT_FILE}'")
        except:
            pass

if __name__ == "__main__":
    try:
        print("🚀 Web Archive Scraper starting...")
        scrape_all_articles()
    except KeyboardInterrupt:
        print("\n⚠️ Process interrupted by user. Saving current progress...")
        # Could add code here to save any partial progress
    except Exception as e:
        print(f"\n❌ Fatal error: {str(e)}")