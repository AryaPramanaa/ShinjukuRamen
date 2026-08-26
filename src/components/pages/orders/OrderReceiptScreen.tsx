import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../../../context/AppContext';
import OrderReceipt from '../../organisms/OrderReceipt';
import DownloadReceipt from '../../organisms/DownloadReceipt';
import PointsEarnedModal from '../../molecules/PointsEarnedModal';
import Icon from '../../atoms/Icon';

const OrderReceiptScreen = () => {
  const navigation = useNavigation();
  const {
    cart,
    setCart,
    customerInfoData,
    paymentMethod,
    paymentProvider,
    paymentStep,
    setPaymentStep,
    isFailedSimulated,
    cashPaidAmount,
    setCashPaidAmount,
    changeAmount,
    setChangeAmount,
    pointsPropsData,
    setPointsPropsData,
  } = useApp();

  const [timerText, setTimerText] = useState('02:59');
  const [isThermalReceiptVisible, setIsThermalReceiptVisible] = useState(false);
  const [isPointsModalVisible, setIsPointsModalVisible] = useState(false);

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Handle auto-transitions and ticking countdown
  useEffect(() => {
    let intervalId: any;
    let timeoutId: any;

    if (paymentStep === 'checking') {
      let seconds = 179; // 02:59
      setTimerText('02:59');

      intervalId = setInterval(() => {
        seconds -= 1;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        setTimerText(`0${mins}:${String(secs).padStart(2, '0')}`);
        
        // Auto transition after 3 ticks
        if (seconds <= 176) {
          clearInterval(intervalId);
          if (isFailedSimulated) {
            setPaymentStep('failed');
          } else {
            setPaymentStep('success');
          }
        }
      }, 1000);
    } else if (paymentStep === 'success') {
      timeoutId = setTimeout(() => {
        setPaymentStep('receipt');
      }, 1500);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [paymentStep, isFailedSimulated]);

  if (paymentStep === 'checking') {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingInner}>
          <Icon name="card-outline" size={64} color="#CCCCCC" />
          <Text style={styles.loadingTitle}>Checking Payment...</Text>
          <Text style={styles.loadingSubtitle}>
            Wait a minute, we're confirming your payment
          </Text>
          <Text style={styles.timerText}>{timerText}</Text>
        </View>
      </View>
    );
  }

  if (paymentStep === 'success') {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingInner}>
          <View style={styles.successIconOuter}>
            <Icon name="checkmark" size={32} color="#16A34A" />
          </View>
          <Text style={styles.loadingTitle}>Payment Success</Text>
          <Text style={styles.loadingSubtitle}>You've completed the payment</Text>
        </View>
      </View>
    );
  }

  if (paymentStep === 'failed') {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingInner}>
          <View style={styles.failedIconOuter}>
            <Icon name="close" size={32} color="#FFFFFF" />
          </View>
          <Text style={styles.loadingTitle}>Payment Failed</Text>
          <Text style={styles.loadingSubtitle}>
            Payment timed out. Please try again.
          </Text>
          <Pressable
            onPress={() => {
              setPaymentStep('idle');
              navigation.navigate('RedeemPayment' as never);
            }}
            style={styles.btnBackDetail}
          >
            <Icon name="arrow-back" size={16} color="#171717" />
            <Text style={styles.btnBackDetailText}>Back To Payment Detail</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  if (paymentStep === 'cashier_pending') {
    return (
      <View style={{ flex: 1 }}>
        <OrderReceipt
          cart={cart}
          totalPrice={totalPrice}
          customerInfo={customerInfoData}
          paymentMethod="cashier"
          paymentProvider={null}
          onNewOrder={() => {
            setCart([]);
            setPaymentStep('idle');
            navigation.navigate('Menu' as never);
          }}
          onDownloadReceipt={() => {}}
          onSendEmail={() => {}}
          isPendingCashier={true}
          currentPoints={0}
          redeemedPoints={0}
          rewardPoints={40}
          showFinalTotal={false}
          congratsPoints={40}
          onConfirmCashierPayment={() => {
            setIsPointsModalVisible(true);
          }}
        />

        <PointsEarnedModal
          visible={isPointsModalVisible}
          pointsEarned={100}
          onClose={() => {
            setIsPointsModalVisible(false);
            setCashPaidAmount(150.00);
            setChangeAmount(4.00);
            setPointsPropsData({
              currentPoints: 90,
              redeemedPoints: 20,
              rewardPoints: 100,
              finalPoints: 170,
              showFinalTotal: true,
              congratsPoints: 40,
            });
            setPaymentStep('receipt');
          }}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <OrderReceipt
        cart={cart}
        totalPrice={totalPrice}
        customerInfo={customerInfoData}
        paymentMethod={paymentMethod}
        paymentProvider={paymentProvider}
        onNewOrder={() => {
          setCart([]);
          setPaymentStep('idle');
          navigation.navigate('Menu' as never);
        }}
        onDownloadReceipt={() => setIsThermalReceiptVisible(true)}
        onSendEmail={() => {}}
        
        cashPaid={cashPaidAmount}
        change={changeAmount}
        currentPoints={pointsPropsData?.currentPoints}
        redeemedPoints={pointsPropsData?.redeemedPoints}
        rewardPoints={pointsPropsData?.rewardPoints}
        finalPoints={pointsPropsData?.finalPoints}
        showFinalTotal={pointsPropsData?.showFinalTotal}
        congratsPoints={pointsPropsData?.congratsPoints}
      />

      <DownloadReceipt
        visible={isThermalReceiptVisible}
        onClose={() => setIsThermalReceiptVisible(false)}
        cart={cart}
        totalPrice={totalPrice}
        customerInfo={customerInfoData}
        paymentProvider={paymentProvider}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingInner: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  loadingTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#171717',
    marginTop: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  loadingSubtitle: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  timerText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#171717',
  },
  successIconOuter: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  failedIconOuter: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#DC2626',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 8,
    borderColor: '#FEE2E2',
  },
  btnBackDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: 240,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: '#FFFFFF',
    marginTop: 20,
  },
  btnBackDetailText: {
    color: '#171717',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default OrderReceiptScreen;
