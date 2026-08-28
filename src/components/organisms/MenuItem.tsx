import React, { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import QuantitySelector from '../molecules/QuantitySelector';
import DefaultFoodImage from '../atoms/DefaultFoodImage';

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
  const [imageError, setImageError] = useState(false);

  return (
    <View style={[
      styles.container,
      quantity > 0 && styles.containerActive,
    ]}>

      {/* IMAGE */}
      {image && !imageError ? (
        <Image
          source={{ uri: image }}
          style={styles.image}
          onError={() => setImageError(true)}
        />
      ) : (
        <DefaultFoodImage width={58} height={58} borderRadius={8} />
      )}

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

          <QuantitySelector
            quantity={quantity}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />

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
    borderColor: '#E29595',
    backgroundColor: '#FFFFFF',
  },

  image: {
    width: 58,
    height: 58,
    borderRadius: 8,
    backgroundColor: '#EEEEEE',
  },

  content: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#171717',
  },

  price: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#777777',
  },

  action: {
    marginLeft: 10,
  },

  addButton: {
    height: 38,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E29595',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  addText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B1D1D',
  },

});

export default MenuItem;