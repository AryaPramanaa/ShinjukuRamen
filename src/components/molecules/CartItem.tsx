import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface CartItemProps {
  item: {
    id: number;
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
  return (
    <View style={styles.container}>

      <Image
        source={{uri: item.image}}
        style={styles.image}
      />

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

        <View style={styles.noteRow}>
          <Text style={styles.noteIcon}>
            ▧
          </Text>

          <Text style={styles.note}>
            {item.note || 'No additional notes'}
          </Text>
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.price}>
            $ {item.price.toFixed(2)}
          </Text>

          <View style={styles.quantityContainer}>

            <Pressable
              style={styles.quantityButton}
              onPress={onDecrease}
            >
              <Text style={styles.quantityButtonText}>
                −
              </Text>
            </Pressable>

            <Text style={styles.quantity}>
              {item.quantity}
            </Text>

            <Pressable
              style={styles.quantityButton}
              onPress={onIncrease}
            >
              <Text style={styles.quantityButtonText}>
                +
              </Text>
            </Pressable>

          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 105,
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    flexDirection: 'row',
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 6,
  },

  info: {
    flex: 1,
    marginLeft: 10,
  },

  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  name: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
    marginRight: 8,
  },

  edit: {
    fontSize: 13,
    color: '#2563EB',
  },

  noteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },

  noteIcon: {
    fontSize: 13,
    color: '#B0B0B0',
  },

  note: {
    marginLeft: 4,
    fontSize: 11,
    color: '#B0B0B0',
  },

  bottomRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  price: {
    fontSize: 13,
    color: '#333',
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  quantityButton: {
    width: 28,
    height: 28,
    borderWidth: 1,
    borderColor: '#F0B4B4',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },

  quantityButtonText: {
    fontSize: 18,
    color: '#B91C1C',
  },

  quantity: {
    width: 35,
    textAlign: 'center',
    fontSize: 14,
    color: '#222',
  },
});

export default CartItem;