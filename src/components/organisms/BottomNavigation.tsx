import React from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import {
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';

import NavigationItem from '../molecules/NavigationItem';
import ScanNavigationItem from '../molecules/ScanNavigationItem';

const BottomNavigation = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {

  return (
    <View style={styles.container}>

      {state.routes.map((route, index) => {

        const isFocused =
          state.index === index;

        const label =
          descriptors[route.key].options.title ??
          route.name;

        const handlePress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (
            !isFocused &&
            !event.defaultPrevented
          ) {
            navigation.navigate(route.name);
          }
        };

        // SCAN
        if (route.name === 'Scan') {
          return (
            <View
              key={route.key}
              style={styles.scanWrapper}
            >
              <ScanNavigationItem
                onPress={handlePress}
              />
            </View>
          );
        }

        // ORDER
        if (route.name === 'Order') {
          return (
            <NavigationItem
              key={route.key}
              label={label}
              icon="receipt-outline"
              active={isFocused}
              onPress={handlePress}
            />
          );
        }

        // DASHBOARD
        return (
          <NavigationItem
            key={route.key}
            label={label}
            icon="home-outline"
            active={isFocused}
            onPress={handlePress}
          />
        );
      })}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,

    flexDirection: 'row',

    backgroundColor: '#FFFFFF',

    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',

    paddingHorizontal: 16,
  },

  scanWrapper: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BottomNavigation;