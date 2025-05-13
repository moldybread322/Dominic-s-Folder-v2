import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to BookTracker!</Text>
      <Text style={styles.description}>
        Track the books you've read, explore new genres, and discover recommendations based on your interests.
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Explore Book List"
          onPress={() => navigation.navigate('Book List')}
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Browse Genres"
          onPress={() => navigation.navigate('Genres')}
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Get Recommendations"
          onPress={() => navigation.navigate('Recommendations')}
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <Button
          title="View Saved Books"
          onPress={() => navigation.navigate('Saved')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 10,
    width: '80%',
  },
});

export default HomeScreen;
