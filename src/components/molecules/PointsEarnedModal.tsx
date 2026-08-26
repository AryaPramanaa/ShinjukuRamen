import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

interface PointsEarnedModalProps {
  visible: boolean;
  onClose: () => void;
  pointsEarned?: number;
}

const PointsEarnedModal = ({
  visible,
  onClose,
  pointsEarned = 100,
}: PointsEarnedModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          
          {/* Confetti Emoji */}
          <View style={styles.iconContainer}>
            <Text style={styles.emojiText}>🎉</Text>
          </View>

          {/* Points Title */}
          <Text style={styles.title}>You get {pointsEarned} points</Text>
          
          {/* Subtitle */}
          <Text style={styles.subtitle}>
            You can redeem your points on your next purchase
          </Text>

          {/* Dismiss button */}
          <Pressable onPress={onClose} style={styles.btnUnderstand}>
            <Text style={styles.btnUnderstandText}>I Understand</Text>
          </Pressable>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end', // Align to bottom
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 35,
    width: '100%',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },

  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFFBEB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  emojiText: {
    fontSize: 32,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 8,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 13,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 24,
    paddingHorizontal: 20,
  },

  btnUnderstand: {
    backgroundColor: '#8B1D1D',
    width: '100%',
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnUnderstandText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default PointsEarnedModal;
