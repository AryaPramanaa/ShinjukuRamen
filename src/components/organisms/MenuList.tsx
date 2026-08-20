import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MenuItem from './MenuItem';

interface MenuItemData {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface MenuListProps {
  title: string;
  subtitle?: string | null;
  menus: MenuItemData[];
}

const MenuList = ({
  title,
  subtitle,
  menus,
}: MenuListProps) => {
  return (
    <View>
      <Text style={styles.sectionTitle}>
        {title}
      </Text>

      {subtitle && (
        <Text style={styles.sectionSubtitle}>
          {subtitle}
        </Text>
      )}

      {menus.map(item => (
        <MenuItem
          key={item.id}
          image={item.image}
          name={item.name}
          price={item.price}
          onAdd={() => {
            console.log('Add:', item.name);
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    marginTop: 25,
    marginHorizontal: 30,
    fontSize: 17,
    color: '#B6A09A',
  },

  sectionSubtitle: {
    marginTop: 5,
    marginHorizontal: 30,
    marginBottom: 15,
    fontSize: 20,
    fontWeight: '600',
    color: '#171717',
  },
});

export default MenuList;