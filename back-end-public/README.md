# Banco de Dados SMV

## Introdução

O banco de dados "smv" é um componente central deste projeto, responsável por armazenar e gerenciar o conteúdo de artigos e suas categorias. Este sistema permite a publicação, categorização e recuperação eficiente de artigos, oferecendo uma estrutura relacional que suporta:

- Gerenciamento de categorias com títulos e slugs únicos
- Armazenamento de artigos com conteúdo completo, metadados e referências a imagens
- Relacionamento many-to-many entre artigos e categorias
- Pesquisa eficiente por categorias ou metadados de artigos

O banco utiliza PostgreSQL com um schema dedicado chamado "dbp" para organizar todos os objetos relacionados ao projeto.

## Banco de Dados "smv"

```sql
CREATE DATABASE smv WITH ENCODING='UTF8' LC_COLLATE='pt_BR.UTF-8' LC_CTYPE='pt_BR.UTF-8' TEMPLATE=template0;
```

## Usuário

```sql
-- Criação do usuário "smv_readonly"
CREATE USER smv_readonly WITH ENCRYPTED PASSWORD 'senha_segura';

-- Conceda permissões de uso e leitura no schema "dbp"
GRANT USAGE ON SCHEMA dbp TO smv_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA dbp TO smv_readonly;

-- Conceda permissões de uso, inserção, atualização, exclusão e leitura no schema "public_stats"
GRANT USAGE ON SCHEMA public_stats TO smv_readonly;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public_stats TO smv_readonly;

-- Garantir que futuras tabelas no schema "dbp" tenham permissões de leitura concedidas ao usuário read-only
ALTER DEFAULT PRIVILEGES IN SCHEMA dbp GRANT SELECT ON TABLES TO smv_readonly;
```

## Schema "dbp"

```sql
CREATE SCHEMA dbp;
```

## Schema "public_stats"

```sql
CREATE SCHEMA public_stats;
```

## Tabelas

### Tabela "categories"

```sql
CREATE TABLE dbp.categories (
    id SERIAL NOT NULL,
    title VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL,
    
    CONSTRAINT categories_pkey PRIMARY KEY (id),
    CONSTRAINT categories_slug_key UNIQUE (slug),
    CONSTRAINT categories_title_key UNIQUE (title)
);
```

### Tabela "articles"

```sql
CREATE TABLE dbp.articles (
    id SERIAL NOT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    date TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    image VARCHAR(255),
    author VARCHAR(100) NOT NULL,
    have_image BOOLEAN NOT NULL DEFAULT false,
    content TEXT NOT NULL,
    
    CONSTRAINT articles_pkey PRIMARY KEY (id),
    CONSTRAINT articles_slug_key UNIQUE (slug)
);
```

### Tabela de Relacionamento "article_categories"

```sql
CREATE TABLE dbp.article_categories (
    article_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    
    CONSTRAINT article_categories_pkey PRIMARY KEY (article_id, category_id),
    CONSTRAINT article_categories_article_id_fkey FOREIGN KEY (article_id)
        REFERENCES dbp.articles (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT article_categories_category_id_fkey FOREIGN KEY (category_id)
        REFERENCES dbp.categories (id) ON DELETE CASCADE ON UPDATE CASCADE
);
```

### Tabela "article_stats"

```sql
CREATE TABLE public_stats.article_stats (
    article_slug VARCHAR(255) NOT NULL,
    reactions JSONB NOT NULL,
    visits INTEGER NOT NULL DEFAULT 0,
    
    CONSTRAINT article_stats_pkey PRIMARY KEY (article_slug),
    CONSTRAINT article_stats_article_slug_fkey FOREIGN KEY (article_slug)
        REFERENCES dbp.articles (slug) ON DELETE CASCADE ON UPDATE CASCADE
);
```

## Stored Procedures

```sql
-- Stored procedure para criar novas estatísticas de artigo
CREATE OR REPLACE PROCEDURE public_stats.create_article_stats(
    p_article_slug TEXT,
    p_reactions JSONB,
    p_visits INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO public_stats.article_stats (
        article_slug,
        reactions,
        visits
    ) VALUES (
        p_article_slug,
        p_reactions,
        p_visits
    );
END;
$$;
```

```sql
-- Stored procedure para atualizar estatísticas de artigo existente no schema public_stats
CREATE OR REPLACE PROCEDURE public_stats.update_article_stats(
    p_article_slug TEXT,
    p_reactions JSONB,
    p_visits INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE public_stats.article_stats
    SET 
        reactions = p_reactions,
        visits = p_visits
    WHERE article_slug = p_article_slug;
END;
$$;
```

```sql
-- Incrementar Contagem de Visitas
CREATE OR REPLACE PROCEDURE public_stats.increment_article_visit(
    p_article_slug TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE public_stats.article_stats
    SET 
        visits = visits + 1
    WHERE article_slug = p_article_slug;
END;
$$;
```

```sql
-- Incrementar Reação Específica
CREATE OR REPLACE PROCEDURE public_stats.increment_article_reaction(
    p_article_slug TEXT,
    p_reaction_type TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    current_reactions JSONB;
    new_count INTEGER;
BEGIN
    -- Obter reações atuais
    SELECT reactions INTO current_reactions
    FROM public_stats.article_stats
    WHERE article_slug = p_article_slug;
    
    -- Calcular novo valor para o tipo de reação especificado
    -- Definir para 0 se a reação ainda não existir
    SELECT COALESCE((current_reactions->>p_reaction_type)::INTEGER, 0) + 1 INTO new_count;
    
    -- Atualizar a contagem da reação específica preservando outras reações
    UPDATE public_stats.article_stats
    SET 
        reactions = jsonb_set(reactions, ARRAY[p_reaction_type], to_jsonb(new_count))
    WHERE article_slug = p_article_slug;
END;
$$;
```

## API Endpoints

This section documents all available API endpoints for interacting with the SMV application.

### Articles

#### GET /articles

Retrieves a list of all articles.

**Query Parameters:**
- `limit` (optional): Number of articles to return (default: 10)
- `offset` (optional): Number of articles to skip (default: 0)
- `category` (optional): Filter articles by category slug
- `search` (optional): Search text in article title and content

**Response:**
```json
{
  "articles": [
    {
      "id": 1,
      "title": "Article Title",
      "slug": "article-slug",
      "date": "2023-06-15T10:30:00Z",
      "image": "path/to/image.jpg",
      "author": "Author Name",
      "have_image": true,
      "categories": [
        {
          "id": 1,
          "title": "Category Title",
          "slug": "category-slug"
        }
      ]
    },
    // More articles...
  ],
  "total": 50,
  "limit": 10,
  "offset": 0
}
```

**Status Codes:**
- `200 OK`: Successful request
- `400 Bad Request`: Invalid parameters

#### GET /articles/:slug

Retrieves a specific article by its slug.

**Path Parameters:**
- `slug`: Unique slug of the article

**Response:**
```json
{
  "id": 1,
  "title": "Article Title",
  "slug": "article-slug",
  "date": "2023-06-15T10:30:00Z",
  "image": "path/to/image.jpg",
  "author": "Author Name",
  "have_image": true,
  "content": "Full article content in markdown or HTML format",
  "categories": [
    {
      "id": 1,
      "title": "Category Title",
      "slug": "category-slug"
    }
  ]
}
```

**Status Codes:**
- `200 OK`: Successful request
- `404 Not Found`: Article not found

#### POST /articles

Creates a new article.

**Request Body:**
```json
{
  "title": "New Article Title",
  "author": "Author Name",
  "content": "Article content in markdown or HTML",
  "image": "path/to/image.jpg", // Optional
  "categories": [1, 2] // Array of category IDs
}
```

**Validation Rules:**
- `title`: Required, string, max 255 characters
- `author`: Required, string, max 100 characters
- `content`: Required, string
- `image`: Optional, string, max 255 characters
- `categories`: Optional, array of existing category IDs

**Response:**
```json
{
  "id": 3,
  "title": "New Article Title",
  "slug": "new-article-title",
  "date": "2023-06-15T10:30:00Z",
  "image": "path/to/image.jpg",
  "author": "Author Name",
  "have_image": true,
  "content": "Article content in markdown or HTML",
  "categories": [
    {
      "id": 1,
      "title": "Category Title",
      "slug": "category-slug"
    }
  ]
}
```

**Status Codes:**
- `201 Created`: Article successfully created
- `400 Bad Request`: Invalid parameters or validation errors
- `409 Conflict`: Article with the same slug already exists

#### PUT /articles/:slug

Updates an existing article.

**Path Parameters:**
- `slug`: Unique slug of the article

**Request Body:**
```json
{
  "title": "Updated Article Title",
  "author": "Updated Author Name",
  "content": "Updated article content",
  "image": "path/to/new-image.jpg",
  "categories": [1, 3]
}
```

**Validation Rules:**
- All fields are optional, but at least one must be provided
- Same validation rules as POST apply to provided fields

**Response:**
```json
{
  "id": 3,
  "title": "Updated Article Title",
  "slug": "updated-article-title",
  "date": "2023-06-15T10:30:00Z",
  "image": "path/to/new-image.jpg",
  "author": "Updated Author Name",
  "have_image": true,
  "content": "Updated article content",
  "categories": [
    {
      "id": 1,
      "title": "Category Title",
      "slug": "category-slug"
    },
    {
      "id": 3,
      "title": "Another Category",
      "slug": "another-category"
    }
  ]
}
```

**Status Codes:**
- `200 OK`: Article successfully updated
- `400 Bad Request`: Invalid parameters or validation errors
- `404 Not Found`: Article not found
- `409 Conflict`: Update would create a duplicate slug

#### DELETE /articles/:slug

Deletes an existing article.

**Path Parameters:**
- `slug`: Unique slug of the article

**Response:**
```json
{
  "message": "Article successfully deleted"
}
```

**Status Codes:**
- `200 OK`: Article successfully deleted
- `404 Not Found`: Article not found

### Categories

#### GET /categories

Retrieves a list of all categories.

**Query Parameters:**
- `limit` (optional): Number of categories to return (default: all)
- `offset` (optional): Number of categories to skip (default: 0)

**Response:**
```json
{
  "categories": [
    {
      "id": 1,
      "title": "Category Title",
      "slug": "category-slug",
      "article_count": 5
    },
    // More categories...
  ],
  "total": 10
}
```

**Status Codes:**
- `200 OK`: Successful request

#### GET /categories/:slug

Retrieves a specific category by its slug.

**Path Parameters:**
- `slug`: Unique slug of the category

**Response:**
```json
{
  "id": 1,
  "title": "Category Title",
  "slug": "category-slug",
  "articles": [
    {
      "id": 1,
      "title": "Article Title",
      "slug": "article-slug",
      "date": "2023-06-15T10:30:00Z",
      "image": "path/to/image.jpg",
      "author": "Author Name",
      "have_image": true
    },
    // More articles in this category...
  ]
}
```

**Status Codes:**
- `200 OK`: Successful request
- `404 Not Found`: Category not found

#### POST /categories

Creates a new category.

**Request Body:**
```json
{
  "title": "New Category Title"
}
```

**Validation Rules:**
- `title`: Required, string, max 100 characters, must be unique

**Response:**
```json
{
  "id": 5,
  "title": "New Category Title",
  "slug": "new-category-title",
  "article_count": 0
}
```

**Status Codes:**
- `201 Created`: Category successfully created
- `400 Bad Request`: Invalid parameters or validation errors
- `409 Conflict`: Category with the same title/slug already exists

#### PUT /categories/:slug

Updates an existing category.

**Path Parameters:**
- `slug`: Unique slug of the category

**Request Body:**
```json
{
  "title": "Updated Category Title"
}
```

**Validation Rules:**
- `title`: Required, string, max 100 characters, must be unique

**Response:**
```json
{
  "id": 5,
  "title": "Updated Category Title",
  "slug": "updated-category-title",
  "article_count": 3
}
```

**Status Codes:**
- `200 OK`: Category successfully updated
- `400 Bad Request`: Invalid parameters or validation errors
- `404 Not Found`: Category not found
- `409 Conflict`: Update would create a duplicate title/slug

#### DELETE /categories/:slug

Deletes an existing category.

**Path Parameters:**
- `slug`: Unique slug of the category

**Response:**
```json
{
  "message": "Category successfully deleted"
}
```

**Status Codes:**
- `200 OK`: Category successfully deleted
- `404 Not Found`: Category not found

### Stats

#### GET /stats/articles/:slug

Retrieves statistics for a specific article.

**Path Parameters:**
- `slug`: Unique slug of the article

**Response:**
```json
{
  "article_slug": "article-slug",
  "visits": 1250,
  "reactions": {
    "like": 42,
    "love": 18,
    "clap": 7,
    "insightful": 15
  }
}
```

**Status Codes:**
- `200 OK`: Successful request
- `404 Not Found`: Article stats not found

#### POST /stats/articles/:slug/visit

Increments the visit count for an article.

**Path Parameters:**
- `slug`: Unique slug of the article

**Response:**
```json
{
  "article_slug": "article-slug",
  "visits": 1251,
  "message": "Visit count incremented successfully"
}
```

**Status Codes:**
- `200 OK`: Visit count incremented successfully
- `404 Not Found`: Article not found

#### POST /stats/articles/:slug/reaction

Adds a reaction to an article.

**Path Parameters:**
- `slug`: Unique slug of the article

**Request Body:**
```json
{
  "reaction_type": "like"
}
```

**Validation Rules:**
- `reaction_type`: Required, string, must be one of the supported reaction types (like, love, clap, insightful)

**Response:**
```json
{
  "article_slug": "article-slug",
  "reactions": {
    "like": 43,
    "love": 18,
    "clap": 7,
    "insightful": 15
  },
  "message": "Reaction added successfully"
}
```

**Status Codes:**
- `200 OK`: Reaction added successfully
- `400 Bad Request`: Invalid reaction type
- `404 Not Found`: Article not found

#### GET /stats/most-popular

Retrieves a list of the most popular articles based on visits and reactions.

**Query Parameters:**
- `limit` (optional): Number of articles to return (default: 5)
- `period` (optional): Time period - "day", "week", "month", "all" (default: "all")

**Response:**
```json
{
  "most_visited": [
    {
      "article_slug": "popular-article-1",
      "title": "Popular Article 1",
      "visits": 3500,
      "total_reactions": 120
    },
    // More articles...
  ],
  "most_reacted": [
    {
      "article_slug": "popular-article-2",
      "title": "Popular Article 2",
      "visits": 2800,
      "total_reactions": 180
    },
    // More articles...
  ]
}
```

**Status Codes:**
- `200 OK`: Successful request
- `400 Bad Request`: Invalid parameters
