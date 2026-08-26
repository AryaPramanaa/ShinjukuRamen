import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ReceiptPointsProps {
  currentPoints?: number;
  redeemedPoints?: number;
  rewardPoints?: number;
  finalPoints?: number;
  showFinalTotal?: boolean;
  congratsPoints?: number;
}

const ReceiptPoints = ({
  currentPoints = 90,
  redeemedPoints = 20,
  rewardPoints = 100,
  finalPoints = 170,
  showFinalTotal = true,
  congratsPoints,
}: ReceiptPointsProps) => {
  const displayCongratsPoints = congratsPoints !== undefined ? congratsPoints : rewardPoints;

  return (
    <View style={styles.container}>
      <View style={styles.pointRow}>
        <Text style={styles.pointLabel}>Member Tier</Text>
        <Text style={styles.pointValue}>Bronze</Text>
      </View>

      <View style={styles.pointRow}>
        <Text style={styles.pointLabel}>Current Points</Text>
        <Text style={styles.pointValue}>{currentPoints} Poin</Text>
      </View>

      <View style={styles.pointRow}>
        <Text style={styles.pointLabel}>Redeeming Points</Text>
        <Text style={[styles.pointValue, { color: '#DC2626' }]}>- {redeemedPoints} Poin</Text>
      </View>

      <View style={styles.pointRow}>
        <Text style={styles.pointLabel}>Rewards from purchases</Text>
        <Text style={[styles.pointValue, { color: '#16A34A' }]}>+ {rewardPoints} Poin</Text>
      </View>

      {showFinalTotal && (
        <View style={styles.pointRow}>
          <Text style={[styles.pointLabel, { fontWeight: '700' }]}>Final Total Points</Text>
          <Text style={[styles.pointValue, { fontWeight: '700' }]}>{finalPoints} Poin</Text>
        </View>
      )}

      <View style={styles.congratsContainer}>
        <Text style={styles.congratsText}>
          Congrats! You've got a total of {displayCongratsPoints} points! 🥳🥳🥳
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
    width: '100%',
  },

  pointRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  pointLabel: {
    fontSize: 13,
    color: '#666666',
  },

  pointValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#171717',
  },

  congratsContainer: {
    alignItems: 'center',
    marginVertical: 4,
    marginTop: 12,
  },

  congratsText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#171717',
    textAlign: 'center',
  },
});

export default ReceiptPoints;
