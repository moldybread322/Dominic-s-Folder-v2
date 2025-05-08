import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import IndexScreen from './IndexScreen';
import GenresScreen from './GenresScreen';
import SavedScreen from './SavedScreen';
import RecommendationsScreen from './Recommendations';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const TabsLayout = () => {
  const [savedBooks, setSavedBooks] = useState<any[]>([]);

  const handleSaveBook = (book: any) => {
    setSavedBooks((prevBooks) => [...prevBooks, book]);
  };

  return (
    <Tab.Navigator>
      {/* Home Screen */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      {/* Book List Screen */}
      <Tab.Screen
        name="Book List"
        component={IndexScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" size={size} color={color} />
          ),
        }}
      />

      {/* Genres Screen */}
      <Tab.Screen
        name="Genres"
        component={() => <GenresScreen onSaveBook={handleSaveBook} />} // Pass onSaveBook prop directly here
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid" size={size} color={color} />
          ),
        }}
      />

      {/* Recommendations Screen */}
      <Tab.Screen
        name="Recommendations"
        component={() => <RecommendationsScreen onSave={handleSaveBook} />} // Pass onSave prop here as well
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star" size={size} color={color} />
          ),
        }}
      />

      {/* Saved Books Screen */}
      <Tab.Screen
        name="Saved"
        component={() => <SavedScreen savedBooks={savedBooks} />} // Pass savedBooks here
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsLayout;
