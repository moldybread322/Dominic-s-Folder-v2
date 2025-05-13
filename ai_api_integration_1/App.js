import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Button, StyleSheet } from 'react-native';
import GenresScreen from './screens/GenresScreen'; // Import your GenresScreen
import AddBookForm from './components/AddBookForm';
import BookList from './components/BookList';

const Tab = createBottomTabNavigator();

export default function App() {
  const [books, setBooks] = useState([]);

  // Function to add a book to the list
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

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:5000/books');  // Mock server URL
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Genres">
          {() => (
            <GenresScreen onSaveBook={addBook} />
          )}
        </Tab.Screen>
        <Tab.Screen name="Book List">
          {() => (
            <View style={styles.container}>
              <Text style={styles.header}>Book List</Text>
              <AddBookForm onAddBook={addBook} />
              {books.length > 0 ? (
                <BookList books={books} onRemoveBook={removeBook} />
              ) : (
                <Text style={styles.noBooks}>No books in the list</Text>
              )}
            </View>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
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
