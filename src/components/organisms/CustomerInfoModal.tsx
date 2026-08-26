import React, { useState, useEffect } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from '../atoms/Icon';

interface CustomerInfoModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: {
    name: string;
    phone: string;
    email: string;
    dob: string;
    pax: string;
  }) => void;
  initialData?: {
    name: string;
    phone: string;
    email: string;
    dob: string;
    pax: string;
  } | null;
}

const CustomerInfoModal = ({
  visible,
  onClose,
  onSave,
  initialData,
}: CustomerInfoModalProps) => {
  const [phone, setPhone] = useState('+61 ');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [pax, setPax] = useState('');

  // Calendar Modal States
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(7); // August (7)
  const [selectedYear, setSelectedYear] = useState(2000); // 2000

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const yearsArray = Array.from({ length: 77 }, (_, i) => 2026 - i); // 2026 down to 1950

  // Load initial data if editing
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPhone(initialData.phone);
      setEmail(initialData.email);
      setDob(initialData.dob);
      setPax(initialData.pax);
    } else {
      setName('');
      setPhone('+61 ');
      setEmail('');
      setDob('');
      setPax('');
    }
  }, [initialData, visible]);

  const isFormValid =
    phone.trim().length > 4 &&
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    dob.trim().length > 0;

  const handleSave = () => {
    if (isFormValid) {
      onSave({
        name,
        phone,
        email,
        dob,
        pax,
      });
    }
  };

  // Helper to auto-fill for testing/demo
  const handleAutofill = () => {
    setName('Amalia');
    setPhone('+6281234567890');
    setEmail('amaliamhd@gmail.com');
    setDob('August 17, 2000');
    setPax('2');
  };

  // Date selection helpers
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handleDaySelect = (day: number) => {
    const formattedDate = `${months[selectedMonth]} ${day}, ${selectedYear}`;
    setDob(formattedDate);
    setIsCalendarVisible(false);
  };

  const totalDays = getDaysInMonth(selectedMonth, selectedYear);
  const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardView}
        >
          <View style={styles.modalContainer}>
            
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Customer Information</Text>
              <Pressable onPress={onClose} style={styles.closeButton}>
                <Icon name="close" size={24} color="#555555" />
              </Pressable>
            </View>

            {/* Autofill Demo Button */}
            <Pressable onPress={handleAutofill} style={styles.autofillButton}>
              <Text style={styles.autofillText}>⚡ Autofill Mock Data</Text>
            </Pressable>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.form}>
              
              {/* Phone Number */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Phone Number <Text style={styles.required}>*</Text>
                </Text>
                <View style={styles.phoneInputRow}>
                  <View style={styles.countryPicker}>
                    <Text style={styles.flagEmoji}>🇦🇺</Text>
                    <Icon name="chevron-down" size={12} color="#666666" />
                  </View>
                  <TextInput
                    style={styles.phoneInput}
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    placeholder="+61 ..."
                    placeholderTextColor="#CCCCCC"
                  />
                </View>
                <Text style={styles.helperText}>
                  For members, please enter your phone number
                </Text>
              </View>

              {/* Name */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Name <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={styles.textInput}
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter name..."
                  placeholderTextColor="#CCCCCC"
                />
              </View>

              {/* Email */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Email (For electronic receipt) <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={styles.textInput}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder="Enter email..."
                  placeholderTextColor="#CCCCCC"
                />
              </View>

              {/* Date of Birth */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Date of Birth <Text style={styles.required}>*</Text>
                </Text>
                
                {/* Tapping the container opens the calendar date picker */}
                <Pressable onPress={() => setIsCalendarVisible(true)} style={styles.dobInputContainer}>
                  <TextInput
                    style={styles.dobInput}
                    value={dob}
                    editable={false}
                    pointerEvents="none"
                    placeholder="Choose date"
                    placeholderTextColor="#CCCCCC"
                  />
                  <View style={styles.calendarIcon}>
                    <Icon name="calendar-outline" size={20} color="#555555" />
                  </View>
                </Pressable>
              </View>

              {/* Pax */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Pax</Text>
                <TextInput
                  style={styles.textInput}
                  value={pax}
                  onChangeText={setPax}
                  keyboardType="numeric"
                  placeholder="Enter pax..."
                  placeholderTextColor="#CCCCCC"
                />
              </View>

            </ScrollView>

            {/* Save Button */}
            <View style={styles.footer}>
              <Pressable
                style={[
                  styles.saveButton,
                  isFormValid ? styles.saveButtonActive : styles.saveButtonDisabled,
                ]}
                onPress={handleSave}
                disabled={!isFormValid}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </Pressable>
            </View>

          </View>
        </KeyboardAvoidingView>
      </View>

      {/* CUSTOM CALENDAR PICKER MODAL WITH SCROLLING */}
      <Modal
        visible={isCalendarVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsCalendarVisible(false)}
      >
        <View style={styles.calendarOverlay}>
          <View style={styles.calendarCard}>
            
            <Text style={styles.calendarModalTitle}>Select Date of Birth</Text>

            {/* Scrollable Year Selection */}
            <View style={styles.pickerSection}>
              <Text style={styles.pickerSublabel}>Year:</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollChipsRow}
              >
                {yearsArray.map((year) => {
                  const isSelected = selectedYear === year;
                  return (
                    <Pressable
                      key={year}
                      onPress={() => setSelectedYear(year)}
                      style={[styles.chipItem, isSelected && styles.chipItemSelected]}
                    >
                      <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                        {year}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>

            {/* Scrollable Month Selection */}
            <View style={styles.pickerSection}>
              <Text style={styles.pickerSublabel}>Month:</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollChipsRow}
              >
                {months.map((month, idx) => {
                  const isSelected = selectedMonth === idx;
                  return (
                    <Pressable
                      key={month}
                      onPress={() => setSelectedMonth(idx)}
                      style={[styles.chipItem, isSelected && styles.chipItemSelected]}
                    >
                      <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                        {month}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>

            {/* Scrollable Days Selection Grid */}
            <View style={styles.pickerSection}>
              <Text style={styles.pickerSublabel}>Day:</Text>
              <ScrollView
                style={styles.daysScrollView}
                contentContainerStyle={styles.daysGrid}
                showsVerticalScrollIndicator={true}
                nestedScrollEnabled={true}
              >
                {daysArray.map((day) => (
                  <Pressable
                    key={day}
                    onPress={() => handleDaySelect(day)}
                    style={styles.dayBtn}
                  >
                    <Text style={styles.dayBtnText}>{day}</Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>

            {/* Cancel Button */}
            <Pressable
              onPress={() => setIsCalendarVisible(false)}
              style={styles.btnDismissCalendar}
            >
              <Text style={styles.btnDismissCalendarText}>Cancel</Text>
            </Pressable>

          </View>
        </View>
      </Modal>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },

  keyboardView: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
  },

  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
    paddingTop: 15,
  },

  header: {
    height: 45,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#171717',
  },

  closeButton: {
    padding: 4,
  },

  autofillButton: {
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FEF3C7',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 25,
    marginTop: 15,
    alignItems: 'center',
  },

  autofillText: {
    color: '#D97706',
    fontWeight: '700',
    fontSize: 12,
  },

  form: {
    paddingHorizontal: 25,
    paddingTop: 15,
    paddingBottom: 30,
  },

  inputGroup: {
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444444',
    marginBottom: 8,
  },

  required: {
    color: '#DC2626',
  },

  phoneInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  countryPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 10,
    backgroundColor: '#FAFAFA',
    height: 48,
    paddingHorizontal: 12,
    marginRight: 10,
  },

  flagEmoji: {
    fontSize: 18,
  },

  phoneInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 10,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 16,
    color: '#171717',
    fontSize: 14,
  },

  textInput: {
    height: 48,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 10,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 16,
    color: '#171717',
    fontSize: 14,
  },

  helperText: {
    fontSize: 12,
    color: '#999999',
    marginTop: 4,
  },

  dobInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 10,
    backgroundColor: '#FAFAFA',
    paddingRight: 12,
  },

  dobInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 16,
    color: '#171717',
    fontSize: 14,
  },

  calendarIcon: {
    padding: 4,
  },

  footer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },

  saveButton: {
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  saveButtonActive: {
    backgroundColor: '#8B1D1D',
  },

  saveButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },

  /* Calendar picker modal styles */
  calendarOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  calendarCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    width: '92%',
    maxWidth: 340,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  calendarModalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 12,
    textAlign: 'center',
  },

  pickerSection: {
    marginBottom: 12,
  },

  pickerSublabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#777777',
    marginBottom: 6,
  },

  scrollChipsRow: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 2,
  },

  chipItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  chipItemSelected: {
    backgroundColor: '#8B1D1D',
    borderColor: '#8B1D1D',
  },

  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
  },

  chipTextSelected: {
    color: '#FFFFFF',
  },

  daysScrollView: {
    maxHeight: 160,
    width: '100%',
  },

  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'flex-start',
    width: '100%',
    paddingBottom: 8,
  },

  dayBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dayBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#171717',
  },

  btnDismissCalendar: {
    marginTop: 10,
    width: '100%',
    height: 40,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnDismissCalendarText: {
    color: '#666666',
    fontSize: 13,
    fontWeight: '700',
  },
});

export default CustomerInfoModal;
