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
import GuideIcon2 from '../../assets/svg/GuideIcon2.js';
import GuideBg2 from '../../assets/svg/GuideBg2.js';

const Guide2 = ({ navigation }) => {
  const contentSlideAnim = useRef(new Animated.Value(-300)).current; // upar se
  const imageSlideAnim = useRef(new Animated.Value(300)).current; // niche se

  useEffect(() => {
    Animated.parallel([
      Animated.spring(contentSlideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 30,
        friction: 10,
      }),
      Animated.spring(imageSlideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 30,
        friction: 10,
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
            styles.bottomTextStyle,
            { transform: [{ translateY: contentSlideAnim }] },
          ]}
        >
          <Text style={styles.textStyle}>Next Vibe Coming Up!</Text>
          <Text style={styles.textStyle1}>
            Concerts, sports, and shows – stay in the loop
          </Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.logoStyle,
            { transform: [{ translateY: imageSlideAnim }] },
          ]}
        >
          <GuideIcon2 />
        </Animated.View>

        <Animated.View
          style={[
            styles.bgStyle,
            { transform: [{ translateY: imageSlideAnim }] },
          ]}
        >
          <GuideBg2 />
        </Animated.View>

        <Animated.View
          style={[
            styles.nextIconStyle,
            { transform: [{ translateY: imageSlideAnim }] },
          ]}
        >
          <TouchableOpacity onPress={() => navigation.navigate('Guide3')}>
            <NextIcon />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </>
  );
};

export default Guide2;

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: appColors.primary,
    height: StatusBar.currentHeight,
  },
  containerStyle: {
    backgroundColor: appColors.white,
    flex: 1,
    position: 'relative',
  },
  logoStyle: {
    width: '100%',
    zIndex: 1,
    top: 0,
  },
  bgStyle: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTextStyle: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
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
    position: 'absolute',
    bottom: 55,
    zIndex: 1,
  },
});
