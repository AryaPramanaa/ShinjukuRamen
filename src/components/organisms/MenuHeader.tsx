import React from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import Icons from '../atoms/Icons';
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
              <Icons
                name="menu-outline"
                size={28}
                color="#FFFFFF"
              />
            </Pressable>

            <Pressable
              style={styles.headerButton}
              onPress={onSearch}
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
              onPress={onCloseSearch}
            >
              <Icons
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
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },

  searchBackButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
});

export default MenuHeader;