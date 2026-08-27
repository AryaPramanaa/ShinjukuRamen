import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from '../atoms/Icon';

interface CartBarProps {
  totalQuantity: number;
  totalPrice: number;
  onCartPress: () => void;
  onCheckout: () => void;
}

const CartBar = ({
  totalQuantity,
  totalPrice,
  onCartPress,
  onCheckout,
}: CartBarProps) => {
  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.cartButton}
        onPress={onCartPress}
        activeOpacity={0.7}
      >
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
      </TouchableOpacity>

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>
          Total
        </Text>
        <Text style={styles.totalPrice}>
          $ {totalPrice.toFixed(2)}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.checkoutButton, totalPrice === 0 && styles.checkoutButtonDisabled]}
        onPress={onCheckout}
        disabled={totalPrice === 0}
      >
        <Text style={styles.checkoutText}>
          Check Out
        </Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 25,
    right: 25,
    bottom: 20,
    height: 52,
    borderRadius: 8,
    backgroundColor: '#8B1D1D', // Brand crimson
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    zIndex: 999,
    elevation: 10,
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

  checkoutContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkoutBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#84CC16', // Lime green
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },

  checkoutBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
});

export default CartBar;