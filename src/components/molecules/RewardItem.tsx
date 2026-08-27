import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import DefaultFoodImage from '../atoms/DefaultFoodImage';

interface RewardItemProps {
  title: string;
  description: string;
  points: number;
  image?: string;
  discountText?: string;
  isRedeemed?: boolean;
  onRedeem?: () => void;
}

const RewardItem = ({
  title,
  description,
  points,
  image,
  discountText,
  isRedeemed,
  onRedeem,
}: RewardItemProps) => {
  const formatPoints = (pts: number) => {
    return pts.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <View style={styles.container}>
      {/* IMAGE OR DISCOUNT BLOCK */}
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : discountText ? (
        <View style={styles.discountContainer}>
          <Text style={styles.discountText}>{discountText}</Text>
        </View>
      ) : (
        <DefaultFoodImage width={64} height={64} borderRadius={8} />
      )}

      {/* CONTENT */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.description} numberOfLines={1}>
          {description}
        </Text>
        <Text style={styles.points}>
          {formatPoints(points)} Point
        </Text>
      </View>

      {/* ACTION */}
      <View style={styles.action}>
        <Pressable style={styles.redeemButton} onPress={onRedeem}>
          <Text style={styles.redeemText}>Redeem</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 90,
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },

  discountContainer: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  discountText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#999999',
  },

  content: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },

  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#171717',
    marginBottom: 4,
  },

  description: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 6,
  },

  points: {
    fontSize: 13,
    color: '#555555',
    fontWeight: '500',
  },

  action: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  redeemButton: {
    minWidth: 76,
    height: 32,
    backgroundColor: '#C5C5C5', // Greyed out default style matching the screenshot
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },

  redeemText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default RewardItem;
