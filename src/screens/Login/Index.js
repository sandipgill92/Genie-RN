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
import ShowPassIcon from '../../assets/svg/ShowPassIcon';
import HiddenPassIcon from '../../assets/svg/HiddenPassIcon';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/LoginSlice';

const Login = ({ navigation }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const contentSlideAnim = useRef(new Animated.Value(300)).current;

  const handleLogin = () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setErrorMessage('Please enter both email/mobile and password.');
      return;
    }

    setErrorMessage('');

    dispatch(loginUser({ email: trimmedEmail, password: trimmedPassword }))
      .unwrap()
      .then(() => {
        navigation.navigate('Home');
      })
      .catch(err => {
        setErrorMessage(err?.message || 'Login failed. Try again.');
      });

    // dispatch(loginUser({ email: trimmedEmail, password: trimmedPassword }))
    //   .unwrap()
    //   .then(() => {
    //     navigation.navigate('Home');
    //   })
    //   .catch(err => {
    //     if (
    //       err?.message?.toLowerCase().includes('verify otp') ||
    //       err?.message?.toLowerCase().includes('not verified')
    //     ) {
    //       navigation.navigate('OTP'); // OTP screen pe bhej do
    //     } else {
    //       setErrorMessage(err?.message || 'Login failed. Try again.');
    //     }
    //   });
  };

  useEffect(() => {
    Animated.spring(contentSlideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 30,
      friction: 7,
    }).start();
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
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>
                  Login your account by using the form below.
                </Text>
              </View>

              <View style={styles.formContainer}>
                <TextInput
                  testID="email-input"
                  style={styles.input}
                  placeholder="Mobile number* / Email Address*"
                  placeholderTextColor={appColors.placeholder}
                  value={email}
                  onChangeText={text => {
                    setEmail(text);
                    if (errorMessage) setErrorMessage('');
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <View style={styles.passwordContainer}>
                  <TextInput
                    testID="password-input"
                    style={styles.passwordInput}
                    placeholder="Password"
                    placeholderTextColor={appColors.placeholder}
                    value={password}
                    onChangeText={text => {
                      setPassword(text);
                      if (errorMessage) setErrorMessage('');
                    }}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(prev => !prev)}
                  >
                    {showPassword ? <ShowPassIcon /> : <HiddenPassIcon />}
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.forgotPassword}
                  onPress={() =>
                    navigation.navigate('ForgotPasswordEmailNumber')
                  }
                >
                  <Text style={styles.forgotPasswordText}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>

                {errorMessage ? (
                  <Text testID="error-text" style={styles.errorText}>
                    {errorMessage}
                  </Text>
                ) : null}

                <TouchableOpacity
                  testID="login-button"
                  style={styles.loginButton}
                  onPress={handleLogin}
                >
                  <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>

                <View style={styles.lineContainer}>
                  <View style={styles.line} />
                  <Text style={styles.text}>or login with</Text>
                  <View style={styles.line} />
                </View>

                <View style={styles.socialButtons}>
                  <TouchableOpacity style={styles.socialButton}>
                    <View style={styles.socialIcon}>
                      <GoogleIcon />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialButton}>
                    <View style={styles.socialIcon}>
                      <FacebookIcon />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialButton}>
                    <View style={styles.socialIcon}>
                      <AppleIcon />
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={styles.registerContainer}>
                  <Text style={styles.registerText}>
                    Don't have an account?{' '}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('SignUp')}
                  >
                    <Text style={styles.registerLink}>Register here</Text>
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

export default Login;

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
    marginBottom: 16,
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
  errorText: {
    color: '#ffcccc',
    fontSize: 12,
    marginBottom: 12,
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
