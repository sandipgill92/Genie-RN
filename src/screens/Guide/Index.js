import { useEffect, useRef } from 'react';
import {
  Animated,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { appColors } from '../../utils/appColors.js';
import NextIcon from '../../assets/svg/NextIcon.js';
import GuideIcon from '../../assets/svg/GuideIcon.js';
import GuideBg from '../../assets/svg/GuideBg.js';

const Guide = ({ navigation }) => {
  const bgSlideX = useRef(new Animated.Value(-300)).current;
  const bgSlideY = useRef(new Animated.Value(-300)).current;
  const contentSlideAnim = useRef(new Animated.Value(-300)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(bgSlideX, {
        toValue: 0,
        useNativeDriver: true,
        tension: 30,
        friction: 7,
      }),
      Animated.spring(bgSlideY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 30,
        friction: 7,
      }),
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
      <View style={styles.containerStyle}>
        <Animated.View
          style={[
            {
              transform: [{ translateX: bgSlideX }, { translateY: bgSlideY }],
            },
          ]}
        >
          <View style={[styles.bgStyle]}>
            <GuideBg />
          </View>
          <View style={[styles.logoStyle]}>
            <GuideIcon />
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.bottomTextStyle,
            { transform: [{ translateX: contentSlideAnim }] },
          ]}
        >
          <Text style={styles.textStyle}>Book Yuh Movie Now!</Text>
          <Text style={styles.textStyle1}>
            Fast, easy, secure ticketing at your fingertips
          </Text>

          <View style={styles.nextIconStyle}>
            <TouchableOpacity onPress={() => navigation.navigate('Guide2')}>
              <NextIcon />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </>
  );
};

export default Guide;

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: appColors.primary,
    height: StatusBar.currentHeight,
  },
  containerStyle: {
    backgroundColor: appColors.white,
    flex: 1,
  },
  bgStyle: {
    width: '95%',
    position: 'absolute',
    top: -30,
  },
  logoStyle: {
    width: '95%',
    top: 20,
  },
  bottomTextStyle: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    top: 100,
  },
  textStyle: {
    color: appColors.black,
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
  },
  textStyle1: {
    color: appColors.black,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
  },
  nextIconStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    bottom: -30,
  },
});
