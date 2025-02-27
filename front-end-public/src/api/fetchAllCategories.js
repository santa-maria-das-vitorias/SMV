export const fetchAllCategories = async () => {
  try {
    const response = await fetch('/src/api/data/allCategories.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const articles = await response.json();
    return articles;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;
  }
};