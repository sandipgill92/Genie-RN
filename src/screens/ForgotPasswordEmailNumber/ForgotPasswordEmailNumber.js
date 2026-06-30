import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native';
import { appColors } from '../../utils/appColors';

const ForgotPasswordEmailNumber = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('phone');
  const [inputValue, setInputValue] = useState('');

  const handleTabSwitch = tab => {
    setActiveTab(tab);
    setInputValue('');
  };

  return (
    <>
      <View style={styles.statusBar}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={appColors.primary}
        />
      </View>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.inner}
          >
            {/* Avatar */}
            <View style={styles.imageWrapper}>
              <Image
                source={require('../../assets/img/Forgot img.png')}
                style={styles.avatar}
                resizeMode="contain"
              />
            </View>

            {/* Heading */}
            <Text style={styles.title}>Forgot Password?</Text>
            <Text style={styles.subtitle}>
              Don't worry! We'll help you reset it.
            </Text>

            {/* Tab Toggle */}
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'phone' && styles.tabActive]}
                onPress={() => handleTabSwitch('phone')}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'phone' && styles.tabTextSelected,
                  ]}
                >
                  By phone number
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.tab, activeTab === 'email' && styles.tabActive]}
                onPress={() => handleTabSwitch('email')}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'email' && styles.tabTextSelected,
                  ]}
                >
                  By Email
                </Text>
              </TouchableOpacity>
            </View>

            {/* Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={
                  activeTab === 'email' ? 'ex@gmail.com' : '+91 00000 00000'
                }
                placeholderTextColor={'#888'}
                keyboardType={
                  activeTab === 'email' ? 'email-address' : 'phone-pad'
                }
                value={inputValue}
                onChangeText={setInputValue}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Send OTP Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('ForgotPassword')}
              activeOpacity={0.85}
            >
              <Text style={styles.buttonText}>Send OTP</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: appColors.primary,
    height: StatusBar.currentHeight,
  },
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 30,
  },
  imageWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 220,
    height: 280,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: appColors.black,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: appColors.black,
    marginBottom: 28,
  },
  tabContainer: {
    flexDirection: 'row',
    borderRadius: 14,
    padding: 4,
    width: '100%',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
  },
  tabActive: {
    backgroundColor: appColors.black,
  },
  tabText: {
    fontSize: 13,
    color: appColors.black,
    fontWeight: '500',
  },
  tabTextSelected: {
    color: appColors.white,
    fontWeight: '600',
  },
  inputContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: appColors.placeholder,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 30,
  },
  input: {
    height: 52,
    fontSize: 15,
    color: appColors.black,
  },
  button: {
    width: '100%',
    backgroundColor: appColors.black,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: appColors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default ForgotPasswordEmailNumber;
