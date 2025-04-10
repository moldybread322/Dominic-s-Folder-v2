import 'react-native-get-random-values';  // Import polyfill for getRandomValues
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { v4 as uuidv4 } from 'uuid';  // For generating unique IDs

// Define the type for a book
interface Book {
  id: string;
  title: string;
  author: string;
}

const IndexScreen = () => {
  // Explicitly define the type for books as an array of Book objects
  const [books, setBooks] = useState<Book[]>([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  // Function to add a new book
  const addBook = async () => {
    if (title && author) {
      const newBook = {
        title,
        author,
      };

      try {
        // Send POST request to JSONPlaceholder API to add the new book
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newBook),
        });

        const data = await response.json(); // Parse the response from the API
        console.log('Book added:', data); // Log the response from the API

        // Update local books list with the new book
        setBooks((prevBooks) => [
          ...prevBooks,
          {
            id: data.id.toString(),  // Use the ID from the API response
            title,
            author,
          },
        ]);

        // Clear input fields after adding
        setTitle('');
        setAuthor('');
      } catch (error) {
        console.error('Error adding book:', error);
      }
    }
  };

  // Function to delete a book
  const deleteBook = (id: string) => {
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Book List</Text>
      
      {/* Input fields for adding books */}
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

      {/* Display the list of books */}
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text style={styles.bookText}>{item.title} by {item.author}</Text>
            <TouchableOpacity onPress={() => deleteBook(item.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
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
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
  },
  bookText: {
    fontSize: 16,
  },
  deleteButton: {
    color: 'red',
  },
});

export default IndexScreen;
