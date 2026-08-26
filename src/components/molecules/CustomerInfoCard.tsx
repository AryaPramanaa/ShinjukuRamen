import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from '../atoms/Icon';

interface CustomerInfoCardProps {
  hasInfo: boolean;
  name?: string;
  phone?: string;
  onPress: () => void;
}

const CustomerInfoCard = ({
  hasInfo,
  name,
  phone,
  onPress,
}: CustomerInfoCardProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Customer Information</Text>
      <Text style={styles.sectionSubtitle}>
        The data is used for order process. Make sure you enter a valid data.
      </Text>

      {!hasInfo ? (
        <Pressable style={styles.infoCard} onPress={onPress}>
          <View style={styles.enterInfoRow}>
            <View style={styles.personIconContainer}>
              <Icon name="person-add-outline" size={20} color="#16A34A" />
            </View>
            <Text style={styles.enterInfoText}>Enter Customer Information</Text>
          </View>
          <Icon name="chevron-forward" size={20} color="#999999" />
        </Pressable>
      ) : (
        <Pressable style={styles.infoCard} onPress={onPress}>
          <View>
            <Text style={styles.customerName}>{name}</Text>
            <Text style={styles.customerPhone}>{phone}</Text>
          </View>
          <Icon name="chevron-forward" size={20} color="#999999" />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#171717',
    marginBottom: 6,
  },

  sectionSubtitle: {
    fontSize: 12,
    color: '#999999',
    lineHeight: 16,
    marginBottom: 12,
  },

  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },

  enterInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  personIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  enterInfoText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#171717',
  },

  customerName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#171717',
    marginBottom: 4,
  },

  customerPhone: {
    fontSize: 13,
    color: '#666666',
  },
});

export default CustomerInfoCard;
