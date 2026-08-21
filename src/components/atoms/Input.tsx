import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  style?: any;
}

const Input = ({ style, ...props }: InputProps) => {
  return (
    <TextInput
      placeholderTextColor="#CCCCCC"
      style={[styles.input, style]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: '#333333',
    backgroundColor: '#FFFFFF',
  },
});

export default Input;
