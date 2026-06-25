import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  ScrollView,
} from 'react-native';
import { appColors } from '../../utils/appColors';
import BackIcon from '../../assets/svg/BackIcon';

const ForgotPassword = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    inputRefs[0].current.focus();
  }, []);

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
  };

  const contentSlideAnim = useRef(new Animated.Value(-300)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(contentSlideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 30,
        friction: 7,
      }),
    ]).start();
  }, []);

  return (
    <>
      <View style={styles.statusBar}>
        <StatusBar barStyle="light-content" backgroundColor="#0F7754" />
      </View>
      <SafeAreaView style={[styles.container]}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[{ transform: [{ translateX: contentSlideAnim }] }]}
          >
            <View style={styles.content}>
              <BackIcon
                style={{ marginBottom: 20 }}
                onPress={() => navigation.goBack()}
              />
              <View style={styles.header}>
                <Text style={styles.title}>Enter OTP</Text>
                <Text style={styles.subtitle}>
                  A 4-digit code was sent to ex****gmail.com
                </Text>
              </View>
              <View style={styles.formContainer}>
                <View style={styles.otpContainer}>
                  {otp.map((_, index) => (
                    <TextInput
                      key={index}
                      ref={inputRefs[index]}
                      style={styles.otpInput}
                      keyboardType="number-pad"
                      maxLength={1}
                      textAlign="center"
                      selectTextOnFocus
                      onChangeText={text => handleOtpChange(text, index)}
                    />
                  ))}
                </View>

                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={() => navigation.navigate('CreatePassword')}
                >
                  <Text style={styles.loginButtonText}>Verify</Text>
                </TouchableOpacity>

                <View style={styles.registerContainer}>
                  <Text style={styles.registerText}>
                    Didn’t get the code? Resend in 00:30
                  </Text>
                </View>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
export default ForgotPassword;

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
  content: {
    padding: 16,
    height: '100%',
  },
  header: {
    marginTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: appColors.black,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: appColors.black,
    lineHeight: 20,
    fontWeight: '300',
  },
  editText: {
    color: '#aaedff',
  },
  formContainer: {
    width: '100%',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
    marginVertical: 50,
  },
  otpInput: {
    width: 55,
    height: 55,
    backgroundColor: '#e2e2e2',
    borderRadius: 10,
    fontSize: 24,
    fontWeight: '300',
    color: appColors.black,
    shadowColor: '#e2e2e2',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  forgotPassword: {
    alignSelf: 'center',
    marginBottom: 24,
    marginTop: -8,
  },
  forgotPasswordText: {
    color: appColors.white,
    fontSize: 13,
  },
  loginButton: {
    backgroundColor: appColors.black,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
    color: appColors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  lineContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  text: {
    marginHorizontal: 10,
    color: appColors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  registerText: {
    color: appColors.black,
    fontSize: 13,
  },
});
