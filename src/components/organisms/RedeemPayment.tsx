import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icons from '../atoms/Icons';
import OrderInfo from '../molecules/OrderInfo';

interface RedeemPaymentProps {
  totalPrice: number;
  onBack: () => void;
  onPay: (paymentMethod: string, provider: string | null) => void;
}

const RedeemPayment = ({
  totalPrice,
  onBack,
  onPay,
}: RedeemPaymentProps) => {
  const [selectedMethod, setSelectedMethod] = useState<'online' | 'cashier'>('online');
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  const handlePayPress = () => {
    if (selectedMethod === 'cashier' || selectedProvider) {
      onPay(selectedMethod, selectedProvider);
    }
  };

  const isPayDisabled = selectedMethod === 'online' && !selectedProvider;

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Icons name="arrow-back" size={24} color="#777777" />
        </Pressable>

        <Text style={styles.headerTitle}>
          Redeem & Payment
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* ORDER INFO */}
        <OrderInfo orderType="Dine In" tableNumber="A2" />

        {/* CUSTOMER INFORMATION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Information</Text>
          <Text style={styles.sectionSubtitle}>
            The data is used for order process. Make sure you enter a valid data.
          </Text>

          <View style={styles.infoCard}>
            <View>
              <Text style={styles.customerName}>Amalia</Text>
              <Text style={styles.customerPhone}>+6281234567890</Text>
            </View>
            <Icons name="chevron-forward" size={20} color="#999999" />
          </View>
        </View>

        {/* YOUR REWARDS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Rewards</Text>

          {/* Points Card */}
          <View style={styles.rewardsCard}>
            <View style={styles.rewardsHeader}>
              <Text style={styles.pointsText}>90 Point</Text>
              <Icons name="time-outline" size={20} color="#FFFFFF" />
            </View>
            
            <Text style={styles.tierStatus}>
              You need 10 points to reach the silver tier
            </Text>
            
            {/* Progress Bar */}
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBarFilled, { width: '90%' }]} />
            </View>

            <View style={styles.tierLinkRow}>
              <View style={styles.tierLinkLabel}>
                <Text style={styles.coinIcon}>🪙</Text>
                <Text style={styles.tierLinkText}>View Your Tier</Text>
              </View>
              <Icons name="chevron-forward" size={16} color="#FFFFFF" />
            </View>
          </View>

          {/* Birthday Card */}
          <View style={styles.birthdayCard}>
            <View style={styles.birthdayContent}>
              <View style={styles.cakeIconContainer}>
                <Icons name="gift-outline" size={24} color="#16A34A" />
              </View>
              <View style={styles.birthdayTexts}>
                <Text style={styles.birthdayTitle}>
                  Happy Birthday, Amalia 🎂🎉
                </Text>
                <Text style={styles.birthdaySubtitle}>
                  Enjoy a special birthday offer just for you!
                </Text>
              </View>
            </View>
            <Icons name="chevron-forward" size={20} color="#999999" />
          </View>
        </View>

        {/* PAYMENT METHOD */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>

          <View style={styles.tabContainer}>
            <Pressable
              style={[
                styles.tabButton,
                selectedMethod === 'online' && styles.tabButtonActive,
              ]}
              onPress={() => setSelectedMethod('online')}
            >
              <Icons
                name="card-outline"
                size={20}
                color={selectedMethod === 'online' ? '#FFFFFF' : '#888888'}
              />
              <Text
                style={[
                  styles.tabText,
                  selectedMethod === 'online' && styles.tabTextActive,
                ]}
              >
                Online Payment
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.tabButton,
                selectedMethod === 'cashier' && styles.tabButtonActive,
              ]}
              onPress={() => {
                setSelectedMethod('cashier');
                setSelectedProvider(null); // Reset provider
              }}
            >
              <Icons
                name="desktop-outline"
                size={20}
                color={selectedMethod === 'cashier' ? '#FFFFFF' : '#888888'}
              />
              <Text
                style={[
                  styles.tabText,
                  selectedMethod === 'cashier' && styles.tabTextActive,
                ]}
              >
                Pay At Cashier
              </Text>
            </Pressable>
          </View>
        </View>

        {/* COMPLETE PAYMENT (Only show if Online Payment selected) */}
        {selectedMethod === 'online' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Complete Payment</Text>

            {/* Stripe */}
            <Pressable
              style={styles.providerCard}
              onPress={() => setSelectedProvider('stripe')}
            >
              <View style={styles.providerLeft}>
                <Text style={[styles.stripeText, { fontWeight: '700' }]}>stripe</Text>
                <Text style={styles.providerName}>Stripe</Text>
              </View>
              <View
                style={[
                  styles.radioOutline,
                  selectedProvider === 'stripe' && styles.radioActive,
                ]}
              >
                {selectedProvider === 'stripe' && <View style={styles.radioDot} />}
              </View>
            </Pressable>

            {/* EFTPOS */}
            <Pressable
              style={styles.providerCard}
              onPress={() => setSelectedProvider('eftpos')}
            >
              <View style={styles.providerLeft}>
                <Text style={[styles.eftposText, { fontWeight: '700', fontStyle: 'italic', color: '#005BBB' }]}>eftpos</Text>
                <Text style={styles.providerName}>EFTPOS</Text>
              </View>
              <View
                style={[
                  styles.radioOutline,
                  selectedProvider === 'eftpos' && styles.radioActive,
                ]}
              >
                {selectedProvider === 'eftpos' && <View style={styles.radioDot} />}
              </View>
            </Pressable>

            {/* Google Pay */}
            <Pressable
              style={styles.providerCard}
              onPress={() => setSelectedProvider('gpay')}
            >
              <View style={styles.providerLeft}>
                <Text style={[styles.gpayText, { fontWeight: '700', color: '#5F6368' }]}>G Pay</Text>
                <Text style={styles.providerName}>Google Pay</Text>
              </View>
              <View
                style={[
                  styles.radioOutline,
                  selectedProvider === 'gpay' && styles.radioActive,
                ]}
              >
                {selectedProvider === 'gpay' && <View style={styles.radioDot} />}
              </View>
            </Pressable>
          </View>
        )}

        {/* ADD PROMOS */}
        <View style={styles.promoSection}>
          <View style={styles.promoLeft}>
            <View style={styles.promoIconContainer}>
              <Text style={styles.promoPercentIcon}>%</Text>
            </View>
            <Text style={styles.promoText}>Add Promos</Text>
          </View>
          <Icons name="chevron-forward" size={20} color="#B91C1C" />
        </View>

      </ScrollView>

      {/* FOOTER */}
      <View style={styles.paymentBar}>
        <View>
          <Text style={styles.totalLabel}>
            Total Payment
          </Text>
          <Text style={styles.totalPrice}>
            $ {totalPrice.toFixed(2)}
          </Text>
        </View>

        <Pressable
          style={[
            styles.paymentButton,
            isPayDisabled ? styles.paymentButtonDisabled : styles.paymentButtonActive,
          ]}
          onPress={handlePayPress}
          disabled={isPayDisabled}
        >
          <Text style={styles.paymentText}>Pay</Text>
          <Icons
            name="arrow-forward"
            size={18}
            color="#FFFFFF"
          />
        </Pressable>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    paddingTop: 45,
    height: 87,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },

  backButton: {
    marginRight: 15,
    padding: 4,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#171717',
  },

  content: {
    paddingBottom: 110,
  },

  section: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#171717',
    marginBottom: 6,
  },

  sectionSubtitle: {
    fontSize: 12,
    color: '#999999',
    lineHeight: 16,
    marginBottom: 12,
  },

  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },

  customerName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#171717',
    marginBottom: 4,
  },

  customerPhone: {
    fontSize: 13,
    color: '#666666',
  },

  rewardsCard: {
    backgroundColor: '#C18F58',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },

  rewardsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  pointsText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  tierStatus: {
    fontSize: 13,
    color: '#FFFFFFEE',
    marginBottom: 8,
  },

  progressBarContainer: {
    height: 6,
    backgroundColor: '#FFFFFF44',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 16,
  },

  progressBarFilled: {
    height: '100%',
    backgroundColor: '#FFFFFF',
  },

  tierLinkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#FFFFFF33',
    paddingTop: 12,
  },

  tierLinkLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  coinIcon: {
    fontSize: 16,
  },

  tierLinkText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '500',
  },

  birthdayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },

  birthdayContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },

  cakeIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  birthdayTexts: {
    flex: 1,
  },

  birthdayTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#171717',
    marginBottom: 2,
  },

  birthdaySubtitle: {
    fontSize: 12,
    color: '#999999',
  },

  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 24,
    padding: 4,
  },

  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    borderRadius: 20,
  },

  tabButtonActive: {
    backgroundColor: '#8B1D1D',
  },

  tabText: {
    fontSize: 13,
    color: '#888888',
    fontWeight: '500',
  },

  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  providerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },

  providerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  stripeText: {
    fontSize: 18,
    color: '#635BFF',
    width: 60,
  },

  eftposText: {
    fontSize: 18,
    width: 60,
  },

  gpayText: {
    fontSize: 18,
    width: 60,
  },

  providerName: {
    fontSize: 14,
    color: '#444444',
  },

  radioOutline: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioActive: {
    borderColor: '#8B1D1D',
  },

  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#8B1D1D',
  },

  promoSection: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    borderRadius: 12,
    backgroundColor: '#FFF5F5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  promoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  promoIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },

  promoPercentIcon: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  promoText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#B91C1C',
  },

  paymentBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    minHeight: 76,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  totalLabel: {
    fontSize: 13,
    color: '#A0A0A0',
  },

  totalPrice: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: '700',
    color: '#171717',
  },

  paymentButton: {
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  paymentButtonActive: {
    backgroundColor: '#8B1D1D',
  },

  paymentButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },

  paymentText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default RedeemPayment;
