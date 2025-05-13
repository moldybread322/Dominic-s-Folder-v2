import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchBooks } from '../../components/api'; // Import the fetchBooks function

const IndexScreen = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [savedBooks, setSavedBooks] = useState<any[]>([]);

  useEffect(() => {
    // Fetch books on initial load
    const loadBooks = async () => {
      const fetchedBooks = await fetchBooks('');
      setBooks(fetchedBooks);
    };

    // Load saved books from AsyncStorage
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

    loadBooks();
    loadSavedBooks();
  }, []);

  // Function to add a book based on user input
  const addBook = async () => {
    if (title && author) {
      const query = `${title}+${author}`;
      const fetchedBooks = await fetchBooks(query);
      setBooks(fetchedBooks);
      setTitle('');
      setAuthor('');
    }
  };

  // Function to save a book
  const saveBook = async (book: any) => {
    try {
      // Check if the book is already in the saved list
      const bookExists = savedBooks.some((savedBook: any) => savedBook.id === book.id);
      if (bookExists) {
        Alert.alert('Already Saved', 'This book is already in your saved list.');
        return;
      }

      // Add the book to the saved books array
      const updatedSavedBooks = [...savedBooks, book];
      setSavedBooks(updatedSavedBooks);

      // Save the updated list in AsyncStorage
      await AsyncStorage.setItem('savedBooks', JSON.stringify(updatedSavedBooks));
      Alert.alert('Saved', 'The book has been added to your saved list.');
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Book List</Text>

      <TextInput
        style={styles.input}
        placeholder="Book Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Author"
        value={author}
        onChangeText={setAuthor}
      />

      <Button title="Add Book" onPress={addBook} />

      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            {item.volumeInfo.imageLinks ? (
              <Image source={{ uri: item.volumeInfo.imageLinks.thumbnail }} style={styles.bookImage} />
            ) : (
              <Text>No Image Available</Text>
            )}
            <View style={styles.bookDetails}>
              <Text style={styles.bookText}>{item.volumeInfo.title}</Text>
              <Text style={styles.authorText}>
                by {item.volumeInfo.authors?.join(', ') || 'Unknown Author'}
              </Text>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => saveBook(item)}
              >
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  bookItem: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    elevation: 2,
  },
  bookImage: {
    width: 50,
    height: 75,
    marginRight: 10,
  },
  bookDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  bookText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  authorText: {
    fontSize: 14,
    color: '#555',
  },
  saveButton: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  saveText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default IndexScreen;
