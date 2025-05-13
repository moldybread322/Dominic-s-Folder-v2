import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Book {
  id: string;
  volumeInfo?: {
    title: string;
    authors: string[];
    imageLinks?: {
      thumbnail: string;
    };
  };
}

const SavedScreen = ({ savedBooks }: { savedBooks: Book[] }) => {
  const [localSavedBooks, setLocalSavedBooks] = useState<Book[]>(savedBooks);

  // Load saved books from AsyncStorage whenever the component is mounted or savedBooks changes
  const loadSavedBooks = async () => {
    try {
      const savedBooksString = await AsyncStorage.getItem('savedBooks');
      if (savedBooksString) {
        setLocalSavedBooks(JSON.parse(savedBooksString));
      }
    } catch (error) {
      console.error('Error loading saved books:', error);
    }
  };

  useEffect(() => {
    loadSavedBooks();
  }, []); // Load saved books only once when the component mounts

  // Function to remove a book from saved books
  const removeBook = async (bookId: string) => {
    try {
      const updatedBooks = localSavedBooks.filter((book) => book.id !== bookId);
      setLocalSavedBooks(updatedBooks);
      await AsyncStorage.setItem('savedBooks', JSON.stringify(updatedBooks));

      // Reload the saved books to ensure the UI updates automatically
      loadSavedBooks(); 
    } catch (error) {
      console.error('Error removing book:', error);
    }
  };

  const confirmRemove = (bookId: string) => {
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
          onPress: () => removeBook(bookId)
        }
      ]
    );
  };

  // Render the book item with additional checks for imageLinks and volumeInfo
  const renderBookItem = ({ item }: { item: Book }) => {
    const imageUrl = item?.volumeInfo?.imageLinks?.thumbnail;
    const title = item?.volumeInfo?.title || 'Untitled';
    const authors = item?.volumeInfo?.authors?.join(', ') || 'Unknown Author';

    return (
      <View style={styles.bookItem}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.bookImage} />
        ) : (
          <Text style={styles.noImageText}>No Image Available</Text>
        )}
        <View style={styles.bookDetails}>
          <Text style={styles.bookTitle}>{title}</Text>
          <Text style={styles.author}>{`by ${authors}`}</Text>
          <TouchableOpacity onPress={() => confirmRemove(item.id)}>
            <Text style={styles.removeButton}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Saved Books</Text>
      {localSavedBooks.length === 0 ? (
        <Text style={styles.noBooks}>No saved books</Text>
      ) : (
        <FlatList
          data={localSavedBooks}
          keyExtractor={(item) => item.id}
          renderItem={renderBookItem}
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
    flexDirection: 'row',
  },
  bookImage: {
    width: 50,
    height: 75,
    marginRight: 10,
  },
  noImageText: {
    width: 50,
    height: 75,
    marginRight: 10,
    textAlign: 'center',
    lineHeight: 75,
    color: '#555',
    fontSize: 12,
  },
  bookDetails: {
    flex: 1,
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
