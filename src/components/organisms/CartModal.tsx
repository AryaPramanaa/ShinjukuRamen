import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CartItem from '../molecules/CartItem';
import Icon from '../atoms/Icon';

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

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

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
              onEdit={() => onEditItem(item)}
              onIncrease={() => onIncrease(item.id)}
              onDecrease={() => onDecrease(item.id)}
            />
          ))}
        </ScrollView>

        {/* Footer Checkout Bar */}
        <View style={styles.footer}>
          
          <View style={styles.cartButton}>
            <View style={styles.cartIconWrapper}>
              <Icon name="cart" size={20} color="#8B1D1D" />
            </View>

            {totalQuantity > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {totalQuantity}
                </Text>
              </View>
            )}
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
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#171717',
  },

  close: {
    fontSize: 26,
    color: '#999999',
    fontWeight: '300',
  },

  list: {
    paddingHorizontal: 25,
    paddingVertical: 10,
  },

  footer: {
    marginHorizontal: 25,
    marginTop: 5,
    marginBottom: 20,
    height: 52,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#8B1D1D', // Brand crimson
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  cartButton: {
    position: 'relative',
    marginRight: 6,
  },

  cartIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  badge: {
    position: 'absolute',
    right: -6,
    top: -6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#84CC16', // Lime green
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },

  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },

  totalContainer: {
    flex: 1,
    marginLeft: 8,
  },

  totalLabel: {
    color: '#FFFFFF',
    fontSize: 12,
  },

  totalPrice: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 2,
  },

  checkoutButton: {
    height: 34,
    paddingHorizontal: 16,
    borderRadius: 6,
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
    fontWeight: '700',
  },
});

export default CartModal;