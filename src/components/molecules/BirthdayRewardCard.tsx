import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from '../atoms/Icon';

interface BirthdayRewardCardProps {
  hasInfo: boolean;
  name?: string;
  onPress?: () => void;
}

const BirthdayRewardCard = ({ hasInfo, name, onPress }: BirthdayRewardCardProps) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      {!hasInfo ? (
        <View style={[styles.birthdayCard, styles.disabledCard]}>
          <View style={styles.birthdayContent}>
            <View style={[styles.cakeIconContainer, styles.disabledIconContainer]}>
              <Icon name="gift-outline" size={24} color="#999999" />
            </View>
            <View style={styles.birthdayTexts}>
              <Text style={[styles.birthdayTitle, styles.disabledText]}>
                Claim Your Rewards!
              </Text>
            </View>
          </View>
          <Icon name="chevron-forward" size={20} color="#CCCCCC" />
        </View>
      ) : (
        <View style={styles.birthdayCard}>
          <View style={styles.birthdayContent}>
            <View style={styles.cakeIconContainer}>
              <Icon name="gift-outline" size={24} color="#16A34A" />
            </View>
            <View style={styles.birthdayTexts}>
              <Text style={styles.birthdayTitle}>
                Happy Birthday, {name} 🎂🎉
              </Text>
              <Text style={styles.birthdaySubtitle}>
                Enjoy a special birthday offer just for you!
              </Text>
            </View>
          </View>
          <Icon name="chevron-forward" size={20} color="#999999" />
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 12,
  },

  birthdayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },

  disabledCard: {
    borderColor: '#F0F0F0',
    backgroundColor: '#FAFAFA',
  },

  birthdayContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },

  cakeIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  disabledIconContainer: {
    backgroundColor: '#F5F5F5',
  },

  birthdayTexts: {
    flex: 1,
  },

  birthdayTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#171717',
    marginBottom: 2,
  },

  disabledText: {
    color: '#999999',
  },

  birthdaySubtitle: {
    fontSize: 12,
    color: '#999999',
  },
});

export default BirthdayRewardCard;
