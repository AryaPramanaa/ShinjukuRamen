import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface RestaurantInfoProps {
  name?: string;
  openTime?: string;
  closeTime?: string;
}

const RestaurantInfo = ({
  name,
  openTime,
  closeTime,
}: RestaurantInfoProps) => {
  const formatTime = (timeStr?: string) => {
    if (!timeStr) return '';
    const parts = timeStr.split(':');
    if (parts.length >= 2) {
      return `${parts[0]}:${parts[1]}`;
    }
    return timeStr;
  };

  const formattedHours = openTime && closeTime
    ? `Open Today, ${formatTime(openTime)} - ${formatTime(closeTime)}`
    : '';

  return (
    <View style={styles.container}>
      <Text style={styles.restaurantName} numberOfLines={2}>
        {name || ''}
      </Text>

      {formattedHours ? (
        <Text style={styles.openText}>
          {formattedHours}
        </Text>
      ) : null}
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