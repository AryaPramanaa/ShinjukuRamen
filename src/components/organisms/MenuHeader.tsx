import React from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import Icon from '../atoms/Icon';
import SearchBar from '../molecules/SearchBar';

interface MenuHeaderProps {
  isSearch: boolean;
  searchText: string;
  onSearch: () => void;
  onCloseSearch: () => void;
  onChangeSearch: (text: string) => void;
  onClearSearch: () => void;
}

const MenuHeader = ({
  isSearch,
  searchText,
  onSearch,
  onCloseSearch,
  onChangeSearch,
  onClearSearch,
}: MenuHeaderProps) => {
  return (
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
              <Icon
                name="menu-outline"
                size={28}
                color="#FFFFFF"
              />
            </Pressable>

            <Pressable
              style={styles.headerButton}
              onPress={onSearch}
            >
              <Icon
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
              onPress={onCloseSearch}
            >
              <Icon
                name="arrow-back"
                size={30}
                color="#FFFFFF"
              />
            </Pressable>

            <SearchBar
              value={searchText}
              onChangeText={onChangeSearch}
              onClear={onClearSearch}
            />
          </>
        )}

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
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
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchBackButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
});

export default MenuHeader;