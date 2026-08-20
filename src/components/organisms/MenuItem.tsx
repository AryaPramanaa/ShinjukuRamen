import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icons from '../atoms/Icons';

interface MenuItemProps {
  image: string;
  name: string;
  price: number;
  onAdd?: () => void;
}

const MenuItem = ({
  image,
  name,
  price,
  onAdd,
}: MenuItemProps) => {
  return (
    <View style={styles.container}>

      {/* IMAGE */}
      <Image
        source={{ uri: image }}
        style={styles.image}
      />

      {/* INFO */}
      <View style={styles.info}>

        <Text
          style={styles.name}
          numberOfLines={2}
        >
          {name}
        </Text>

        <Text style={styles.price}>
          $ {price.toFixed(2)}
        </Text>

      </View>

      {/* ADD BUTTON */}
      <Pressable
        onPress={onAdd}
        style={styles.addButton}
      >
        <Icons
          name="add"
          size={20}
          color="#B91C1C"
        />

        <Text style={styles.addText}>
          Add
        </Text>
      </Pressable>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 118,

    flexDirection: 'row',
    alignItems: 'center',

    padding: 14,

    marginBottom: 14,

    backgroundColor: '#FFFFFF',

    borderWidth: 1,
    borderColor: '#E5E7EB',

    borderRadius: 12,
  },

  image: {
    width: 80,
    height: 80,

    borderRadius: 9,

    backgroundColor: '#F3F4F6',
  },

  info: {
    flex: 1,

    marginLeft: 14,

    alignSelf: 'stretch',

    justifyContent: 'space-between',

    paddingVertical: 4,

    paddingRight: 8,
  },

  name: {
    fontSize: 17,

    fontWeight: '600',

    color: '#171717',

    lineHeight: 22,
  },

  price: {
    fontSize: 16,

    color: '#262626',

    fontWeight: '500',
  },

  addButton: {
    minWidth: 90,
    height: 40,

    paddingHorizontal: 10,

    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#E5A3A3',

    borderRadius: 8,

    backgroundColor: '#FFFFFF',
  },

  addText: {
    marginLeft: 5,

    color: '#B91C1C',

    fontSize: 16,

    fontWeight: '600',
  },
});

export default MenuItem;