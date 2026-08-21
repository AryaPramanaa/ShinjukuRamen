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
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
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

          <Pressable style={styles.addButton}>
            <Text style={styles.addButtonText}>
              ＋ Add
            </Text>
          </Pressable>
        </View>

        {/* CART ITEMS */}
        {cart.map(item => (
          <OrderSummaryItem
            key={item.id}
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

      {/* PAYMENT */}
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
  },

  itemsHeader: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#171717',
  },

  addButton: {
    borderWidth: 1,
    borderColor: '#E5B4B4',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: '#FFFFFF',
  },

  addButtonText: {
    color: '#8B1D1D',
    fontSize: 13,
    fontWeight: '500',
  },

  noteLabel: {
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
    fontSize: 15,
    fontWeight: '500',
    color: '#666666',
  },

  noteInput: {
    marginHorizontal: 20,
    minHeight: 80,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: '#333333',
    textAlignVertical: 'top',
    backgroundColor: '#FFFFFF',
  },

  paymentBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    minHeight: 76,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  totalLabel: {
    fontSize: 13,
    color: '#A0A0A0',
  },

  totalPrice: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: '700',
    color: '#171717',
  },

  paymentButton: {
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },

  paymentButtonActive: {
    backgroundColor: '#8B1D1D',
  },

  paymentButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },

  paymentText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default OrderSummary;