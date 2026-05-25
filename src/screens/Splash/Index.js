import { StatusBar, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import SplashIcon from '../../assets/svg/SplashIcon.js';

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Dashboard');
    }, 3000);
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0F7754" />
      <View style={styles.containerStyle}>
        <View style={styles.logoStyle}>
          <SplashIcon />
        </View>
      </View>
    </>
  );
};

export default Splash;

const styles = StyleSheet.create({});
