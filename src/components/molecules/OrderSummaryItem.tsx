import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from '../atoms/Icon';
import QuantitySelector from './QuantitySelector';
import DefaultFoodImage from '../atoms/DefaultFoodImage';

interface OrderSummaryItemProps {
  item: {
    cartItemId?: string;
    id: number | string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    note: string;
    optionsText?: string;
  };
  onIncrease: (cartItemIdOrId: any) => void;
  onDecrease: (cartItemIdOrId: any) => void;
  onEdit: (item: any) => void;
}

const OrderSummaryItem = ({
  item,
  onIncrease,
  onDecrease,
  onEdit,
}: OrderSummaryItemProps) => {
  const [imageError, setImageError] = useState(false);
  const targetId = item.cartItemId || item.id;

  return (
    <View style={styles.itemCard}>
      {item.image && !imageError ? (
        <Image
          source={{ uri: item.image }}
          style={styles.itemImage}
          onError={() => setImageError(true)}
        />
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
            onIncrease={() => onIncrease(targetId)}
            onDecrease={() => onDecrease(targetId)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemCard: {
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
    marginRight: 8,
  },

  edit: {
    fontSize: 13,
    color: '#991B1B',
    fontWeight: '500',
  },

  optionsText: {
    marginTop: 2,
    fontSize: 12,
    color: '#6B7280',
  },

  noteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 8,
    gap: 4,
  },

  note: {
    fontSize: 12,
    color: '#A0A0A0',
    flex: 1,
  },

  itemBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },

  price: {
    fontSize: 15,
    fontWeight: '600',
    color: '#171717',
  },
});

export default OrderSummaryItem;
