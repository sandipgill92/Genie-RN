import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { appColors } from '../../utils/appColors';
import BackIcon from '../../assets/svg/BackIcon';
import DolarBgIcon from '../../assets/svg/DolarBgIcon';

const QUICK_AMOUNTS = [500, 1000, 2000];

const AddMoney = ({ navigation }) => {
  const [amount, setAmount] = useState(2000);

  const handleQuickAdd = value => {
    setAmount(prev => prev + value);
  };

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
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <BackIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Money</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Icon */}
          <View style={styles.iconWrapper}>
            <DolarBgIcon />
          </View>

          {/* Amount Section */}
          <Text style={styles.label}>Enter amount to add</Text>
          <Text style={styles.amount}>J${amount.toLocaleString()}</Text>
          <Text style={styles.subLabel}>
            You can add a maximum of J$100,000 this month
          </Text>

          {/* Quick Add Buttons */}
          <View style={styles.quickRow}>
            {QUICK_AMOUNTS.map(val => (
              <TouchableOpacity
                key={val}
                style={styles.quickBtn}
                onPress={() => handleQuickAdd(val)}
                activeOpacity={0.7}
              >
                <Text style={styles.quickBtnText}>
                  +J${val.toLocaleString()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Note Section */}
          <View style={styles.noteContainer}>
            <Text style={styles.noteTitle}>Note</Text>
            <View style={styles.noteItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.noteText}>
                Genie Wallet balance is valid for{' '}
                <Text style={styles.bold}>4 years</Text> from the date of
                addition
              </Text>
            </View>
            <View style={styles.noteItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.noteText}>
                Genie Wallet can only be used to book events on the Genie App
              </Text>
            </View>
            <View style={styles.noteItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.noteText}>
                Funds <Text style={styles.bold}>cannot be</Text> withdrawn or
                transferred to a bank account
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom CTA */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.ctaBtn}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('MoneyPaymentMethod')}
          >
            <Text style={styles.ctaText}>Add Payment Method</Text>
          </TouchableOpacity>
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
  safe: {
    flex: 1,
    backgroundColor: appColors.white,
  },

  /* ── Header ── */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backBtn: {
    marginRight: 12,
  },
  backArrow: {
    fontSize: 22,
    color: appColors.black,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: appColors.black,
  },

  /* ── Scroll ── */
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'center',
  },

  /* ── Icon ── */
  iconWrapper: {
    marginTop: 24,
    marginBottom: 24,
  },

  /* ── Amount ── */
  label: {
    fontSize: 15,
    marginBottom: 8,
  },
  amount: {
    fontSize: 30,
    fontWeight: '700',
    color: appColors.black,
    marginBottom: 8,
  },
  subLabel: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 28,
  },

  /* ── Quick Buttons ── */
  quickRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 32,
  },
  quickBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  quickBtnText: {
    fontSize: 13,
    fontWeight: '500',
    color: appColors.black,
  },

  /* ── Note ── */
  noteContainer: {
    width: '100%',
  },
  noteTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: appColors.black,
    marginBottom: 10,
  },
  noteItem: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: 24,
    marginRight: 6,
    lineHeight: 20,
  },
  noteText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
  },
  bold: {
    fontWeight: '700',
    color: appColors.black,
  },

  /* ── Footer ── */
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 12,
    backgroundColor: appColors.white,
  },
  ctaBtn: {
    backgroundColor: appColors.black,
    borderRadius: 32,
    paddingVertical: 14,
    alignItems: 'center',
  },
  ctaText: {
    color: appColors.white,
    fontSize: 15,
    fontWeight: '600',
  },
});

export default AddMoney;
