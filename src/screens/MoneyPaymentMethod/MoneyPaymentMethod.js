import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { appColors } from '../../utils/appColors';
import BackIcon from '../../assets/svg/BackIcon';
import PaypalIcon from '../../assets/svg/PaypalIcon';
import DebitCardIcon from '../../assets/svg/DebitCardIcon';
import NetbankingIcon from '../../assets/svg/NetbankingIcon';

// ── Main Component ──────────────────────────────────────────────────────────
const MoneyPaymentMethod = ({ navigation }) => {
  return (
    <>
      <View style={styles.statusBar}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={appColors.primary}
        />
      </View>
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation?.goBack()}
            style={styles.backBtn}
            activeOpacity={0.6}
          >
            <BackIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Select Payment Method</Text>
        </View>

        {/* Body */}
        <View style={styles.body}>
          {/* Recommended */}
          <Text style={styles.sectionLabel}>Recommended</Text>
          <TouchableOpacity
            style={styles.optionRow}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('PaymentAddedSuccessfully')}
          >
            <View style={styles.optionLeft}>
              <View style={styles.paypalWrap}>
                <PaypalIcon />
              </View>
              <Text style={styles.optionText}>PayPal</Text>
            </View>
          </TouchableOpacity>

          {/* Cards */}
          <Text style={[styles.sectionLabel, styles.sectionSpacing]}>
            Cards
          </Text>
          <TouchableOpacity
            style={styles.optionRow}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('PaymentMathodScreen2')}
          >
            <View style={styles.optionLeft}>
              <View style={styles.paypalWrap}>
                <DebitCardIcon />
              </View>
              <Text style={styles.optionText}>Add credit or debit cards</Text>
            </View>
            <Text style={styles.addLabel}>ADD</Text>
          </TouchableOpacity>

          {/* Netbanking */}
          <Text style={[styles.sectionLabel, styles.sectionSpacing]}>
            Netbanking
          </Text>
          <TouchableOpacity
            style={styles.optionRow}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('PaymentAddedSuccessfully')}
          >
            <View style={styles.optionLeft}>
              <View style={styles.paypalWrap}>
                <NetbankingIcon />
              </View>
              <Text style={styles.optionText}>Netbanking</Text>
            </View>
            <Text style={styles.addLabel}>ADD</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

// ── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: appColors.primary,
    height: StatusBar.currentHeight,
  },
  safe: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: appColors.white,
  },
  backBtn: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  sectionLabel: {
    fontSize: 13,
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  sectionSpacing: {
    marginTop: 24,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: appColors.white,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 12,
  },
  addLabel: {
    fontSize: 11,
    letterSpacing: 0.8,
  },
  paypalWrap: {
    borderWidth: 1,
    borderColor: appColors.placeholder,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
});

export default MoneyPaymentMethod;
