import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface DividerProps {
  style?: ViewStyle;
}

const Divider = ({ style }: DividerProps) => {
  return <View style={[styles.divider, style]} />;
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    width: '100%',
  },
});

export default Divider;
