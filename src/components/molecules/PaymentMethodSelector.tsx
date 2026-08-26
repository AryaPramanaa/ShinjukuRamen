import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from '../atoms/Icon';

interface PaymentMethodSelectorProps {
  selectedMethod: 'online' | 'cashier';
  onSelectMethod: (method: 'online' | 'cashier') => void;
}

const PaymentMethodSelector = ({
  selectedMethod,
  onSelectMethod,
}: PaymentMethodSelectorProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Payment Method</Text>

      <View style={styles.tabContainer}>
        <Pressable
          style={[
            styles.tabButton,
            selectedMethod === 'online' && styles.tabButtonActive,
          ]}
          onPress={() => onSelectMethod('online')}
        >
          <Icon
            name="card-outline"
            size={20}
            color={selectedMethod === 'online' ? '#FFFFFF' : '#888888'}
          />
          <Text
            style={[
              styles.tabText,
              selectedMethod === 'online' && styles.tabTextActive,
            ]}
          >
            Online Payment
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.tabButton,
            selectedMethod === 'cashier' && styles.tabButtonActive,
          ]}
          onPress={() => onSelectMethod('cashier')}
        >
          <Icon
            name="desktop-outline"
            size={20}
            color={selectedMethod === 'cashier' ? '#FFFFFF' : '#888888'}
          />
          <Text
            style={[
              styles.tabText,
              selectedMethod === 'cashier' && styles.tabTextActive,
            ]}
          >
            Pay At Cashier
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#171717',
    marginBottom: 10,
  },

  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 24,
    padding: 4,
  },

  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    borderRadius: 20,
  },

  tabButtonActive: {
    backgroundColor: '#8B1D1D',
  },

  tabText: {
    fontSize: 13,
    color: '#888888',
    fontWeight: '500',
  },

  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default PaymentMethodSelector;
