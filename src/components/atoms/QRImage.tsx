import React from 'react';
import { Image, StyleSheet, ImageStyle } from 'react-native';

interface QRImageProps {
  uri: string;
  size?: number;
}

export const QRImage: React.FC<QRImageProps> = ({ uri, size = 200 }) => (
  <Image source={{ uri }} style={[styles.image, { width: size, height: size }]} resizeMode="contain" />
);

const styles = StyleSheet.create<{ image: ImageStyle }>({
  image: { backgroundColor: '#fff' },
});
