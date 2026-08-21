import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from '../atoms/Icon';

interface MembershipTiersProps {
  onBack: () => void;
}

type Tier = 'bronze' | 'silver' | 'gold';

const MembershipTiers = ({ onBack }: MembershipTiersProps) => {
  const [activeTier, setActiveTier] = useState<Tier>('bronze');

  const getTierColors = (tier: Tier) => {
    switch (tier) {
      case 'silver':
        return {
          bg: '#9CA3AF',
          badgeBg: '#78716C',
          cardBg: '#8C939F',
          indicator: '#FFFFFF',
        };
      case 'gold':
        return {
          bg: '#EAB308',
          badgeBg: '#CA8A04',
          cardBg: '#DFAB07',
          indicator: '#FFFFFF',
        };
      case 'bronze':
      default:
        return {
          bg: '#C18F58',
          badgeBg: '#A16207',
          cardBg: '#B37D49',
          indicator: '#FFFFFF',
        };
    }
  };

  const currentColors = getTierColors(activeTier);

  return (
    <View style={[styles.container, { backgroundColor: currentColors.bg }]}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle}>Membership Tiers</Text>
      </View>

      {/* TIER DISPLAY AREA */}
      <View style={styles.tierSelectorArea}>
        
        <View style={styles.badgeContainer}>
          {/* Left indicator / side badge */}
          {activeTier === 'silver' && (
            <Pressable onPress={() => setActiveTier('bronze')} style={[styles.sideBadge, styles.leftSide]}>
              <View style={[styles.sideBadgeHex, { backgroundColor: '#CD7F32' }]}>
                <Icon name="star" size={16} color="#FFFFFF" />
              </View>
              <Text style={styles.sideBadgeText}>Bronze</Text>
            </Pressable>
          )}
          {activeTier === 'gold' && (
            <Pressable onPress={() => setActiveTier('silver')} style={[styles.sideBadge, styles.leftSide]}>
              <View style={[styles.sideBadgeHex, { backgroundColor: '#C0C0C0' }]}>
                <Icon name="star" size={16} color="#FFFFFF" />
              </View>
              <Text style={styles.sideBadgeText}>Silver</Text>
            </Pressable>
          )}

          {/* Active Badge (Centered) */}
          <View style={styles.activeBadgeWrapper}>
            <View style={[styles.badgeHex, { backgroundColor: activeTier === 'bronze' ? '#CD7F32' : activeTier === 'silver' ? '#C0C0C0' : '#FFD700' }]}>
              <Icon name="star" size={44} color="#FFFFFF" />
            </View>
            
            {activeTier === 'bronze' && (
              <View style={styles.activeLabelContainer}>
                <Text style={styles.activeLabel}>Your Tier</Text>
              </View>
            )}

            <Text style={styles.badgeTitle}>
              {activeTier.charAt(0).toUpperCase() + activeTier.slice(1)}
            </Text>
            <Text style={styles.badgePoints}>
              {activeTier === 'bronze' ? '> 0 Point' : activeTier === 'silver' ? '> 100 Point' : '> 1.000 Point'}
            </Text>
          </View>

          {/* Right indicator / side badge */}
          {activeTier === 'bronze' && (
            <Pressable onPress={() => setActiveTier('silver')} style={[styles.sideBadge, styles.rightSide]}>
              <View style={[styles.sideBadgeHex, { backgroundColor: '#C0C0C0' }]}>
                <Icon name="star" size={16} color="#FFFFFF" />
              </View>
              <Text style={styles.sideBadgeText}>Silver</Text>
            </Pressable>
          )}
          {activeTier === 'silver' && (
            <Pressable onPress={() => setActiveTier('gold')} style={[styles.sideBadge, styles.rightSide]}>
              <View style={[styles.sideBadgeHex, { backgroundColor: '#FFD700' }]}>
                <Icon name="star" size={16} color="#FFFFFF" />
              </View>
              <Text style={styles.sideBadgeText}>Gold</Text>
            </Pressable>
          )}
        </View>

        {/* STEP PROGRESS LINE */}
        <View style={styles.progressTrackContainer}>
          <View style={styles.progressLine} />
          
          <View style={styles.dotsRow}>
            {/* Bronze Dot */}
            <Pressable
              onPress={() => setActiveTier('bronze')}
              style={[
                styles.progressDot,
                activeTier === 'bronze' && styles.progressDotActive,
              ]}
            />
            {/* Silver Dot */}
            <Pressable
              onPress={() => setActiveTier('silver')}
              style={[
                styles.progressDot,
                activeTier === 'silver' && styles.progressDotActive,
              ]}
            />
            {/* Gold Dot */}
            <Pressable
              onPress={() => setActiveTier('gold')}
              style={[
                styles.progressDot,
                activeTier === 'gold' && styles.progressDotActive,
              ]}
            />
          </View>
        </View>

      </View>

      {/* BENEFITS SHEET */}
      <View style={styles.benefitsSheet}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.benefitsContent}>
          <Text style={styles.sheetTitle}>Benefits of Membership</Text>
          <Text style={styles.sheetSubtitle}>As a member, you'll enjoy many benefits</Text>

          {/* Benefits Grid */}
          <View style={styles.benefitsGrid}>
            
            {/* Card 1 */}
            <View style={[styles.benefitCard, { backgroundColor: currentColors.cardBg }]}>
              <View style={styles.benefitIconContainer}>
                <Icon name="cloud-download-outline" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.benefitText}>Basic Reward Points</Text>
            </View>

            {/* Card 2 */}
            <View style={[styles.benefitCard, { backgroundColor: currentColors.cardBg }]}>
              <View style={styles.benefitIconContainer}>
                <Icon name="megaphone-outline" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.benefitText}>Access To General Ongoing Promotions</Text>
            </View>

            {/* Card 3 */}
            <View style={[styles.benefitCard, { backgroundColor: currentColors.cardBg, width: '100%', marginTop: 12 }]}>
              <View style={styles.benefitIconContainer}>
                <Icon name="trending-up-outline" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.benefitText}>Ability To Collect Points And Upgrade Tier</Text>
            </View>

          </View>
        </ScrollView>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    paddingTop: 45,
    height: 87,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  backButton: {
    marginRight: 15,
    padding: 4,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  tierSelectorArea: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 180,
  },

  sideBadge: {
    position: 'absolute',
    alignItems: 'center',
    opacity: 0.5,
  },

  leftSide: {
    left: 20,
  },

  rightSide: {
    right: 20,
  },

  sideBadgeHex: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  sideBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 6,
    fontWeight: '600',
  },

  activeBadgeWrapper: {
    alignItems: 'center',
    zIndex: 10,
  },

  badgeHex: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  activeLabelContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 8,
  },

  activeLabel: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },

  badgeTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 6,
  },

  badgePoints: {
    fontSize: 12,
    color: '#FFFFFFF0',
    marginTop: 2,
  },

  progressTrackContainer: {
    width: '60%',
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  progressLine: {
    position: 'absolute',
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    left: 0,
    right: 0,
  },

  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 2,
  },

  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },

  progressDotActive: {
    backgroundColor: '#FFFFFF',
    transform: [{ scale: 1.3 }],
  },

  benefitsSheet: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 24,
  },

  benefitsContent: {
    paddingBottom: 40,
  },

  sheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 4,
  },

  sheetSubtitle: {
    fontSize: 13,
    color: '#999999',
    marginBottom: 20,
  },

  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  benefitCard: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    minHeight: 110,
    justifyContent: 'center',
  },

  benefitIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  benefitText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 18,
  },
});

export default MembershipTiers;
