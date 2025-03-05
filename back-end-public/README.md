# Banco de Dados SMV

## Introdução

O banco de dados "smv" é um componente central deste projeto, responsável por armazenar e gerenciar o conteúdo de artigos e suas categorias. Este sistema permite a publicação, categorização e recuperação eficiente de artigos, oferecendo uma estrutura relacional que suporta:

- Gerenciamento de categorias com títulos e slugs únicos
- Armazenamento de artigos com conteúdo completo, metadados e referências a imagens
- Relacionamento many-to-many entre artigos e categorias
- Pesquisa eficiente por categorias ou metadados de artigos

O banco utiliza PostgreSQL com um schema dedicado chamado "dbp" para organizar todos os objetos relacionados ao projeto.

## Criação do Banco de Dados "smv"

Execute o comando para criar o banco de dados:

```sql
CREATE DATABASE smv WITH ENCODING='UTF8' LC_COLLATE='pt_BR.UTF-8' LC_CTYPE='pt_BR.UTF-8' TEMPLATE=template0;
```

Crie um usuário "read only":
```sql
CREATE USER smv_readonly WITH ENCRYPTED PASSWORD 'senha_segura';
```
## Criação do Schema "dbp"

Conecte-se ao banco de dados recém-criado:

```bash
psql -U postgres -d smv
```

Crie o schema "dbp":

```sql
CREATE SCHEMA dbp;

GRANT USAGE ON SCHEMA dbp TO smv_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA dbp TO smv_readonly;
```

Defina o schema como padrão para o usuário (opcional):

```sql
ALTER USER smv_readonly SET search_path TO dbp, public;
```

Para garantir que futuras tabelas também tenham permissões de leitura concedidas ao usuário read-only, execute:

```sql
ALTER DEFAULT PRIVILEGES IN SCHEMA dbp GRANT SELECT ON TABLES TO smv_readonly;
```

## Criação do Schema "public_stats"

Conecte-se ao banco de dados recém-criado:

```bash
psql -U postgres -d smv
```

Crie o schema "dbp":

```sql
CREATE SCHEMA public_stats;

-- Conceda permissões apenas na tabela article_stats
GRANT USAGE, CREATE ON SCHEMA public_stats TO smv_readonly;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public_stats.article_stats TO smv_readonly;
```

## Criação das Tabelas

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

### Tabela pública article_stats

```sql
CREATE TABLE public_stats.article_stats (
    article_slug VARCHAR(255) NOT NULL,
    reactions JSONB NOT NULL,
    current_reaction VARCHAR(50),
    visits INTEGER NOT NULL DEFAULT 0,
    
    CONSTRAINT article_stats_pkey PRIMARY KEY (article_slug),
    CONSTRAINT article_stats_article_slug_fkey FOREIGN KEY (article_slug)
        REFERENCES dbp.articles (slug) ON DELETE CASCADE ON UPDATE CASCADE
);
```