import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from '../atoms/Icon';
import CustomerInfoModal from './CustomerInfoModal';

// Atomic Molecules
import CustomerInfoCard from '../molecules/CustomerInfoCard';
import RewardsPointsCard from '../molecules/RewardsPointsCard';
import BirthdayRewardCard from '../molecules/BirthdayRewardCard';
import PaymentMethodSelector from '../molecules/PaymentMethodSelector';
import PaymentProviderCard from '../molecules/PaymentProviderCard';
import PromosBar from '../molecules/PromosBar';
import ProcessPaymentModal from '../molecules/ProcessPaymentModal';
import WelcomeMemberModal from '../molecules/WelcomeMemberModal';

interface RedeemProps {
  totalPrice: number;
  onBack: () => void;
  onPay: (paymentMethod: string, provider: string | null, customerInfo: any, simulateFailure: boolean) => void;
  onViewTier: () => void;
  onClaimRewards: () => void;
  onHistoryPress: () => void;

  // Birthday discount states
  isBirthdayDiscountApplied?: boolean;
  onRemoveBirthdayDiscount?: () => void;
  isBirthdayActive?: boolean;
}

const Redeem = ({
  totalPrice,
  onBack,
  onPay,
  onViewTier,
  onClaimRewards,
  onHistoryPress,
  isBirthdayDiscountApplied = false,
  onRemoveBirthdayDiscount,
  isBirthdayActive = true,
}: RedeemProps) => {
  const [selectedMethod, setSelectedMethod] = useState<'online' | 'cashier'>('online');
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  
  // Prefilled / filled state management for mock customer information
  const [customerInfo, setCustomerInfo] = useState<{
    name: string;
    phone: string;
    email: string;
    dob: string;
    pax: string;
  } | null>(null);
  
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

  // Welcome modal states (Screenshot 1 & 2)
  const [isWelcomeModalVisible, setIsWelcomeModalVisible] = useState(false);
  const [isReturningMember, setIsReturningMember] = useState(true);

  const hasCustomerInfo = customerInfo !== null;
  const isPayDisabled = selectedMethod === 'online' && !selectedProvider;

  const handlePayPress = () => {
    if (selectedMethod === 'cashier' || selectedProvider) {
      setIsConfirmModalVisible(true);
    }
  };

  // Helper to check if entered Date of Birth matches today's Month and Day
  const isBirthdayToday = (dobString?: string) => {
    if (!dobString) return false;
    const today = new Date();
    const currentMonth = today.toLocaleString('en-US', { month: 'long' }).toLowerCase();
    const currentDate = today.getDate();
    const lowerDob = dobString.toLowerCase();
    return lowerDob.includes(currentMonth) && new RegExp(`\\b${currentDate}\\b`).test(lowerDob);
  };

  const isUserBirthday = hasCustomerInfo && isBirthdayToday(customerInfo?.dob);
  const displayedTotalPrice = isBirthdayDiscountApplied ? totalPrice * 0.8 : totalPrice;

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#777777" />
        </Pressable>

        <Text style={styles.headerTitle}>Redeem & Payment</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        
        {/* Dine In / Table Info Row */}
        <View style={styles.tableInfoContainer}>
          <View style={styles.tableInfoRow}>
            <Text style={styles.tableInfoLabel}>Order Type</Text>
            <Text style={styles.tableInfoValue}>Dine In</Text>
          </View>
          <View style={styles.tableInfoRow}>
            <Text style={styles.tableInfoLabel}>Table</Text>
            <Text style={styles.tableInfoValue}>A2</Text>
          </View>
        </View>

        {/* Customer Info Card Molecule */}
        <CustomerInfoCard
          hasInfo={hasCustomerInfo}
          name={customerInfo?.name}
          phone={customerInfo?.phone}
          onPress={() => setIsInfoModalVisible(true)}
        />

        {/* Points & Progress Card Molecule */}
        <RewardsPointsCard
          hasInfo={hasCustomerInfo}
          points={isUserBirthday ? 90 : 0}
          neededPoints={isUserBirthday ? 10 : 100}
          nextTier="silver"
          progressBarWidth={isUserBirthday ? '90%' : '0%'}
          onViewTier={onViewTier}
          onHistoryPress={onHistoryPress}
        />

        {/* Claimable Birthday Greeting OR Non-Birthday Claim Button */}
        {hasCustomerInfo && isUserBirthday ? (
          <BirthdayRewardCard
            hasInfo={hasCustomerInfo}
            name={customerInfo?.name}
            onPress={onClaimRewards}
          />
        ) : (
          <Pressable onPress={onClaimRewards} style={styles.claimRewardsCard}>
            <View style={styles.claimRewardsLeft}>
              <Text style={styles.giftIcon}>🎁</Text>
              <Text style={styles.claimRewardsText}>Claim Your Rewards!</Text>
            </View>
            <Icon name="chevron-forward" size={18} color="#555555" />
          </Pressable>
        )}

        {/* Applied Birthday Reward Card with Delete Action */}
        {hasCustomerInfo && isBirthdayDiscountApplied && (
          <View style={styles.appliedRewardCard}>
            <View style={styles.appliedRewardLeft}>
              <View style={styles.balloonIconBox}>
                <Text style={styles.balloonIcon}>🎈</Text>
              </View>
              <View style={styles.appliedRewardTexts}>
                <Text style={styles.appliedRewardTitle}>Birthday Discount</Text>
                <Text style={styles.appliedRewardSubtitle}>Percentage Discount - 20%</Text>
                <Text style={styles.appliedRewardPoints}>20 Point</Text>
              </View>
            </View>
            <Pressable onPress={onRemoveBirthdayDiscount} style={styles.trashBtn}>
              <Icon name="trash-outline" size={20} color="#DC2626" />
            </Pressable>
          </View>
        )}

        {/* Payment Selection Tabs Molecule */}
        <PaymentMethodSelector
          selectedMethod={selectedMethod}
          onSelectMethod={(method) => {
            setSelectedMethod(method);
            if (method === 'cashier') setSelectedProvider(null);
          }}
        />

        {/* Complete Payment Selections (Online) */}
        {selectedMethod === 'online' && (
          <View style={styles.paymentSelectionSection}>
            <Text style={styles.selectionTitle}>Complete Payment</Text>

            <PaymentProviderCard
              providerId="stripe"
              providerLabel="Stripe"
              logoText="stripe"
              logoStyle={styles.stripeText}
              selectedProvider={selectedProvider}
              onSelect={setSelectedProvider}
            />

            <PaymentProviderCard
              providerId="eftpos"
              providerLabel="EFTPOS"
              logoText="eftpos"
              logoStyle={styles.eftposText}
              selectedProvider={selectedProvider}
              onSelect={setSelectedProvider}
            />

            <PaymentProviderCard
              providerId="gpay"
              providerLabel="Google Pay"
              logoText="G Pay"
              logoStyle={styles.gpayText}
              selectedProvider={selectedProvider}
              onSelect={setSelectedProvider}
            />

            <PaymentProviderCard
              providerId="applepay"
              providerLabel="Apple Pay"
              logoText=" Pay"
              logoStyle={styles.applepayText}
              selectedProvider={selectedProvider}
              onSelect={setSelectedProvider}
            />
          </View>
        )}

        {/* Cashier Payment Description */}
        {selectedMethod === 'cashier' && (
          <View style={styles.cashierDescriptionSection}>
            <Text style={styles.cashierDescriptionTitle}>Pay At Cashier</Text>
            <Text style={styles.cashierDescriptionText}>
              Please proceed to the cashier counter to complete your payment. Present your Order ID or Table Number to the cashier staff.
            </Text>
          </View>
        )}

        {/* Saving announcement & applied discount tags */}
        {hasCustomerInfo && isBirthdayDiscountApplied && (
          <View style={styles.savingsWrapper}>
            <View style={styles.savedBanner}>
              <Icon name="checkmark-circle" size={16} color="#16A34A" />
              <Text style={styles.savedBannerText}>You Just Saved $ 10.00 !</Text>
            </View>

            <View style={styles.appliedPromosCard}>
              <View style={styles.appliedPromosLeft}>
                <View style={styles.percentIconCircle}>
                  <Icon name="pricetag-outline" size={16} color="#B91C1C" />
                </View>
                <View style={styles.promoTagsRow}>
                  <View style={styles.promoTag}>
                    <Text style={styles.promoTagText}>Discount 5%</Text>
                  </View>
                  <View style={styles.promoTag}>
                    <Text style={styles.promoTagText}>Discount $ 10.00</Text>
                  </View>
                </View>
              </View>
              <Icon name="chevron-forward" size={18} color="#999999" />
            </View>
          </View>
        )}

        {/* Add Promos Bar Molecule */}
        <PromosBar />

      </ScrollView>

      {/* BOTTOM ACTION BAR */}
      <View style={styles.bottomBar}>
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total Price</Text>
          <Text style={styles.totalPrice}>$ {displayedTotalPrice.toFixed(2)}</Text>
        </View>

        <Pressable
          onPress={handlePayPress}
          disabled={isPayDisabled}
          style={[
            styles.paymentButton,
            isPayDisabled ? styles.paymentButtonDisabled : styles.paymentButtonActive,
          ]}
        >
          <Text style={styles.paymentText}>Pay</Text>
          <Icon name="arrow-forward" size={18} color="#FFFFFF" />
        </Pressable>
      </View>

      {/* MODALS */}
      <CustomerInfoModal
        visible={isInfoModalVisible}
        onClose={() => setIsInfoModalVisible(false)}
        initialData={customerInfo}
        onSave={(data) => {
          const isReturning = data.name.toLowerCase().includes('amalia') || data.name.toLowerCase().includes('amal');
          setIsReturningMember(isReturning);
          setCustomerInfo(data);
          setIsInfoModalVisible(false);
          setIsWelcomeModalVisible(true);
        }}
      />

      <WelcomeMemberModal
        visible={isWelcomeModalVisible}
        isReturningMember={isReturningMember}
        name={customerInfo?.name}
        onClose={() => setIsWelcomeModalVisible(false)}
      />

      <ProcessPaymentModal
        visible={isConfirmModalVisible}
        onClose={() => setIsConfirmModalVisible(false)}
        onConfirm={(simulateFailure) => {
          setIsConfirmModalVisible(false);
          onPay(selectedMethod, selectedProvider, customerInfo, simulateFailure);
        }}
      />

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
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    position: 'relative',
  },

  backButton: {
    position: 'absolute',
    left: 20,
    top: 45,
    height: 42,
    justifyContent: 'center',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#171717',
  },

  content: {
    paddingBottom: 40,
  },

  tableInfoContainer: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 5,
    gap: 8,
  },

  tableInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  tableInfoLabel: {
    fontSize: 14,
    color: '#888888',
  },

  tableInfoValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#171717',
  },

  claimRewardsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginHorizontal: 20,
    marginTop: 12,
  },

  claimRewardsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  giftIcon: {
    fontSize: 18,
  },

  claimRewardsText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#171717',
  },

  appliedRewardCard: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginHorizontal: 20,
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  appliedRewardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  balloonIconBox: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#FFF1F2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  balloonIcon: {
    fontSize: 24,
  },

  appliedRewardTexts: {
    flexDirection: 'column',
  },

  appliedRewardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#171717',
  },

  appliedRewardSubtitle: {
    fontSize: 11,
    color: '#888888',
    marginTop: 2,
  },

  appliedRewardPoints: {
    fontSize: 12,
    fontWeight: '600',
    color: '#171717',
    marginTop: 4,
  },

  trashBtn: {
    width: 36,
    height: 36,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#FEE2E2',
    backgroundColor: '#FFF5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  paymentSelectionSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  selectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#171717',
    marginBottom: 12,
  },

  stripeText: {
    fontWeight: '800',
    color: '#635BFF',
    fontStyle: 'italic',
  },

  eftposText: {
    fontWeight: '800',
    color: '#00A3A0',
    textTransform: 'uppercase',
  },

  gpayText: {
    fontWeight: '700',
    color: '#3C4043',
  },

  applepayText: {
    fontWeight: '700',
    color: '#000000',
  },

  cashierDescriptionSection: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 12,
    backgroundColor: '#FAFAFA',
  },

  cashierDescriptionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#171717',
    marginBottom: 8,
  },

  cashierDescriptionText: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 18,
  },

  savingsWrapper: {
    marginTop: 20,
    marginHorizontal: 20,
    gap: 12,
  },

  savedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F0FDF4',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
  },

  savedBannerText: {
    color: '#16A34A',
    fontSize: 13,
    fontWeight: '700',
  },

  appliedPromosCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },

  appliedPromosLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  percentIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  promoTagsRow: {
    flexDirection: 'row',
    gap: 8,
  },

  promoTag: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FCA5A5',
    backgroundColor: '#FFF5F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  promoTagText: {
    fontSize: 11,
    color: '#B91C1C',
    fontWeight: '600',
  },

  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },

  totalSection: {
    flexDirection: 'column',
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

export default Redeem;
