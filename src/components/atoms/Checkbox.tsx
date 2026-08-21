import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from './Icon';

interface CheckboxProps {
  checked: boolean;
}

const Checkbox = ({ checked }: CheckboxProps) => {
  return (
    <View style={[styles.checkbox, checked && styles.checkboxSelected]}>
      {checked && (
        <Icon
          name="checkmark"
          size={14}
          color="#FFFFFF"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#EAEAEA',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#8B1D1D',
    borderColor: '#8B1D1D',
  },
});

export default Checkbox;
