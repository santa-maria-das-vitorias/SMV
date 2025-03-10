import json
import psycopg2
from psycopg2.extras import Json

def connect_db():
    return psycopg2.connect(
        dbname="smv",
        user="pedro",
        password="789456123",
        host="localhost"
    )

def populate_db():
    # Lê o arquivo JSON
    with open('artigos_processed.json', 'r') as f:
        articles = json.load(f)

    conn = connect_db()
    cur = conn.cursor()

    try:
        # Insere categorias
        categories = set()
        for article in articles:
            if article.get('categories'):
                for cat in article['categories']:
                    categories.add(cat['title'])
        
        for category in categories:
            slug = category.lower().replace(' ', '-')
            cur.execute(
                """
                INSERT INTO dbp.categories (title, slug) 
                VALUES (%s, %s)
                ON CONFLICT (slug) DO NOTHING
                """,
                (category, slug)
            )

        # Insere artigos
        for article in articles:
            cur.execute("""
                INSERT INTO dbp.articles (title, slug, date, image, author, have_image, content)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (slug) DO NOTHING
                RETURNING id
            """, (
                article['title'],
                article['slug'],
                article['date'],
                article.get('image', ''),
                article['author'],
                article['have_image'],
                article['content']
            ))
            
            result = cur.fetchone()
            if result:
                article_id = result[0]

                # Insere relacionamentos com categorias
                if article.get('categories'):
                    for category in article['categories']:
                        cur.execute("""
                            INSERT INTO dbp.article_categories (article_id, category_id)
                            SELECT %s, id FROM dbp.categories WHERE title = %s
                        """, (article_id, category['title']))

                # Inicializa estatísticas
                cur.execute("""
                    INSERT INTO public_stats.article_stats (article_slug, reactions, visits)
                    VALUES (%s, %s, %s)
                    ON CONFLICT (article_slug) DO NOTHING
                """, (
                    article['slug'],
                    Json({'like': 0, 'love': 0, 'surprised': 0, 'sad': 0}),
                    0
                ))

        conn.commit()

    except Exception as e:
        conn.rollback()
        print(f"Erro: {e}")
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    populate_db()