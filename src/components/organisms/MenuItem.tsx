import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface MenuItemProps {
  image: string;
  name: string;
  price: number;
  quantity: number;

  onAdd: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
}

const MenuItem = ({
  image,
  name,
  price,
  quantity,

  onAdd,
  onIncrease,
  onDecrease,

}: MenuItemProps) => {

  return (
    <View style={[
      styles.container,
      quantity > 0 && styles.containerActive,
    ]}>

      {/* IMAGE */}
      <Image
        source={{ uri: image }}
        style={styles.image}
      />

      {/* CONTENT */}
      <View style={styles.content}>

        <Text
          style={styles.name}
          numberOfLines={1}
        >
          {name}
        </Text>

        <Text style={styles.price}>
          $ {price.toFixed(2)}
        </Text>

      </View>

      {/* BUTTON */}
      <View style={styles.action}>

        {quantity === 0 ? (

          <Pressable
            style={styles.addButton}
            onPress={onAdd}
          >

            <Text style={styles.addText}>
              + Add
            </Text>

          </Pressable>

        ) : (

          <View style={styles.quantityContainer}>

            <Pressable
              style={styles.quantityButton}
              onPress={onDecrease}
            >
              <Text style={styles.minusText}>
                −
              </Text>
            </Pressable>

            <Text style={styles.quantityText}>
              {quantity}
            </Text>

            <Pressable
              style={styles.quantityButton}
              onPress={onIncrease}
            >
              <Text style={styles.plusText}>
                +
              </Text>
            </Pressable>

          </View>

        )}

      </View>

    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    minHeight: 82,
    marginHorizontal: 25,
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  containerActive: {
    borderColor: '#e69d9d',
  },

  image: {
    width: 58,
    height: 58,
    borderRadius: 8,
  },

  content: {
    flex: 1,
    marginLeft: 10,
    marginRight: 8,
  },

  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#171717',
  },

  price: {
    marginTop: 12,
    fontSize: 13,
    color: '#333333',
  },

  action: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  addButton: {
    minWidth: 70,
    height: 32,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#E5A5A5',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },

  addText: {
    fontSize: 13,
    color: '#B91C1C',
    fontWeight: '500',
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  quantityButton: {
    width: 28,
    height: 28,
    borderWidth: 1,
    borderColor: '#E5A5A5',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },

  minusText: {
    fontSize: 18,
    color: '#B91C1C',
  },

  plusText: {
    fontSize: 18,
    color: '#B91C1C',
  },

  quantityText: {
    minWidth: 30,
    textAlign: 'center',
    fontSize: 14,
    color: '#333333',
  },

});

export default MenuItem;