import json
import unicodedata
import requests
from bs4 import BeautifulSoup

def remove_accents(input_str):
    nfkd_form = unicodedata.normalize('NFKD', input_str)
    return "".join([c for c in nfkd_form if not unicodedata.combining(c)])

def process_json(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    for article in data:
        if 'slug' in article:
            article['slug'] = remove_accents(article['slug'])
    
    categories = scrape_categories()
    for article in data:
        if 'slug' in article:
            article['categories'] = categories.get(article['slug'], [])
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

def scrape_categories():
    base_url = "https://web.archive.org/web/20231003111013/https://santamariadasvitorias.org/categorias/"
    category_urls = [
        "apologetica/",
        "artigos/",
        "critica-e-doutrina/",
        "cronica-catolica/",
        "doutrina/",
        "espiritualidade/",
        "filosofia/",
        "historia/",
        "pensamento-brasileiro/",
        "suma-teologica/"
    ]
    
    categories = {}
    for category_url in category_urls:
        full_url = base_url + category_url
        response = requests.get(full_url)
        soup = BeautifulSoup(response.content, 'html.parser')
        
        category_name = soup.find('h1').text.strip()
        for article in soup.find_all('article'):
            for link in article.find_all('a'):
                article_url = link['href']
                article_slug = article_url.split('/')[-2]
                article_slug = remove_accents(article_slug)
                if article_slug not in categories:
                    categories[article_slug] = []
                categories[article_slug].append({"title": category_name})
    
    return categories

input_file = '/home/pedro/Desktop/DEV/SMV/SMV/scrapping/artigos.json'
output_file = '/home/pedro/Desktop/DEV/SMV/SMV/scrapping/artigos_processed.json'

process_json(input_file, output_file)