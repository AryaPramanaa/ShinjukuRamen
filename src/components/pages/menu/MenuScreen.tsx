import React, {useState} from 'react';
import MenuTemplate from '../../templates/MenuTemplate';
import {
  ramenCategories,
  ramenMenus,
  sidesMenu,
  drinkMenu,
  promoMenu,
} from '../../../constant/menuData';

const MenuScreen = () => {

  // SEARCH
  const [
    isSearch,
    setIsSearch,
  ] = useState(false);

  const [
    searchText,
    setSearchText,
  ] = useState('');

  // CATEGORY
  const [
    activeCategory,
    setActiveCategory,
  ] = useState('Ramen');

  const [
    activeRamenCategory,
    setActiveRamenCategory,
  ] = useState<string | null>(null);

  // MODAL
  const [
    isCategoryModal,
    setIsCategoryModal,
  ] = useState(false);

  // GET MENU
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

  // SELECT MAIN CATEGORY
  const handleSelectCategory = (
    category: string,
  ) => {

    setActiveCategory(category);
    setActiveRamenCategory(null);
    setIsCategoryModal(false);
  };

  // SEARCH
  const handleOpenSearch = () => {
    setIsSearch(true);
  };


  const handleCloseSearch = () => {
    setIsSearch(false);
    setSearchText('');
  };

  // RETURN
  return (
    <MenuTemplate

      isSearch={isSearch}
      searchText={searchText}
      activeCategory={activeCategory}

      activeRamenCategory={activeRamenCategory}
      ramenCategories={ramenCategories}
      menus={getMenus()}
      isCategoryModal={isCategoryModal}

      onSearch={handleOpenSearch}
      onCloseSearch={handleCloseSearch}
      onChangeSearch={setSearchText}
      onClearSearch={() => {setSearchText('');}}
      onOpenCategory={() => {setIsCategoryModal(true);}}
      onSelectRamenCategory={setActiveRamenCategory}
      onCloseCategoryModal={() => {setIsCategoryModal(false);}}
      onSelectCategory={handleSelectCategory}

    />
  );
};

export default MenuScreen;