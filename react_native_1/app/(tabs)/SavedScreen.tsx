import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Book {
  key: string;
  title: string;
  authors: { name: string }[];
}

const SavedScreen = () => {
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);

  // Load saved books from AsyncStorage when the screen is mounted
  useEffect(() => {
    const loadSavedBooks = async () => {
      try {
        const savedBooksString = await AsyncStorage.getItem('savedBooks');
        if (savedBooksString) {
          setSavedBooks(JSON.parse(savedBooksString));
        }
      } catch (error) {
        console.error('Error loading saved books:', error);
      }
    };
    loadSavedBooks();
  }, []);

  // Remove a book from saved books
  const removeBook = async (bookKey: string) => {
    try {
      // Filter out the book that is to be removed
      const updatedBooks = savedBooks.filter((book) => book.key !== bookKey);

      // Update state and AsyncStorage
      setSavedBooks(updatedBooks);
      await AsyncStorage.setItem('savedBooks', JSON.stringify(updatedBooks));
    } catch (error) {
      console.error('Error removing book:', error);
    }
  };

  // Confirm before removing a book
  const confirmRemove = (bookKey: string) => {
    Alert.alert(
      "Remove Book",
      "Are you sure you want to remove this book from saved?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => removeBook(bookKey)
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Saved Books</Text>
      {savedBooks.length === 0 ? (
        <Text style={styles.noBooks}>No saved books</Text>
      ) : (
        <FlatList
          data={savedBooks}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <View style={styles.bookItem}>
              <Text style={styles.bookTitle}>{item.title}</Text>
              <Text style={styles.author}>
                by {item.authors?.[0]?.name || 'Unknown Author'}
              </Text>
              <TouchableOpacity onPress={() => confirmRemove(item.key)}>
                <Text style={styles.removeButton}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  noBooks: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
  },
  bookItem: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    marginBottom: 10,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  author: {
    marginTop: 5,
    color: '#555',
  },
  removeButton: {
    color: 'red',
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

export default SavedScreen;
