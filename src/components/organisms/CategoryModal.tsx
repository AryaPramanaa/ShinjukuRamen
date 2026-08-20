import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icons from '../atoms/Icons';

interface CategoryModalProps {
  visible: boolean;
  activeCategory: string;
  onClose: () => void;
  onSelectCategory: (category: string) => void;
}

const CategoryModal = ({
  visible,
  activeCategory,
  onClose,
  onSelectCategory,
}: CategoryModalProps) => {

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.overlay}>

      <Pressable
        style={styles.backdrop}
        onPress={onClose}
      />

      <View style={styles.modal}>

        <View style={styles.header}>
          <Text style={styles.title}>
            List Category
          </Text>

          <Pressable
            style={styles.closeButton}
            onPress={onClose}
          >
            <Icons
              name="close"
              size={25}
              color="#666666"
            />
          </Pressable>
        </View>

        <Pressable
          style={styles.item}
          onPress={() =>
            onSelectCategory('Ramen')
          }
        >
          <Text
            style={[
              styles.text,
              activeCategory === 'Ramen' &&
                styles.activeText,
            ]}>
            Ramen (6)
          </Text>
        </Pressable>

        <Pressable
          style={styles.item}
          onPress={() =>
            onSelectCategory('Sides')
          }>
          <Text
            style={[
              styles.text,
              activeCategory === 'Sides' &&
                styles.activeText,
            ]}>
            Sides (4)
          </Text>
        </Pressable>

        <Pressable
          style={styles.item}
          onPress={() =>
            onSelectCategory('Drink')
          }>
          <Text
            style={[
              styles.text,
              activeCategory === 'Drink' &&
                styles.activeText,
            ]}>
            Drinks (4)
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.item,
            styles.lastItem,
          ]}
          onPress={() =>
            onSelectCategory('Promo')
          }>
          <Text
            style={[
              styles.text,
              activeCategory === 'Promo' &&
                styles.activeText,
            ]}>
            Promo (4)
          </Text>
        </Pressable>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    elevation: 100,
    justifyContent: 'flex-end',
  },

  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },

  modal: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  header: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#171717',
  },

  closeButton: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },

  item: {
    height: 68,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  lastItem: {
    borderBottomWidth: 0,
  },

  text: {
    fontSize: 17,
    color: '#333333',
  },

  activeText: {
    color: '#B91C1C',
  },
});

export default CategoryModal;