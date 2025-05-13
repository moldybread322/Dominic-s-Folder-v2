// app/+not-found.tsx
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const NotFoundScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Oops! This page doesn't exist.</Text>
      <Button
        title="Go Home"
        onPress={() => navigation.navigate('Index')} // Redirect to Index or home screen
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 24,
    color: 'black',
    marginBottom: 20,
  },
});

export default NotFoundScreen;
