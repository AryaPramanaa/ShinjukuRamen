import React from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import MenuHeader from '../organisms/MenuHeader';
import CategoryNavigation from '../organisms/CategoryNavigation';
import CategoryModal from '../organisms/CategoryModal';
import MenuList from '../organisms/MenuList';
import RestaurantInfo from '../molecules/RestaurantInfo';
import TableInfo from '../molecules/TableInfo';
import CartBar from '../molecules/CartBar';
import CartModal from '../organisms/CartModal';
import EditMenuModal from '../organisms/EditMenuModal';
import AddMenuModal from '../organisms/AddMenuModal';

interface MenuTemplateProps {
    isSearch: boolean;
    searchText: string;
    activeCategory: string;
    activeRamenCategory: string | null;
    ramenCategories: string[];
    menus: any[];
    isCategoryModal: boolean;
    cart: any[];
    totalQuantity: number;
    totalPrice: number;
    isCartModal: boolean;
    selectedCartItem: any | null;
    isEditModal: boolean;
    isAddMenuModal: boolean;
    selectedMenu: any | null;


    onSearch: () => void;
    onCloseSearch: () => void;
    onChangeSearch: (text: string) => void;
    onClearSearch: () => void;
    onOpenCategory: () => void;
    onSelectRamenCategory: (
        category: string,
    ) => void;
    onCloseCategory: () => void;
    onSelectCategory: (
        category: string,
    ) => void;
    onAddItem: (item: any) => void;
    onIncrease: (id: number) => void;
    onDecrease: (id: number) => void;
    getQuantity: (id: number) => number;
    onOpenCart: () => void;
    onCloseCart: () => void;
    onEditItem: (item: any) => void;
    onUpdateNote: (
        id: number,
        note: string,
    ) => void;
    onCloseEdit: () => void;
    onCloseAddMenu: () => void;
    onAddFromModal: (
        item: any,
        quantity: number,
        selectedOptions: {
            noodles: number[];
            broth: number[];
            toppings: number[];
        },
        additionalPrice: number,
        note: string,
    ) => void;
    onCheckout: () => void;
}

const MenuTemplate = ({
    isCartModal,
    isEditModal,
    selectedCartItem,
    isSearch,
    searchText,
    activeCategory,
    activeRamenCategory,
    ramenCategories,
    menus,
    isCategoryModal,
    cart,
    totalQuantity,
    totalPrice,
    isAddMenuModal,
    selectedMenu,
    


    onSearch,
    onCheckout,
    onCloseSearch,
    onChangeSearch,
    onClearSearch,
    onOpenCategory,
    onSelectRamenCategory,
    onCloseCategory,
    onSelectCategory,
    onIncrease,
    onDecrease,
    getQuantity,
    onOpenCart,
    onCloseCart,
    onEditItem,
    onCloseEdit,
    onUpdateNote,
    onCloseAddMenu,
    onAddFromModal,
    onAddItem,

}: MenuTemplateProps) => {

    return (
        <View style={styles.container}>


            <MenuHeader
                isSearch={isSearch}
                searchText={searchText}
                onSearch={onSearch}
                onCloseSearch={onCloseSearch}
                onChangeSearch={onChangeSearch}
                onClearSearch={onClearSearch}
            />


            <View style={styles.content}>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >

                    <RestaurantInfo />
                    <TableInfo
                        tableNumber="A2"
                    />
                    <CategoryNavigation
                        activeCategory={activeCategory}
                        activeRamenCategory={activeRamenCategory}
                        ramenCategories={ramenCategories}
                        onOpenCategory={onOpenCategory}
                        onSelectRamenCategory={
                            onSelectRamenCategory
                        }
                    />

                    <MenuList
                        title={
                            activeCategory === 'Drink'
                                ? 'Drinks'
                                : activeCategory
                        }

                        subtitle={
                            activeCategory === 'Ramen'
                                ? activeRamenCategory
                                : null
                        }

                        menus={menus}
                        onAddItem={onAddItem}
                        onIncrease={onIncrease}
                        onDecrease={onDecrease}
                        getQuantity={getQuantity}

                    />

                </ScrollView>

                <AddMenuModal
                    visible={isAddMenuModal}
                    item={selectedMenu}
                    onClose={onCloseAddMenu}
                    onAdd={onAddFromModal}
                />
            </View>

            {isSearch && (
                <View
                    pointerEvents="none"
                    style={styles.searchOverlay}
                />
            )}

            <CategoryModal
                visible={isCategoryModal}
                activeCategory={activeCategory}
                onClose={onCloseCategory}
                onSelectCategory={onSelectCategory}
            />

            {!isCartModal && !isAddMenuModal &&(
                <CartBar
                    totalQuantity={totalQuantity}
                    totalPrice={totalPrice}
                    onCartPress={onOpenCart}
                    onCheckout = {onCheckout}
                />
            )}

            <CartModal
                visible={isCartModal}
                cart={cart}
                totalPrice={totalPrice}
                onClose={onCloseCart}
                onEditItem={onEditItem}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                onCheckout={onCheckout}
            />

            <EditMenuModal
                visible={isEditModal}
                item={selectedCartItem}
                onClose={onCloseEdit}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                onUpdateNote={onUpdateNote}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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
        paddingBottom: 100,
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
});

export default MenuTemplate;