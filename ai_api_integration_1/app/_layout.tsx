import React from 'react';
import TabsLayout from './(tabs)/_layout';  // Path to the tab layout in the "tabs" folder

const AppLayout = () => {
  return (
    // Remove NavigationContainer, since Expo Router handles this automatically
    <TabsLayout />
  );
};

export default AppLayout;
