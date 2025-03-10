export const addReactionArticle = async ({ articleSlug, reactionType }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/stats/articles/${articleSlug}/reaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': import.meta.env.VITE_API_KEY
      },
      body: JSON.stringify({ reactionType })
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