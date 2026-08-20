import React from 'react';

import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import Dashboard from '../components/pages/Dashboard';
import Scan from '../components/pages/menu/ScanMenu';
import Order from '../components/pages/orders/OrderScreen';

import BottomNavigation from '../components/organisms/BottomNavigation';

import type {
  RootTabParamList,
} from './AppNavigator';

const Tab = createBottomTabNavigator<RootTabParamList>();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"

      screenOptions={{
        headerShown: false,
      }}

      tabBar={(props) => (
        <BottomNavigation {...props} />
      )}
    >

      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
      />

      <Tab.Screen
        name="Scan"
        component={Scan}
      />

      <Tab.Screen
        name="Order"
        component={Order}
      />

    </Tab.Navigator>
  );
};

export default MainTabNavigator;