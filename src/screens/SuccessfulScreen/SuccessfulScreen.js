import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { appColors } from '../../utils/appColors';
import BookingConfirmIcon from '../../assets/svg/BookingConfirmIcon';
import TicketViewIcon from '../../assets/svg/TicketViewIcon';
import AddAppleWalletIcon from '../../assets/svg/AddAppleWalletIcon';
import AddGoogleWalletIcon from '../../assets/svg/AddGoogleWalletIcon';

// Sparkle component for decorative stars
const Sparkle = ({ style, size = 16, color = '#b2d8c8' }) => (
  <View style={[{ width: size, height: size }, style]}>
    <View
      style={{
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: color,
        borderRadius: 1,
        transform: [{ translateY: -1 }],
      }}
    />
    <View
      style={{
        position: 'absolute',
        left: '50%',
        top: 0,
        bottom: 0,
        width: 2,
        backgroundColor: color,
        borderRadius: 1,
        transform: [{ translateX: -1 }],
      }}
    />
    <View
      style={{
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: color,
        borderRadius: 1,
        transform: [{ translateY: -1 }, { rotate: '45deg' }],
      }}
    />
    <View
      style={{
        position: 'absolute',
        left: '50%',
        top: 0,
        bottom: 0,
        width: 2,
        backgroundColor: color,
        borderRadius: 1,
        transform: [{ translateX: -1 }, { rotate: '45deg' }],
      }}
    />
  </View>
);

// Mic icon drawn with Views
const MicIcon = () => (
  <View style={micStyles.container}>
    {/* Mic body */}
    <View style={micStyles.body} />
    {/* Mic head */}
    <View style={micStyles.head} />
    {/* Mic stand */}
    <View style={micStyles.stand} />
    {/* Mic base */}
    <View style={micStyles.base} />
    {/* Cable */}
    <View style={micStyles.cable} />
  </View>
);

const micStyles = StyleSheet.create({
  container: {
    width: 36,
    height: 52,
    position: 'relative',
    alignItems: 'center',
  },
  head: {
    width: 18,
    height: 24,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#b2d8c8',
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
  },
  body: {
    width: 2,
    height: 14,
    backgroundColor: '#b2d8c8',
    position: 'absolute',
    top: 24,
    alignSelf: 'center',
  },
  stand: {
    width: 26,
    height: 12,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    borderWidth: 2,
    borderColor: '#b2d8c8',
    borderBottomWidth: 0,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 26,
  },
  base: {
    width: 20,
    height: 2,
    backgroundColor: '#b2d8c8',
    position: 'absolute',
    bottom: 2,
    borderRadius: 1,
  },
  cable: {
    width: 2,
    height: 6,
    backgroundColor: '#b2d8c8',
    position: 'absolute',
    bottom: 2,
    alignSelf: 'center',
  },
});

// Starburst / firework shape
const Firework = ({ style, color = '#b2d8c8', size = 40 }) => {
  const lines = Array.from({ length: 8 });
  return (
    <View style={[{ width: size, height: size }, style]}>
      {lines.map((_, i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            width: size * 0.38,
            height: 2,
            backgroundColor: color,
            borderRadius: 1,
            top: size / 2 - 1,
            left: size / 2,
            transformOrigin: 'left center',
            transform: [{ rotate: `${i * 45}deg` }],
          }}
        />
      ))}
    </View>
  );
};

// Scalloped badge shape using border-radius trick
const BadgeCheck = ({ size = 96 }) => {
  const scallop = size * 0.13;
  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: '#1a7a4a',
        borderRadius: size * 0.3,
        alignItems: 'center',
        justifyContent: 'center',
        // Shadow
        shadowColor: '#1a7a4a',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 18,
        elevation: 12,
      }}
    >
      {/* Checkmark */}
      <View
        style={{ width: size * 0.5, height: size * 0.3, position: 'relative' }}
      >
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: size * 0.2,
            height: 4,
            backgroundColor: '#fff',
            borderRadius: 2,
            transform: [{ rotate: '-45deg' }, { translateY: -size * 0.04 }],
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: size * 0.35,
            height: 4,
            backgroundColor: '#fff',
            borderRadius: 2,
            transform: [
              { rotate: '45deg' },
              { translateY: -size * 0.12 },
              { translateX: size * 0.02 },
            ],
          }}
        />
      </View>
    </View>
  );
};

// Wallet button icons
const TicketIcon = () => (
  <View style={iconStyles.wrapper}>
    <Text style={{ fontSize: 22 }}>🎟️</Text>
  </View>
);

const AppleWalletIcon = () => (
  <View style={iconStyles.wrapper}>
    <Text style={{ fontSize: 22 }}>🗂️</Text>
  </View>
);

const GoogleWalletIcon = () => (
  <View style={iconStyles.wrapper}>
    <Text style={{ fontSize: 22 }}>💳</Text>
  </View>
);

const iconStyles = StyleSheet.create({
  wrapper: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
});

// Main Screen
const SuccessfulScreen = ({ navigation }) => {
  const badgeScale = useRef(new Animated.Value(0)).current;
  const badgeOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslate = useRef(new Animated.Value(30)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const btn1Translate = useRef(new Animated.Value(20)).current;
  const btn2Translate = useRef(new Animated.Value(20)).current;
  const btn3Translate = useRef(new Animated.Value(20)).current;
  const btnOpacity1 = useRef(new Animated.Value(0)).current;
  const btnOpacity2 = useRef(new Animated.Value(0)).current;
  const btnOpacity3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(badgeScale, {
          toValue: 1,
          tension: 60,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(badgeOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.spring(contentTranslate, {
          toValue: 0,
          tension: 80,
          friction: 10,
          useNativeDriver: true,
        }),
      ]),
      Animated.stagger(100, [
        Animated.parallel([
          Animated.timing(btnOpacity1, {
            toValue: 1,
            duration: 280,
            useNativeDriver: true,
          }),
          Animated.spring(btn1Translate, {
            toValue: 0,
            tension: 80,
            friction: 10,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(btnOpacity2, {
            toValue: 1,
            duration: 280,
            useNativeDriver: true,
          }),
          Animated.spring(btn2Translate, {
            toValue: 0,
            tension: 80,
            friction: 10,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(btnOpacity3, {
            toValue: 1,
            duration: 280,
            useNativeDriver: true,
          }),
          Animated.spring(btn3Translate, {
            toValue: 0,
            tension: 80,
            friction: 10,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      {' '}
      <View style={styles.statusBar}>
        <StatusBar barStyle="light-content" backgroundColor="#0F7754" />
      </View>
      <View style={styles.container}>
        {/* Decorative background elements */}
        <View style={styles.decorTop}>
          <MicIcon />
          <Sparkle size={18} style={{ marginTop: 6, marginLeft: 30 }} />
        </View>

        <View style={styles.decorLeft}>
          <Firework color="#b2d8c8" size={44} />
        </View>

        <View style={styles.decorRight}>
          <Firework color="#b2d8c8" size={50} />
        </View>

        <Sparkle size={14} style={styles.sparkleTopRight} color="#c8e8d8" />
        <Sparkle size={10} style={styles.sparkleBottomLeft} color="#c8e8d8" />

        {/* Badge */}
        <Animated.View
          style={[
            styles.badgeWrapper,
            {
              transform: [{ scale: badgeScale }],
              opacity: badgeOpacity,
            },
          ]}
        >
          <BookingConfirmIcon />
        </Animated.View>

        {/* Text content */}
        <Animated.View
          style={[
            styles.textBlock,
            {
              opacity: contentOpacity,
              transform: [{ translateY: contentTranslate }],
            },
          ]}
        >
          <Text style={styles.title}>Booking Confirmed!</Text>
          <Text style={styles.subtitle}>
            Your ticket is ready and saved. Add it to{'\n'}your wallet for quick
            access.
          </Text>
        </Animated.View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <Animated.View
            style={{
              opacity: btnOpacity1,
              transform: [{ translateY: btn1Translate }],
            }}
          >
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.82}
              onPress={() => navigation.navigate('Ticket')}
            >
              <TicketViewIcon />
              <Text style={styles.buttonText}>View Ticket</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            style={{
              opacity: btnOpacity2,
              transform: [{ translateY: btn2Translate }],
            }}
          >
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.82}
              onPress={() => navigation.navigate('Ticket')}
            >
              <AddAppleWalletIcon />
              <Text style={styles.buttonText}>Add to Apple Wallet</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            style={{
              opacity: btnOpacity3,
              transform: [{ translateY: btn3Translate }],
            }}
          >
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.82}
              onPress={() => navigation.navigate('Ticket')}
            >
              <View style={{ marginTop: 2 }}>
                <AddGoogleWalletIcon />
              </View>
              <Text style={styles.buttonText}>Add to Google Wallet</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: appColors.primary,
    height: StatusBar.currentHeight,
  },
  safe: {
    flex: 1,
    backgroundColor: '#f5faf7',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5faf7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  // Decorative positions
  decorTop: {
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  decorLeft: {
    position: 'absolute',
    top: '30%',
    left: 24,
  },
  decorRight: {
    position: 'absolute',
    top: '28%',
    right: 20,
  },
  sparkleTopRight: {
    position: 'absolute',
    top: 56,
    right: 52,
  },
  sparkleBottomLeft: {
    position: 'absolute',
    top: '38%',
    left: 60,
  },

  // Badge
  badgeWrapper: {
    marginBottom: 32,
  },

  // Text
  textBlock: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '400',
  },

  // Buttons
  buttonsContainer: {
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: appColors.black,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
    gap: 10,
  },
  buttonText: {
    color: appColors.white,
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
});

export default SuccessfulScreen;
