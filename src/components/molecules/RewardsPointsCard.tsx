import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import Icon from '../atoms/Icon';

interface RewardsPointsCardProps {
  hasInfo: boolean;
  points?: number;
  onViewTier: () => void;
  onHistoryPress?: () => void;
  isTransparentMode?: boolean;
  hideTitle?: boolean;
}

const getTierTheme = (pts: number) => {
  if (pts <= 100) {
    return {
      bg: '#B37648', // Bronze copper
      image: require('../../Assets/tier_bronze.png'),
      next: 'silver',
      needed: 100 - pts > 0 ? 100 - pts : 0,
      progress: `${Math.max(0, Math.min(100, (pts / 100) * 100))}%`,
    };
  } else if (pts <= 1000) {
    return {
      bg: '#8E9AA6', // Silver-gray
      image: require('../../Assets/tier_silver.png'),
      next: 'gold',
      needed: 1000 - pts > 0 ? 1000 - pts : 0,
      progress: `${Math.max(0, Math.min(100, ((pts - 100) / 900) * 100))}%`,
    };
  } else {
    return {
      bg: '#C59E27', // Gold-yellow
      image: require('../../Assets/tier_gold.png'),
      next: 'none',
      needed: 0,
      progress: '100%',
    };
  }
};

const RewardsPointsCard = ({
  hasInfo,
  points = 90,
  onViewTier,
  onHistoryPress,
  isTransparentMode = false,
  hideTitle = false,
}: RewardsPointsCardProps) => {
  const theme = getTierTheme(points);

  return (
    <View style={[styles.container, hideTitle && styles.containerNoTitle]}>
      {!hideTitle && <Text style={styles.sectionTitle}>Your Rewards</Text>}

      {!hasInfo ? (
        /* Empty State Rewards Card */
        <View style={styles.emptyRewardsCard}>
          <View style={styles.emptyRewardsHeader}>
            <View style={styles.pointsTextContainer}>
              <Text style={styles.emptyPointsText}>0 Point</Text>
              <Text style={styles.emptyPointsSubtitle}>
                Please enter your customer data first.
              </Text>
            </View>
            <Pressable onPress={onHistoryPress} style={styles.emptyHistoryBtn}>
              <Icon name="time-outline" size={20} color="#171717" />
            </Pressable>
          </View>
          
          <View style={styles.cardSeparator} />

          <Pressable onPress={onViewTier} style={styles.emptyTierLinkRow}>
            <View style={styles.tierLinkLabel}>
              <Image 
                source={require('../../Assets/tier_bronze.png')} 
                style={styles.tierMedalIcon} 
              />
              <Text style={styles.emptyTierLinkText}>View Tier</Text>
            </View>
            <Icon name="chevron-forward" size={16} color="#999999" />
          </Pressable>
        </View>
      ) : (
        /* Active Rewards Card */
        <Pressable 
          onPress={onViewTier} 
          style={[
            styles.rewardsCard, 
            { backgroundColor: theme.bg },
            isTransparentMode && styles.transparentRewardsCard
          ]}
        >
          <View style={styles.rewardsHeader}>
            <Text style={styles.pointsText}>{points} Point</Text>
            <Pressable onPress={onHistoryPress} style={styles.historyBtn}>
              <Icon name="time-outline" size={20} color="#FFFFFF" />
            </Pressable>
          </View>
          
          <Text style={styles.tierStatus}>
            {theme.next === 'none' 
              ? 'You have achieved Gold Tier!' 
              : `You need ${theme.needed} points to reach the ${theme.next} tier`
            }
          </Text>
          
          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarFilled, { width: theme.progress as any }]} />
          </View>

          <View style={styles.tierLinkRow}>
            <View style={styles.tierLinkLabel}>
              <Image 
                source={theme.image} 
                style={styles.tierMedalIcon} 
              />
              <Text style={styles.tierLinkText}>View Your Tier</Text>
            </View>
            <Icon name="chevron-forward" size={16} color="#FFFFFF" />
          </View>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  containerNoTitle: {
    paddingHorizontal: 0,
    marginTop: 0,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#171717',
    marginBottom: 10,
  },

  /* Empty Rewards Card */
  emptyRewardsCard: {
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },

  emptyRewardsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  pointsTextContainer: {
    flex: 1,
  },

  emptyPointsText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#CCCCCC',
  },

  emptyPointsSubtitle: {
    fontSize: 12,
    color: '#999999',
    marginTop: 2,
  },

  emptyHistoryBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardSeparator: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginHorizontal: -16,
    marginBottom: 12,
  },

  emptyTierLinkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  emptyTierLinkText: {
    fontSize: 13,
    color: '#171717',
    fontWeight: '600',
  },

  /* Active Rewards Card */
  rewardsCard: {
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  transparentRewardsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    elevation: 0,
    shadowOpacity: 0,
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

  historyBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tierStatus: {
    fontSize: 13,
    color: '#FFFFFFEE',
    marginBottom: 8,
  },

  progressBarContainer: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    width: '100%',
    marginBottom: 16,
  },

  progressBarFilled: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },

  tierLinkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.15)',
    paddingTop: 12,
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },

  tierLinkLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  tierMedalIcon: {
    width: 20,
    height: 20,
  },

  tierLinkText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default RewardsPointsCard;
