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
        size={27}
        color="#666666"
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search item..."
        placeholderTextColor="#B4B3B3"
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
            size={18}
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
    height: 42,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.18,
    shadowRadius: 5,
  },

  searchInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#333333',
    marginLeft: 12,
    paddingVertical: 0,
  },

  clearButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchBar;