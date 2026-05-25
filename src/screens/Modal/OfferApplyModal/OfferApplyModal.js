import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { appColors } from '../../../utils/appColors';
import CouponCodeGiftIcon from '../../../assets/svg/CouponCodeGiftIcon';

const OfferApplyModal = ({ visible, onClose }) => {
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
              <View
                style={{
                  marginBottom: 30,
                }}
              >
                <CouponCodeGiftIcon />
              </View>

              <Text style={styles.successTitle}>You just saved J$1,270</Text>
              <Text style={styles.successMessage}>
                ‘SUMMER20’ coupon code applied
              </Text>

              <View
                style={{
                  borderTopColor: appColors.placeholder,
                  borderTopWidth: 1,
                  width: '100%',
                }}
              >
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    onClose();
                  }}
                >
                  <Text style={styles.buttonText}>Wooohooooo! Thanks</Text>
                </TouchableOpacity>
              </View>
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
    paddingTop: 24,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },

  successTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#6a6a6a',
  },
  button: {
    paddingTop: 12,
    paddingBottom: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: appColors.black,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OfferApplyModal;
