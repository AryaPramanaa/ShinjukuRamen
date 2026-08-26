import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { QRImage } from '../atoms/QRImage';

interface QRResultProps {
  qrUrl: string | null;
  loading: boolean;
  error?: string;
}

export const QRResult: React.FC<QRResultProps> = ({ qrUrl, loading, error }) => {
  if (loading) {
    return <ActivityIndicator size="large" color="#8B1D1D" />;
  }
  if (error) {
    return <Text style={styles.error}>Error: {error}</Text>;
  }
  if (qrUrl) {
    return <QRImage uri={qrUrl} />;
  }
  return null;
};

const styles = StyleSheet.create({
  error: {
    color: '#DC2626',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
});
