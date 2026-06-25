import {
  Animated,
  Modal,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { appColors } from '../../../utils/appColors';
import { useEffect, useRef } from 'react';
import NowShowIcon from '../../../assets/svg/NowShowIcon';

const BookingModal = ({ visible, onConfirm, onCancel }) => {
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
      {/* Backdrop */}
      <Animated.View style={[fs.backdrop, { opacity: opacityAnim }]}>
        {/* Modal Card */}
        <Animated.View
          style={[
            fs.card,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            },
          ]}
        >
          {/* Cart Icon */}
          <View style={fs.iconContainer}>
            <NowShowIcon />
          </View>

          {/* Title */}
          <Text style={fs.title}>Heads-up! This show has already started</Text>

          {/* Subtitle */}
          <Text style={fs.subtitle}>You can still book your ticket</Text>

          {/* Confirm Button */}
          <TouchableOpacity
            style={fs.confirmButton}
            onPress={onConfirm}
            activeOpacity={0.85}
          >
            <Text style={fs.confirmText}>Continue booking</Text>
          </TouchableOpacity>

          {/* Cancel Link */}
          <TouchableOpacity
            onPress={onCancel}
            activeOpacity={0.7}
            style={fs.cancelWrapper}
          >
            <Text style={fs.cancelText}>Go back</Text>
            <View style={fs.cancelUnderline} />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const fs = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: appColors.white,
    borderRadius: 20,
    paddingVertical: 36,
    paddingHorizontal: 28,
    alignItems: 'center',
    width: '100%',
    maxWidth: '100%',
    shadowColor: appColors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 10,
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: appColors.black,
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 14,
    color: appColors.black,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 14,
    paddingHorizontal: 8,
  },
  confirmButton: {
    backgroundColor: appColors.black,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 60,
    alignItems: 'center',
    marginBottom: 18,
  },
  confirmText: {
    color: appColors.white,
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  cancelWrapper: {
    alignItems: 'center',
  },
  cancelText: {
    color: appColors.black,
    fontSize: 14,
    fontWeight: '500',
  },
  cancelUnderline: {
    marginTop: 2,
    width: '100%',
    borderBottomWidth: 1.5,
    borderBottomColorColor: appColors.black,
    borderStyle: 'dashed',
  },
});

export default BookingModal;
