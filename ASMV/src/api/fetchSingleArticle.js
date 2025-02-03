import articles from '@/api/data/singleArticle.json';
import { isProduction } from '@/utils/isProduction';

export const fetchSingleArticle = async ({ slug }) => {
  const article = articles.find((article) => article.slug === slug);
  if (!article) {
    console.error('Artigo não encontrado para o slug:', slug);
    throw new Error('Article not found');
  }

  const imageUrl = article.have_image === 'false'
    ? null
    : isProduction
      ? `${import.meta.env.VITE_IMAGE_URL}${article.image}`
      : `/public/upload${article.image}`;

  return {
    ...article,
    imageUrl,
  };
};
