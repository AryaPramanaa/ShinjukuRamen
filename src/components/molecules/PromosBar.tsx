import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from '../atoms/Icon';

const PromosBar = () => {
  return (
    <View style={styles.promoSection}>
      <View style={styles.promoLeft}>
        <View style={styles.promoIconContainer}>
          <Text style={styles.promoPercentIcon}>%</Text>
        </View>
        <Text style={styles.promoText}>Add Promos</Text>
      </View>
      <Icon name="chevron-forward" size={20} color="#B91C1C" />
    </View>
  );
};

const styles = StyleSheet.create({
  promoSection: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    borderRadius: 12,
    backgroundColor: '#FFF5F5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  promoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  promoIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },

  promoPercentIcon: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  promoText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#B91C1C',
  },
});

export default PromosBar;
