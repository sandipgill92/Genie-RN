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
import FormBg from '../../assets/svg/FormBg';
import SignUpSuccessfullyModal from '../Modal/SignUpSuccessfullyModal/SignUpSuccessfullyModal';

const OTP = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);

  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

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
                  <Text style={styles.editText}> (91)9658901923</Text>
                </Text>
              </View>

              <View style={styles.formContainer}>
                <View style={styles.forgotPassword}>
                  <Text style={styles.forgotPasswordText}>
                    Please Enter your code Here
                  </Text>
                </View>
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
                    />
                  ))}
                </View>
                <View style={styles.lineContainer}>
                  <Text style={[styles.subtitle, { fontWeight: '300' }]}>
                    Didn't get the code?
                    <Text style={styles.text}> Resend it.</Text>
                  </Text>
                </View>

                <TouchableOpacity style={styles.loginButton}>
                  <Text
                    style={styles.loginButtonText}
                    onPress={() => setShowModal(true)}
                  >
                    Verify
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
      <SignUpSuccessfullyModal
        navigation={navigation}
        visible={showModal}
        onClose={() => setShowModal(false)}
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
    marginBottom: 30,
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
});
