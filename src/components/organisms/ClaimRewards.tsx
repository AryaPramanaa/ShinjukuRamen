import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
} from 'react-native';
import Icon from '../atoms/Icon';
import { useNavigation } from '@react-navigation/native';
import RewardsPointsCard from '../molecules/RewardsPointsCard';
import { useApp } from '../../context/AppContext';

interface ClaimRewardsProps {
  onBack: () => void;
  onViewTier: () => void;
  onHistoryPress?: () => void;
  isBirthday?: boolean;
}

type TabType = 'All' | 'Free Item' | 'Discount';

const ClaimRewards = ({
  onBack,
  onViewTier,
  onHistoryPress,
  isBirthday = true,
}: ClaimRewardsProps) => {
  const {
    points,
    setPoints,
    isBirthdayDiscountApplied,
    setIsBirthdayDiscountApplied,
    isFreeRamenApplied,
    setIsFreeRamenApplied,
    customerInfoData,
  } = useApp();

  const isBirthdayToday = (dobString?: string) => {
    if (!dobString) return false;
    const today = new Date();
    const currentMonth = today.toLocaleString('en-US', { month: 'long' }).toLowerCase();
    const currentDate = today.getDate();
    const lowerDob = dobString.toLowerCase();
    return lowerDob.includes(currentMonth) && new RegExp(`\\b${currentDate}\\b`).test(lowerDob);
  };

  const isUserBirthday = customerInfoData !== null && isBirthdayToday(customerInfoData?.dob);

  const [activeTab, setActiveTab] = useState<TabType>('All');
  
  // Redeem Confirmation States
  const [showRedeemConfirm, setShowRedeemConfirm] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [selectedRewardCost, setSelectedRewardCost] = useState(0);
  const [selectedRewardType, setSelectedRewardType] = useState<'birthday' | 'ramen' | null>(null);

  const tabs: TabType[] = ['All', 'Free Item', 'Discount'];

  // Item point thresholds
  const birthdayCost = 20;
  const ramenCost = 90;
  const disc20Cost = 20000;
  const disc10Cost = 100000;

  const triggerRedeem = (cost: number, type: 'birthday' | 'ramen') => {
    setSelectedRewardCost(cost);
    setSelectedRewardType(type);
    setShowRedeemConfirm(true);
  };

  const triggerCancel = (cost: number, type: 'birthday' | 'ramen') => {
    setSelectedRewardCost(cost);
    setSelectedRewardType(type);
    setShowCancelConfirm(true);
  };

  const handleConfirmRedeem = () => {
    setPoints((prev) => prev - selectedRewardCost);
    if (selectedRewardType === 'birthday') {
      setIsBirthdayDiscountApplied(true);
    } else if (selectedRewardType === 'ramen') {
      setIsFreeRamenApplied(true);
    }
    setShowRedeemConfirm(false);
  };

  const handleConfirmCancel = () => {
    setPoints((prev) => prev + selectedRewardCost);
    if (selectedRewardType === 'birthday') {
      setIsBirthdayDiscountApplied(false);
    } else if (selectedRewardType === 'ramen') {
      setIsFreeRamenApplied(false);
    }
    setShowCancelConfirm(false);
  };

  const getHeaderBgColor = (pts: number) => {
    if (pts <= 100) return '#B37648'; // Bronze
    if (pts <= 1000) return '#8E9AA6'; // Silver
    return '#C59E27'; // Gold
  };

  const headerBg = getHeaderBgColor(points);

  return (
    <View style={[styles.container, { backgroundColor: headerBg }]}>
      
      {/* GOLD HEADER BANNER */}
      <View style={[styles.headerBanner, { backgroundColor: headerBg }]}>
        <View style={styles.headerTop}>
          <Pressable onPress={onBack} style={styles.backBtn}>
            <Icon name="arrow-back" size={24} color="#FFFFFF" />
          </Pressable>
          <Text style={styles.headerTitle}>Claim Your Rewards</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Embedded points card molecule */}
        <View style={styles.pointsCardWrapper}>
          <RewardsPointsCard
            hasInfo={true}
            points={points}
            onViewTier={onViewTier}
            onHistoryPress={onHistoryPress}
            isTransparentMode={true}
            hideTitle={true}
          />
        </View>
      </View>

      {/* WHITE BODY CONTAINER WITH ROUNDED TOP CORNERS */}
      <View style={styles.bodyContainer}>
        
        {/* TABS CONTAINER */}
        <View style={styles.tabContainer}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <Pressable
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[styles.tabButton, isActive && styles.tabButtonActive]}
              >
                <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                  {tab}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* SCROLLABLE LIST */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* SECTION 1: BIRTHDAY REWARDS (Only rendered if it is user's birthday today) */}
          {isUserBirthday && (activeTab === 'All' || activeTab === 'Free Item' || activeTab === 'Discount') && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Especially for you on your birthday 🎂🎉</Text>
              <Text style={styles.sectionSubtitle}>Enjoy these benefits on your birthday</Text>

              {/* Fixed Width Vertical Birthday Card */}
              <View style={styles.rewardCardLarge}>
                <View style={styles.rewardImagePlaceholder}>
                  <Text style={styles.birthdayIconLarge}>🎂</Text>
                  <Text style={styles.birthdayTextOverlay}>Happy Birthday</Text>
                </View>
                
                <View style={styles.rewardCardDetails}>
                  <Text style={styles.rewardTitle}>Birthday Discount</Text>
                  <Text style={styles.rewardSubtitle}>Percentage Discount - 20%</Text>
                  <Text style={styles.rewardPointsLarge}>20 Point</Text>
                  
                  {isBirthdayDiscountApplied ? (
                    <Pressable
                      onPress={() => triggerCancel(birthdayCost, 'birthday')}
                      style={styles.btnRedeemApplied}
                    >
                      <Text style={styles.btnRedeemAppliedText}>Remove</Text>
                    </Pressable>
                  ) : points >= birthdayCost ? (
                    <Pressable
                      onPress={() => triggerRedeem(birthdayCost, 'birthday')}
                      style={styles.btnRedeemActive}
                    >
                      <Text style={styles.btnRedeemText}>Redeem</Text>
                    </Pressable>
                  ) : (
                    <Pressable disabled={true} style={styles.btnRedeemDisabled}>
                      <Text style={styles.btnRedeemTextDisabled}>Redeem</Text>
                    </Pressable>
                  )}
                </View>
              </View>
            </View>
          )}

          {/* SECTION 2: FREE ITEM REWARDS */}
          {(activeTab === 'All' || activeTab === 'Free Item') && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Free delicious food for you</Text>
              <Text style={styles.sectionSubtitle}>Redeem now before supplies run out</Text>

              <View style={styles.rewardCardRow}>
                <View style={styles.foodImagePlaceholder}>
                  <Text style={styles.foodIconLarge}>🍜</Text>
                </View>
                
                <View style={styles.rewardRowContent}>
                  <View>
                    <Text style={styles.rewardTitle}>Complimentary Delights</Text>
                    <Text style={styles.rewardSubtitle}>Free Item - Special Shinjuku Ramen</Text>
                  </View>
                  
                  {/* Points activation logic */}
                  <View style={styles.rewardRowBottom}>
                    <Text style={styles.rewardPoints}>90 Point</Text>
                    {isFreeRamenApplied ? (
                      <Pressable
                        onPress={() => triggerCancel(ramenCost, 'ramen')}
                        style={styles.btnRowRedeemApplied}
                      >
                        <Text style={styles.btnRedeemAppliedText}>Remove</Text>
                      </Pressable>
                    ) : points >= ramenCost ? (
                      <Pressable
                        onPress={() => triggerRedeem(ramenCost, 'ramen')}
                        style={styles.btnRowRedeem}
                      >
                        <Text style={styles.btnRedeemText}>Redeem</Text>
                      </Pressable>
                    ) : (
                      <Pressable disabled={true} style={styles.btnRowRedeemDisabled}>
                        <Text style={styles.btnRedeemTextDisabled}>Redeem</Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* SECTION 3: NORMAL DISCOUNTS */}
          {(activeTab === 'All' || activeTab === 'Discount') && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Discount on your purchase</Text>
              <Text style={styles.sectionSubtitle}>Redeem it now</Text>

              {/* Card 1: 20% OFF (Cost 20,000 Poin) */}
              <View style={styles.rewardCardRow}>
                <View style={styles.discountPlaceholder}>
                  <Text style={styles.discountText}>-20%</Text>
                </View>
                
                <View style={styles.rewardRowContent}>
                  <View>
                    <Text style={styles.rewardTitle} numberOfLines={1}>
                      Enjoy a fantastic 20% discount
                    </Text>
                    <Text style={styles.rewardSubtitle}>Percentage Discount - 20%</Text>
                  </View>
                  
                  <View style={styles.rewardRowBottom}>
                    <Text style={styles.rewardPoints}>20.000 Point</Text>
                    {points >= disc20Cost ? (
                      <Pressable style={styles.btnRowRedeem}>
                        <Text style={styles.btnRedeemText}>Redeem</Text>
                      </Pressable>
                    ) : (
                      <Pressable disabled={true} style={styles.btnRowRedeemDisabled}>
                        <Text style={styles.btnRedeemTextDisabled}>Redeem</Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              </View>

              {/* Card 2: $10.00 OFF (Cost 100,000 Poin) */}
              <View style={styles.rewardCardRow}>
                <View style={styles.discountPlaceholder}>
                  <Text style={styles.discountText}>-$10.00</Text>
                </View>
                
                <View style={styles.rewardRowContent}>
                  <View>
                    <Text style={styles.rewardTitle} numberOfLines={1}>
                      Enjoy a fantastic $10.00 discount
                    </Text>
                    <Text style={styles.rewardSubtitle}>Amount Discount - $10.00</Text>
                  </View>
                  
                  <View style={styles.rewardRowBottom}>
                    <Text style={styles.rewardPoints}>100.000 Point</Text>
                    {points >= disc10Cost ? (
                      <Pressable style={styles.btnRowRedeem}>
                        <Text style={styles.btnRedeemText}>Redeem</Text>
                      </Pressable>
                    ) : (
                      <Pressable disabled={true} style={styles.btnRowRedeemDisabled}>
                        <Text style={styles.btnRedeemTextDisabled}>Redeem</Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              </View>
            </View>
          )}

        </ScrollView>
      </View>

      {/* CONFIRM REDEEM MODAL */}
      <Modal
        visible={showRedeemConfirm}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowRedeemConfirm(false)}
      >
        <View style={styles.bottomSheetOverlay}>
          <Pressable
            style={styles.bottomSheetBackdrop}
            onPress={() => setShowRedeemConfirm(false)}
          />
          <View style={styles.bottomSheetContainer}>
            <Pressable
              onPress={() => setShowRedeemConfirm(false)}
              style={styles.bottomSheetCloseButton}
            >
              <Icon name="close" size={24} color="#999999" />
            </Pressable>
            
            <Text style={styles.bottomSheetTitle}>
              Are you sure you want to redeem this?
            </Text>
            <Text style={styles.bottomSheetSubtitle}>
              Once you have made the exchange, it can be canceled.
            </Text>

            <View style={styles.bottomSheetButtonRow}>
              <Pressable
                onPress={() => setShowRedeemConfirm(false)}
                style={styles.btnBottomSheetCancel}
              >
                <Text style={styles.btnBottomSheetCancelText}>Cancel</Text>
              </Pressable>
              <Pressable
                onPress={handleConfirmRedeem}
                style={styles.btnBottomSheetConfirm}
              >
                <Text style={styles.btnBottomSheetConfirmText}>Yes, Redeem</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

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
    backgroundColor: '#B37648',
  },

  headerBanner: {
    backgroundColor: '#B37648',
    paddingTop: 45,
    paddingBottom: 24,
  },

  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 12,
  },

  backBtn: {
    padding: 4,
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  pointsCardWrapper: {
    marginHorizontal: 20,
  },

  bodyContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 8,
  },

  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
    paddingHorizontal: 20,
  },

  tabButton: {
    paddingVertical: 14,
    marginRight: 24,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },

  tabButtonActive: {
    borderBottomColor: '#8B1D1D',
  },

  tabText: {
    fontSize: 14,
    color: '#888888',
    fontWeight: '600',
  },

  tabTextActive: {
    color: '#171717',
    fontWeight: '700',
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 3,
  },

  sectionSubtitle: {
    fontSize: 11,
    color: '#999999',
    marginBottom: 14,
  },

  rewardCardLarge: {
    width: 230,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },

  rewardImagePlaceholder: {
    height: 120,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  birthdayIconLarge: {
    fontSize: 54,
  },

  birthdayTextOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 12,
    color: '#171717',
    fontWeight: '800',
    fontSize: 14,
  },

  rewardCardDetails: {
    padding: 14,
  },

  rewardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 4,
  },

  rewardSubtitle: {
    fontSize: 11,
    color: '#888888',
    marginBottom: 6,
  },

  rewardPointsLarge: {
    fontSize: 13,
    fontWeight: '600',
    color: '#171717',
    marginBottom: 10,
  },

  btnRedeemActive: {
    backgroundColor: '#8B1D1D',
    height: 36,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  btnRedeemDisabled: {
    backgroundColor: '#E5E5E5',
    height: 36,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  btnRedeemText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  btnRedeemTextDisabled: {
    color: '#A0A0A0',
    fontSize: 13,
    fontWeight: '700',
  },

  // Applied Redeem Button Styles
  btnRedeemApplied: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#8B1D1D',
    height: 36,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  btnRedeemAppliedText: {
    color: '#8B1D1D',
    fontSize: 13,
    fontWeight: '700',
  },

  btnRowRedeemApplied: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#8B1D1D',
    paddingHorizontal: 16,
    height: 32,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },

  rewardCardRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },

  foodImagePlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  foodIconLarge: {
    fontSize: 32,
  },

  discountPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },

  discountText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#999999',
  },

  rewardRowContent: {
    flex: 1,
    justifyContent: 'space-between',
    minHeight: 64,
  },

  rewardRowBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },

  rewardPoints: {
    fontSize: 13,
    fontWeight: '600',
    color: '#171717',
  },

  btnRowRedeem: {
    backgroundColor: '#8B1D1D',
    paddingHorizontal: 16,
    height: 32,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnRowRedeemDisabled: {
    backgroundColor: '#E5E5E5',
    paddingHorizontal: 16,
    height: 32,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default ClaimRewards;
