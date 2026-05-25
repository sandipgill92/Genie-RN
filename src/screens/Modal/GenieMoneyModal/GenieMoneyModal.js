import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
} from 'react-native';
import { appColors } from '../../../utils/appColors';

const GenieMoneyModal = ({ visible, onOpenModal }) => {
  const [walletChecked, setWalletChecked] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          damping: 18,
          stiffness: 200,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scaleAnim.setValue(0.85);
      opacityAnim.setValue(0);
    }
  }, [visible]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
    >
      <Animated.View style={[styles.backdrop, { opacity: opacityAnim }]}>
        {/* Modal Card */}
        <Animated.View
          style={[
            styles.card1,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            },
          ]}
        >
          {/* Bill Amount */}
          <View style={styles.billSection}>
            <Text style={styles.billLabel}>Bill amount : JMD $5,154</Text>
            <Text style={styles.subLabel}>Genie Money:JMD $0</Text>
          </View>

          {/* Wallet Balance Card */}
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.walletRow}
              onPress={() => setWalletChecked(!walletChecked)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.checkbox,
                  walletChecked && styles.checkboxChecked,
                ]}
              >
                {walletChecked && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <View style={styles.walletInfo}>
                <View style={styles.walletLabelRow}>
                  <Text style={styles.walletLabel}>Wallet balance</Text>
                  <View style={styles.infoIcon}>
                    <Text style={styles.infoIconText}>ⓘ</Text>
                  </View>
                </View>
                <Text style={styles.balanceText}>Balance: $0</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.addMoneyText}>Add money</Text>
            </TouchableOpacity>
          </View>

          {/* Spacer */}
          <View style={styles.spacer} />

          {/* Continue Button */}
          <TouchableOpacity
            style={styles.continueButton}
            activeOpacity={0.85}
            onPress={onOpenModal}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card1: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: appColors.white,
    borderRadius: 20,
    paddingVertical: 36,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '100%',
    maxWidth: '100%',
    shadowColor: appColors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 10,
  },

  // Bill Section
  billSection: {
    width: '100%',
  },
  billLabel: {
    fontSize: 20,
    fontWeight: '700',
    color: appColors.black,
    letterSpacing: -0.3,
  },
  subLabel: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
    marginBottom: 20,
  },

  // Card
  card: {
    backgroundColor: '#d9d9d9',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
    width: '100%',
  },
  walletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: '#aaa',
    borderRadius: 4,
    backgroundColor: appColors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: appColors.black,
    borderColor: appColors.black,
  },
  checkmark: {
    color: appColors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  walletInfo: {
    flex: 1,
  },
  walletLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: appColors.black,
    marginRight: 6,
  },
  infoIcon: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoIconText: {
    fontSize: 15,
    color: appColors.black,
  },
  balanceText: {
    fontSize: 13,
    color: appColors.black,
  },

  // Divider
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: appColors.black,
    borderStyle: 'dashed',
    marginBottom: 12,
  },

  // Add money
  addMoneyText: {
    fontSize: 15,
    fontWeight: '500',
    color: appColors.black,
  },

  spacer: {
    flex: 1,
  },

  // Continue Button
  continueButton: {
    backgroundColor: appColors.black,
    borderRadius: 50,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 24,
  },
  continueText: {
    color: appColors.white,
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});

export default GenieMoneyModal;
