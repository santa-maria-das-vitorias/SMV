import articles from '@/api/data/singleArticle.json';

export const fetchSingleArticle = async ({ slug }) => {

  const article = articles.find((article) => article.slug === slug);
  if (!article) {
    console.error('Artigo não encontrado para o slug:', slug);
    throw new Error('Article not found');
  }

  return article;
};
