import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from '../atoms/Icon';
import QuantitySelector from './QuantitySelector';

import DefaultFoodImage from '../atoms/DefaultFoodImage';

interface OrderSummaryItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
    note: string;
    optionsText?: string;
  };
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onEdit: (item: any) => void;
}

const OrderSummaryItem = ({
  item,
  onIncrease,
  onDecrease,
  onEdit,
}: OrderSummaryItemProps) => {
  return (
    <View style={styles.itemCard}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.itemImage} />
      ) : (
        <DefaultFoodImage width={55} height={55} borderRadius={8} />
      )}

      <View style={styles.itemDetails}>
        <View style={styles.itemHeaderRow}>
          <Text style={styles.itemName} numberOfLines={2}>
            {item.name}
          </Text>

          <Pressable onPress={() => onEdit(item)}>
            <Text style={styles.edit}>Edit</Text>
          </Pressable>
        </View>

        {item.optionsText ? (
          <Text style={styles.optionsText}>{item.optionsText}</Text>
        ) : null}

        <View style={styles.noteRow}>
          <Icon name="document-text-outline" size={14} color="#A0A0A0" />
          <Text style={styles.note} numberOfLines={1}>
            {item.note || 'No additional notes'}
          </Text>
        </View>

        <View style={styles.itemBottom}>
          <Text style={styles.price}>$ {item.price.toFixed(2)}</Text>

          <QuantitySelector
            quantity={item.quantity}
            onIncrease={() => onIncrease(item.id)}
            onDecrease={() => onDecrease(item.id)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemCard: {
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 12,
    flexDirection: 'row',
  },

  itemImage: {
    width: 55,
    height: 55,
    borderRadius: 8,
    backgroundColor: '#EEEEEE',
  },

  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },

  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  itemName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#171717',
    marginRight: 10,
  },

  edit: {
    fontSize: 13,
    color: '#2563EB',
  },

  optionsText: {
    fontSize: 12,
    color: '#A0A0A0',
    marginTop: 4,
    lineHeight: 16,
  },

  noteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 4,
  },

  note: {
    flex: 1,
    fontSize: 12,
    color: '#A0A0A0',
    marginLeft: 4,
  },

  itemBottom: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  price: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222222',
  },
});

export default OrderSummaryItem;
