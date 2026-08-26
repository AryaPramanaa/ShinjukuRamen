import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from '../atoms/Icon';

interface ProcessPaymentModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (simulateFailure: boolean) => void;
}

const ProcessPaymentModal = ({
  visible,
  onClose,
  onConfirm,
}: ProcessPaymentModalProps) => {
  const [simulateFailure, setSimulateFailure] = useState(false);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.dialogOverlay}>
        <View style={styles.dialogContainer}>
          
          {/* Close button X on the top left */}
          <Pressable onPress={onClose} style={styles.dialogCloseButton}>
            <Icon name="close" size={24} color="#555555" />
          </Pressable>

          {/* Centered Content */}
          <View style={styles.contentContainer}>
            <Text style={styles.dialogTitle}>Process Payment?</Text>
            <Text style={styles.dialogSubtitle}>
              You will proceed the payment and be charged immediately
            </Text>

            {/* Subtle Simulation Toggle for testing (does not distract layout) */}
            <Pressable
              style={styles.checkboxRow}
              onPress={() => setSimulateFailure(!simulateFailure)}
            >
              <View style={[styles.checkboxOutline, simulateFailure && styles.checkboxActive]}>
                {simulateFailure && <Icon name="checkmark" size={10} color="#FFFFFF" />}
              </View>
              <Text style={styles.checkboxLabel}>Test Payment Failure Flow</Text>
            </Pressable>

            {/* Bottom Actions Row */}
            <View style={styles.dialogActions}>
              <Pressable onPress={onClose} style={styles.btnCancel}>
                <Text style={styles.btnCancelText}>Cancel</Text>
              </Pressable>

              <Pressable
                onPress={() => onConfirm(simulateFailure)}
                style={styles.btnPaymentNow}
              >
                <Text style={styles.btnPaymentNowText}>Payment Now</Text>
              </Pressable>
            </View>
          </View>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  dialogOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end', // Bottom Sheet positioning
  },

  dialogContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 35,
    width: '100%',
    position: 'relative',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },

  dialogCloseButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 4,
    zIndex: 10,
  },

  contentContainer: {
    alignItems: 'center',
    width: '100%',
    paddingTop: 10,
  },

  dialogTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 8,
    textAlign: 'center',
  },

  dialogSubtitle: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
    paddingHorizontal: 20,
  },

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },

  checkboxOutline: {
    width: 14,
    height: 14,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkboxActive: {
    borderColor: '#8B1D1D',
    backgroundColor: '#8B1D1D',
  },

  checkboxLabel: {
    fontSize: 11,
    color: '#A0A0A0',
  },

  dialogActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
  },

  btnCancel: {
    flex: 1,
    height: 46,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  btnCancelText: {
    color: '#171717',
    fontSize: 14,
    fontWeight: '700',
  },

  btnPaymentNow: {
    flex: 1,
    height: 46,
    borderRadius: 8,
    backgroundColor: '#8B1D1D',
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnPaymentNowText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default ProcessPaymentModal;
