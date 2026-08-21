import React from 'react';
import {
  useNavigation,
} from '@react-navigation/native';
import type {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import QRScanner from '../../components/organisms/QRScanner';
import type {
  RootStackParamList,
} from '../../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ScanMenuScreen = () => {
  const navigation =
    useNavigation<NavigationProp>();
  const handleScanned = (data: string,) => {
    console.log(
      'QR DATA:',
      data,
    );
    navigation.navigate('Menu');
  };

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <QRScanner
      onClose={handleClose}
      onScanned={handleScanned}
    />
  );
};

export default ScanMenuScreen;
