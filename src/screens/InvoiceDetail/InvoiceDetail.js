import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
  Modal,
  FlatList,
} from 'react-native';
import { appColors } from '../../utils/appColors';
import BackIcon from '../../assets/svg/BackIcon';
import ErrowSettingIcon from '../../assets/svg/ErrowSettingIcon';
import DownBlackIcon from '../../assets/svg/DownBlackIcon';

const PARISHES = [
  'Kingston',
  'St. Andrew',
  'St. Thomas',
  'Portland',
  'St. Mary',
  'St. Ann',
  'Trelawny',
  'St. James',
  'Hanover',
  'Westmoreland',
  'St. Elizabeth',
  'Manchester',
  'Clarendon',
  'St. Catherine',
];

// ── Country list ──────────────────────────────────────────
const COUNTRIES = [
  { code: '+1', flag: '🇯🇲', name: 'Jamaica' },
  { code: '+1', flag: '🇺🇸', name: 'USA' },
  { code: '+44', flag: '🇬🇧', name: 'UK' },
  { code: '+91', flag: '🇮🇳', name: 'India' },
  { code: '+1', flag: '🇨🇦', name: 'Canada' },
  { code: '+61', flag: '🇦🇺', name: 'Australia' },
  { code: '+49', flag: '🇩🇪', name: 'Germany' },
  { code: '+33', flag: '🇫🇷', name: 'France' },
  { code: '+55', flag: '🇧🇷', name: 'Brazil' },
  { code: '+52', flag: '🇲🇽', name: 'Mexico' },
  { code: '+234', flag: '🇳🇬', name: 'Nigeria' },
  { code: '+27', flag: '🇿🇦', name: 'South Africa' },
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: '+65', flag: '🇸🇬', name: 'Singapore' },
];

const InvoiceDetail = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]); // Jamaica default
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [selectedParish, setSelectedParish] = useState('');
  const [showParishDropdown, setShowParishDropdown] = useState(false);
  const [timeLeft, setTimeLeft] = useState(4 * 60 + 59);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = seconds => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const isConfirmEnabled =
    name.trim() !== '' &&
    email.trim() !== '' &&
    phoneNumber.trim() !== '' &&
    selectedParish !== '';

  return (
    <>
      <View style={styles.statusBar}>
        <StatusBar barStyle="light-content" backgroundColor="#0F7754" />
      </View>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation?.goBack()}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <BackIcon />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.eventTitle} numberOfLines={1}>
              Skinz Nipple | Genie Events
            </Text>
            <Text style={styles.eventSubtitle}>
              Sat, 22 June | 7:00 PM | Kingston Arena
            </Text>
          </View>
        </View>

        {/* Timer Banner */}
        <View style={styles.timerBanner}>
          <Text style={styles.timerText}>
            Secure your ticket in{' '}
            <Text style={styles.timerCountdown}>{formatTime(timeLeft)}</Text>{' '}
            mins
          </Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Section Divider */}
          <View style={styles.sectionHeader}>
            <View style={styles.dividerLine} />
            <Text style={styles.sectionTitle}>INVOICE DETAILS</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Name Field */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter name *"
              placeholderTextColor="#aaa"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

          {/* ── Phone Row ── */}
          <View style={styles.phoneRow}>
            {/* Country Code Box — tappable, opens modal */}
            <TouchableOpacity
              style={[styles.inputWrapper, styles.phoneCodeBox]}
              onPress={() => setShowCountryModal(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.flagEmoji}>{selectedCountry.flag}</Text>
              <Text style={styles.countryCode}>{selectedCountry.code}</Text>
              {/* <Text style={styles.chevronSmall}>⌄</Text> */}
            </TouchableOpacity>

            {/* Phone Number Input */}
            <View style={[styles.inputWrapper, styles.phoneNumberBox]}>
              <TextInput
                style={styles.input}
                placeholder="Phone number *"
                placeholderTextColor="#aaa"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                maxLength={15}
              />
            </View>
          </View>

          <View style={styles.helperRow}>
            <ErrowSettingIcon />
            <Text style={styles.helperText}>
              Enter your mobile number to receive ticket confirmation
            </Text>
          </View>

          {/* Email Field */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Email address *"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.helperRow}>
            <ErrowSettingIcon />
            <Text style={styles.helperText}>
              Email ID is required to send tickets and updates
            </Text>
          </View>

          {/* Parish Dropdown */}
          <TouchableOpacity
            style={styles.inputWrapper}
            onPress={() => setShowParishDropdown(!showParishDropdown)}
            activeOpacity={0.8}
          >
            <View style={styles.selectRow}>
              <Text
                style={[
                  styles.selectText,
                  selectedParish ? styles.selectTextFilled : null,
                ]}
              >
                {selectedParish || 'Select Parish'}
              </Text>
              <View
                style={[
                  styles.chevron,
                  // showParishDropdown ? styles.chevronUp : null,
                ]}
              >
                <DownBlackIcon />
              </View>
            </View>
          </TouchableOpacity>

          {showParishDropdown && (
            <View style={styles.dropdown}>
              <ScrollView nestedScrollEnabled style={styles.dropdownScroll}>
                {PARISHES.map(parish => (
                  <TouchableOpacity
                    key={parish}
                    style={[
                      styles.dropdownItem,
                      selectedParish === parish && styles.dropdownItemSelected,
                    ]}
                    onPress={() => {
                      setSelectedParish(parish);
                      setShowParishDropdown(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        selectedParish === parish &&
                          styles.dropdownItemTextSelected,
                      ]}
                    >
                      {parish}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          <View style={styles.helperRow}>
            <ErrowSettingIcon />
            <Text style={styles.helperText}>
              Needed for generating tax invoice
            </Text>
          </View>

          <View style={styles.spacer} />

          {/* Confirm Button */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={[
                styles.confirmButton,
                isConfirmEnabled
                  ? styles.confirmButtonActive
                  : styles.confirmButtonDisabled,
              ]}
              disabled={!isConfirmEnabled}
              activeOpacity={0.85}
              onPress={() => {
                navigation.navigate('ReviewBooking');
              }}
            >
              <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* ── Country Picker Modal ── */}
        <Modal
          visible={showCountryModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowCountryModal(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowCountryModal(false)}
          >
            <View style={styles.modalSheet}>
              <View style={styles.modalHandle} />
              <Text style={styles.modalTitle}>Select Country</Text>
              <FlatList
                data={COUNTRIES}
                keyExtractor={(item, index) => `${item.name}-${index}`}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.countryItem,
                      selectedCountry.name === item.name &&
                        styles.countryItemSelected,
                    ]}
                    onPress={() => {
                      setSelectedCountry(item);
                      setShowCountryModal(false);
                    }}
                  >
                    <Text style={styles.countryFlag}>{item.flag}</Text>
                    <Text style={styles.countryName}>{item.name}</Text>
                    <Text style={styles.countryDialCode}>{item.code}</Text>
                    {selectedCountry.name === item.name && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: appColors.primary,
    height: StatusBar.currentHeight,
  },
  safeArea: {
    flex: 1,
    backgroundColor: appColors.white,
  },

  // ── Header ──────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: appColors.white,
  },
  backButton: {
    marginRight: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: appColors.black,
    letterSpacing: 0.1,
  },
  eventSubtitle: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },

  // ── Timer Banner ─────────────────────────────────────────
  timerBanner: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#e5e5e5',
    marginHorizontal: 16,
    borderRadius: 14,
  },
  timerText: {
    fontSize: 13,
    color: '#444',
    fontWeight: '500',
  },
  timerCountdown: {
    color: appColors.primary,
    fontWeight: '700',
  },

  // ── Scroll ───────────────────────────────────────────────
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 28,
    paddingBottom: 16,
  },

  // ── Section Header ───────────────────────────────────────
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ccc',
  },
  sectionTitle: {
    fontSize: 12,
    color: appColors.black,
    letterSpacing: 1.5,
    marginHorizontal: 12,
  },

  // ── Shared Input Wrapper ──────────────────────────────────
  inputWrapper: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: appColors.white,
    paddingHorizontal: 14,
    height: 52,
    justifyContent: 'center',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 14,
    color: '#222',
    flex: 1,
    padding: 0,
  },

  // ── Phone Row ────────────────────────────────────────────
  phoneRow: {
    flexDirection: 'row',
    gap: 10,
  },
  phoneCodeBox: {
    width: 96,
    marginBottom: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    gap: 4,
  },
  phoneNumberBox: {
    flex: 1,
    marginBottom: 10,
  },
  flagEmoji: { fontSize: 18 },
  countryCode: {
    fontSize: 13,
    color: '#222',
    fontWeight: '500',
  },
  chevronSmall: {
    fontSize: 14,
    color: '#888',
    lineHeight: 18,
  },

  // ── Helper Text ──────────────────────────────────────────
  helperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 2,
    gap: 6,
  },
  helperText: {
    fontSize: 11,
    color: '#aaa',
    flex: 1,
    lineHeight: 15,
  },

  // ── Parish Dropdown ──────────────────────────────────────
  selectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  selectText: {
    fontSize: 14,
    color: '#aaa',
  },
  selectTextFilled: {
    color: '#222',
  },
  chevron: {
    fontSize: 20,
    color: '#555',
    lineHeight: 24,
  },
  chevronUp: {
    transform: [{ rotate: '180deg' }],
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: appColors.white,
    marginBottom: 6,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: { elevation: 4 },
    }),
  },
  dropdownScroll: { maxHeight: 200 },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemSelected: {
    backgroundColor: '#f0faf4',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333',
  },
  dropdownItemTextSelected: {
    color: appColors.primary,
    fontWeight: '600',
  },
  spacer: {
    height: 24,
  },

  // ── Confirm Button ───────────────────────────────────────
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: appColors.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#eee',
  },
  confirmButton: {
    height: 52,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: '#d0d0d0',
  },
  confirmButtonActive: {
    backgroundColor: '#111',
  },
  confirmText: {
    fontSize: 16,
    fontWeight: '600',
    color: appColors.white,
    letterSpacing: 0.3,
  },

  // ── Country Modal ────────────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: appColors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
    maxHeight: '60%',
  },
  modalHandle: {
    width: 36,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f0f0f0',
    gap: 12,
  },
  countryItemSelected: {
    backgroundColor: '#f0faf4',
  },
  countryFlag: {
    fontSize: 22,
  },
  countryName: {
    flex: 1,
    fontSize: 14,
    color: '#222',
  },
  countryDialCode: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
  },
  checkmark: {
    fontSize: 16,
    color: appColors.primary,
    fontWeight: '700',
  },
});

export default InvoiceDetail;
