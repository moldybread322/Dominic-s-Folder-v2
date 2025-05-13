import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

interface Book {
  id: string;
  title: string;
  author: string;
}

const RecommendationsScreen = ({ onSave }: { onSave: (book: Book) => void }) => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    // Simulating fetching books data
    const fetchBooks = () => {
      const fetchedBooks = [
        { id: '1', title: 'Book 1', author: 'Author 1' },
        { id: '2', title: 'Book 2', author: 'Author 2' },
        { id: '3', title: 'Book 3', author: 'Author 3' },
      ];
      setBooks(fetchedBooks);
    };

    fetchBooks();
  }, []);

  const handleSave = (book: Book) => {
    onSave(book);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recommended Books</Text>
      {/* User instruction note */}
      <Text style={styles.note}>
        Here are some book recommendations! You can save your favorite books by tapping the "Save" button.
      </Text>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.bookAuthor}>{item.author}</Text>
            <TouchableOpacity onPress={() => handleSave(item)} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  note: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  listItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f1f1f1',
    width: '100%',
    borderRadius: 8,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookAuthor: {
    fontSize: 14,
    color: 'gray',
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 4,
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default RecommendationsScreen;
