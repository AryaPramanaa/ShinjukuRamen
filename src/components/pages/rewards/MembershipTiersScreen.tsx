import React from 'react';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import MembershipTiers from '../../organisms/MembershipTiers';
import { RootStackParamList } from '../../../navigation/AppNavigator';

type MembershipTiersRouteProp = RouteProp<RootStackParamList, 'MembershipTiers'>;

const MembershipTiersScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<MembershipTiersRouteProp>();

  const currentPoints = route.params?.currentPoints ?? 90;

  return (
    <MembershipTiers
      currentPoints={currentPoints}
      onBack={() => navigation.goBack()}
    />
  );
};

export default MembershipTiersScreen;
