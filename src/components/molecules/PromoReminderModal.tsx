import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from '../atoms/Icon';

interface PromoReminderModalProps {
  visible: boolean;
  isReturningMember: boolean;
  name: string;
  onClose: () => void;
  onSeePromos: () => void;
  onContinue: () => void;
}

const PromoReminderModal = ({
  visible,
  isReturningMember,
  name,
  onClose,
  onSeePromos,
  onContinue,
}: PromoReminderModalProps) => {
  const firstName = name.trim().split(' ')[0] || 'Member';

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          
          {/* Close Button (X) */}
          <Pressable onPress={onClose} style={styles.closeBtn}>
            <Icon name="close" size={24} color="#999999" />
          </Pressable>

          {/* Ticket Illustration Icon */}
          <View style={styles.illustrationContainer}>
            <View style={styles.ticketShape}>
              <View style={styles.ticketLeftArc} />
              <View style={styles.ticketRightArc} />
              <Text style={styles.percentText}>%</Text>
            </View>
          </View>

          {/* Title */}
          <Text style={styles.titleText}>
            {isReturningMember ? 'Welcome Back, ' : 'Welcome, '}
            <Text style={styles.redName}>{firstName}</Text> 🎉
          </Text>

          {/* Subtitle */}
          <Text style={styles.subtitleText}>
            You've got member discounts available, want to take a look before paying?
          </Text>

          {/* Action Buttons Row */}
          <View style={styles.btnRow}>
            <Pressable onPress={onSeePromos} style={styles.seePromosBtn}>
              <Text style={styles.seePromosText}>See Promos</Text>
            </Pressable>
            <Pressable onPress={onContinue} style={styles.continueBtn}>
              <Text style={styles.continueText}>Continue Payment</Text>
            </Pressable>
          </View>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },

  modalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 35,
    alignItems: 'center',
  },

  closeBtn: {
    alignSelf: 'flex-start',
    padding: 4,
    marginBottom: 8,
  },

  illustrationContainer: {
    width: '100%',
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  ticketShape: {
    width: 140,
    height: 80,
    backgroundColor: '#DC2626',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },

  ticketLeftArc: {
    position: 'absolute',
    left: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },

  ticketRightArc: {
    position: 'absolute',
    right: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },

  percentText: {
    fontSize: 36,
    color: '#FFFFFF',
    fontWeight: '800',
  },

  titleText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#171717',
    textAlign: 'center',
    marginBottom: 10,
  },

  redName: {
    color: '#B91C1C',
  },

  subtitleText: {
    fontSize: 13,
    color: '#888888',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 28,
    paddingHorizontal: 20,
  },

  btnRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },

  seePromosBtn: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  seePromosText: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '600',
  },

  continueBtn: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#8B1D1D',
    alignItems: 'center',
    justifyContent: 'center',
  },

  continueText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default PromoReminderModal;
