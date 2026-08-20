import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const RestaurantInfo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.restaurantName}>
        Shinjuku Ramen
      </Text>

      <Text style={styles.openText}>
        Open Today, 10 AM - 10 PM
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 25,
    paddingBottom: 20,
  },

  restaurantName: {
    fontSize: 23,
    fontWeight: '600',
    color: '#171717',
  },

  openText: {
    marginTop: 7,
    fontSize: 16,
    color: '#737373',
  },
});

export default RestaurantInfo;