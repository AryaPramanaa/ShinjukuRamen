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
          <View style={styles.normalHeaderRow}>
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
          </View>
        ) : (
          <View style={styles.searchHeaderRow}>
            <Pressable
              style={styles.searchBackButton}
              onPress={onCloseSearch}
            >
              <Icon
                name="arrow-back-outline"
                size={26}
                color="#FFFFFF"
              />
            </Pressable>

            <SearchBar
              value={searchText}
              onChangeText={onChangeSearch}
              onClear={onClearSearch}
            />
          </View>
        )}

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  hero: {
    height: 190,
    width: '100%',
  },

  heroOverlay: {
    flex: 1,
    paddingTop: 45,
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
    zIndex: 20,
  },

  normalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  searchHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
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
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
});

export default MenuHeader;