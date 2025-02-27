import allArticles from '@/api/data/allArticles.json';
import { isProduction } from '@/utils/isProduction';

export const fetchAllArticles = async () => {
  const articlesWithImageUrls = allArticles.map(article => {
    const imageUrl = article.image
      ? isProduction
        ? `${import.meta.env.VITE_IMAGE_URL}${article.image}`
        : `/upload${article.image}`
      : null;

    return {
      ...article,
      imageUrl,
    };
  });

  // Ordenar os artigos por data, do mais recente para o mais antigo
  const sortedArticles = articlesWithImageUrls.sort((a, b) => new Date(b.date) - new Date(a.date));

  return sortedArticles;
};
