import React from 'react';
import ClaimRewards from '../../organisms/ClaimRewards';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/AppNavigator';

type ClaimRewardsRouteProp = RouteProp<RootStackParamList, 'ClaimRewards'>;

const ClaimRewardsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<ClaimRewardsRouteProp>();

  const isBirthday = route.params?.isBirthday ?? true;

  return (
    <ClaimRewards
      isBirthday={isBirthday}
      onBack={() => navigation.goBack()}
      onViewTier={() => {}}
      onHistoryPress={() => {}}
    />
  );
};

export default ClaimRewardsScreen;
