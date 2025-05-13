import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface Book {
  id: string;
  title: string;
  author: string;
  image: string;
}

// Type for props
interface GenresScreenProps {
  onSaveBook: (book: Book) => void;
}

const GenresScreen: React.FC<GenresScreenProps> = ({ onSaveBook }) => {
  const [selectedGenre, setSelectedGenre] = useState<string>('fiction');
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooksByGenre = async (genre: string) => {
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${genre}`);
      const data = await response.json();
      const fetchedBooks = data.items.map((item: any) => ({
        id: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors?.join(', ') || 'Unknown',
        image: item.volumeInfo.imageLinks?.thumbnail || '',
      }));
      setBooks(fetchedBooks);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooksByGenre(selectedGenre);
  }, [selectedGenre]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Browse Genres</Text>

      <View style={styles.genreButtons}>
        {['fiction', 'mystery', 'science', 'romance'].map((genre) => (
          <Button
            key={genre}
            title={genre.charAt(0).toUpperCase() + genre.slice(1)}
            onPress={() => setSelectedGenre(genre)}
          />
        ))}
      </View>

      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            {item.image && <Image source={{ uri: item.image }} style={styles.bookImage} />}
            <View style={styles.bookDetails}>
              <Text style={styles.bookText}>{item.title}</Text>
              <Text style={styles.bookText}>by {item.author}</Text>
              <TouchableOpacity onPress={() => onSaveBook(item)}>
                <Text style={styles.saveButton}>Save</Text>
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
  genreButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  bookItem: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  bookImage: {
    width: 50,
    height: 75,
    marginRight: 15,
  },
  bookDetails: {
    flexDirection: 'column',
  },
  bookText: {
    fontSize: 16,
  },
  saveButton: {
    color: 'blue',
    marginTop: 10,
  },
});

export default GenresScreen;
