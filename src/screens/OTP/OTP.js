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
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { appColors } from '../../utils/appColors';
import FormBg from '../../assets/svg/FormBg';
import SignUpSuccessfullyModal from '../Modal/SignUpSuccessfullyModal/SignUpSuccessfullyModal';
import { verifyOtp } from '../../redux/VerifyOTPSlice';

const OTP = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.verifyOtpReducer);

  const [showModal, setShowModal] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [errorMessage, setErrorMessage] = useState('');

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const contentSlideAnim = useRef(new Animated.Value(-300)).current;

  const mobile = route?.params?.mobile || '';

  useEffect(() => {
    Animated.spring(contentSlideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 30,
      friction: 7,
    }).start();
  }, []);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (errorMessage) setErrorMessage('');

    // Auto move to next input
    if (text && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    // On backspace, move to previous input
    if (nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleVerify = () => {
    const otpString = otp.join('');
    console.log('OTP Entered:', otpString);
    console.log('Mobile:', mobile);

    if (otpString.length < 4) {
      setErrorMessage('Please enter the complete 4-digit OTP.');
      return;
    }

    dispatch(verifyOtp({ mobile, otp: otpString }))
      .unwrap()
      .then(res => {
        console.log('OTP Verify Success:', res);
        setShowModal(true);
      })
      .catch(err => {
        console.log('OTP Verify Error:', err);
        setErrorMessage(err?.message || 'Invalid OTP. Please try again.');
      });
  };

  const handleResend = () => {
    setOtp(['', '', '', '']);
    setErrorMessage('');
    inputRefs[0].current.focus();
    // Call your resend OTP API here
    // dispatch(resendOTP({ mobile }))
  };

  return (
    <>
      <View style={styles.statusBar}>
        <StatusBar barStyle="light-content" backgroundColor="#0F7754" />
      </View>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[{ transform: [{ translateX: contentSlideAnim }] }]}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ position: 'absolute', width: '100%', height: '100%' }}
            >
              <FormBg />
            </TouchableOpacity>

            <View style={styles.content}>
              <View style={styles.header}>
                <Text style={styles.title}>Confirm OTP code</Text>
                <Text style={styles.subtitle}>
                  We are sending you an OTP to verify your Phone Number
                </Text>
                <Text style={[styles.subtitle, { marginTop: 8 }]}>
                  Edit
                  <Text style={styles.editText}>
                    {' '}
                    {mobile ? `(91)${mobile}` : '(91)9658901923'}
                  </Text>
                </Text>
              </View>

              <View style={styles.formContainer}>
                <View style={styles.forgotPassword}>
                  <Text style={styles.forgotPasswordText}>
                    Please Enter your code Here
                  </Text>
                </View>

                <View style={styles.otpContainer}>
                  {otp.map((digit, index) => (
                    <TextInput
                      key={index}
                      ref={inputRefs[index]}
                      style={[
                        styles.otpInput,
                        digit ? styles.otpInputFilled : null,
                      ]}
                      keyboardType="number-pad"
                      maxLength={1}
                      textAlign="center"
                      value={digit}
                      onChangeText={text => handleChange(text, index)}
                      onKeyPress={e => handleKeyPress(e, index)}
                      selectTextOnFocus
                    />
                  ))}
                </View>

                {errorMessage ? (
                  <Text style={styles.errorText}>{errorMessage}</Text>
                ) : null}

                <View style={styles.lineContainer}>
                  <Text style={[styles.subtitle, { fontWeight: '300' }]}>
                    Didn't get the code?
                    <Text style={styles.resendText} onPress={handleResend}>
                      {' '}
                      Resend it.
                    </Text>
                  </Text>
                </View>

                <TouchableOpacity
                  style={[
                    styles.loginButton,
                    loading && styles.loginButtonDisabled,
                  ]}
                  onPress={handleVerify}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color={appColors.white} />
                  ) : (
                    <Text style={styles.loginButtonText}>Verify</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>

      <SignUpSuccessfullyModal
        navigation={navigation}
        visible={showModal}
        onClose={() => {
          setShowModal(false);
          navigation.navigate('Login'); // ✅ Login pe jaao
        }}
      />
    </>
  );
};

export default OTP;

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: appColors.primary,
    height: StatusBar.currentHeight,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 40,
    height: '100%',
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: appColors.white,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: appColors.white,
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
    marginBottom: 16,
  },
  otpInput: {
    width: 55,
    height: 55,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    fontSize: 24,
    fontWeight: '300',
    color: appColors.black,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  otpInputFilled: {
    borderColor: appColors.primary, // filled hone pe green border
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
  errorText: {
    color: '#ffcccc',
    fontSize: 12,
    marginBottom: 12,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: appColors.black,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonDisabled: {
    opacity: 0.6,
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
    marginTop: 8,
  },
  resendText: {
    color: '#aaedff',
    fontSize: 14,
    fontWeight: '500',
  },
});
