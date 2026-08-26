import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../../../context/AppContext';
import Redeem from '../../organisms/Redeem';

const RedeemPaymentScreen = () => {
  const navigation = useNavigation();
  const {
    cart,
    setCustomerInfoData,
    setPaymentMethod,
    setPaymentProvider,
    setIsFailedSimulated,
    setPaymentStep,
    isBirthdayDiscountApplied,
    setIsBirthdayDiscountApplied,
  } = useApp();

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePay = (method: string, provider: string | null, customerInfo: any, simulateFailure: boolean) => {
    setCustomerInfoData(customerInfo);
    setPaymentMethod(method);
    setPaymentProvider(provider);
    setIsFailedSimulated(simulateFailure);
    
    if (method === 'cashier') {
      setPaymentStep('cashier_pending');
    } else {
      setPaymentStep('checking');
    }
    
    navigation.navigate('OrderReceipt' as never);
  };

  return (
    <Redeem
      totalPrice={totalPrice}
      onBack={() => navigation.goBack()}
      onPay={handlePay}
      onViewTier={() => {
        navigation.navigate('MembershipTiers' as never);
      }}
      onClaimRewards={() => {
        navigation.navigate('ClaimRewards' as never);
      }}
      onHistoryPress={() => {
        navigation.navigate('PointsHistory' as never);
      }}
      isBirthdayDiscountApplied={isBirthdayDiscountApplied}
      onRemoveBirthdayDiscount={() => setIsBirthdayDiscountApplied(false)}
    />
  );
};

export default RedeemPaymentScreen;
