import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Animated,
} from 'react-native';
import { appColors } from '../../utils/appColors';
import GoogleIcon from '../../assets/svg/GoogleIcon';
import FacebookIcon from '../../assets/svg/FacebookIcon';
import AppleIcon from '../../assets/svg/AppleIcon';
import FormBg from '../../assets/svg/FormBg';
import { registerUser } from '../../redux/RegisterSlice';
import ShowPassIcon from '../../assets/svg/ShowPassIcon';
import HiddenPassIcon from '../../assets/svg/HiddenPassIcon';
import { useDispatch } from 'react-redux';

const SignUp = ({ navigation }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const contentSlideAnim = useRef(new Animated.Value(300)).current;

  console.log('handleSignUp', { handleSignUp });

  const handleSignUp = () => {
    console.log('Sign Up pressed', { email, password });
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setErrorMessage('Please enter both email/mobile and password.');
      return;
    }

    setErrorMessage('');
    dispatch(registerUser({ email: trimmedEmail, password: trimmedPassword }))
      .unwrap()
      .then(() => {
        navigation.navigate('OTP');
      })
      .catch(err => {
        setErrorMessage(err?.message || 'Registration failed. Try again.');
      });
  };

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
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[{ transform: [{ translateX: contentSlideAnim }] }]}
          >
            <View
              style={{ position: 'absolute', width: '100%', height: '100%' }}
            >
              <FormBg />
            </View>
            <View style={styles.content}>
              <View style={styles.header}>
                <Text style={styles.title}>Get Started</Text>
                <Text style={styles.subtitle}>
                  Create an account by using the form below.
                </Text>
              </View>

              <View style={styles.formContainer}>
                <TextInput
                  testID="email-input"
                  style={styles.input}
                  placeholder="Mobile number* / Email Address*"
                  placeholderTextColor="#eeeeee"
                  value={email}
                  onChangeText={text => {
                    setEmail(text);
                    if (errorMessage) {
                      setErrorMessage('');
                    }
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <View style={styles.passwordContainer}>
                  <TextInput
                    testID="password-input"
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#eeeeee"
                    value={password}
                    onChangeText={text => {
                      setPassword(text);
                      if (errorMessage) {
                        setErrorMessage('');
                      }
                    }}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(prev => !prev)}
                    style={styles.eyeIcon}
                  >
                    {showPassword ? <ShowPassIcon /> : <HiddenPassIcon />}
                  </TouchableOpacity>
                </View>

                {errorMessage ? (
                  <Text testID="error-text" style={styles.errorText}>
                    {errorMessage}
                  </Text>
                ) : null}

                <TouchableOpacity
                  testID="register-button"
                  style={styles.loginButton}
                  onPress={handleSignUp}
                >
                  <Text style={styles.loginButtonText}>Register</Text>
                </TouchableOpacity>

                <View style={styles.lineContainer}>
                  <View style={styles.line} />
                  <Text style={styles.text}>or register with</Text>
                  <View style={styles.line} />
                </View>

                <View style={styles.socialButtons}>
                  <TouchableOpacity style={styles.socialButton}>
                    <View style={[styles.socialIcon]}>
                      <GoogleIcon />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.socialButton}>
                    <View style={[styles.socialIcon]}>
                      <FacebookIcon />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.socialButton}>
                    <View style={[styles.socialIcon]}>
                      <AppleIcon />
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={styles.registerContainer}>
                  <Text style={styles.registerText}>
                    Already have an account?{' '}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                  >
                    <Text style={styles.registerLink}>Login here</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
export default SignUp;

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
  formContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: appColors.border,
    borderRadius: 16,
    padding: 16,
    fontSize: 15,
    color: appColors.white,
    marginBottom: 16,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: appColors.border,
    borderRadius: 16,
    padding: 16,
    paddingRight: 50,
    fontSize: 15,
    color: appColors.white,
    paddingRight: 50,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 24,
    transform: [{ translateY: -11 }],
    padding: 4,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
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
    marginTop: 12,
  },
  loginButtonText: {
    color: appColors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#ffcccc',
    fontSize: 12,
    marginBottom: 12,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: appColors.border,
  },
  text: {
    marginHorizontal: 10,
    color: appColors.white,
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    gap: 16,
  },
  socialButton: {
    marginHorizontal: 8,
  },
  socialIcon: {
    width: 44,
    height: 44,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: appColors.black,
    fontSize: 13,
  },
  registerLink: {
    color: appColors.white,
    fontSize: 13,
    fontWeight: '600',
  },
});
