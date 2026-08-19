import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const ScanMenu = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan</Text>

      <Text style={styles.subtitle}>
        Halaman Scanner
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

export default ScanMenu;