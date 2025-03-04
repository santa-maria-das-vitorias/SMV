export const fetchLatestArticles = async () => {
  try {
    const response = await fetch('/src/api/data/allArticles.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const articles = await response.json();
    // Organize os artigos de maneira cronológica pela coluna "date"
    const sortedArticles = articles.sort((a, b) => new Date(b.date) - new Date(a.date));
    return sortedArticles;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;
  }
};