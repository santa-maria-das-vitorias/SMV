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
    return {
      reactions: {
        like: data.stats.like || 0,
        love: data.stats.love || 0,
        surprised: data.stats.surprised || 0,
        sad: data.stats.sad || 0,
      },
      visits: data.stats.visit || 0
    };
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;
  }
};