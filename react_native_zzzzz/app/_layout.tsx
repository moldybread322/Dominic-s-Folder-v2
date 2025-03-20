// app/_layout.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layout from './_layout';  // If you are using another layout file

const AppLayout = ({ children }) => {
  return (
    <View style={styles.container}>
      {/* Global header or other layout components */}
      <Text style={styles.header}>My App</Text>
      {/* Render the content passed to this layout (like the Tab Screens) */}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 32,
    textAlign: 'center',
    paddingTop: 20,
    backgroundColor: '#6200ea',
    color: 'white',
    paddingVertical: 15,
  },
  content: {
    flex: 1,
    padding: 20,
  },
});

export default AppLayout;
