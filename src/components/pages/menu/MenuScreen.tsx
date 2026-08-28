import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../../../context/AppContext';
import MenuTemplate from '../../templates/MenuTemplate';
import { getOrderInfoApi, OutletInfo, TableInfoData } from '../../../apis/order';
import { getCategoriesApi, getShowCategoryApi } from '../../../apis/category';
import { getShowMenuApi } from '../../../apis/menu';
import { getShowItemApi } from '../../../apis/item';
import { getListPromosApi } from '../../../apis/promo';

interface CartItem {
  id: number | string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  note: string;
  optionsText?: string;
}

const DEFAULT_CATEGORY_MAP: Record<string, string> = {
  'Ramen': 'cmlqs8n6i006qkgttdn8i3ewn',
  'Promo': 'promo-category-id',
  'Rice Dishes (Donburi)': 'cmlqs8n6i006rkgtta4670c6z',
  'Donburi': 'cmlqs8n6i006rkgtta4670c6z',
  'Drinks': 'cmlqs8n6i006tkgtt7rv4048f',
  'Drink': 'cmlqs8n6i006tkgtt7rv4048f',
  'Desserts': 'cmlqs8n6i006ukgttb4dlht5k',
  'FOOD': 'cmmeksjye00240kgs7d5p2q3s',
  'RAMEN': 'cmn7ag7qo00300jfnh6wef8yl',
};

const MenuScreen = () => {
  const navigation = useNavigation();
  const { cart, setCart } = useApp();

  const [isCartModal, setIsCartModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [selectedCartItem, setSelectedCartItem] = useState<CartItem | null>(null);
  const [isSearch, setIsSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [activeCategory, setActiveCategory] = useState('Ramen');
  const [activeRamenCategory, setActiveRamenCategory] = useState<string | null>(null);
  const [isCategoryModal, setIsCategoryModal] = useState(false);
  const [isAddMenuModal, setIsAddMenuModal] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<any | null>(null);

  const [outletInfo, setOutletInfo] = useState<OutletInfo | undefined>(undefined);
  const [tableInfo, setTableInfo] = useState<TableInfoData | undefined>(undefined);
  const [dynamicRamenCategories, setDynamicRamenCategories] = useState<string[]>([]);
  const [apiMenus, setApiMenus] = useState<any[]>([]);
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>(DEFAULT_CATEGORY_MAP);

  useEffect(() => {
    const fetchOrderInfo = async () => {
      try {
        const response = await getOrderInfoApi({
          outlet_id: 'cmlqs8mip0000kgtt14z7csfb',
          table_id: 'cmlqs8naj008skgtthxor0re6',
        });
        if (response?.success && response?.data) {
          setOutletInfo(response.data.outlet);
          setTableInfo(response.data.table);
        }
      } catch (error) {
        console.log('Error fetching order info:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await getCategoriesApi({
          outlet_id: 'cmlqs8mip0000kgtt14z7csfb',
          category_id: 'cmlqs8n6i006qkgttdn8i3ewn',
        });
        if (response?.success && response?.data?.sub_categories) {
          const fetchedNames = response.data.sub_categories.map(cat => cat.name);
          if (fetchedNames.length > 0) {
            setDynamicRamenCategories(fetchedNames);
          }
        }
      } catch (error) {
        console.log('Error fetching category list:', error);
      }
    };

    const fetchMainCategoryMap = async () => {
      try {
        const response = await getShowCategoryApi('cmlqs8mip0000kgtt14z7csfb');
        if (response?.success && Array.isArray(response?.data)) {
          const map: Record<string, string> = {};
          response.data.forEach(cat => {
            map[cat.name] = cat.id;
          });
          setCategoryMap(prev => ({ ...prev, ...map }));
        }
      } catch (error) {
        console.log('Error fetching show-category map:', error);
      }
    };

    fetchOrderInfo();
    fetchCategories();
    fetchMainCategoryMap();
  }, []);

  // Fetch live menu items based on activeCategory and searchText
  useEffect(() => {
    const fetchLiveMenu = async () => {
      if (activeCategory === 'Promo') {
        try {
          const promoRes = await getListPromosApi({ outlet_id: 'cmlqs8mip0000kgtt14z7csfb' });
          const ramenRes = await getShowMenuApi({ outlet_id: 'cmlqs8mip0000kgtt14z7csfb', category_id: categoryMap['Ramen'] || 'cmlqs8n6i006qkgttdn8i3ewn' });
          const drinkRes = await getShowMenuApi({ outlet_id: 'cmlqs8mip0000kgtt14z7csfb', category_id: categoryMap['Drinks'] || 'cmlqs8n6i006tkgtt7rv4048f' });

          const promoItems: any[] = [];
          const seenIds = new Set<string>();

          if (ramenRes?.success && Array.isArray(ramenRes?.data)) {
            ramenRes.data.forEach(catGroup => {
              if (Array.isArray(catGroup.sub_categories)) {
                catGroup.sub_categories.forEach(sub => {
                  if (Array.isArray(sub.items)) {
                    sub.items.forEach(item => {
                      if (!seenIds.has(String(item.id))) {
                        seenIds.add(String(item.id));
                        promoItems.push({
                          id: item.id,
                          uniqueKey: `promo-${item.id}`,
                          name: `[PROMO] ${item.name}`,
                          price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
                          image: item.image || 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500',
                          description: promoRes?.data?.[0]?.name ? `${promoRes.data[0].name}` : 'Special Deal Promo',
                          category_group: 'Ramen',
                        });
                      }
                    });
                  }
                });
              }
            });
          }

          if (drinkRes?.success && Array.isArray(drinkRes?.data)) {
            drinkRes.data.forEach(catGroup => {
              if (Array.isArray(catGroup.sub_categories)) {
                catGroup.sub_categories.forEach(sub => {
                  if (Array.isArray(sub.items)) {
                    sub.items.forEach(item => {
                      if (!seenIds.has(String(item.id))) {
                        seenIds.add(String(item.id));
                        promoItems.push({
                          id: item.id,
                          uniqueKey: `promo-${item.id}`,
                          name: `[PROMO] ${item.name}`,
                          price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
                          image: item.image || 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500',
                          description: promoRes?.data?.[0]?.name ? `${promoRes.data[0].name}` : 'Special Deal Promo',
                          category_group: 'Drinks',
                        });
                      }
                    });
                  }
                });
              }
            });
          }

          setApiMenus(promoItems);
        } catch (error) {
          console.log('Error fetching list-promos:', error);
          setApiMenus([]);
        }
        return;
      }

      const catId = categoryMap[activeCategory] || categoryMap['Ramen'] || 'cmlqs8n6i006qkgttdn8i3ewn';
      try {
        const response = await getShowMenuApi({
          outlet_id: 'cmlqs8mip0000kgtt14z7csfb',
          category_id: catId,
          q: searchText,
        });

        if (response?.success && Array.isArray(response?.data) && response.data.length > 0) {
          const allItems: any[] = [];
          const seenIds = new Set<string>();

          response.data.forEach(catGroup => {
            if (Array.isArray(catGroup.sub_categories)) {
              catGroup.sub_categories.forEach(sub => {
                const isSubMatch =
                  !activeRamenCategory ||
                  sub.name.toLowerCase().includes(activeRamenCategory.toLowerCase()) ||
                  activeRamenCategory.toLowerCase().includes(sub.name.toLowerCase());

                if (isSubMatch && Array.isArray(sub.items)) {
                  sub.items.forEach(item => {
                    if (!seenIds.has(String(item.id))) {
                      seenIds.add(String(item.id));
                      allItems.push({
                        id: item.id,
                        uniqueKey: `${item.id}-${sub.id}`,
                        name: item.name,
                        price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
                        image: item.image || 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500',
                        description: item.description || '',
                      });
                    }
                  });
                }
              });
            }
          });

          setApiMenus(allItems);
        } else {
          setApiMenus([]);
        }
      } catch (error) {
        console.log('Error fetching live show-menu:', error);
        setApiMenus([]);
      }
    };

    fetchLiveMenu();
  }, [activeCategory, activeRamenCategory, searchText, categoryMap]);

  const menus = apiMenus;

  const filteredMenus = menus.filter(item =>
    item.name
      .toLowerCase()
      .includes(searchText.toLowerCase()),
  );

  const handleCloseAddMenu = () => {
    setIsAddMenuModal(false);
    setSelectedMenu(null);
  };

  const handleCheckout = () => {
    setIsCartModal(false);
    navigation.navigate('OrderSummary' as never);
  };

  const handleOpenSearch = () => {
    setIsSearch(true);
  };

  const handleCloseSearch = () => {
    setIsSearch(false);
    setSearchText('');
  };

  const handleSelectCategory = (category: string) => {
    setActiveCategory(category);
    setActiveRamenCategory(null);
    setIsCategoryModal(false);
  };

  const handleAddItem = async (item: any) => {
    try {
      const response = await getShowItemApi(item.id);
      if (response?.success && response?.data) {
        const itemDetail = response.data;
        const parsedPrice = typeof itemDetail.price === 'string' ? parseFloat(itemDetail.price) : itemDetail.price;
        const itemWithPrice = { ...item, ...itemDetail, price: parsedPrice };

        if (Array.isArray(itemDetail.modifiers) && itemDetail.modifiers.length > 0) {
          setSelectedMenu(itemWithPrice);
          setIsAddMenuModal(true);
          return;
        }
      }
    } catch (error) {
      console.log('Error fetching show-item for handleAddItem:', error);
    }

    setCart((prevCart: any[]) => {
      const existingItemIndex = prevCart.findIndex(
        cartItem => cartItem.id === item.id && !cartItem.optionsText,
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += 1;
        return newCart;
      }

      return [
        ...prevCart,
        {
          ...item,
          quantity: 1,
          note: '',
          optionsText: '',
        },
      ];
    });
  };

  const handleAddFromModal = (
    item: any,
    quantity: number,
    selectedOptions: Record<string, string[]>,
    additionalPrice: number,
    note: string,
    optionsText: string,
  ) => {
    const finalPrice = item.price + additionalPrice;

    setCart((prevCart: any[]) => {
      const existingItemIndex = prevCart.findIndex(
        cartItem =>
          cartItem.id === item.id &&
          cartItem.note === note &&
          cartItem.optionsText === optionsText,
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      }

      return [
        ...prevCart,
        {
          ...item,
          price: finalPrice,
          quantity,
          note,
          optionsText,
        },
      ];
    });
  };

  const handleIncrease = (id: number) => {
    setCart((prevCart: any[]) =>
      prevCart.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const handleDecrease = (id: number) => {
    setCart((prevCart: any[]) => {
      const targetItem = prevCart.find(
        item => item.id === id,
      );
      if (targetItem && targetItem.quantity === 1) {
        return prevCart.filter(item => item.id !== id);
      }
      return prevCart.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
    });
  };

  const getQuantity = (id: number) => {
    const item = cart.find(cartItem => cartItem.id === id);
    return item ? item.quantity : 0;
  };

  const handleOpenCart = () => {
    setIsCartModal(true);
  };

  const handleCloseCart = () => {
    setIsCartModal(false);
  };

  const handleEditItem = (item: any) => {
    setSelectedCartItem(item);
    setIsEditModal(true);
  };

  const handleCloseEdit = () => {
    setIsEditModal(false);
    setSelectedCartItem(null);
  };

  const handleUpdateNote = (id: number, note: string) => {
    setCart((prevCart: any[]) =>
      prevCart.map(item =>
        item.id === id ? { ...item, note } : item,
      ),
    );
  };

  const totalQuantity = cart.reduce(
    (total, item) => total + item.quantity, 0,
  );

  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity, 0,
  );

  return (
    <MenuTemplate
      outletInfo={outletInfo}
      tableInfo={tableInfo}
      isSearch={isSearch}
      searchText={searchText}
      activeCategory={activeCategory}
      activeRamenCategory={activeRamenCategory}
      ramenCategories={dynamicRamenCategories}
      menus={filteredMenus}
      isCategoryModal={isCategoryModal}
      cart={cart}
      totalQuantity={totalQuantity}
      totalPrice={totalPrice}
      isCartModal={isCartModal}
      selectedCartItem={selectedCartItem}
      isEditModal={isEditModal}
      isAddMenuModal={isAddMenuModal}
      selectedMenu={selectedMenu}
      onCloseAddMenu={handleCloseAddMenu}
      onAddFromModal={handleAddFromModal}
      onSearch={handleOpenSearch}
      onCloseSearch={handleCloseSearch}
      onChangeSearch={setSearchText}
      onCheckout={handleCheckout}
      onClearSearch={() => {
        setSearchText('');
      }}
      onOpenCategory={() => {
        setIsCategoryModal(true);
      }}
      onCloseCategory={() => {
        setIsCategoryModal(false);
      }}
      onSelectCategory={handleSelectCategory}
      onSelectRamenCategory={setActiveRamenCategory}
      onOpenCart={handleOpenCart}
      onCloseCart={handleCloseCart}
      onAddItem={handleAddItem}
      onIncrease={handleIncrease}
      onDecrease={handleDecrease}
      onEditItem={handleEditItem}
      onCloseEdit={handleCloseEdit}
      onUpdateNote={handleUpdateNote}
      getQuantity={getQuantity}
    />
  );
};

export default MenuScreen;