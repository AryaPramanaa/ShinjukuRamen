import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';
  style?: any;
  color?: string;
}

const Typography = ({ variant = 'body', style, color, ...props }: TypographyProps) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'h1':
        return styles.h1;
      case 'h2':
        return styles.h2;
      case 'h3':
        return styles.h3;
      case 'caption':
        return styles.caption;
      case 'label':
        return styles.label;
      case 'body':
      default:
        return styles.body;
    }
  };

  return (
    <Text
      style={[
        getVariantStyle(),
        color ? { color } : null,
        style,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 24,
    fontWeight: '700',
    color: '#171717',
  },
  h2: {
    fontSize: 18,
    fontWeight: '600',
    color: '#171717',
  },
  h3: {
    fontSize: 15,
    fontWeight: '600',
    color: '#171717',
  },
  body: {
    fontSize: 14,
    color: '#333333',
  },
  caption: {
    fontSize: 12,
    color: '#999999',
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: '#666666',
  },
});

export default Typography;
