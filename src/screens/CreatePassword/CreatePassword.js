import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { appColors } from '../../utils/appColors';
import BackIcon from '../../assets/svg/BackIcon';
import LightShowIcon from '../../assets/svg/LightShowIcon';
import LightHiddenIcon from '../../assets/svg/LightHiddenIcon';
import PasswordResetModal from '../Modal/PasswordResetModal/PasswordResetModal';

const CreatePassword = ({ navigation }) => {
  // useEffect(() => {
  //   Animated.parallel([
  //     Animated.spring(contentSlideAnim, {
  //       toValue: 0,
  //       useNativeDriver: true,
  //       tension: 30,
  //       friction: 7,
  //     }),
  //   ]).start();
  // }, []);
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
          {/* <Animated.View
          style={[{ transform: [{ translateX: contentSlideAnim }] }]}
        > */}
          <View style={styles.content}>
            <BackIcon
              style={{ marginBottom: 20 }}
              onPress={() => navigation.goBack()}
            />
            <View style={styles.header}>
              <Text style={styles.title}>Reset Your Password</Text>
              <Text style={styles.subtitle}>Create a new strong password</Text>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.otpContainer}>
                <View style={[styles.passwordContainer, { marginBottom: 0 }]}>
                  <TextInput
                    style={styles.input}
                    placeholder="New Password*"
                    autoCapitalize="none"
                    placeholderTextColor={appColors.inputLine}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    value={password}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <LightShowIcon /> : <LightHiddenIcon />}
                  </TouchableOpacity>
                </View>

                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[styles.input, { marginBottom: 0 }]}
                    placeholder="Confirm New Password*"
                    placeholderTextColor={appColors.inputLine}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!confirmShowPassword}
                    value={confirmPassword}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setConfirmShowPassword(!confirmShowPassword)}
                  >
                    {confirmShowPassword ? (
                      <LightShowIcon />
                    ) : (
                      <LightHiddenIcon />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity style={styles.loginButton}>
                <Text
                  style={styles.loginButtonText}
                  onPress={() => setShowModal(true)}
                >
                  Reset Password
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* </Animated.View> */}
        </ScrollView>
      </SafeAreaView>

      <PasswordResetModal
        navigation={navigation}
        visible={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};
export default CreatePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  statusBar: {
    backgroundColor: appColors.primary,
    height: StatusBar.currentHeight,
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
    gap: 15,
    marginVertical: 40,
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
  text: {
    marginHorizontal: 10,
    color: appColors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: appColors.inputLine,
    borderRadius: 16,
    padding: 16,
    fontSize: 15,
    color: appColors.black,
    marginBottom: 16,
    paddingRight: 50,
  },
});
