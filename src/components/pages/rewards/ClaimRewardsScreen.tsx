import React from 'react';
import { Alert } from 'react-native';
import ClaimRewards from '../../organisms/ClaimRewards';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/AppNavigator';

type ClaimRewardsRouteProp = RouteProp<RootStackParamList, 'ClaimRewards'>;

const ClaimRewardsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<ClaimRewardsRouteProp>();

  const points = route.params?.points ?? 90;
  const isBirthday = route.params?.isBirthday ?? true;

  const handleRedeemBirthdayDiscount = () => {
    Alert.alert(
      'Redeem Reward',
      'Reward redeemed successfully!',
      [{ text: 'OK' }]
    );
  };

  return (
    <ClaimRewards
      points={points}
      isBirthday={isBirthday}
      onBack={() => navigation.goBack()}
      onViewTier={() => {}}
      onRedeemBirthdayDiscount={handleRedeemBirthdayDiscount}
      onHistoryPress={() => {}}
    />
  );
};

export default ClaimRewardsScreen;
