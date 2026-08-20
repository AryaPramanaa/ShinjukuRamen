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

interface MenuTemplateProps {
    isSearch: boolean;
    searchText: string;
    activeCategory: string;
    activeRamenCategory: string | null;
    ramenCategories: string[];
    menus: any[];
    isCategoryModal: boolean;

    onSearch: () => void;
    onCloseSearch: () => void;
    onChangeSearch: (text: string) => void;
    onClearSearch: () => void;
    onOpenCategory: () => void;
    onSelectRamenCategory: (category: string,) => void;
    onCloseCategoryModal: () => void;
    onSelectCategory: (category: string,) => void;
}

const MenuTemplate = ({
    isSearch,
    searchText,
    activeCategory,
    activeRamenCategory,
    ramenCategories,
    menus,
    isCategoryModal,

    onSearch,
    onCloseSearch,
    onChangeSearch,
    onClearSearch,
    onOpenCategory,
    onSelectRamenCategory,
    onCloseCategoryModal,
    onSelectCategory,
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

                    <TableInfo tableNumber="A2" />

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
                    />

                </ScrollView>

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
                onClose={onCloseCategoryModal}
                onSelectCategory={onSelectCategory}
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
        paddingBottom: 30,
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