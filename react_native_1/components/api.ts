// api.ts

// Function to fetch books from Google Books API based on query
export const fetchBooks = async (query: string) => {
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error('Error fetching books:', error);
      return [];
    }
  };
  