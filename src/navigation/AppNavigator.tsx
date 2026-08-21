import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabNavigator from './MainTabNavigation';
import MenuScreen from '../pages/menu/MenuScreen';
import SplashScreen from '../pages/SplashScreen';

export type RootTabParamList = {
  Dashboard: undefined;
  Scan: undefined;
  Order: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  Menu: undefined;
  SplashScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
      />
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
