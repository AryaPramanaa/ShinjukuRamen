import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import QRScanner from '../../organisms/QRScanner';
import Icon from '../../atoms/Icon';
import Button from '../../atoms/Button';
import type { RootStackParamList } from '../../../navigation/AppNavigator';
import { validateScannedQR } from '../../../apis/qr';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ScanMenu = () => {
  const navigation = useNavigation<NavigationProp>();
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      setIsScanning(true);
      setShowErrorModal(false);
    }, [])
  );

  const handleScanned = (data: string) => {
    if (!isScanning) return;
    setIsScanning(false);

    console.log('QR DATA:', data);
    const result = validateScannedQR(data);

    if (result.isValid) {
      navigation.navigate('Menu');
    } else {
      setShowErrorModal(true);
    }
  };

  const handleRetryScan = () => {
    setShowErrorModal(false);
    setIsScanning(true);
  };

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <QRScanner
        onClose={handleClose}
        onScanned={handleScanned}
        isScanning={isScanning}
      />

      {/* Modal Notifikasi Rounded */}
      <Modal
        visible={showErrorModal}
        transparent
        animationType="fade"
        statusBarTranslucent
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            {/* Icon Warning */}
            <View style={styles.iconCircle}>
              <Icon name="alert-circle-outline" size={38} color="#8B1D1D" />
            </View>

            <Text style={styles.modalTitle}>Invalid QR Code</Text>
            <Text style={styles.modalMessage}>
              he scanned QR code does not match this restaurant's menu. Please scan the correct QR code.
            </Text>

            <Button
              title="Scan Ulang"
              variant="primary"
              onPress={handleRetryScan}
              style={styles.actionButton}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  iconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FBEBEB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  actionButton: {
    width: '100%',
    height: 50,
  },
});

export default ScanMenu;