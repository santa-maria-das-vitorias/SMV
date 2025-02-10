import reactionsData from '@/api/data/reactionsArticle.json';

export const fetchReactionsArticle = async ({ articleSlug }) => {
  if (reactionsData.articleSlug === articleSlug) {
    return reactionsData;
  } else {
    console.error('Reações não encontradas para o slug do artigo:', articleSlug);
    throw new Error('Reactions not found');
  }
};