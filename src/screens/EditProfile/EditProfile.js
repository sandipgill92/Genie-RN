import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import BackIcon from '../../assets/svg/BackIcon';
import { appColors } from '../../utils/appColors';
import ProfileImg from '../../assets/svg/ProfileImg';
import EditProfileIcon from '../../assets/svg/EditProfileIcon';
import DownBlackIcon from '../../assets/svg/DownBlackIcon';

const COUNTRIES = [
  'Jamaica',
  'United States',
  'Canada',
  'United Kingdom',
  'Trinidad & Tobago',
];

const EditProfile = ({ navigation }) => {
  const [name, setName] = useState('Tasha Marie');
  const [phone] = useState('+1 (876) 987-6543');
  const [email, setEmail] = useState('TashaMarie@gmail.com');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [country, setCountry] = useState('Jamaica');

  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  const genders = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];

  return (
    <>
      <View style={styles.statusBar}>
        <StatusBar barStyle="light-content" backgroundColor="#0F7754" />
      </View>
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation?.goBack()}
            style={styles.backBtn}
          >
            <BackIcon />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Avatar */}
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              <ProfileImg />
            </View>
            <TouchableOpacity style={styles.editBadge}>
              <EditProfileIcon />
            </TouchableOpacity>
          </View>

          {/* Basic Information Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Basic information</Text>

            {/* Name */}
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor="#bbb"
            />

            {/* Phone */}
            <Text style={styles.label}>Phone number</Text>
            <View style={[styles.input, styles.inputDisabled]}>
              <Text style={styles.inputTextDisabled}>{phone}</Text>
            </View>
            <Text style={styles.helperText}>
              The phone number associated with your account cannot be modified.
            </Text>

            {/* Email */}
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Enter your email"
              placeholderTextColor="#bbb"
            />

            {/* Gender */}
            <Text style={styles.label}>Gender</Text>
            <TouchableOpacity
              style={[styles.input, styles.selectRow]}
              onPress={() => {
                setShowGenderPicker(!showGenderPicker);
                setShowCountryPicker(false);
              }}
              activeOpacity={0.7}
            >
              <Text
                style={gender ? styles.selectText : styles.selectPlaceholder}
              >
                {gender || 'Select'}
              </Text>
              <DownBlackIcon />
            </TouchableOpacity>
            {showGenderPicker && (
              <View style={styles.dropdown}>
                {genders.map(g => (
                  <TouchableOpacity
                    key={g}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setGender(g);
                      setShowGenderPicker(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{g}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Birthday */}
            <Text style={styles.label}>Birthday</Text>
            <TextInput
              style={styles.input}
              value={birthday}
              onChangeText={setBirthday}
              placeholder="DD / MM / YY"
              placeholderTextColor="#bbb"
              keyboardType="numeric"
            />
          </View>

          {/* Invoice Details Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Invoice details</Text>

            <Text style={styles.label}>Country</Text>
            <TouchableOpacity
              style={[styles.input, styles.selectRow]}
              onPress={() => {
                setShowCountryPicker(!showCountryPicker);
                setShowGenderPicker(false);
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.selectText}>{country}</Text>
              <DownBlackIcon />
            </TouchableOpacity>
            {showCountryPicker && (
              <View style={styles.dropdown}>
                {COUNTRIES.map(c => (
                  <TouchableOpacity
                    key={c}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setCountry(c);
                      setShowCountryPicker(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{c}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <Text style={styles.helperText}>
              This is required to generate invoice.
            </Text>
          </View>

          {/* Spacer */}
          <View style={{ height: 32 }} />
        </ScrollView>

        {/* Update Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.updateBtn}
            activeOpacity={0.85}
            onPress={() => {
              /* handle update */
            }}
          >
            <Text style={styles.updateBtnText}>Update</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: appColors.primary,
    height: StatusBar.currentHeight,
  },
  safe: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 16 : 8,
    paddingBottom: 4,
  },
  backBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  // Avatar
  avatarWrapper: {
    alignItems: 'center',
    marginVertical: 24,
    position: 'relative',
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: 88,
    height: 88,
    borderRadius: 44,
  },
  avatarPlaceholder: {
    fontSize: 44,
    color: appColors.white,
  },
  editBadge: {
    position: 'absolute',
    bottom: -8,
    right: '52%',
    marginRight: -52,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Card
  card: {
    backgroundColor: appColors.white,
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: appColors.border,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
    letterSpacing: 0.1,
    borderBottomWidth: 1,
    borderBottomColor: appColors.border,
    paddingBottom: 8,
  },

  // Form
  label: {
    fontSize: 13,
    color: appColors.black,
    marginBottom: 6,
    marginTop: 12,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 13 : 10,
    fontSize: 14,
    color: '#1a1a1a',
    backgroundColor: '#fafafa',
  },
  inputDisabled: {
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  inputTextDisabled: {
    fontSize: 14,
    color: '#888',
  },
  helperText: {
    fontSize: 11,
    color: '#aaa',
    marginTop: 5,
    lineHeight: 15,
  },
  selectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectText: {
    fontSize: 14,
    color: '#1a1a1a',
  },
  selectPlaceholder: {
    fontSize: 14,
    color: '#bbb',
  },

  // Inline dropdown
  dropdown: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    marginTop: 4,
    backgroundColor: appColors.white,
    overflow: 'hidden',
    zIndex: 100,
  },
  dropdownItem: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333',
  },

  // Footer
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  updateBtn: {
    backgroundColor: '#8a8a8a',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateBtnText: {
    color: appColors.white,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});

export default EditProfile;
