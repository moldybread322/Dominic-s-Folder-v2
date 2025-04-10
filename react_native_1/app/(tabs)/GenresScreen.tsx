import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Book {
  key: string;
  title: string;
  authors: { name: string }[];
}

const genres = [
  { label: 'Science Fiction', value: 'science_fiction' },
  { label: 'Fantasy', value: 'fantasy' },
  { label: 'Mystery', value: 'mystery' },
  { label: 'Romance', value: 'romance' },
  { label: 'Horror', value: 'horror' },
];

const GenresScreen = () => {
  const [selectedGenre, setSelectedGenre] = useState('science_fiction');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async (genre: string) => {
    try {
      setLoading(true);
      const response = await fetch(`https://openlibrary.org/subjects/${genre}.json`);
      const data = await response.json();
      setBooks(data.works);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(selectedGenre);
  }, [selectedGenre]);

  // Save the book to AsyncStorage
  const saveBook = async (book: Book) => {
    try {
      const savedBooksString = await AsyncStorage.getItem('savedBooks');
      const savedBooks = savedBooksString ? JSON.parse(savedBooksString) : [];

      // Check if the book is already saved
      if (!savedBooks.some((savedBook: Book) => savedBook.key === book.key)) {
        savedBooks.push(book);
        await AsyncStorage.setItem('savedBooks', JSON.stringify(savedBooks));
      }
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Explore Genres</Text>
      <Picker
        selectedValue={selectedGenre}
        onValueChange={(itemValue) => setSelectedGenre(itemValue)}
        style={styles.picker}
      >
        {genres.map((genre) => (
          <Picker.Item key={genre.value} label={genre.label} value={genre.value} />
        ))}
      </Picker>

      {loading ? (
        <ActivityIndicator size="large" color="#6200ea" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <View style={styles.bookItem}>
              <Text style={styles.bookTitle}>{item.title}</Text>
              <Text style={styles.author}>
                by {item.authors?.[0]?.name || 'Unknown Author'}
              </Text>
              <TouchableOpacity onPress={() => saveBook(item)}>
                <Text style={styles.saveButton}>Save for Later</Text>
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
  picker: {
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  bookItem: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  author: {
    marginTop: 5,
    color: '#555',
  },
  saveButton: {
    color: 'green',
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

export default GenresScreen;
