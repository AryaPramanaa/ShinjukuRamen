import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import CartItem from '../molecules/CartItem';

interface CartModalProps {
  visible: boolean;
  cart: any[];
  totalPrice: number;
  onClose: () => void;
  onEditItem: (item: any) => void;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onCheckout: () => void;
}

const CartModal = ({
  visible,
  cart,
  totalPrice,
  onClose,
  onEditItem,
  onIncrease,
  onDecrease,
  onCheckout,
}: CartModalProps) => {

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.overlay}>

      <Pressable
        style={styles.backdrop}
        onPress={onClose}
      />

      <View style={styles.modal}>
        <View style={styles.header}>
          <Text style={styles.title}>
            My Cart
          </Text>
          <Pressable onPress={onClose}>
            <Text style={styles.close}>
              ×
            </Text>
          </Pressable>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.list}
        >

          {cart.map(item => (
            <CartItem
              key={item.id}
              item={item}

              onEdit={() =>
                onEditItem(item)
              }

              onIncrease={() =>
                onIncrease(item.id)
              }

              onDecrease={() =>
                onDecrease(item.id)
              }
            />
          ))}

        </ScrollView>

        <View style={styles.footer}>

          <View style={styles.cartIconBox}>
            <Text style={styles.cartIcon}>
              🛒
            </Text>
          </View>

          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>
              Total
            </Text>

            <Text style={styles.totalPrice}>
              $ {totalPrice.toFixed(2)}
            </Text>
          </View>

          <Pressable
            style={[styles.checkoutButton, totalPrice === 0 && styles.checkoutButtonDisabled]}
            onPress={onCheckout}
            disabled={totalPrice === 0}
          >
            <Text style={styles.checkoutText}>
              Check Out
            </Text>
          </Pressable>

        </View>

      </View>

    </View >
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 200,
    justifyContent: 'flex-end',
  },

  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },

  modal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    paddingTop: 15,
  },

  header: {
    height: 45,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222222',
  },

  close: {
    fontSize: 28,
    fontWeight: '300',
    color: '#666666',
  },

  list: {
    paddingTop: 5,
    paddingHorizontal : 5
  },

  footer: {
    marginHorizontal: 25,
    marginTop: 5,
    marginBottom: 20,
    height: 52,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#B91C1C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  cartIconBox: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cartIcon: {
    fontSize: 22,
  },

  totalContainer: {
    flex: 1,
    marginLeft: 5,
  },

  totalLabel: {
    color: '#FFFFFF',
    fontSize: 13,
  },

  totalPrice: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },

  checkoutButton: {
    height: 34,
    paddingHorizontal: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FFFFFF55',
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkoutButtonDisabled: {
    opacity: 0.5,
  },

  checkoutText: {
    color: '#FFFFFF',
    fontSize: 13,
  },
});
export default CartModal;