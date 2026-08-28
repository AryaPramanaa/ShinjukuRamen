import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from '../atoms/Icon';
import { getShowCategoryApi, MainCategoryItem } from '../../apis/category';
import { getShowMenuApi } from '../../apis/menu';

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
  const [categories, setCategories] = useState<MainCategoryItem[]>([]);
  const [promoCount, setPromoCount] = useState<number>(4);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await getShowCategoryApi('cmlqs8mip0000kgtt14z7csfb');
        if (isMounted && response?.success && Array.isArray(response?.data)) {
          setCategories(response.data);
        }

        const ramenRes = await getShowMenuApi({ outlet_id: 'cmlqs8mip0000kgtt14z7csfb', category_id: 'cmlqs8n6i006qkgttdn8i3ewn' });
        const drinkRes = await getShowMenuApi({ outlet_id: 'cmlqs8mip0000kgtt14z7csfb', category_id: 'cmlqs8n6i006tkgtt7rv4048f' });
        let count = 0;
        if (ramenRes?.data) ramenRes.data.forEach(g => g.sub_categories?.forEach(s => count += (s.items?.length || 0)));
        if (drinkRes?.data) drinkRes.data.forEach(g => g.sub_categories?.forEach(s => count += (s.items?.length || 0)));

        if (isMounted && count > 0) {
          setPromoCount(count);
        }
      } catch (error) {
        console.log('Error fetching show-category in CategoryModal:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (visible) {
      fetchCategories();
    }

    return () => {
      isMounted = false;
    };
  }, [visible]);

  const getDisplayCategories = (): MainCategoryItem[] => {
    const list = [...categories];
    const hasPromo = list.some(cat => cat.name.toLowerCase() === 'promo');
    if (!hasPromo) {
      const ramenIndex = list.findIndex(cat => cat.name.toLowerCase() === 'ramen');
      const promoObj: MainCategoryItem = {
        id: 'promo-category-id',
        name: 'Promo',
        item_count: promoCount,
      };
      if (ramenIndex !== -1) {
        list.splice(ramenIndex + 1, 0, promoObj);
      } else {
        list.unshift(promoObj);
      }
    } else {
      return list.map(cat =>
        cat.name.toLowerCase() === 'promo' ? { ...cat, item_count: promoCount } : cat,
      );
    }
    return list;
  };

  const displayCategories = getDisplayCategories();

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
            <Icon
              name="close"
              size={22}
              color="#4B5563"
            />
          </Pressable>
        </View>

        {loading && categories.length === 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#991B1B" />
          </View>
        ) : (
          <ScrollView
            style={styles.listContainer}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {displayCategories.map((cat, index) => {
              const isLast = index === displayCategories.length - 1;
              const isActive =
                activeCategory === cat.name ||
                (activeCategory === 'Drink' && cat.name === 'Drinks');
              const itemCount = cat.item_count !== undefined ? ` (${cat.item_count})` : '';

              return (
                <Pressable
                  key={cat.id || `${cat.name}-${index}`}
                  style={[styles.item, isLast && styles.lastItem]}
                  onPress={() => {
                    onSelectCategory(cat.name);
                    onClose();
                  }}
                >
                  <Text
                    style={[
                      styles.text,
                      isActive && styles.activeText,
                    ]}
                  >
                    {cat.name}{itemCount}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        )}

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
    maxHeight: '75%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  header: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },

  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingContainer: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },

  listContainer: {
    width: '100%',
  },

  scrollContent: {
    paddingBottom: 15,
  },

  item: {
    height: 56,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },

  lastItem: {
    borderBottomWidth: 0,
  },

  text: {
    fontSize: 16,
    color: '#374151',
  },

  activeText: {
    color: '#991B1B',
    fontWeight: '600',
  },
});

export default CategoryModal;