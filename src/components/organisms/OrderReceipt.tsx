import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ReceiptDetailGrid from '../molecules/ReceiptDetailGrid';
import ReceiptItemRow from '../molecules/ReceiptItemRow';
import ReceiptTotals from '../molecules/ReceiptTotals';
import ReceiptPoints from '../molecules/ReceiptPoints';

interface OrderReceiptProps {
  cart: any[];
  totalPrice: number;
  customerInfo: {
    name: string;
    phone: string;
    email: string;
    dob: string;
    pax: string;
  } | null;
  paymentMethod: string;
  paymentProvider: string | null;
  onNewOrder: () => void;
  onDownloadReceipt: () => void;
  onSendEmail: () => void;

  // Cashier customization props
  isPendingCashier?: boolean;
  cashPaid?: number | null;
  change?: number | null;
  currentPoints?: number;
  redeemedPoints?: number;
  rewardPoints?: number;
  finalPoints?: number;
  showFinalTotal?: boolean;
  congratsPoints?: number;
  onConfirmCashierPayment?: () => void;
}

const OrderReceipt = ({
  cart,
  totalPrice,
  customerInfo,
  paymentMethod,
  paymentProvider,
  onNewOrder,
  onDownloadReceipt,
  onSendEmail,

  isPendingCashier = false,
  cashPaid = null,
  change = null,
  currentPoints,
  redeemedPoints,
  rewardPoints,
  finalPoints,
  showFinalTotal = true,
  congratsPoints,
  onConfirmCashierPayment,
}: OrderReceiptProps) => {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Formatting current date and time
  const getFormattedDateTime = (offsetMinutes = 0) => {
    const d = new Date();
    if (offsetMinutes) {
      d.setMinutes(d.getMinutes() + offsetMinutes);
    }
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}, ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  };

  const orderId = `ORD${String(new Date().getTime()).slice(-10)}SR`;
  const orderDate = getFormattedDateTime(-2);
  const paymentDate = getFormattedDateTime(0);

  const displayName = customerInfo ? customerInfo.name : 'Amal';
  const displayPax = customerInfo && customerInfo.pax ? customerInfo.pax : '2';

  const providerLabel = paymentMethod === 'cashier' ? 'Cashier' : (paymentProvider === 'stripe' ? 'Stripe' : paymentProvider === 'eftpos' ? 'EFTPOS' : paymentProvider === 'gpay' ? 'Google Pay' : 'Apple Pay');

  return (
    <View style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Order Summary</Text>
        
        {/* Floating action for simulation payment counter */}
        {isPendingCashier && onConfirmCashierPayment && (
          <Pressable onPress={onConfirmCashierPayment} style={styles.demoPayButton}>
            <Text style={styles.demoPayButtonText}>⚡ Cashier Pay</Text>
          </Pressable>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        
        {/* Banner Conditional Display */}
        {isPendingCashier ? (
          <View style={styles.pendingBanner}>
            <Text style={styles.pendingTitle}>Waiting Payment...</Text>
            <Text style={styles.pendingSubtitle}>
              Please complete your payment at the cashier to process your order.
            </Text>
          </View>
        ) : (
          <View style={styles.successBanner}>
            <Text style={styles.successTitle}>Payment Successfull!</Text>
            <Text style={styles.successSubtitle}>
              Your order has been received. Please wait while we prepare your food.
            </Text>
          </View>
        )}

        {/* Table Number */}
        <Text style={styles.tableTitle}>Table - A2</Text>

        {/* Receipt Grid Molecule */}
        <ReceiptDetailGrid
          date={orderDate}
          orderId={orderId}
          customerName={displayName}
          pax={displayPax}
          paymentMethodLabel={paymentMethod === 'cashier' ? 'Cash' : providerLabel}
          paymentTime={paymentDate}
          isPendingCashier={isPendingCashier}
        />

        {/* Ordered Items */}
        <View style={styles.itemsSection}>
          <Text style={styles.sectionTitle}>Ordered Items</Text>
          
          {cart.map((item) => (
            <ReceiptItemRow
              key={item.id}
              item={item}
            />
          ))}

          {/* Cart note card */}
          {cart.some(item => item.note) && (
            <View style={styles.noteCard}>
              <Text style={styles.noteCardLabel}>Note</Text>
              <Text style={styles.noteCardText}>Please be hurry...</Text>
            </View>
          )}
        </View>

        {/* Separator */}
        <View style={styles.dashedSeparator} />

        {/* Totals Molecule */}
        <ReceiptTotals
          totalPrice={totalPrice}
          totalQuantity={totalQuantity}
          paymentMethodLabel={paymentMethod === 'cashier' ? 'Cash' : providerLabel}
          isPendingCashier={isPendingCashier}
          cashPaid={cashPaid}
          change={change}
        />

        {/* Separator */}
        <View style={styles.dashedSeparator} />

        {/* Points Section Molecule */}
        {customerInfo && (
          <ReceiptPoints
            currentPoints={currentPoints}
            redeemedPoints={redeemedPoints}
            rewardPoints={rewardPoints}
            finalPoints={finalPoints}
            showFinalTotal={showFinalTotal}
            congratsPoints={congratsPoints}
          />
        )}

        {/* Separator */}
        {customerInfo && <View style={styles.dashedSeparator} />}

        {/* Actions Grid (Hidden during pending state) */}
        {!isPendingCashier && (
          <View style={styles.actionsContainer}>
            <View style={styles.btnRow}>
              <Pressable onPress={onDownloadReceipt} style={styles.btnDownload}>
                <Text style={styles.btnDownloadText}>Download Receipt</Text>
              </Pressable>

              <Pressable onPress={onNewOrder} style={styles.btnNewOrder}>
                <Text style={styles.btnNewOrderText}>New Order</Text>
              </Pressable>
            </View>

            <Pressable disabled={true} style={[styles.btnEmail, styles.btnEmailDisabled]}>
              <Text style={[styles.btnEmailText, styles.btnEmailTextDisabled]}>Send Receipt To Email</Text>
            </Pressable>
          </View>
        )}

      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    paddingTop: 45,
    height: 87,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    position: 'relative',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#171717',
  },

  demoPayButton: {
    position: 'absolute',
    right: 20,
    top: 45,
    backgroundColor: '#3B82F6',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  demoPayButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },

  successBanner: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#DCFCE7',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },

  successTitle: {
    color: '#15803D',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },

  successSubtitle: {
    color: '#166534',
    fontSize: 12,
    lineHeight: 16,
  },

  pendingBanner: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#DBEAFE',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },

  pendingTitle: {
    color: '#1E40AF',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },

  pendingSubtitle: {
    color: '#1E3A8A',
    fontSize: 12,
    lineHeight: 16,
  },

  tableTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#171717',
    textAlign: 'center',
    marginBottom: 16,
  },

  itemsSection: {
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 12,
  },

  noteCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    marginTop: 8,
  },

  noteCardLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#666666',
    marginBottom: 2,
  },

  noteCardText: {
    fontSize: 12,
    color: '#444444',
  },

  dashedSeparator: {
    borderStyle: 'dashed',
    borderBottomWidth: 1.5,
    borderColor: '#E5E5E5',
    marginVertical: 16,
  },

  actionsContainer: {
    marginTop: 24,
    gap: 12,
  },

  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  btnDownload: {
    width: '48%',
    height: 44,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#8B1D1D',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  btnDownloadText: {
    color: '#8B1D1D',
    fontSize: 13,
    fontWeight: '700',
  },

  btnNewOrder: {
    width: '48%',
    height: 44,
    borderRadius: 8,
    backgroundColor: '#8B1D1D',
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnNewOrderText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  btnEmail: {
    width: '100%',
    height: 44,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  btnEmailText: {
    color: '#171717',
    fontSize: 13,
    fontWeight: '600',
  },

  btnEmailDisabled: {
    borderColor: '#E5E5E5',
    backgroundColor: '#FAFAFA',
  },

  btnEmailTextDisabled: {
    color: '#CCCCCC',
  },
});

export default OrderReceipt;
