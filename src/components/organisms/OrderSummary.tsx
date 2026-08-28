import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Icon from '../atoms/Icon';
import OrderInfo from '../molecules/OrderInfo';
import OrderSummaryItem from '../molecules/OrderSummaryItem';

interface OrderSummaryProps {
  cart: any[];
  totalPrice: number;

  onBack: () => void;
  onIncrease: (cartItemIdOrId: any) => void;
  onDecrease: (cartItemIdOrId: any) => void;
  onEditItem: (item: any) => void;
  onContinuePayment: () => void;
}

const OrderSummary = ({
  cart,
  totalPrice,
  onBack,
  onIncrease,
  onDecrease,
  onEditItem,
  onContinuePayment,
}: OrderSummaryProps) => {
  const totalQuantity = cart.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#777777" />
        </Pressable>

        <Text style={styles.headerTitle}>
          Order Summary
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* ORDER INFO */}
        <OrderInfo orderType="Dine In" tableNumber="A2" />

        {/* ORDERED ITEMS */}
        <View style={styles.itemsHeader}>
          <Text style={styles.sectionTitle}>
            Ordered Items ({totalQuantity})
          </Text>

          <Pressable style={styles.addButton} onPress={onBack}>
            <Text style={styles.addButtonText}>
              ＋ Add
            </Text>
          </Pressable>
        </View>

        {/* CART ITEMS */}
        {cart.map((item, index) => (
          <OrderSummaryItem
            key={item.cartItemId || item.uniqueCartKey || `${item.id}-${index}`}
            item={item}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onEdit={onEditItem}
          />
        ))}

        {/* NOTE */}
        <Text style={styles.noteLabel}>
          Note (Optional)
        </Text>

        <TextInput
          placeholder="Add note..."
          placeholderTextColor="#CCCCCC"
          style={styles.noteInput}
          multiline
        />

      </ScrollView>

      {/* PAYMENT BAR */}
      <View style={styles.paymentBar}>

        <View>
          <Text style={styles.totalLabel}>
            Total Payment
          </Text>

          <Text style={styles.totalPrice}>
            $ {totalPrice.toFixed(2)}
          </Text>
        </View>

        <Pressable
          style={[
            styles.paymentButton,
            totalPrice === 0 ? styles.paymentButtonDisabled : styles.paymentButtonActive,
          ]}
          onPress={onContinuePayment}
          disabled={totalPrice === 0}
        >
          <Text style={styles.paymentText}>
            Continue Payment
          </Text>
        </Pressable>

      </View>

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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },

  backButton: {
    marginRight: 15,
    padding: 4,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#171717',
  },

  content: {
    paddingBottom: 110,
    paddingHorizontal: 20,
  },

  itemsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#171717',
  },

  addButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#991B1B',
  },

  addButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#991B1B',
  },

  noteLabel: {
    marginTop: 20,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
  },

  noteInput: {
    minHeight: 70,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 12,
    textAlignVertical: 'top',
    fontSize: 14,
    color: '#111827',
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },

  paymentBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  totalLabel: {
    fontSize: 12,
    color: '#777777',
  },

  totalPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#991B1B',
  },

  paymentButton: {
    paddingHorizontal: 24,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  paymentButtonActive: {
    backgroundColor: '#991B1B',
  },

  paymentButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },

  paymentText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default OrderSummary;