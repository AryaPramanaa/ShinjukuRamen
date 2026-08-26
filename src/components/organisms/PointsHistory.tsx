import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from '../atoms/Icon';

interface PointsHistoryProps {
  points?: number;
  onBack: () => void;
}

const PointsHistory = ({
  points = 90,
  onBack,
}: PointsHistoryProps) => {
  return (
    <View style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.backBtn}>
          <Icon name="arrow-back" size={24} color="#171717" />
        </Pressable>
        <Text style={styles.headerTitle}>History</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* TOP STATUS CARD */}
        <View style={styles.statusCard}>
          <View style={styles.tierPill}>
            <Icon name="star" size={10} color="#C18F58" />
            <Text style={styles.tierPillText}>Bronze</Text>
          </View>
          
          <Text style={styles.pointsText}>{points} Point</Text>
          <Text style={styles.expiryText}>10 points will expire on April 30, 2026</Text>
        </View>

        {/* LEDGER ENTRIES */}
        
        {/* TODAY */}
        <View style={styles.groupSection}>
          <Text style={styles.groupHeader}>Today</Text>

          <View style={styles.historyRow}>
            <View style={styles.rowLeft}>
              <Text style={styles.actionTitle}>Earn Points</Text>
              <Text style={styles.actionSubtitle}>Expired at 30 April 2026</Text>
            </View>
            <Text style={[styles.amountText, styles.positive]}>+50</Text>
          </View>

          <View style={styles.rowSeparator} />

          <View style={styles.historyRow}>
            <View style={styles.rowLeft}>
              <Text style={styles.actionTitle}>Earn Points</Text>
              <Text style={styles.actionSubtitle}>Expired at 30 April 2026</Text>
            </View>
            <Text style={[styles.amountText, styles.positive]}>+40</Text>
          </View>
        </View>

        {/* YESTERDAY */}
        <View style={styles.groupSection}>
          <Text style={styles.groupHeader}>Yesterday</Text>

          <View style={styles.historyRow}>
            <View style={styles.rowLeft}>
              <Text style={styles.actionTitle}>Points Expired</Text>
              <Text style={styles.actionSubtitle}>Expires on 30 March 2026</Text>
            </View>
            <Text style={[styles.amountText, styles.negative]}>-1.200</Text>
          </View>
        </View>

        {/* SUNDAY, 1 MARCH 2026 */}
        <View style={styles.groupSection}>
          <Text style={styles.groupHeader}>Sunday, 1 March 2026</Text>

          <View style={styles.historyRow}>
            <View style={styles.rowLeft}>
              <Text style={styles.actionTitle}>Get 20% OFF</Text>
              <Text style={styles.actionSubtitle}>Percentage discount</Text>
            </View>
            <Text style={[styles.amountText, styles.negative]}>-200</Text>
          </View>
        </View>

      </ScrollView>

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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  backBtn: {
    padding: 4,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#171717',
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },

  statusCard: {
    backgroundColor: '#C18F58',
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 24,
  },

  tierPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFEFEB',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 8,
  },

  tierPillText: {
    color: '#C18F58',
    fontSize: 10,
    fontWeight: '700',
  },

  pointsText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },

  expiryText: {
    fontSize: 12,
    color: '#FFFFFFEE',
  },

  /* Ledger style */
  groupSection: {
    marginBottom: 24,
  },

  groupHeader: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 12,
    textTransform: 'capitalize',
  },

  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },

  rowLeft: {
    flex: 1,
  },

  actionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 2,
  },

  actionSubtitle: {
    fontSize: 12,
    color: '#888888',
  },

  amountText: {
    fontSize: 14,
    fontWeight: '700',
  },

  positive: {
    color: '#16A34A',
  },

  negative: {
    color: '#DC2626',
  },

  rowSeparator: {
    height: 1,
    backgroundColor: '#F5F5F5',
    marginVertical: 12,
  },
});

export default PointsHistory;
