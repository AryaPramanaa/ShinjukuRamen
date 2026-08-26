import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../../../context/AppContext';
import OrderSummary from '../../organisms/OrderSummary';

const OrderSummaryScreen = () => {
  const navigation = useNavigation();
  const { cart, setCart } = useApp();

  const handleIncrease = (id: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id: number) => {
    setCart(prevCart =>
      prevCart
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const handleEditItem = (item: any) => {
    navigation.navigate('Menu' as never);
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <OrderSummary
      cart={cart}
      totalPrice={totalPrice}
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
