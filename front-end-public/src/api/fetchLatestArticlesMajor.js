export const fetchLatestArticlesMajor = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/articles`, {
      headers: {
        'X-API-Key': import.meta.env.VITE_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const articles = await response.json();

    // Adicionar URLs completas das imagens
    const articlesWithImageUrls = articles.map(article => {
      const imageUrl = article.image
        ? `${import.meta.env.VITE_IMAGE_URL}${article.image}`
        : null;

      return {
        ...article,
        imageUrl,
      };
    });

    // Ordenar os artigos por data, do mais recente para o mais antigo
    const sortedArticles = articlesWithImageUrls.sort((a, b) => new Date(b.date) - new Date(a.date));

    return sortedArticles;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;
  }
};