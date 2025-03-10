export const fetchReactionsArticle = async ({ articleSlug }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/stats/${articleSlug}`, {
      headers: {
        'X-API-Key': import.meta.env.VITE_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;
  }
};