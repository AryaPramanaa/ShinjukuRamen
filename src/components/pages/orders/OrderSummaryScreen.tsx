import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../../../context/AppContext';
import OrderSummary from '../../organisms/OrderSummary';
import { calculateOrderApi, CalculateOrderData } from '../../../apis/order';

const OrderSummaryScreen = () => {
  const navigation = useNavigation();
  const { cart, setCart } = useApp();
  const [calculationData, setCalculationData] = useState<CalculateOrderData | undefined>(undefined);

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
        console.log('Error in calculateOrderApi:', error);
      }
    };

    runCalculate();

    return () => {
      isMounted = false;
    };
  }, [cart]);

  const handleIncrease = (cartItemIdOrId: any) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.cartItemId === cartItemIdOrId || item.id === cartItemIdOrId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecrease = (cartItemIdOrId: any) => {
    setCart(prevCart =>
      prevCart
        .map(item =>
          item.cartItemId === cartItemIdOrId || item.id === cartItemIdOrId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const handleEditItem = (item: any) => {
    navigation.navigate('Menu' as never);
  };

  // Compute total price cleanly based on server calculation or item sum
  const calculatedTotal = calculationData?.final_total
    ? typeof calculationData.final_total === 'string'
      ? parseFloat(calculationData.final_total)
      : calculationData.final_total
    : cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <OrderSummary
      cart={cart}
      totalPrice={calculatedTotal}
      onBack={() => navigation.goBack()}
      onIncrease={handleIncrease}
      onDecrease={handleDecrease}
      onEditItem={handleEditItem}
      onContinuePayment={() => {
        navigation.navigate('RedeemPayment' as never);
      }}
    />
  );
};

export default OrderSummaryScreen;
