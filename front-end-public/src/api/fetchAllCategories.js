export const fetchAllCategories = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/categories`, {
      headers: {
        'X-API-Key': import.meta.env.VITE_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;
  }
};