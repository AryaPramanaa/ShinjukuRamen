import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MenuItem from '../molecules/MenuItem';

interface MenuListProps {
  title: string;
  subtitle: string | null;
  menus: any[];

  onAddItem: (item: any) => void;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  getQuantity: (id: number) => number;
}

const MenuList = ({
  title,
  subtitle,
  menus,
  onAddItem,
  onIncrease,
  onDecrease,
  getQuantity,
}: MenuListProps) => {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        {title}
      </Text>

      {subtitle && (
        <Text style={styles.subtitle}>
          {subtitle}
        </Text>
      )}

      {menus.map(item => {
        const quantity = getQuantity(item.id);

        return (
          <MenuItem
            key={item.id}
            image={item.image}
            name={item.name}
            price={item.price}
            quantity={quantity}
            onAdd={() => onAddItem(item)}
            onIncrease={() => onIncrease(item.id)}
            onDecrease={() => onDecrease(item.id)}
          />
        );
      })}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },

  title: {
    marginHorizontal: 30,
    fontSize: 17,
    color: '#B6A09A',
  },

  subtitle: {
    marginTop: 5,
    marginHorizontal: 30,
    marginBottom: 15,
    fontSize: 20,
    fontWeight: '600',
    color: '#171717',
  },
});

export default MenuList;