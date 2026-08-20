import React from 'react';
import {
  useNavigation,
} from '@react-navigation/native';
import type {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import QRScanner from '../../organisms/QRScanner';
import type {
  RootStackParamList,
} from '../../../routes/AppNavigator';


type NavigationProp = NativeStackNavigationProp<RootStackParamList>;


const ScanMenu = () => {

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


export default ScanMenu;