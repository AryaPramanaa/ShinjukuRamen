import React, { createContext, useContext, useState } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  note: string;
  optionsText?: string;
}

interface AppContextType {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  customerInfoData: any | null;
  setCustomerInfoData: (data: any | null) => void;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  paymentProvider: string | null;
  setPaymentProvider: (provider: string | null) => void;
  paymentStep: 'idle' | 'checking' | 'success' | 'failed' | 'cashier_pending' | 'receipt';
  setPaymentStep: (step: 'idle' | 'checking' | 'success' | 'failed' | 'cashier_pending' | 'receipt') => void;
  isFailedSimulated: boolean;
  setIsFailedSimulated: (val: boolean) => void;
  cashPaidAmount: number | null;
  setCashPaidAmount: (amount: number | null) => void;
  changeAmount: number | null;
  setChangeAmount: (amount: number | null) => void;
  pointsPropsData: any | null;
  setPointsPropsData: (data: any | null) => void;
  isBirthdayDiscountApplied: boolean;
  setIsBirthdayDiscountApplied: (val: boolean) => void;
  isFreeRamenApplied: boolean;
  setIsFreeRamenApplied: (val: boolean) => void;
  points: number;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerInfoData, setCustomerInfoData] = useState<any | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [paymentProvider, setPaymentProvider] = useState<string | null>(null);
  const [paymentStep, setPaymentStep] = useState<'idle' | 'checking' | 'success' | 'failed' | 'cashier_pending' | 'receipt'>('idle');
  const [isFailedSimulated, setIsFailedSimulated] = useState(false);
  const [cashPaidAmount, setCashPaidAmount] = useState<number | null>(null);
  const [changeAmount, setChangeAmount] = useState<number | null>(null);
  const [pointsPropsData, setPointsPropsData] = useState<any | null>(null);
  const [isBirthdayDiscountApplied, setIsBirthdayDiscountApplied] = useState(false);
  const [isFreeRamenApplied, setIsFreeRamenApplied] = useState(false);
  const [points, setPoints] = useState(90);

  return (
    <AppContext.Provider
      value={{
        cart,
        setCart,
        customerInfoData,
        setCustomerInfoData,
        paymentMethod,
        setPaymentMethod,
        paymentProvider,
        setPaymentProvider,
        paymentStep,
        setPaymentStep,
        isFailedSimulated,
        setIsFailedSimulated,
        cashPaidAmount,
        setCashPaidAmount,
        changeAmount,
        setChangeAmount,
        pointsPropsData,
        setPointsPropsData,
        isBirthdayDiscountApplied,
        setIsBirthdayDiscountApplied,
        isFreeRamenApplied,
        setIsFreeRamenApplied,
        points,
        setPoints,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
