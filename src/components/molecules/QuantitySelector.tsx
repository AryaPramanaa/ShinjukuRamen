import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  size?: 'small' | 'medium';
}

const QuantitySelector = ({
  quantity,
  onIncrease,
  onDecrease,
  size = 'small',
}: QuantitySelectorProps) => {
  const isSmall = size === 'small';

  return (
    <View style={styles.quantityContainer}>
      <Pressable
        style={[styles.quantityButton, !isSmall && styles.quantityButtonMedium]}
        onPress={onDecrease}
      >
        <Text style={[styles.quantityText, !isSmall && styles.quantityTextMedium]}>
          −
        </Text>
      </Pressable>

      <Text style={[styles.quantity, !isSmall && styles.quantityMedium]}>
        {quantity}
      </Text>

      <Pressable
        style={[styles.quantityButton, !isSmall && styles.quantityButtonMedium]}
        onPress={onIncrease}
      >
        <Text style={[styles.quantityText, !isSmall && styles.quantityTextMedium]}>
          +
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  quantityButton: {
    width: 26,
    height: 26,
    borderWidth: 1,
    borderColor: '#E5B4B4',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  quantityButtonMedium: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },

  quantityText: {
    fontSize: 16,
    color: '#B01818',
    fontWeight: '300',
  },

  quantityTextMedium: {
    fontSize: 20,
    lineHeight: 22,
  },

  quantity: {
    minWidth: 18,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#222222',
  },

  quantityMedium: {
    fontSize: 16,
  },
});

export default QuantitySelector;
