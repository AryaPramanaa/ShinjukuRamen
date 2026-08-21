import React, { useState } from 'react';
import MenuTemplate from '../../templates/MenuTemplate';
import {
  ramenCategories,
  ramenMenus,
  sidesMenu,
  drinkMenu,
  promoMenu,
} from '../../../constant/menuData';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  note: string;
}

const MenuScreen = () => {
  const [isCartModal, setIsCartModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [selectedCartItem, setSelectedCartItem] = useState<CartItem | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [activeCategory, setActiveCategory] = useState('Ramen');
  const [activeRamenCategory, setActiveRamenCategory] = useState<string | null>(null);
  const [isCategoryModal, setIsCategoryModal] = useState(false);
  const [isAddMenuModal, setIsAddMenuModal] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<any | null>(null);
  const getMenus = () => {
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

  const menus = getMenus();

  const filteredMenus = menus.filter(item =>
    item.name
      .toLowerCase()
      .includes(searchText.toLowerCase()),
  );

  const handleCloseAddMenu = () => {
    setIsAddMenuModal(false);
    setSelectedMenu(null);
  };
  

  const handleAddFromModal = (
    item: any,
    quantity: number,
    selectedOptions: {
      noodles: number[];
      broth: number[];
      toppings: number[];
    },
    additionalPrice: number,
    note: string,
  ) => {
    setCart(prevCart => {
      const itemPrice = item.price + additionalPrice;
      const existingItemIndex = prevCart.findIndex(
        cartItem =>
          cartItem.id === item.id &&
          cartItem.note === note &&
          cartItem.price === itemPrice,
      );

      if (existingItemIndex > -1) {
        return prevCart.map((cartItem, idx) =>
          idx === existingItemIndex
            ? {
              ...cartItem,
              quantity: cartItem.quantity + quantity,
            }
            : cartItem,
        );
      }

      return [
        ...prevCart,
        {
          id: item.id,
          name: item.name,
          price: itemPrice,
          image: item.image,
          quantity: quantity,
          note: note,
        },
      ];
    });

    handleCloseAddMenu();
  };

  const handleEditItem = (item: CartItem) => {
    setSelectedCartItem(item);
    setIsEditModal(true);
  };

  const handleConfirmAddMenu = (item: any) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(
        cartItem => cartItem.id === item.id,
      );

      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            }
            : cartItem,
        );
      }

      return [
        ...prevCart,
        {
          ...item,
          quantity: 1,
          note: '',
        },
      ];
    });

    handleCloseAddMenu();
  };

  const handleUpdateNote = (
    id: number,
    note: string,
  ) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id
          ? {
            ...item,
            note,
          }
          : item,
      ),
    );
  };

  const handleOpenCart = () => {
    setIsCartModal(true);
  };

  const handleCloseCart = () => {
    setIsCartModal(false);
  };

  const handleCloseEdit = () => {
    setIsEditModal(false);
    setSelectedCartItem(null);
  };

  const handleSelectCategory = (category: string) => {
    setActiveCategory(category);
    setActiveRamenCategory(null);
    setIsCategoryModal(false);
  };

  const handleOpenSearch = () => {
    setIsSearch(true);
  };

  const handleCloseSearch = () => {
    setIsSearch(false);
    setSearchText('');
  };

  const handleAddItem = (item: any) => {

    const hasOptions =
      item.noodles ||
      item.broth ||
      item.toppings;

    if (hasOptions) {
      setSelectedMenu(item);
      setIsAddMenuModal(true);
      return;
    }

    setCart(prevCart => {

      const existingItem = prevCart.find(
        cartItem => cartItem.id === item.id,
      );

      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            }
            : cartItem,
        );
      }

      return [
        ...prevCart,
        {
          ...item,
          quantity: 1,
          note: '',
        },
      ];
    });
  };

  const handleIncrease = (id: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id
          ? {
            ...item,
            quantity: item.quantity + 1,
          }
          : item,
      ),
    );
  };

  const handleDecrease = (id: number) => {
    setCart(prevCart =>
      prevCart
        .map(item =>
          item.id === id
            ? {
              ...item,
              quantity: item.quantity - 1,
            }
            : item,
        )
        .filter(item => item.quantity > 0),
    );
  };

  const getQuantity = (id: number) => {
    const item = cart.find(
      cartItem => cartItem.id === id,
    );

    return item ? item.quantity : 0;
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
      isSearch={isSearch}
      searchText={searchText}
      activeCategory={activeCategory}
      activeRamenCategory={activeRamenCategory}
      ramenCategories={ramenCategories}
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
      onConfirmAddMenu={handleConfirmAddMenu}
      onClearSearch={() => {
        setSearchText('');
      }}

      onOpenCategory={() => {
        setIsCategoryModal(true);
      }}

      onSelectRamenCategory={
        setActiveRamenCategory
      }

      onCloseCategoryModal={() => {
        setIsCategoryModal(false);
      }}

      onSelectCategory={
        handleSelectCategory
      }

      onAddItem={handleAddItem}
      onIncrease={handleIncrease}
      onDecrease={handleDecrease}
      getQuantity={getQuantity}
      onOpenCart={handleOpenCart}
      onCloseCart={handleCloseCart}
      onEditItem={handleEditItem}
      onCloseEdit={handleCloseEdit}
      onUpdateNote={handleUpdateNote}
    />
  );
};

export default MenuScreen;