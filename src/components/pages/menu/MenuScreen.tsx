import React, { useState } from 'react';
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import Icons from '../../atoms/Icons';
import MenuItem from '../../organisms/MenuItem';

const mainCategories = ['Ramen', 'Sides', 'Drink', 'Promo'];

const ramenCategories = [
  'Tonkotsu',
  'Shoyu',
  'Miso',
  'AA',
  'BB',
  'CC',
];

const ramenMenus = {
  Tonkotsu: [
    {
      id: 1,
      name: 'Special Tonkotsu Ramen',
      price: 30,
      image:
        'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500',
    },
    {
      id: 2,
      name: 'Classic Tonkotsu Ramen',
      price: 28,
      image:
        'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=500',
    },
  ],
  Shoyu: [
    {
      id: 3,
      name: 'Special Shoyu Ramen',
      price: 30,
      image:
        'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500',
    },
    {
      id: 4,
      name: 'Classic Shoyu Ramen',
      price: 26,
      image:
        'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=500',
    },
  ],
  Miso: [
    {
      id: 5,
      name: 'Special Miso Ramen',
      price: 29,
      image:
        'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=500',
    },
  ],
  AA: [
    {
      id: 6,
      name: 'AA Ramen',
      price: 32,
      image:
        'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500',
    },
  ],
  BB: [
    {
      id: 7,
      name: 'BB Ramen',
      price: 33,
      image:
        'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=500',
    },
  ],
  CC: [
    {
      id: 8,
      name: 'CC Ramen',
      price: 35,
      image:
        'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=500',
    },
  ],
};

const sidesMenu = [
  {
    id: 101,
    name: 'Gyoza',
    price: 15,
    image:
      'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=500',
  },
  {
    id: 102,
    name: 'Karaage',
    price: 18,
    image:
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500',
  },
];

const drinkMenu = [
  {
    id: 201,
    name: 'Ocha',
    price: 8,
    image:
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500',
  },
  {
    id: 202,
    name: 'Ramune',
    price: 10,
    image:
      'https://images.unsplash.com/photo-1629203849820-fdd70d49c38e?w=500',
  },
];

const promoMenu = [
  {
    id: 301,
    name: 'Ramen Set Promo',
    price: 35,
    image:
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500',
  },
];

const MenuScreen = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [activeCategory, setActiveCategory] = useState('Ramen');
  const [activeRamenCategory, setActiveRamenCategory] = useState<string | null>(null)
  const [isCategoryModal, setIsCategoryModal] = useState(false);

  const renderMenu = () => {
    if (activeCategory === 'Ramen') {
      if (activeRamenCategory === null) {
        return Object.values(ramenMenus).flat();
      }

      return (
        ramenMenus[
        activeRamenCategory as keyof typeof ramenMenus
        ] || []
      );
    }

    if (activeCategory === 'Sides') {
      return sidesMenu;
    }

    if (activeCategory === 'Drink') {
      return drinkMenu;
    }

    if (activeCategory === 'Promo') {
      return promoMenu;
    }

    return [];
  };

  const handleSelectCategory = (category: string) => {
    setActiveCategory(category);
    setActiveRamenCategory(null);
    setIsCategoryModal(false);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1000',
        }}
        style={styles.hero}
      >
        <View style={styles.heroOverlay}>
          {!isSearch ? (
            <>
              <Pressable style={styles.headerButton}>
                <Icons
                  name="menu-outline"
                  size={28}
                  color="#FFFFFF"
                />
              </Pressable>

              <Pressable
                style={styles.headerButton}
                onPress={() => setIsSearch(true)}
              >
                <Icons
                  name="search-outline"
                  size={28}
                  color="#FFFFFF"
                />
              </Pressable>
            </>
          ) : (
            <>
              <Pressable
                style={styles.searchBackButton}
                onPress={() => {
                  setIsSearch(false);
                  setSearchText('');
                }}
              >
                <Icons
                  name="arrow-back"
                  size={30}
                  color="#FFFFFF"
                />
              </Pressable>

              <View style={styles.searchBar}>
                <Icons
                  name="search-outline"
                  size={27}
                  color="#666666"
                />

                <TextInput
                  value={searchText}
                  onChangeText={setSearchText}
                  placeholder="Search item..."
                  placeholderTextColor="#B4B3B3"
                  autoFocus
                  style={styles.searchInput}
                />

                {searchText.length > 0 && (
                  <Pressable
                    onPress={() => setSearchText('')}
                    style={styles.clearButton}
                  >
                    <Icons
                      name="close"
                      size={18}
                      color="#FFFFFF"
                    />
                  </Pressable>
                )}
              </View>
            </>
          )}
        </View>
      </ImageBackground>

      <View style={styles.content}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.restaurantSection}>
            <Text style={styles.restaurantName}>
              Shinjuku Ramen
            </Text>
            <Text style={styles.openText}>
              Open Today, 10 AM - 10 PM
            </Text>
          </View>

          <View style={styles.tableSection}>
            <Text style={styles.tableLabel}>Table</Text>

            <View style={styles.tableBadge}>
              <Text style={styles.tableText}>A2</Text>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
            contentContainerStyle={styles.categoryContainer}
          >
            <Pressable
              style={[
                styles.categoryMenuButton,
                activeCategory && styles.categoryMenuActive,
              ]}
              onPress={() => setIsCategoryModal(true)}
            >
              <Icons
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

            {activeCategory === 'Ramen' &&
              ramenCategories.map(category => {
                const active =
                  activeRamenCategory === category;

                return (
                  <Pressable
                    key={category}
                    onPress={() =>
                      setActiveRamenCategory(category)
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

          <Text style={styles.sectionTitle}>
            {activeCategory === 'Drink'
              ? 'Drinks'
              : activeCategory}
          </Text>

          {activeCategory === 'Ramen' && (
            <Text style={styles.sectionSubtitle}>
              {activeRamenCategory}
            </Text>
          )}

          {renderMenu().map(item => (
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
        </ScrollView>
      </View>

      {isSearch && (
        <View
          pointerEvents="none"
          style={styles.searchOverlay}
        />
      )}

      {isCategoryModal && (
        <View style={styles.categoryModalOverlay}>
          <Pressable
            style={styles.categoryModalBackdrop}
            onPress={() => setIsCategoryModal(false)}
          />

          <View style={styles.categoryModal}>
            <View style={styles.categoryModalHeader}>
              <Text style={styles.categoryModalTitle}>
                List Category
              </Text>

              <Pressable
                style={styles.categoryCloseButton}
                onPress={() => setIsCategoryModal(false)}
              >
                <Icons
                  name="close"
                  size={25}
                  color="#666666"
                />
              </Pressable>
            </View>

            <Pressable
              style={styles.modalCategoryItem}
              onPress={() => handleSelectCategory('Ramen')}
            >
              <Text style={styles.modalCategoryText}>
                Ramen (6)
              </Text>
            </Pressable>

            <Pressable
              style={styles.modalCategoryItem}
              onPress={() => handleSelectCategory('Sides')}
            >
              <Text style={styles.modalCategoryText}>
                Sides (4)
              </Text>
            </Pressable>

            <Pressable
              style={styles.modalCategoryItem}
              onPress={() => handleSelectCategory('Drink')}
            >
              <Text
                style={[
                  styles.modalCategoryText,
                  activeCategory === 'Drink' &&
                  styles.activeModalCategoryText,
                ]}
              >
                Drinks (4)
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.modalCategoryItem,
                styles.lastModalCategoryItem,
              ]}
              onPress={() => handleSelectCategory('Promo')}
            >
              <Text
                style={[
                  styles.modalCategoryText,
                  activeCategory === 'Promo' &&
                  styles.activeModalCategoryText,
                ]}
              >
                Promo (4)
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  hero: {
    height: 230,
    width: '100%',
  },
  heroOverlay: {
    flex: 1,
    paddingTop: 45,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    zIndex: 20,
  },
  headerButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  content: {
    flex: 1,
    marginTop: -15,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  restaurantSection: {
    paddingHorizontal: 30,
    paddingTop: 25,
    paddingBottom: 20,
  },
  restaurantName: {
    fontSize: 23,
    fontWeight: '600',
    color: '#171717',
  },
  openText: {
    marginTop: 7,
    fontSize: 16,
    color: '#737373',
  },
  tableSection: {
    minHeight: 75,
    marginHorizontal: 20,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  menuButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableLabel: {
    fontSize: 16,
    color: '#B6A09A',
  },
  tableBadge: {
    minWidth: 42,
    height: 36,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 4,
  },
  tableText: {
    fontSize: 15,
    color: '#737373',
  },
  categoryScroll: {
    marginTop: 20,
  },
  categoryContainer: {
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
  categoryMenuActive: {
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
  searchOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    zIndex: 10,
  },
  searchBar: {
    flex: 1,
    height: 42,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.18,
    shadowRadius: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#333333',
    marginLeft: 12,
    paddingVertical: 0,
  },
  clearButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBackButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  categoryModalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    elevation: 100,
    justifyContent: 'flex-end',
  },
  categoryModalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  categoryModal: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  categoryModalHeader: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryModalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#171717',
  },
  categoryCloseButton: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCategoryItem: {
    height: 68,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  lastModalCategoryItem: {
    borderBottomWidth: 0,
  },
  modalCategoryText: {
    fontSize: 17,
    color: '#333333',
  },
  activeModalCategoryText: {
    color: '#B91C1C',
  },
});

export default MenuScreen;