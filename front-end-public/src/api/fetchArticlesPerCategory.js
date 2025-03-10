export const fetchArticlesPerCategory = async ({ slug }) => {
  try {
    console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);
    console.log('API Key:', import.meta.env.VITE_API_KEY);

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/categories/${slug}`, {
      headers: {
        'X-API-Key': import.meta.env.VITE_API_KEY
      }
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const articles = await response.json();
    console.log('Articles:', articles);

    if (!Array.isArray(articles) || articles.length === 0) {
      throw new Error('No articles found for this category');
    }

    const articlesWithImageUrls = articles.map(article => {
      const imageUrl = article.image
        ? `${import.meta.env.VITE_IMAGE_URL}${article.image}`
        : null;

      return {
        ...article,
        imageUrl,
      };
    });

    return articlesWithImageUrls;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;
  }
};