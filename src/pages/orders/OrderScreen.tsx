import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const OrderScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pesanan</Text>

      <Text style={styles.subtitle}>
        Daftar pesanan kamu
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
  },

  subtitle: {
    marginTop: 8,
    fontSize: 16,
  },
});

export default OrderScreen;
