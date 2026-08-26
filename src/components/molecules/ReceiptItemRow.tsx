import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from '../atoms/Icon';

interface ReceiptItemRowProps {
  item: {
    id: number;
    name: string;
    quantity: number;
    price: number;
    optionsText?: string;
    note?: string;
  };
  isThermalFormat?: boolean;
}

const ReceiptItemRow = ({ item, isThermalFormat = false }: ReceiptItemRowProps) => {
  return (
    <View style={styles.itemRow}>
      <View style={styles.itemLeft}>
        <Text style={styles.itemQty}>{item.quantity}x</Text>
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          
          {item.optionsText ? (
            <View style={styles.noteRow}>
              {!isThermalFormat && <Icon name="document-text-outline" size={12} color="#A0A0A0" />}
              <Text style={styles.optionsText}>
                {isThermalFormat ? `Note: ${item.optionsText}` : item.optionsText}
              </Text>
            </View>
          ) : null}

          {item.note ? (
            <View style={styles.noteRow}>
              {!isThermalFormat && <Icon name="document-text-outline" size={12} color="#A0A0A0" />}
              <Text style={styles.optionsText}>{item.note}</Text>
            </View>
          ) : null}

          {isThermalFormat && item.name.includes('Spicy') && (
            <View style={styles.nestedOptionsContainer}>
              <Text style={styles.nestedOptionText}>1 Regular Noodles</Text>
              <Text style={styles.nestedOptionText}>1 Extra Rich</Text>
              <Text style={styles.nestedOptionText}>1 Corn</Text>
              <Text style={styles.nestedOptionText}>1 Menma</Text>
              <Text style={styles.nestedOptionText}>1 Spring Onion</Text>
            </View>
          )}
        </View>
      </View>
      <Text style={styles.itemPrice}>
        $ {(item.price * item.quantity).toFixed(2)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    width: '100%',
  },

  itemLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    marginRight: 10,
  },

  itemQty: {
    fontSize: 13,
    fontWeight: '700',
    color: '#171717',
    marginRight: 8,
  },

  itemDetails: {
    flex: 1,
  },

  itemName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 4,
  },

  noteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },

  optionsText: {
    fontSize: 11,
    color: '#888888',
  },

  nestedOptionsContainer: {
    marginTop: 4,
    paddingLeft: 8,
  },

  nestedOptionText: {
    fontSize: 11,
    color: '#666666',
    marginBottom: 2,
  },

  itemPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: '#171717',
  },
});

export default ReceiptItemRow;
