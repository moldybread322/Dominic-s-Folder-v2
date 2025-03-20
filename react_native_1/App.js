import React, { useState } from 'react';
import { View, Text, Button, FlatList, TextInput, StyleSheet } from 'react-native';

// Import the custom components
import BookList from './components/BookList';
import AddBookForm from './components/AddBookForm';

export default function App() {
  const [books, setBooks] = useState([]);
  
  // Function to add a book to the list
  const addBook = (bookTitle) => {
    setBooks([...books, { key: Math.random().toString(), title: bookTitle }]);
  };

  // Function to remove a book from the list
  const removeBook = (key) => {
    setBooks(books.filter((book) => book.key !== key));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Book List</Text>
      <AddBookForm onAddBook={addBook} />
      {books.length > 0 ? (
        <BookList books={books} onRemoveBook={removeBook} />
      ) : (
        <Text style={styles.noBooks}>No books in the list</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  noBooks: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
});
