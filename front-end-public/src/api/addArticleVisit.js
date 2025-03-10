export const addArticleVisit = async ({ articleSlug }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/stats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': import.meta.env.VITE_API_KEY
      },
      body: JSON.stringify({ articleSlug, stat: 'visit' })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;
  }
};