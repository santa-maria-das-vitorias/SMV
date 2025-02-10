## Versão usuário - Leitor

### **1. Camada de Front-end**  
- Responsável por renderizar a interface do usuário.  
- Implementa regras de segurança e controle de acesso.  
- Protege contra ataques XSS e CSRF.  
- **Nenhuma lógica ou credencial do backend é exposta ao usuário, garantindo maior segurança e controle.**

### **2. Camada de Backend**  
- Intermedia todas as comunicações entre o frontend e os bancos de dados.  
- Implementa regras de segurança e controle de acesso.  
- Gerencia o fallback entre os bancos.

### **3. Banco de Dados Primário (Somente Leitura)**  
- Armazena artigos e categorias.  
- Extremamente seguro, apenas permite consultas (nenhuma escrita direta).  

### **4. Banco de Dados de Interações**  
- Armazena reações (curtidas, amei, etc.) e visualizações de posts.  
- **Visualizações**: Limitadas por IP e um intervalo mínimo de 1 hora.  
- **Reações**: Controladas por IP e possivelmente por fingerprint do navegador para evitar spam - além de uma limitação por timeout no front-end.  

---

## Estrutura dos Bancos de Dados

### Tabela: `categories`
| Coluna      | Tipo         | Descrição                            |
|-------------|--------------|--------------------------------------|
| id          | INT          | Identificador único da categoria     |
| slug        | VARCHAR(255) | Slug da categoria                    |
| title       | VARCHAR(255) | Título da categoria                  |

### Tabela: `articles`
| Coluna      | Tipo         | Descrição                            |
|-------------|--------------|--------------------------------------|
| id          | INT          | Identificador único do artigo        |
| title       | VARCHAR(255) | Título do artigo                     |
| slug        | VARCHAR(255) | Slug do artigo                       |
| date        | DATETIME     | Data de publicação do artigo         |
| image       | VARCHAR(255) | URL da imagem do artigo              |
| author      | VARCHAR(255) | Autor do artigo                      |
| category_id | INT          | Identificador da categoria           |

### Tabela: `reactions`
| Coluna      | Tipo         | Descrição                            |
|-------------|--------------|--------------------------------------|
| id          | INT          | Identificador único da reação        |
| article_id  | INT          | Identificador do artigo              |
| type        | VARCHAR(50)  | Tipo de reação (curtida, amei, etc.) |
| ip_address  | VARCHAR(50)  | Endereço IP do usuário               |
| timestamp   | DATETIME     | Data e hora da reação                |

### Tabela: `views`
| Coluna      | Tipo         | Descrição                            |
|-------------|--------------|--------------------------------------|
| id          | INT          | Identificador único da visualização  |
| article_id  | INT          | Identificador do artigo              |
| ip_address  | VARCHAR(50)  | Endereço IP do usuário               |
| timestamp   | DATETIME     | Data e hora da visualização          |

### Relacionamentos
- Cada artigo pertence a uma categoria (`articles.category_id` -> `categories.id`)
- Cada reação está associada a um artigo (`reactions.article_id` -> `articles.id`)
- Cada visualização está associada a um artigo (`views.article_id` -> `articles.id`)