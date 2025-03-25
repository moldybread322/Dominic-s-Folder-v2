import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IndexScreen from './index';
import ExploreScreen from './explore';

const Tab = createBottomTabNavigator();

const TabsLayout = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Book List" component={IndexScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
    </Tab.Navigator>
  );
};

export default TabsLayout;