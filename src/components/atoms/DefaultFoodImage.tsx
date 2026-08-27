import React from 'react';
import { View } from 'react-native';
import Icon from './Icon';

interface DefaultFoodImageProps {
  width: number;
  height: number;
  borderRadius?: number;
}

const DefaultFoodImage = ({
  width,
  height,
  borderRadius = 8,
}: DefaultFoodImageProps) => {
  const iconSize = Math.floor(Math.min(width, height) * 0.5);
  return (
    <View
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: '#8B1D1D', 
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon name="image-outline" size={iconSize} color="#FFFFFF" />
    </View>
  );
};

export default DefaultFoodImage;
