import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { appColors } from '../../utils/appColors';
import BackIcon from '../../assets/svg/BackIcon';
import PaypalIcon from '../../assets/svg/PaypalIcon';
import DebitCardIcon from '../../assets/svg/DebitCardIcon';
import AmazoneBalanceIcon from '../../assets/svg/AmazoneBalanceIcon';
import GenieMoney from '../../assets/svg/GenieMoney';
import NetbankingIcon from '../../assets/svg/NetbankingIcon';

const AmazonIcon = () => (
  <View style={styles.AmazonIconStyle}>
    <AmazoneBalanceIcon />
  </View>
);

const GenieIcon = () => (
  <View style={styles.helpIcon}>
    <GenieMoney />
  </View>
);

const SectionHeader = ({ title }) => (
  <Text style={styles.sectionHeader}>{title}</Text>
);

const PaymentRow = ({
  icon: IconComponent,
  label,
  subLabel,
  subLabelError,
  actionLabel,
  onAction,
  onPress,
  disabled,
}) => (
  <TouchableOpacity
    style={[styles.row, disabled && styles.rowDisabled]}
    activeOpacity={onPress ? 0.7 : 1}
    onPress={onPress}
    disabled={!onPress && !onAction}
  >
    <View style={styles.rowLeft}>
      <IconComponent />
      <View style={styles.rowTextWrap}>
        <Text style={[styles.rowLabel, disabled && styles.rowLabelDisabled]}>
          {label}
        </Text>
        {subLabel ? (
          <Text
            style={[
              styles.rowSubLabel,
              subLabelError && styles.rowSubLabelError,
            ]}
          >
            {subLabel}
          </Text>
        ) : null}
      </View>
    </View>
    {actionLabel ? (
      <TouchableOpacity onPress={onAction} hitSlop={8}>
        <Text style={styles.actionLabel}>{actionLabel}</Text>
      </TouchableOpacity>
    ) : null}
  </TouchableOpacity>
);

const Divider = () => <View style={styles.divider} />;

// ---------- Main Screen ----------

const SelectPaymentMethod = ({ navigation }) => {
  return (
    <>
      <View style={styles.statusBar}>
        <StatusBar barStyle="light-content" backgroundColor="#0F7754" />
      </View>
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={12}
            style={styles.backBtn}
          >
            <BackIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Select Payment Method</Text>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* UPI */}
          <SectionHeader title="Recommended" />
          <TouchableOpacity style={styles.helpRow}>
            <View style={styles.helpIcon}>
              <PaypalIcon />
            </View>
            <Text style={styles.helpText}>PayPal</Text>
          </TouchableOpacity>
          {/* Cards */}
          <SectionHeader title="Cards" />

          <TouchableOpacity
            style={[styles.helpRow, { justifyContent: 'space-between' }]}
            onPress={() => navigation.navigate('PaymentMathodScreen2')}
          >
            <View
              style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}
            >
              <View style={styles.helpIcon}>
                <DebitCardIcon />
              </View>
              <Text style={styles.helpText}>Add credit or debit cards</Text>
            </View>
            <Text style={styles.addText}>ADD</Text>
          </TouchableOpacity>

          {/* Wallets */}
          <SectionHeader title="Wallets" />
          <View style={styles.card}>
            <View style={{ paddingHorizontal: 10 }}>
              <PaymentRow
                icon={AmazonIcon}
                label="Amazon Pay Balance"
                subLabel="Link your Amazon Pay Balance W..."
                actionLabel="LINK"
                onAction={() => {}}
              />
            </View>
            <Divider />
            <View style={{ paddingHorizontal: 10 }}>
              <PaymentRow
                icon={GenieIcon}
                label="Genie Money"
                subLabel="Unavailable due to insufficient balance"
                subLabelError
                // disabled
              />
            </View>
          </View>
          {/* Netbanking */}
          <SectionHeader title="Netbanking" />
          <TouchableOpacity
            style={[styles.helpRow, { justifyContent: 'space-between' }]}
          >
            <View
              style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}
            >
              <View style={styles.helpIcon}>
                <NetbankingIcon />
              </View>
              <Text style={styles.helpText}>Netbanking</Text>
            </View>
            <Text style={styles.addText}>ADD</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

// ---------- Styles ----------
const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: appColors.primary,
    height: StatusBar.currentHeight,
  },
  safe: {
    flex: 1,
    backgroundColor: appColors.white,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#e0e0e0',
  },
  backBtn: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1a1a1a',
    letterSpacing: 0.1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '600',
    color: appColors.black,
    letterSpacing: 0.5,
    marginTop: 20,
    marginBottom: 8,
  },
  AmazonIconStyle: {
    borderWidth: 0.7,
    borderColor: appColors.placeholder,
    paddingHorizontal: 6,
    paddingVertical: 10,
    borderRadius: 8,
  },
  helpIcon: {
    borderWidth: 0.7,
    borderColor: appColors.placeholder,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  helpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: appColors.placeholder,
    borderRadius: 8,
    gap: 10,
  },
  helpText: {
    fontSize: 14,
    fontWeight: '500',
  },
  addText: {
    fontSize: 12,
  },
  card: {
    marginHorizontal: 0,
    borderWidth: 1,
    borderColor: appColors.placeholder,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    minHeight: 60,
  },
  rowDisabled: {
    opacity: 0.7,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  rowTextWrap: {
    flex: 1,
  },
  rowLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: appColors.black,
  },
  rowLabelDisabled: {
    color: '#555',
  },
  rowSubLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  rowSubLabelError: {
    color: '#ff2121',
  },
  actionLabel: {
    fontSize: 12,
    color: appColors.black,
    letterSpacing: 0.5,
    paddingLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: appColors.placeholder,
  },
});

export default SelectPaymentMethod;
