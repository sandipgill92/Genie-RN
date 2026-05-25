import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { appColors } from '../../../utils/appColors';
import SuccessFull from '../../../assets/svg/SuccessFull';

const PasswordResetModal = ({ visible, onClose, navigation }) => {
  return (
    <>
      <Modal
        transparent={true}
        visible={visible}
        animationType="fade"
        onRequestClose={onClose}
      >
        <View style={styles.overlay}>
          <View style={styles.container}>
            <View style={styles.card}>
              <View style={{ marginBottom: 30 }}>
                <SuccessFull />
              </View>

              <Text style={styles.successTitle}>Password Reset Successful</Text>
              <Text style={styles.successMessage}>
                You can now log in with your new password.
              </Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  onClose(), navigation.navigate('Login');
                }}
              >
                <Text style={styles.buttonText}>Go to Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: appColors.primary,
    // height: StatusBar.currentHeight,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: appColors.white,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#D1D5DB',
  },
  card: {
    backgroundColor: appColors.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 24,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  confetti: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 2,
  },
  confetti1: {
    backgroundColor: '#FCD34D',
    top: 30,
    left: 40,
    transform: [{ rotate: '15deg' }],
  },
  confetti2: {
    backgroundColor: '#10B981',
    top: 25,
    right: 50,
    transform: [{ rotate: '-20deg' }],
  },
  confetti3: {
    backgroundColor: '#3B82F6',
    top: 55,
    left: 30,
    width: 6,
    height: 6,
    transform: [{ rotate: '45deg' }],
  },
  confetti4: {
    backgroundColor: '#F59E0B',
    top: 50,
    right: 35,
    width: 10,
    height: 3,
    borderRadius: 1,
    transform: [{ rotate: '-30deg' }],
  },
  confetti5: {
    backgroundColor: '#EF4444',
    top: 70,
    left: 60,
    width: 5,
    height: 5,
  },
  confetti6: {
    backgroundColor: '#8B5CF6',
    top: 40,
    right: 70,
    width: 7,
    height: 7,
    transform: [{ rotate: '30deg' }],
  },
  iconContainer: {
    marginBottom: 20,
    zIndex: 1,
  },
  successCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  checkmark: {
    fontSize: 40,
    color: appColors.white,
    fontWeight: 'bold',
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: appColors.black,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: appColors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PasswordResetModal;
