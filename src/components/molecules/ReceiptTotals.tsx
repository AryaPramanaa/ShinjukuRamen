import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ReceiptTotalsProps {
  totalPrice: number;
  totalQuantity: number;
  paymentMethodLabel: string;
  isThermalFormat?: boolean;
  isPendingCashier?: boolean;
  cashPaid?: number | null;
  change?: number | null;
}

const ReceiptTotals = ({
  totalPrice,
  totalQuantity,
  paymentMethodLabel,
  isThermalFormat = false,
  isPendingCashier = false,
  cashPaid = null,
  change = null,
}: ReceiptTotalsProps) => {
  const discount5 = totalPrice * 0.05;
  const specialDiscount = 10.0;
  const surcharge15 = (totalPrice - discount5 - specialDiscount) * 0.15;
  const grandTotal = totalPrice - discount5 - specialDiscount + surcharge15;
  const gst = grandTotal * 0.07736;
  const standardGst = totalPrice * 0.091; // ~10% standard inclusion

  if (isThermalFormat) {
    return (
      <View style={styles.container}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Subtotal</Text>
          <Text style={styles.totalValue}>$ {totalPrice.toFixed(2)}</Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Discount 5% (5%)</Text>
          <Text style={styles.totalValue}>- $ {discount5.toFixed(2)}</Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Discount Special</Text>
          <Text style={styles.totalValue}>- $ {specialDiscount.toFixed(2)}</Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Pub. Hol. Surcharge (15%)</Text>
          <Text style={styles.totalValue}>$ {surcharge15.toFixed(2)}</Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={[styles.totalLabel, styles.grandTotalText]}>Grand Total</Text>
          <Text style={[styles.totalValue, styles.grandTotalText]}>$ {grandTotal.toFixed(2)}</Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>G.S.T include in Total</Text>
          <Text style={styles.totalValue}>$ {gst.toFixed(2)}</Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>{paymentMethodLabel}</Text>
          <Text style={styles.totalValue}>$ {grandTotal.toFixed(2)}</Text>
        </View>
      </View>
    );
  }

  // Summary screen totals layout
  return (
    <View style={styles.container}>
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Sub Total ({totalQuantity} Items)</Text>
        <Text style={styles.totalValue}>$ {totalPrice.toFixed(2)}</Text>
      </View>

      <View style={styles.totalRow}>
        <Text style={[styles.totalLabel, styles.grandTotalText]}>Grand Total</Text>
        <Text style={[styles.totalValue, styles.grandTotalText]}>$ {totalPrice.toFixed(2)}</Text>
      </View>

      {!isPendingCashier && (
        <>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>G.S.T include in Total</Text>
            <Text style={styles.totalValue}>$ {standardGst.toFixed(2)}</Text>
          </View>

          {cashPaid !== null ? (
            <>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Cash</Text>
                <Text style={styles.totalValue}>$ {cashPaid.toFixed(2)}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Change</Text>
                <Text style={styles.totalValue}>$ {change !== null ? change.toFixed(2) : '0.00'}</Text>
              </View>
            </>
          ) : (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>{paymentMethodLabel}</Text>
              <Text style={styles.totalValue}>$ {totalPrice.toFixed(2)}</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
    width: '100%',
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalLabel: {
    fontSize: 13,
    color: '#666666',
  },

  totalValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#171717',
  },

  grandTotalText: {
    fontWeight: '800',
    fontSize: 14,
    color: '#171717',
  },
});

export default ReceiptTotals;
