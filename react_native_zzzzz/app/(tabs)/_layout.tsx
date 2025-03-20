// _layout.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import ExploreScreen from './explore';
import IndexScreen from './index';

const Tab = createBottomTabNavigator();

const Layout = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Explore" component={ExploreScreen} />
        <Tab.Screen name="Index" component={IndexScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Layout;
