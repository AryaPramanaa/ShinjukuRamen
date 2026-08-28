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
    outletInfo?: {
        name?: string;
        logo?: string;
        open_time?: string;
        close_time?: string;
    };
    tableInfo?: {
        name?: string;
    };

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
    outletInfo,
    tableInfo,

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

                    <RestaurantInfo
                        name={outletInfo?.name}
                        openTime={outletInfo?.open_time}
                        closeTime={outletInfo?.close_time}
                       
                    />
                    <TableInfo
                        tableNumber={tableInfo?.name || 'A2'}
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

                    {activeCategory === 'Promo' ? (
                        <>
                            {menus.filter(item => item.category_group === 'Ramen').length > 0 && (
                                <MenuList
                                    title="Ramen"
                                    subtitle={null}
                                    menus={menus.filter(item => item.category_group === 'Ramen')}
                                    onAddItem={onAddItem}
                                    onIncrease={onIncrease}
                                    onDecrease={onDecrease}
                                    getQuantity={getQuantity}
                                />
                            )}

                            {menus.filter(item => item.category_group === 'Drinks').length > 0 && (
                                <MenuList
                                    title="Drinks"
                                    subtitle={null}
                                    menus={menus.filter(item => item.category_group === 'Drinks')}
                                    onAddItem={onAddItem}
                                    onIncrease={onIncrease}
                                    onDecrease={onDecrease}
                                    getQuantity={getQuantity}
                                />
                            )}
                        </>
                    ) : (
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
                    )}

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

            {!isCartModal && !isAddMenuModal && !isCategoryModal && (
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