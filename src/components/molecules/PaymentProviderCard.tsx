import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface PaymentProviderCardProps {
  providerId: string;
  providerLabel: string;
  logoText: string;
  logoStyle?: any;
  selectedProvider: string | null;
  onSelect: (providerId: string) => void;
}

const PaymentProviderCard = ({
  providerId,
  providerLabel,
  logoText,
  logoStyle,
  selectedProvider,
  onSelect,
}: PaymentProviderCardProps) => {
  const isSelected = selectedProvider === providerId;

  return (
    <Pressable style={styles.providerCard} onPress={() => onSelect(providerId)}>
      <View style={styles.providerLeft}>
        <Text style={[styles.logoText, logoStyle]}>{logoText}</Text>
        <Text style={styles.providerName}>{providerLabel}</Text>
      </View>
      <View style={[styles.radioOutline, isSelected && styles.radioActive]}>
        {isSelected && <View style={styles.radioDot} />}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  providerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },

  providerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  logoText: {
    fontSize: 18,
    width: 60,
  },

  providerName: {
    fontSize: 14,
    color: '#444444',
  },

  radioOutline: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioActive: {
    borderColor: '#8B1D1D',
  },

  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#8B1D1D',
  },
});

export default PaymentProviderCard;
