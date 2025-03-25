import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

// Define the type for the book
interface Book {
  key: string;
  title: string;
  authors: { name: string }[];  // Array of authors, each having a "name"
}

const ExploreScreen = () => {
  const [books, setBooks] = useState<Book[]>([]);  // Explicitly set the type for books array
  const [loading, setLoading] = useState(true);

  // Fetch books from the Open Library API
  const fetchBooks = async () => {
    try {
      const response = await fetch('https://openlibrary.org/subjects/science_fiction.json');
      const data = await response.json();
      setBooks(data.works);  // Set the works array as books
      setLoading(false);      // Turn off the loading indicator once data is fetched
    } catch (error) {
      console.error('Error fetching books:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);  // Fetch the books only once when the component mounts

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ea" />
        <Text>Loading books...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Science Fiction Books</Text>
      
      {/* Display the list of books fetched from the API */}
      <FlatList
        data={books}
        keyExtractor={(item) => item.key}  // Use "key" as the unique key
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.author}>by {item.authors ? item.authors[0].name : 'Unknown Author'}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 16,
    color: '#666',
  },
});

export default ExploreScreen;