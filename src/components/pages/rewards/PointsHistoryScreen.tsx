import React from 'react';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import PointsHistory from '../../organisms/PointsHistory';
import { RootStackParamList } from '../../../navigation/AppNavigator';

type PointsHistoryRouteProp = RouteProp<RootStackParamList, 'PointsHistory'>;

const PointsHistoryScreen = () => {
  const navigation = useNavigation();

  return (
    <PointsHistory
      onBack={() => navigation.goBack()}
    />
  );
};

export default PointsHistoryScreen;
