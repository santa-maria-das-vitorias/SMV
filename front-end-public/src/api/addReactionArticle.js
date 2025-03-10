import { fetchReactionsArticle } from './fetchReactionsArticle';

export const addReactionArticle = async ({ articleSlug, reactionType }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/stats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': import.meta.env.VITE_API_KEY
      },
      body: JSON.stringify({ articleSlug, stat: reactionType })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Assuming the response is just a confirmation and not the updated stats
    await response.json();

    // Fetch the updated stats
    const updatedStats = await fetchReactionsArticle({ articleSlug });

    return updatedStats;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;
  }
};