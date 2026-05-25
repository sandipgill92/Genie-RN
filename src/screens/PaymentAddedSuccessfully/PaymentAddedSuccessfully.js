import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { appColors } from '../../utils/appColors';
import PaymentSuccessfullyIcon from '../../assets/svg/PaymentSuccessfullyIcon';

const PaymentAddedSuccessfully = ({
  navigation,
  onBookEvent,
  onBackToWallet,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 60,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 60,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <>
      <View style={styles.statusBar}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={appColors.primary}
        />
      </View>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Party Popper Emoji */}
          <Animated.View
            style={[
              styles.emojiContainer,
              { transform: [{ scale: scaleAnim }], opacity: fadeAnim },
            ]}
          >
            <PaymentSuccessfullyIcon />
          </Animated.View>

          {/* Text Content */}
          <Animated.View
            style={[
              styles.textContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.title}>J$2,000 Added to{'\n'}Your Wallet!</Text>
            <Text style={styles.subtitle}>
              Your Genie Wallet is ready to roll.{'\n'}
              Book your next event and make it magical!
            </Text>
          </Animated.View>

          {/* Buttons */}
          <Animated.View
            style={[
              styles.buttonsContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => {
                onBookEvent;
                navigation.navigate('FinalReview');
              }}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryButtonText}>Book an Event</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => {
                onBackToWallet;
                navigation.navigate('FinalReview');
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.secondaryButtonText}>Back to Wallet</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: appColors.primary,
    height: StatusBar.currentHeight,
  },
  safeArea: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  container: {
    flex: 1,
    backgroundColor: appColors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingBottom: 32,
  },
  emojiContainer: {
    marginBottom: 36,
  },

  textContainer: {
    alignItems: 'center',
    marginBottom: 48,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: appColors.black,
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 14,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#888888',
    textAlign: 'center',
    lineHeight: 21,
    letterSpacing: 0.1,
  },
  buttonsContainer: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: appColors.black,
    borderRadius: 50,
    paddingVertical: 17,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  primaryButtonText: {
    color: appColors.white,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  secondaryButton: {
    backgroundColor: appColors.placeholder,
    borderRadius: 50,
    paddingVertical: 17,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
});

export default PaymentAddedSuccessfully;
