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
  currentPoints?: number;
}

type Tier = 'bronze' | 'silver' | 'gold';

const MembershipTiers = ({
  onBack,
  currentPoints = 0,
}: MembershipTiersProps) => {
  // Determine actual tier based on currentPoints
  const actualMemberTier: Tier = currentPoints < 100 ? 'bronze' : (currentPoints < 1000 ? 'silver' : 'gold');
  
  // Active viewing tier state starts on their actual tier
  const [activeTier, setActiveTier] = useState<Tier>(actualMemberTier);

  const getTierColors = (tier: Tier) => {
    switch (tier) {
      case 'silver':
        return {
          bg: '#9EA6B2',
          badgeBg: '#78716C',
          cardBg: '#8C93A0',
        };
      case 'gold':
        return {
          bg: '#E2AE25',
          badgeBg: '#CA8A04',
          cardBg: '#D49E1B',
        };
      case 'bronze':
      default:
        return {
          bg: '#C18F58',
          badgeBg: '#A16207',
          cardBg: '#C18F58',
        };
    }
  };

  const currentColors = getTierColors(activeTier);

  // Dynamic progress line calculations based on actual user points
  const getProgressWidth = () => {
    const points = currentPoints;
    if (points <= 100) {
      return `${(points / 100) * 50}%`;
    } else if (points <= 1000) {
      return `${50 + ((points - 100) / 900) * 50}%`;
    } else {
      return '100%';
    }
  };

  // Renders 3D hexagon badge using rotated rounded rectangles
  const renderHexBadge = (tier: Tier, isCenter: boolean) => {
    const size = isCenter ? 110 : 44;
    const innerSize = size * 0.82;

    const colors = {
      bronze: {
        outer: '#D1A172',
        inner: '#8E5728',
      },
      silver: {
        outer: '#CBD2DB',
        inner: '#8C93A0',
      },
      gold: {
        outer: '#FEDE6D',
        inner: '#C88E10',
      },
    }[tier];

    const outerRectStyle = {
      width: size,
      height: size / Math.sqrt(3),
      position: 'absolute' as const,
      borderRadius: size * 0.05,
      backgroundColor: colors.outer,
    };

    const innerRectStyle = {
      width: innerSize,
      height: innerSize / Math.sqrt(3),
      position: 'absolute' as const,
      borderRadius: innerSize * 0.05,
      backgroundColor: colors.inner,
    };

    return (
      <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        {/* Concentric Outer Hexagon */}
        <View style={[outerRectStyle, { transform: [{ rotate: '0deg' }] }]} />
        <View style={[outerRectStyle, { transform: [{ rotate: '60deg' }] }]} />
        <View style={[outerRectStyle, { transform: [{ rotate: '120deg' }] }]} />

        {/* Concentric Inner Hexagon */}
        <View style={{ width: innerSize, height: innerSize, justifyContent: 'center', alignItems: 'center', position: 'absolute' }}>
          <View style={[innerRectStyle, { transform: [{ rotate: '0deg' }] }]} />
          <View style={[innerRectStyle, { transform: [{ rotate: '60deg' }] }]} />
          <View style={[innerRectStyle, { transform: [{ rotate: '120deg' }] }]} />
          
          {/* Central Tier Star */}
          <Icon name="star" size={isCenter ? 48 : 16} color={colors.outer} />
        </View>
      </View>
    );
  };

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
          {/* Left Navigation Side Badge */}
          {activeTier === 'silver' && (
            <Pressable onPress={() => setActiveTier('bronze')} style={[styles.sideBadge, styles.leftSide]}>
              {renderHexBadge('bronze', false)}
              {actualMemberTier === 'bronze' && (
                <View style={styles.sideActiveCapsule}>
                  <Text style={styles.sideActiveCapsuleText}>Your Tier</Text>
                </View>
              )}
              <Text style={styles.sideBadgeText}>Bronze</Text>
              <Text style={styles.sideBadgePoints}>{'> 0 Point'}</Text>
            </Pressable>
          )}
          {activeTier === 'gold' && (
            <Pressable onPress={() => setActiveTier('silver')} style={[styles.sideBadge, styles.leftSide]}>
              {renderHexBadge('silver', false)}
              {actualMemberTier === 'silver' && (
                <View style={styles.sideActiveCapsule}>
                  <Text style={styles.sideActiveCapsuleText}>Your Tier</Text>
                </View>
              )}
              <Text style={styles.sideBadgeText}>Silver</Text>
              <Text style={styles.sideBadgePoints}>{'> 100 Point'}</Text>
            </Pressable>
          )}

          {/* Centered Active Hexagon Badge */}
          <View style={styles.activeBadgeWrapper}>
            {renderHexBadge(activeTier, true)}
            
            {/* Show "Your Tier" white capsule badge if activeTier matches actual member status */}
            {activeTier === actualMemberTier && (
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

          {/* Right Navigation Side Badge */}
          {activeTier === 'bronze' && (
            <Pressable onPress={() => setActiveTier('silver')} style={[styles.sideBadge, styles.rightSide]}>
              {renderHexBadge('silver', false)}
              {actualMemberTier === 'silver' && (
                <View style={styles.sideActiveCapsule}>
                  <Text style={styles.sideActiveCapsuleText}>Your Tier</Text>
                </View>
              )}
              <Text style={styles.sideBadgeText}>Silver</Text>
              <Text style={styles.sideBadgePoints}>{'> 100 Point'}</Text>
            </Pressable>
          )}
          {activeTier === 'silver' && (
            <Pressable onPress={() => setActiveTier('gold')} style={[styles.sideBadge, styles.rightSide]}>
              {renderHexBadge('gold', false)}
              {actualMemberTier === 'gold' && (
                <View style={styles.sideActiveCapsule}>
                  <Text style={styles.sideActiveCapsuleText}>Your Tier</Text>
                </View>
              )}
              <Text style={styles.sideBadgeText}>Gold</Text>
              <Text style={styles.sideBadgePoints}>{'> 1.000 Point'}</Text>
            </Pressable>
          )}
        </View>

        {/* STEP PROGRESS LINE */}
        <View style={styles.progressTrackContainer}>
          <View style={styles.trackLineContainer}>
            <View style={styles.progressLine} />
            <View style={[styles.progressFilledLine, { width: getProgressWidth() }]} />
          </View>
          
          {/* Interactive Node Dots */}
          <View style={styles.dotsRow}>
            {/* Bronze Node */}
            <Pressable onPress={() => setActiveTier('bronze')} style={styles.progressDotWrapper}>
              <View style={styles.progressDot}>
                <View style={styles.progressDotInner} />
              </View>
            </Pressable>

            {/* Silver Node */}
            <Pressable onPress={() => setActiveTier('silver')} style={styles.progressDotWrapper}>
              <View style={styles.progressDot}>
                <View style={styles.progressDotInner} />
              </View>
            </Pressable>

            {/* Gold Node */}
            <Pressable onPress={() => setActiveTier('gold')} style={styles.progressDotWrapper}>
              <View style={styles.progressDot}>
                <View style={styles.progressDotInner} />
              </View>
            </Pressable>
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
                <Icon name="cloud" size={22} color="#FFFFFF" />
                <View style={[styles.iconOverlayBolt, { backgroundColor: currentColors.cardBg }]}>
                  <Icon name="flash" size={9} color="#FFFFFF" />
                </View>
              </View>
              <Text style={styles.benefitText}>Basic Reward Points</Text>
            </View>

            {/* Card 2 */}
            <View style={[styles.benefitCard, { backgroundColor: currentColors.cardBg }]}>
              <View style={styles.benefitIconContainer}>
                <Icon name="cloud" size={22} color="#FFFFFF" />
                <View style={[styles.iconOverlayBolt, { backgroundColor: currentColors.cardBg }]}>
                  <Icon name="flash" size={9} color="#FFFFFF" />
                </View>
              </View>
              <Text style={styles.benefitText}>Access To General Ongoing Promotions</Text>
            </View>

            {/* Card 3 (Takes 48% width in column 1 of row 2) */}
            <View style={[styles.benefitCard, { backgroundColor: currentColors.cardBg }]}>
              <View style={styles.benefitIconContainer}>
                <Icon name="cloud" size={22} color="#FFFFFF" />
                <View style={[styles.iconOverlayBolt, { backgroundColor: currentColors.cardBg }]}>
                  <Icon name="flash" size={9} color="#FFFFFF" />
                </View>
              </View>
              <Text style={styles.benefitText}>Ability To Collect Points And Upgrade Tie</Text>
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
    height: 170,
  },

  sideBadge: {
    position: 'absolute',
    alignItems: 'center',
    opacity: 0.75,
  },

  leftSide: {
    left: -15,
  },

  rightSide: {
    right: -15,
  },

  sideBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    marginTop: 4,
    fontWeight: '600',
  },

  sideBadgePoints: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 10,
    marginTop: 1,
  },

  sideActiveCapsule: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 4,
  },

  sideActiveCapsuleText: {
    color: '#171717',
    fontSize: 9,
    fontWeight: '700',
  },

  activeBadgeWrapper: {
    alignItems: 'center',
    zIndex: 10,
  },

  activeLabelContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginTop: 8,
  },

  activeLabel: {
    color: '#171717',
    fontSize: 10,
    fontWeight: '700',
  },

  badgeTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 4,
  },

  badgePoints: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 2,
  },

  progressTrackContainer: {
    width: '65%',
    height: 20,
    justifyContent: 'center',
    position: 'relative',
    marginTop: 10,
  },

  trackLineContainer: {
    position: 'absolute',
    left: 7,
    right: 7,
    height: '100%',
    justifyContent: 'center',
  },

  progressLine: {
    position: 'absolute',
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    left: 0,
    right: 0,
    borderRadius: 4,
  },

  progressFilledLine: {
    position: 'absolute',
    height: 8,
    backgroundColor: '#FFFFFF',
    left: 0,
    borderRadius: 4,
  },

  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
  },

  progressDotWrapper: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -8,
  },

  progressDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },

  progressDotInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E69E2E',
  },

  benefitsSheet: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 5,
  },

  benefitsContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },

  sheetTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 4,
  },

  sheetSubtitle: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 20,
  },

  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },

  benefitCard: {
    width: '48%',
    height: 115,
    borderRadius: 12,
    padding: 14,
    justifyContent: 'space-between',
  },

  benefitIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  iconOverlayBolt: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    width: 14,
    height: 14,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },

  benefitText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
  },
});

export default MembershipTiers;
