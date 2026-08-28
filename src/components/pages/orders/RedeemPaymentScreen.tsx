import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../../../context/AppContext';
import Redeem from '../../organisms/Redeem';
import { calculateOrderApi, CalculateOrderData, getShowCheckoutApi, ShowCheckoutData } from '../../../apis/order';

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

  const [calculationData, setCalculationData] = useState<CalculateOrderData | undefined>(undefined);
  const [checkoutInfo, setCheckoutInfo] = useState<ShowCheckoutData>({
    order_type: 'Dine In',
    table: 'T1',
  });

  useEffect(() => {
    let isMounted = true;
    const fetchCheckoutInfo = async () => {
      try {
        const response = await getShowCheckoutApi({
          outlet_id: 'cmlqs8mip0000kgtt14z7csfb',
          table_id: 'cmlqs8naj008skgtthxor0re6',
        });
        if (isMounted && response?.success && response?.data) {
          setCheckoutInfo(response.data);
        }
      } catch (error) {
        console.log('Error in getShowCheckoutApi inside RedeemPaymentScreen:', error);
      }
    };

    fetchCheckoutInfo();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const runCalculate = async () => {
      if (cart.length === 0) {
        setCalculationData(undefined);
        return;
      }
      try {
        const formattedItems = cart.map(item => ({
          id: String(item.id),
          quantity: item.quantity,
          modifier: Array.isArray(item.selectedModifierIds) && item.selectedModifierIds.length > 0
            ? item.selectedModifierIds
            : undefined,
          note: item.note || '',
        }));

        const response = await calculateOrderApi({
          outlet_id: 'cmlqs8mip0000kgtt14z7csfb',
          table_id: 'cmlqs8naj008skgtthxor0re6',
          phone_number: '6289504469252',
          payment_channel_id: 'cmlqs8mjd000dkgtt9f4t388y',
          payment_method: 'self_order',
          items: formattedItems,
        });

        if (isMounted && response?.success && response?.data) {
          setCalculationData(response.data);
        }
      } catch (error) {
        console.log('Error in calculateOrderApi inside RedeemPaymentScreen:', error);
      }
    };

    runCalculate();

    return () => {
      isMounted = false;
    };
  }, [cart]);

  const calculatedTotal = calculationData?.final_total
    ? typeof calculationData.final_total === 'string'
      ? parseFloat(calculationData.final_total)
      : calculationData.final_total
    : cart.reduce((total, item) => total + item.price * item.quantity, 0);

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
      totalPrice={calculatedTotal}
      orderType={checkoutInfo.order_type}
      tableNumber={checkoutInfo.table}
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
