import React from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Icon from '../atoms/Icon';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
}

const SearchBar = ({
  value,
  onChangeText,
  onClear,
}: SearchBarProps) => {
  return (
    <View style={styles.searchBar}>
      <Icon
        name="search-outline"
        size={22}
        color="#555555"
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search item..."
        placeholderTextColor="#999999"
        autoFocus
        style={styles.searchInput}
      />

      {value.length > 0 && (
        <Pressable
          onPress={onClear}
          style={styles.clearButton}
        >
          <Icon
            name="close"
            size={14}
            color="#FFFFFF"
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flex: 1,
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginLeft: 8,
    paddingVertical: 0,
  },

  clearButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchBar;