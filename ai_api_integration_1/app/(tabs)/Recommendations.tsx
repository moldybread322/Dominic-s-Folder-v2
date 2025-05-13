import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

// Define the props for RecommendationsScreen
interface Book {
  key: string;
  title: string;
  authors: { name: string }[];
}

interface RecommendationsScreenProps {
  onSave: (book: Book) => void; // Function passed from parent to save books
}

const RecommendationsScreen: React.FC<RecommendationsScreenProps> = ({ onSave }) => {
  // Sample recommended books (this could come from an API)
  const recommendedBooks: Book[] = [
    { key: '1', title: 'The Great Adventure', authors: [{ name: 'John Doe' }] },
    { key: '2', title: 'Mystery of the Night', authors: [{ name: 'Jane Smith' }] },
    { key: '3', title: 'Science of Tomorrow', authors: [{ name: 'Emily Brown' }] },
    // Add more books here
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recommended Books</Text>
      <FlatList
        data={recommendedBooks}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.bookAuthor}>by {item.authors[0].name}</Text>
            <Button title="Save" onPress={() => onSave(item)} /> {/* Save button */}
          </View>
        )}
        keyExtractor={(item) => item.key}
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
    textAlign: 'center',
    marginBottom: 20,
  },
  bookItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookAuthor: {
    marginTop: 5,
    color: '#555',
  },
});

export default RecommendationsScreen;
