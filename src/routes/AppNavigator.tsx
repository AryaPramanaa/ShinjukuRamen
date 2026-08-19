import React from 'react';

import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import Dashboard from '../components/pages/Dashboard';
import Order from '../components/pages/orders/OrderScreen';
import Scan from '../components/pages/menu/ScanMenu';
import BottomNavigation from '../components/organisms/BottomNavigation';

export type RootTabParamList = {
  Order: undefined;
  Scan: undefined;
  Dashboard: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const AppNavigator = () => {
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

export default AppNavigator;