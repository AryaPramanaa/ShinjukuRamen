import React, { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import QuantitySelector from './QuantitySelector';
import DefaultFoodImage from '../atoms/DefaultFoodImage';

interface CartItemProps {
  item: {
    id: number | string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    note: string;
  };

  onEdit: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
}

const CartItem = ({
  item,
  onEdit,
  onIncrease,
  onDecrease,
}: CartItemProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <View style={styles.container}>

      {item.image && !imageError ? (
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          onError={() => setImageError(true)}
        />
      ) : (
        <DefaultFoodImage width={50} height={50} borderRadius={6} />
      )}

      <View style={styles.info}>

        <View style={styles.nameRow}>
          <Text
            style={styles.name}
            numberOfLines={1}
          >
            {item.name}
          </Text>

          <Pressable onPress={onEdit}>
            <Text style={styles.edit}>
              Edit
            </Text>
          </Pressable>
        </View>

        <Text style={styles.price}>
          $ {item.price.toFixed(2)}
        </Text>

        <View style={styles.bottomRow}>

          <Text
            style={styles.note}
            numberOfLines={1}
          >
            {item.note || 'No notes'}
          </Text>

          <QuantitySelector
            quantity={item.quantity}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />

        </View>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 6,
    backgroundColor: '#EEEEEE',
  },

  info: {
    flex: 1,
    marginLeft: 12,
  },

  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#171717',
    flex: 1,
    marginRight: 8,
  },

  edit: {
    fontSize: 13,
    color: '#8B1D1D',
    fontWeight: '500',
  },

  price: {
    fontSize: 14,
    fontWeight: '500',
    color: '#777777',
    marginTop: 2,
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },

  note: {
    fontSize: 12,
    color: '#AAAAAA',
    flex: 1,
    marginRight: 8,
  },
});

export default CartItem;