import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'primary' | 'secondary';
}

const Button = ({
  title,
  onPress,
  disabled = false,
  style,
  textStyle,
  variant = 'primary',
}: ButtonProps) => {
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        isPrimary ? styles.primary : styles.secondary,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.text,
          isPrimary ? styles.textPrimary : styles.textSecondary,
          disabled && styles.textDisabled,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  primary: {
    backgroundColor: '#8B1D1D',
  },
  secondary: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5B4B4',
  },
  disabled: {
    backgroundColor: '#CCCCCC',
    borderColor: '#CCCCCC',
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  textPrimary: {
    color: '#FFFFFF',
  },
  textSecondary: {
    color: '#8B1D1D',
  },
  textDisabled: {
    color: '#FFFFFF',
  },
});

export default Button;
