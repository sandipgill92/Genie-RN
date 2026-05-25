import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Svg, { Rect, Circle, Path, G } from 'react-native-svg';
import { appColors } from '../../utils/appColors';
import RefundIcon from '../../assets/svg/RefundIcon';
import BackIcon from '../../assets/svg/BackIcon';
import SinglePaymentIcon from '../../assets/svg/SinglePaymentIcon';
import ZeroFailure from '../../assets/svg/ZeroFailure';
import WalletIllustration from '../../assets/svg/WalletIllustration';

const CheckIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={10} fill="#22C55E" />
    <Path
      d="M7 12.5L10.5 16L17 9"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const FEATURES = [
  {
    id: 1,
    icon: <SinglePaymentIcon />,
    title: 'Single tap payments',
    desc: "seamless payments without the wait for OTP's",
  },
  {
    id: 2,
    icon: <ZeroFailure />,
    title: 'Zero failures',
    desc: 'Zero payment failures ensure you never miss booking',
  },
  {
    id: 3,
    icon: <RefundIcon />,
    title: 'Instant refunds',
    desc: 'Get your money back instantly',
  },
];

const GenieMoney = ({ navigation }) => {
  const [btnPressed, setBtnPressed] = useState(false);

  return (
    <>
      <View style={styles.statusBar}>
        <StatusBar barStyle="light-content" backgroundColor="#0F7754" />
      </View>
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.container, { paddingRight: 0 }]}>
          {/* Back Button */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon />
          </TouchableOpacity>

          {/* Header Row */}
          <View style={styles.headerRow}>
            <View style={styles.headerText}>
              <Text style={styles.title}>Genie{'\n'}money</Text>
              <Text style={styles.subtitle}>
                Faster checkouts and{'\n'}hassle - free refunds
              </Text>
            </View>
            <View style={styles.walletWrapper}>
              <WalletIllustration />
            </View>
          </View>
          <View style={[styles.container, { paddingLeft: 0 }]}>
            {/* Feature List */}
            <View style={styles.featureList}>
              {FEATURES.map(item => (
                <View key={item.id} style={styles.featureRow}>
                  <View style={[styles.iconCircle]}>{item.icon}</View>
                  <View style={styles.featureText}>
                    <Text style={styles.featureTitle}>{item.title}</Text>
                    <Text style={styles.featureDesc}>{item.desc}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Watermark */}
            <View style={styles.watermarkContainer}>
              <Text style={styles.watermark}>
                Enjoy seamless{'\n'}single tap payments
              </Text>
            </View>

            {/* CTA Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPressIn={() => setBtnPressed(true)}
              onPressOut={() => setBtnPressed(false)}
              style={[styles.addBtn, btnPressed && styles.addBtnPressed]}
              onPress={() => navigation.navigate('PaymentSetting')}
            >
              <Text style={styles.addBtnText}>Add money</Text>
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
  safeArea: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginVertical: 32,
  },
  headerText: {
    flex: 1,
    paddingTop: 8,
  },
  title: {
    fontSize: 38,
    fontWeight: '700',
    color: '#1A1A1A',
    lineHeight: 44,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    color: '#999999',
    marginTop: 8,
    lineHeight: 19,
    fontWeight: '400',
  },
  walletWrapper: {
    marginRight: -8,
    marginTop: -12,
  },
  featureList: {
    gap: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: appColors.placeholder,
  },
  iconCircle: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    flex: 1,
    paddingTop: 2,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    letterSpacing: -0.1,
  },
  featureDesc: {
    fontSize: 13,
    color: '#999999',
    marginTop: 3,
    lineHeight: 18,
    fontWeight: '400',
  },
  watermarkContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  watermark: {
    fontSize: 28,
    fontWeight: '700',
    color: '#e3e1e1',
    textAlign: 'center',
    lineHeight: 36,
    letterSpacing: -0.5,
  },
  addBtn: {
    height: 54,
    backgroundColor: '#1A1A1A',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnPressed: {
    backgroundColor: '#333333',
    transform: [{ scale: 0.98 }],
  },
  addBtnText: {
    color: appColors.white,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
});

export default GenieMoney;
