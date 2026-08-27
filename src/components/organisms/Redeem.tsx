import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
} from 'react-native';
import { useApp } from '../../context/AppContext';
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
import PromoReminderModal from '../molecules/PromoReminderModal';

interface RedeemProps {
  totalPrice: number;
  onBack: () => void;
  onPay: (paymentMethod: string, provider: string | null, customerInfo: any, simulateFailure: boolean) => void;
  onViewTier: () => void;
  onClaimRewards: () => void;
}

const GreenCakeIcon = () => (
  <View style={styles.cakeIconWrapperCustom}>
    <View style={styles.candleRow}>
      <View style={styles.candleLine} />
      <View style={styles.candleLine} />
      <View style={styles.candleLine} />
    </View>
    <View style={styles.cakeBody}>
      <View style={styles.cakeLayer} />
      <View style={styles.cakeLayer} />
      <View style={styles.cakeLayer} />
    </View>
  </View>
);


const Redeem = ({
  totalPrice,
  onBack,
  onPay,
  onViewTier,
  onClaimRewards,
  onHistoryPress,
  onRemoveBirthdayDiscount,
  isBirthdayActive = true,
}: RedeemProps) => {
  const {
    points,
    setPoints,
    isBirthdayDiscountApplied: isAppliedFromContext,
    setIsBirthdayDiscountApplied,
    customerInfoData,
    setCustomerInfoData,
  } = useApp();

  const isBirthdayDiscountApplied = isAppliedFromContext;
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const [selectedMethod, setSelectedMethod] = useState<'online' | 'cashier'>('online');
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  
  // Prefilled / filled state management for mock customer information
  const [customerInfo, setCustomerInfo] = useState<{
    name: string;
    phone: string;
    email: string;
    dob: string;
    pax: string;
  } | null>(customerInfoData);
  
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

  // Welcome modal states (Screenshot 1 & 2)
  const [isWelcomeModalVisible, setIsWelcomeModalVisible] = useState(false);
  const [isReturningMember, setIsReturningMember] = useState(true);
  const [isPromoReminderVisible, setIsPromoReminderVisible] = useState(false);

  const hasCustomerInfo = customerInfo !== null;
  const isPayDisabled = selectedMethod === 'online' && !selectedProvider;

  const proceedToPayment = () => {
    if (selectedMethod === 'cashier' || selectedProvider) {
      setIsConfirmModalVisible(true);
    }
  };

  const handlePayPress = () => {
    if (!isBirthdayDiscountApplied) {
      setIsPromoReminderVisible(true);
    } else {
      proceedToPayment();
    }
  };

  const handleConfirmCancel = () => {
    setPoints((prev) => prev + 20); // refund 20 points
    setIsBirthdayDiscountApplied(false);
    setShowCancelConfirm(false);
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
          points={hasCustomerInfo ? points : 0}
          neededPoints={hasCustomerInfo ? (100 - points > 0 ? 100 - points : 0) : 100}
          nextTier="silver"
          progressBarWidth={hasCustomerInfo ? `${(points / 100) * 100}%` : '0%'}
          onViewTier={onViewTier}
          onHistoryPress={onHistoryPress}
        />

        {/* Claimable Birthday Greeting OR Non-Birthday Claim Button */}
        {hasCustomerInfo && isUserBirthday && !isBirthdayDiscountApplied ? (
          <BirthdayRewardCard
            hasInfo={hasCustomerInfo}
            name={customerInfo?.name}
            onPress={onClaimRewards}
          />
        ) : !isBirthdayDiscountApplied ? (
          <Pressable onPress={onClaimRewards} style={styles.claimRewardsCard}>
            <View style={styles.claimRewardsLeft}>
              <Text style={styles.giftIcon}>🎁</Text>
              <Text style={styles.claimRewardsText}>Claim Your Rewards!</Text>
            </View>
            <Icon name="chevron-forward" size={18} color="#555555" />
          </Pressable>
        ) : null}

        {/* Applied Birthday Reward Card with Delete Action */}
        {hasCustomerInfo && isBirthdayDiscountApplied && (
          <View style={styles.combinedAppliedCard}>
            {/* Top Part: Birthday Greeting */}
            <Pressable onPress={onClaimRewards} style={styles.combinedAppliedHeader}>
              <View style={styles.combinedAppliedHeaderLeft}>
                <View style={styles.cakeIconContainer}>
                  <GreenCakeIcon />
                </View>
                <View style={styles.combinedAppliedHeaderTexts}>
                  <Text style={styles.combinedAppliedHeaderTitle}>
                    Happy Birthday, {customerInfo?.name} 🎂🎉
                  </Text>
                  <Text style={styles.combinedAppliedHeaderSubtitle}>
                    Enjoy a special birthday offer just for you!
                  </Text>
                </View>
              </View>
              <Icon name="chevron-forward" size={20} color="#999999" />
            </Pressable>

            {/* Divider */}
            <View style={styles.combinedAppliedDivider} />

            {/* Bottom Part: Applied Reward Item Details */}
            <View style={styles.combinedAppliedBody}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500' }} 
                style={styles.combinedAppliedImage} 
              />
              <View style={styles.combinedAppliedBodyTexts}>
                <Text style={styles.combinedAppliedBodyTitle}>Birthday Discount</Text>
                <Text style={styles.combinedAppliedBodySubtitle}>Percentage Discount - 20%</Text>
                <Text style={styles.combinedAppliedBodyPoints}>20 Point</Text>
              </View>
              <Pressable onPress={() => setShowCancelConfirm(true)} style={styles.combinedTrashBtn}>
                <Icon name="trash-outline" size={20} color="#DC2626" />
              </Pressable>
            </View>
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
          setCustomerInfoData(data);
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

      <PromoReminderModal
        visible={isPromoReminderVisible}
        isReturningMember={isReturningMember}
        name={customerInfo?.name || 'Member'}
        onClose={() => setIsPromoReminderVisible(false)}
        onSeePromos={() => {
          setIsPromoReminderVisible(false);
          onClaimRewards();
        }}
        onContinue={() => {
          setIsPromoReminderVisible(false);
          proceedToPayment();
        }}
      />

      <ProcessPaymentModal
        visible={isConfirmModalVisible}
        onClose={() => setIsConfirmModalVisible(false)}
        onConfirm={(simulateFailure) => {
          setIsConfirmModalVisible(false);
          onPay(selectedMethod, selectedProvider, customerInfo, simulateFailure);
        }}
      />

      {/* CONFIRM CANCEL MODAL */}
      <Modal
        visible={showCancelConfirm}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCancelConfirm(false)}
      >
        <View style={styles.bottomSheetOverlay}>
          <Pressable
            style={styles.bottomSheetBackdrop}
            onPress={() => setShowCancelConfirm(false)}
          />
          <View style={styles.bottomSheetContainer}>
            <Pressable
              onPress={() => setShowCancelConfirm(false)}
              style={styles.bottomSheetCloseButton}
            >
              <Icon name="close" size={24} color="#999999" />
            </Pressable>
            
            <Text style={styles.bottomSheetTitle}>
              Do you really want to cancel this exchange?
            </Text>
            <Text style={styles.bottomSheetSubtitle}>
              When you cancel the redemption, the redemption points will be refunded
            </Text>

            <View style={styles.bottomSheetButtonRow}>
              <Pressable
                onPress={handleConfirmCancel}
                style={styles.btnBottomSheetConfirm}
              >
                <Text style={styles.btnBottomSheetConfirmText}>Yes, Cancel</Text>
              </Pressable>
              <Pressable
                onPress={() => setShowCancelConfirm(false)}
                style={styles.btnBottomSheetCancel}
              >
                <Text style={styles.btnBottomSheetCancelText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

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

  appliedRewardImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },

  appliedRewardTexts: {
    flex: 1,
    marginLeft: 12,
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
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
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

  // Bottom Sheet Modal Styles
  bottomSheetOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    justifyContent: 'flex-end',
  },

  bottomSheetBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },

  bottomSheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 36,
  },

  bottomSheetCloseButton: {
    position: 'absolute',
    top: 16,
    right: 24,
    padding: 4,
    zIndex: 10,
  },

  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#171717',
    marginTop: 20,
    marginBottom: 8,
    textAlign: 'center',
  },

  bottomSheetSubtitle: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 28,
    paddingHorizontal: 20,
  },

  bottomSheetButtonRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },

  btnBottomSheetCancel: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  btnBottomSheetCancelText: {
    color: '#171717',
    fontSize: 14,
    fontWeight: '600',
  },

  btnBottomSheetConfirm: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B1D1D',
  },

  btnBottomSheetConfirmText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  combinedAppliedCard: {
    marginHorizontal: 20,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },

  combinedAppliedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },

  combinedAppliedHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },

  combinedAppliedHeaderTexts: {
    flex: 1,
  },

  combinedAppliedHeaderTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#171717',
    marginBottom: 2,
  },

  combinedAppliedHeaderSubtitle: {
    fontSize: 12,
    color: '#999999',
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

  combinedAppliedDivider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginHorizontal: 16,
  },

  combinedAppliedBody: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },

  combinedAppliedImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },

  combinedAppliedBodyTexts: {
    flex: 1,
  },

  combinedAppliedBodyTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 2,
  },

  combinedAppliedBodySubtitle: {
    fontSize: 11,
    color: '#888888',
    marginBottom: 4,
  },

  combinedAppliedBodyPoints: {
    fontSize: 13,
    fontWeight: '600',
    color: '#171717',
  },

  combinedTrashBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  cakeIconWrapperCustom: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },

  candleRow: {
    flexDirection: 'row',
    gap: 3,
    marginBottom: 2,
  },

  candleLine: {
    width: 2,
    height: 5,
    backgroundColor: '#16A34A',
    borderRadius: 1,
  },

  cakeBody: {
    width: 22,
    height: 14,
    backgroundColor: '#16A34A',
    borderRadius: 3,
    justifyContent: 'space-evenly',
    paddingVertical: 1,
  },

  cakeLayer: {
    height: 2,
    backgroundColor: '#F0FDF4',
    marginHorizontal: 2,
    borderRadius: 1,
  },
});

export default Redeem;
