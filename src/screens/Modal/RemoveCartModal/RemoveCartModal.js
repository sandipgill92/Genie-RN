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
import RemoveCartIcon from '../../../assets/svg/RemoveCartIcon';

const RemoveCartModal = ({ visible, onConfirm, onCancel }) => {
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
            <RemoveCartIcon />
          </View>

          {/* Title */}
          <Text style={fs.title}>Remove cart items?</Text>

          {/* Subtitle */}
          <Text style={fs.subtitle}>
            Are you sure you want to remove this booking from your cart?
          </Text>

          {/* Confirm Button */}
          <TouchableOpacity
            style={fs.confirmButton}
            onPress={onConfirm}
            activeOpacity={0.85}
          >
            <Text style={fs.confirmText}>Confirm</Text>
          </TouchableOpacity>

          {/* Cancel Link */}
          <TouchableOpacity
            onPress={onCancel}
            activeOpacity={0.7}
            style={fs.cancelWrapper}
          >
            <Text style={fs.cancelText}>Cancel</Text>
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
    fontSize: 20,
    fontWeight: '700',
    color: appColors.black,
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 28,
    paddingHorizontal: 8,
  },
  confirmButton: {
    backgroundColor: appColors.black,
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 60,
    alignItems: 'center',
    marginBottom: 18,
  },
  confirmText: {
    color: appColors.white,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  cancelWrapper: {
    alignItems: 'center',
  },
  cancelText: {
    color: '#ff0000',
    fontSize: 14,
    fontWeight: '500',
  },
  cancelUnderline: {
    marginTop: 2,
    width: '100%',
    borderBottomWidth: 1.5,
    borderColor: '#ff0000',
    borderStyle: 'dashed',
  },
});

export default RemoveCartModal;
