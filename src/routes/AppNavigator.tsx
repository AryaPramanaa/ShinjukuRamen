import React from 'react';

import { createNativeStackNavigator} from '@react-navigation/native-stack';

import MainTabNavigator from './MainTabNavigation';

import MenuScreen from '../components/pages/menu/MenuScreen';

export type RootTabParamList = {
  Dashboard: undefined;
  Scan: undefined;
  Order: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  Menu: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={MainTabNavigator}
      />

      <Stack.Screen
        name="Menu"
        component={MenuScreen}
      />

    </Stack.Navigator>
  );
};

export default AppNavigator;