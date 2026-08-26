import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ReceiptDetailGridProps {
  date: string;
  orderId: string;
  customerName: string;
  pax: string;
  paymentMethodLabel: string;
  paymentTime: string;
  isThermalFormat?: boolean;
  isPendingCashier?: boolean;
}

const ReceiptDetailGrid = ({
  date,
  orderId,
  customerName,
  pax,
  paymentMethodLabel,
  paymentTime,
  isThermalFormat = false,
  isPendingCashier = false,
}: ReceiptDetailGridProps) => {
  if (isThermalFormat) {
    return (
      <View style={styles.thermalGrid}>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>Cashier</Text>
            <Text style={styles.value}>Cashier 1</Text>
          </View>
          <View style={[styles.col, styles.alignRight]}>
            <Text style={styles.label}>Source</Text>
            <Text style={styles.value}>Self Order</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>{date}</Text>
          </View>
          <View style={[styles.col, styles.alignRight]}>
            <Text style={styles.label}>Table</Text>
            <Text style={styles.value}>A2</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>Customer</Text>
            <Text style={styles.value}>{customerName}</Text>
          </View>
          <View style={[styles.col, styles.alignRight]}>
            <Text style={styles.label}>Pax</Text>
            <Text style={styles.value}>{pax}</Text>
          </View>
        </View>
      </View>
    );
  }

  // Summary screen layout
  return (
    <View style={styles.grid}>
      <View style={styles.receiptRow}>
        <Text style={styles.receiptLabel}>Date</Text>
        <Text style={styles.receiptValue}>{date}</Text>
      </View>

      <View style={styles.receiptRow}>
        <Text style={styles.receiptLabel}>Order ID</Text>
        <Text style={styles.receiptValue}>{orderId}</Text>
      </View>

      <View style={styles.receiptRow}>
        <Text style={styles.receiptLabel}>Order Type</Text>
        <Text style={styles.receiptValue}>Dine In</Text>
      </View>

      <View style={styles.receiptRow}>
        <Text style={styles.receiptLabel}>Name</Text>
        <Text style={styles.receiptValue}>{customerName}</Text>
      </View>

      <View style={styles.receiptRow}>
        <Text style={styles.receiptLabel}>Phone Number</Text>
        <Text style={styles.receiptValue}>{displayPhone(customerName)}</Text>
      </View>

      <View style={styles.receiptRow}>
        <Text style={styles.receiptLabel}>Email</Text>
        <Text style={styles.receiptValue}>{displayEmail(customerName)}</Text>
      </View>

      {!isPendingCashier && (
        <>
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Payment Method</Text>
            <Text style={styles.receiptValue}>{paymentMethodLabel}</Text>
          </View>

          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Payment Time</Text>
            <Text style={styles.receiptValue}>{paymentTime}</Text>
          </View>
        </>
      )}
    </View>
  );
};

// Internal helpers for mockup defaults
const displayPhone = (name: string) => {
  if (name.toLowerCase().includes('amal')) return '+6181234567890';
  if (name.toLowerCase() === 'valen') return '+6189876543210';
  return '-';
};

const displayEmail = (name: string) => {
  if (name.toLowerCase().includes('amal')) return 'amaliamhd@gmail.com';
  if (name.toLowerCase() === 'valen') return 'valen@gmail.com';
  return '-';
};

const styles = StyleSheet.create({
  thermalGrid: {
    gap: 8,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  col: {
    flex: 1,
  },

  alignRight: {
    alignItems: 'flex-end',
  },

  label: {
    fontSize: 11,
    color: '#A0A0A0',
    marginBottom: 2,
  },

  value: {
    fontSize: 12,
    fontWeight: '600',
    color: '#171717',
  },

  /* Summary screen styling */
  grid: {
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    width: '100%',
  },

  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  receiptLabel: {
    color: '#666666',
    fontSize: 13,
  },

  receiptValue: {
    color: '#171717',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default ReceiptDetailGrid;
