import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

const BookList = ({ books, onRemoveBook }) => {
  return (
    <FlatList
      data={books}
      renderItem={({ item }) => (
        <View style={styles.bookItem}>
          <Text style={styles.bookTitle}>{item.title}</Text>
          <Button title="Remove" onPress={() => onRemoveBook(item.key)} />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  bookItem: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookTitle: {
    fontSize: 18,
  },
});

export default BookList;
