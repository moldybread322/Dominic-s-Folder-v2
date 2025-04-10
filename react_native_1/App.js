import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TextInput, StyleSheet } from 'react-native';
import AddBookForm from './components/AddBookForm';
import BookList from './components/BookList';

export default function App() {
  const [books, setBooks] = useState([]);
  
  // Fetch books from mock API
  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:5000/books');  // Mock server URL
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  // Fetch books when the app starts
  useEffect(() => {
    fetchBooks();
  }, []);

  // Function to add a book to the list (POST request)
  const addBook = async (bookTitle) => {
    const newBook = { title: bookTitle };
    try {
      const response = await fetch('http://localhost:5000/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });

      if (response.ok) {
        fetchBooks(); // Reload books after adding
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  // Function to remove a book from the list (DELETE request)
  const removeBook = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:5000/books/${bookId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchBooks(); // Reload books after deleting
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
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
