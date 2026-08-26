import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface WelcomeMemberModalProps {
  visible: boolean;
  isReturningMember?: boolean;
  name?: string;
  onClose: () => void;
}

const WelcomeMemberModal = ({
  visible,
  isReturningMember = false,
  name = 'Amal',
  onClose,
}: WelcomeMemberModalProps) => {
  // Extract first name for greeting
  const firstName = name.trim().split(' ')[0] || 'Amal';

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          
          {/* Top Emoji */}
          <View style={styles.emojiContainer}>
            <Text style={styles.emojiText}>
              {isReturningMember ? '👋' : '🎉'}
            </Text>
          </View>

          {/* Title */}
          <Text style={styles.titleText}>
            {isReturningMember
              ? `Hey, ${firstName}! Great to see you back!`
              : `Hey, ${firstName}! Welcome as a new member!`}
          </Text>

          {/* Subtitle */}
          <Text style={styles.subtitleText}>
            {isReturningMember
              ? "Don't hesitate to swap your membership for exciting rewards that await you!"
              : 'Unlock exciting rewards by redeeming your membership points later!'}
          </Text>

          {/* Action Button */}
          <Pressable onPress={onClose} style={styles.understandBtn}>
            <Text style={styles.understandBtnText}>I Understand</Text>
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
    justifyContent: 'flex-end',
  },

  modalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 35,
    alignItems: 'center',
  },

  emojiContainer: {
    marginBottom: 16,
  },

  emojiText: {
    fontSize: 48,
  },

  titleText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#171717',
    textAlign: 'center',
    marginBottom: 10,
  },

  subtitleText: {
    fontSize: 13,
    color: '#888888',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 24,
    paddingHorizontal: 10,
  },

  understandBtn: {
    backgroundColor: '#8B1D1D',
    height: 48,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  understandBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default WelcomeMemberModal;
