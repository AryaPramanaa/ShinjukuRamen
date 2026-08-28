import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AddMenuModal from '../organisms/AddMenuModal';
import CartBar from '../molecules/CartBar';
import CartModal from '../organisms/CartModal';
import CategoryModal from '../organisms/CategoryModal';
import CategoryNavigation from '../organisms/CategoryNavigation';
import MenuHeader from '../organisms/MenuHeader';
import MenuList from '../organisms/MenuList';
import RestaurantInfo from '../molecules/RestaurantInfo';
import TableInfo from '../molecules/TableInfo';
import Icon from '../atoms/Icon';

interface MenuTemplateProps {
    isSearch: boolean;
    searchText: string;
    activeCategory: string;
    activeRamenCategory: string | null;
    ramenCategories: string[];
    isCategoryModal: boolean;
    isAddMenuModal: boolean;
    selectedMenu: any;
    isCartModal: boolean;
    cart: any[];

    totalQuantity: number;
    totalPrice: number;
    menus: any[];
    outletInfo?: {
        name: string;
        open_time?: string;
        close_time?: string;
    };
    tableInfo?: {
        name: string;
    };

    onSearch: () => void;
    onCheckout: () => void;
    onCloseSearch: () => void;
    onChangeSearch: (text: string) => void;
    onClearSearch: () => void;
    onOpenCategory: () => void;
    onSelectRamenCategory: (category: string) => void;
    onCloseCategory: () => void;
    onSelectCategory: (category: string) => void;

    onIncrease: (id: any) => void;
    onDecrease: (id: any) => void;
    getQuantity: (id: any) => number;

    onOpenCart: () => void;
    onCloseCart: () => void;
    onEditItem: (item: any) => void;
    onCloseEdit: () => void;
    onUpdateNote: (note: string) => void;

    onCloseAddMenu: () => void;
    onAddFromModal: (
        item: any,
        quantity: number,
        selectedOptions: Record<string, string[]>,
        additionalPrice: number,
        note: string,
        optionsText: string,
    ) => void;

    onAddItem: (item: any) => void;
}

const MenuTemplate = ({
    isSearch,
    searchText,
    activeCategory,
    activeRamenCategory,
    ramenCategories,
    isCategoryModal,
    isAddMenuModal,
    selectedMenu,
    isCartModal,
    cart,

    totalQuantity,
    totalPrice,
    menus,
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
    onCloseAddMenu,
    onAddFromModal,
    onAddItem,
}: MenuTemplateProps) => {
    const hasSearchQuery = searchText.trim().length > 0;

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

                {isSearch ? (
                    <View style={styles.searchBody}>
                        {!hasSearchQuery ? (
                            <View style={styles.emptySearchSpace} />
                        ) : menus.length === 0 ? (
                            <View style={styles.noItemContainer}>
                                <View style={styles.noItemCircle}>
                                    <Icon name="search-outline" size={30} color="#CCCCCC" />
                                </View>
                                <Text style={styles.noItemText}>
                                    No Item Found
                                </Text>
                            </View>
                        ) : (
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={styles.scrollContent}
                            >
                                <View style={styles.searchListPadding}>
                                    <MenuList
                                        title=""
                                        subtitle={null}
                                        menus={menus}
                                        onAddItem={onAddItem}
                                        onIncrease={onIncrease}
                                        onDecrease={onDecrease}
                                        getQuantity={getQuantity}
                                    />
                                </View>
                            </ScrollView>
                        )}
                    </View>
                ) : (
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
                            onSelectRamenCategory={onSelectRamenCategory}
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
                )}

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

            {!isCartModal && !isAddMenuModal && !isCategoryModal && !isSearch && (
                <CartBar
                    totalQuantity={totalQuantity}
                    totalPrice={totalPrice}
                    onCartPress={onOpenCart}
                    onCheckout={onCheckout}
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
        backgroundColor: '#FFFFFF',
    },

    scrollContent: {
        paddingBottom: 110,
    },

    searchBody: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    emptySearchSpace: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    searchListPadding: {
        paddingTop: 10,
    },

    noItemContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        paddingBottom: 60,
    },

    noItemCircle: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },

    noItemText: {
        fontSize: 15,
        color: '#9CA3AF',
        fontWeight: '500',
    },

    searchOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.02)',
        zIndex: 5,
    },
});

export default MenuTemplate;