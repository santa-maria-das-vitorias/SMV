export const fetchSingleArticle = async ({ slug }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/articles/${slug}`, {
      headers: {
        'X-API-Key': import.meta.env.VITE_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const article = await response.json();

    // Adicionar URL completa da imagem
    const imageUrl = article.image
      ? `${import.meta.env.VITE_IMAGE_URL}${article.image}`
      : null;

    return {
      ...article,
      imageUrl,
    };
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;
  }
};