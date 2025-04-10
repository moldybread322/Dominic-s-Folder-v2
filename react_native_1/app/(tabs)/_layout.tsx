import React, { useState } from 'react'; // Import useState
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IndexScreen from './index';  // Assuming this is correct
import GenresScreen from './GenresScreen';  // Importing GenresScreen
import SavedScreen from './SavedScreen';  // Importing SavedScreen
import RecommendationsScreen from './Recommendations';  // Import RecommendationsScreen

const Tab = createBottomTabNavigator();

const TabsLayout = () => {
  const [savedBooks, setSavedBooks] = useState<any[]>([]);

  // Function to save books
  const handleSaveBook = (book: any) => {
    setSavedBooks((prevBooks) => [...prevBooks, book]);
  };

  return (
    <Tab.Navigator>
      <Tab.Screen name="Book List" component={IndexScreen} />
      <Tab.Screen name="Genres" component={GenresScreen} />
      
      {/* Pass the onSave function to RecommendationsScreen as a prop */}
      <Tab.Screen 
        name="Recommendations" 
        children={() => <RecommendationsScreen onSave={handleSaveBook} />} 
      />
      
      <Tab.Screen name="Saved" component={SavedScreen} />
    </Tab.Navigator>
  );
};

export default TabsLayout;
