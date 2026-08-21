import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import Icon from '../atoms/Icon';

interface CategoryNavigationProps {
  activeCategory: string;
  activeRamenCategory: string | null;
  ramenCategories: string[];
  onOpenCategory: () => void;
  onSelectRamenCategory: (category: string) => void;
}

const CategoryNavigation = ({
  activeCategory,
  activeRamenCategory,
  ramenCategories,
  onOpenCategory,
  onSelectRamenCategory,
}: CategoryNavigationProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.container}
    >

      {/* MAIN CATEGORY */}
      <Pressable
        style={styles.categoryMenuButton}
        onPress={onOpenCategory}
      >
        <Icon
          name="menu-outline"
          size={20}
          color="#B91C1C"
        />

        <Text style={styles.categoryMenuText}>
          {activeCategory === 'Drink'
            ? 'Drinks'
            : activeCategory}
        </Text>
      </Pressable>

      {/* RAMEN CATEGORY */}
      {activeCategory === 'Ramen' &&
        ramenCategories.map(category => {

          const active =
            activeRamenCategory === category;

          return (
            <Pressable
              key={category}
              onPress={() =>
                onSelectRamenCategory(category)
              }
              style={[
                styles.ramenCategoryItem,
                active &&
                  styles.ramenCategoryActive,
              ]}
            >
              <Text
                style={[
                  styles.ramenCategoryText,
                  active &&
                    styles.ramenCategoryTextActive,
                ]}
              >
                {category}
              </Text>
            </Pressable>
          );
        })}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    marginTop: 20,
  },

  container: {
    paddingHorizontal: 30,
    alignItems: 'center',
  },

  categoryMenuButton: {
    height: 42,
    marginRight: 26,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#B91C1C',
  },

  categoryMenuText: {
    marginLeft: 8,
    fontSize: 17,
    fontWeight: '600',
    color: '#B91C1C',
  },

  ramenCategoryItem: {
    height: 42,
    marginRight: 26,
    justifyContent: 'center',
  },

  ramenCategoryActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#B91C1C',
  },

  ramenCategoryText: {
    fontSize: 17,
    color: '#999999',
  },

  ramenCategoryTextActive: {
    color: '#171717',
    fontWeight: '600',
  },
});

export default CategoryNavigation;