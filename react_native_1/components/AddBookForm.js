import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const AddBookForm = ({ onAddBook }) => {
  const [bookTitle, setBookTitle] = useState('');

  const handleAddBook = () => {
    if (bookTitle.trim()) {
      onAddBook(bookTitle);
      setBookTitle('');  // Clear input after adding
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Enter book title"
        style={styles.input}
        value={bookTitle}
        onChangeText={(text) => setBookTitle(text)}
      />
      <Button title="Add Book" onPress={handleAddBook} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    fontSize: 16,
  },
});

export default AddBookForm;
