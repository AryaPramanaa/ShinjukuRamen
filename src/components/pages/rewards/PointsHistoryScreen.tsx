import React from 'react';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import PointsHistory from '../../organisms/PointsHistory';
import { RootStackParamList } from '../../../navigation/AppNavigator';

type PointsHistoryRouteProp = RouteProp<RootStackParamList, 'PointsHistory'>;

const PointsHistoryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<PointsHistoryRouteProp>();

  const points = route.params?.points ?? 90;

  return (
    <PointsHistory
      points={points}
      onBack={() => navigation.goBack()}
    />
  );
};

export default PointsHistoryScreen;
