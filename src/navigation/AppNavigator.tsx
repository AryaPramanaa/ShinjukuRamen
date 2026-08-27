import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabNavigator from './MainTabNavigation';
import MenuScreen from '../components/pages/menu/MenuScreen';
import SplashScreen from '../components/pages/splash/SplashScreen';
import ClaimRewardsScreen from '../components/pages/rewards/ClaimRewardsScreen';
import OrderSummaryScreen from '../components/pages/orders/OrderSummaryScreen';
import RedeemPaymentScreen from '../components/pages/orders/RedeemPaymentScreen';
import OrderReceiptScreen from '../components/pages/orders/OrderReceiptScreen';
import MembershipTiersScreen from '../components/pages/rewards/MembershipTiersScreen';
import PointsHistoryScreen from '../components/pages/rewards/PointsHistoryScreen';

export type RootTabParamList = {
  Dashboard: undefined;
  Scan: undefined;
  Order: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  Menu: undefined;
  SplashScreen: undefined;
  ClaimRewards: { points?: number; isBirthday?: boolean } | undefined;
  QRDisplay: { url: string };
  OrderSummary: undefined;
  RedeemPayment: undefined;
  OrderReceipt: undefined;
  MembershipTiers: { currentPoints?: number } | undefined;
  PointsHistory: { points?: number } | undefined;
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
      <Stack.Screen
        name="ClaimRewards"
        component={ClaimRewardsScreen}
      />
      <Stack.Screen
        name="OrderSummary"
        component={OrderSummaryScreen}
      />
      <Stack.Screen
        name="RedeemPayment"
        component={RedeemPaymentScreen}
      />
      <Stack.Screen
        name="OrderReceipt"
        component={OrderReceiptScreen}
      />
      <Stack.Screen
        name="MembershipTiers"
        component={MembershipTiersScreen}
      />
      <Stack.Screen
        name="PointsHistory"
        component={PointsHistoryScreen}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
