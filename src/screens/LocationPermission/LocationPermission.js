import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Animated,
} from 'react-native';
import { appColors } from '../../utils/appColors';
import LocationImg from '../../assets/svg/LocationImg.js';

const { width } = Dimensions.get('window');

const LocationPermission = ({ navigation }) => {
  const handleSelectManually = () => {
    console.log('Select location manually pressed');
  };

  const handleSkip = () => {
    console.log('Skip pressed');
  };

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
        {/* Skip Button */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Dashboard')}
            style={styles.skipButton}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.illustrationContainer}>
          <Animated.View
            style={[
              {
                transform: [{ translateY: contentSlideAnim }],
              },
            ]}
          >
            <View style={[styles.logoStyle]}>
              <LocationImg />
            </View>
          </Animated.View>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Map Icon Illustration */}

          {/* Text Content */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>Your city, your scene.</Text>
            <Text style={styles.title}>Let’s find your fit!</Text>
            <Text style={styles.subtitle}>
              Discover movies, events and festivals
            </Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate('Location')}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>Use Current location</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleSelectManually}
              activeOpacity={0.7}
            >
              <Text style={styles.secondaryButtonText}>
                Select location manually
              </Text>
            </TouchableOpacity>
          </View>
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
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  header: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  skipButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  skipText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '400',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 30,
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: appColors.black,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 12,
    fontWeight: '400',
  },
  buttonContainer: {
    width: '100%',
  },
  primaryButton: {
    backgroundColor: appColors.black,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: appColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonText: {
    color: appColors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: appColors.black,
    fontSize: 16,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});

export default LocationPermission;
