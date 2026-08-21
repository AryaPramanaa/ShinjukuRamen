import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface OrderInfoProps {
  orderType?: string;
  tableNumber?: string;
}

const OrderInfo = ({
  orderType = 'Dine In',
  tableNumber = 'A2',
}: OrderInfoProps) => {
  return (
    <View style={styles.orderInfo}>
      <View>
        <Text style={styles.label}>Order Type</Text>
        <Text style={styles.label}>Table</Text>
      </View>

      <View style={styles.orderValue}>
        <Text style={styles.value}>{orderType}</Text>
        <Text style={styles.value}>{tableNumber}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  orderInfo: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  label: {
    fontSize: 14,
    color: '#A0A0A0',
    marginBottom: 6,
  },

  orderValue: {
    alignItems: 'flex-end',
  },

  value: {
    fontSize: 14,
    color: '#171717',
    marginBottom: 6,
    fontWeight: '600',
  },
});

export default OrderInfo;
