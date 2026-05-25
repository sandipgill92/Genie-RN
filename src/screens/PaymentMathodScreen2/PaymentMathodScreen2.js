import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { appColors } from '../../utils/appColors';
import BackWhiteIcon from '../../assets/svg/BackWhiteIcon';
import SecurePaymentIcon from '../../assets/svg/SecurePaymentIcon';
import TashaMarieIcon from '../../assets/svg/TashaMarieIcon';
import VisaCardIcon from '../../assets/svg/VisaCardIcon';
import AmazoneBalanceIcon from '../../assets/svg/AmazoneBalanceIcon';
import PaypalIcon from '../../assets/svg/PaypalIcon';
import GenieMoney from '../../assets/svg/GenieMoney';
import NetbankingIcon from '../../assets/svg/NetbankingIcon';
import VerifyGreenIcon from '../../assets/svg/VerifyGreenIcon';

// ─── Icon Components (SVG-free inline icons) ─────────────────────────────────

const CheckIcon = () => (
  <View style={styles.checkCircle}>
    <Text style={{ color: '#fff', fontSize: 11, fontWeight: '700' }}>✓</Text>
  </View>
);

// ─── Section Header ───────────────────────────────────────────────────────────

const SectionHeader = ({ title, actionLabel, onAction }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {actionLabel && (
      <TouchableOpacity onPress={onAction}>
        <Text style={styles.sectionAction}>{actionLabel}</Text>
      </TouchableOpacity>
    )}
  </View>
);

// ─── Payment Option Row ───────────────────────────────────────────────────────

const PaymentRow = ({
  logo,
  title,
  subtitle,
  selected,
  onPress,
  actionLabel,
  onAction,
  disabled,
  isFirst,
  isLast,
  borderNone,
}) => (
  <TouchableOpacity
    style={[
      styles.paymentRow,
      selected && styles.paymentRowSelected,
      isFirst && styles.rowFirst,
      isLast && styles.rowLast,
      disabled && styles.paymentRowDisabled,
    ]}
    onPress={!disabled ? onPress : undefined}
    activeOpacity={disabled ? 1 : 0.7}
  >
    <View style={styles.rowLeft}>
      <View style={[styles.borderStyle, borderNone && styles.borderNoneStyle]}>
        {logo}
      </View>
      <View style={styles.rowText}>
        <Text style={[styles.rowTitle, disabled && styles.rowTitleDisabled]}>
          {title}
        </Text>
        {subtitle ? (
          <Text
            style={[styles.rowSubtitle, disabled && styles.rowSubtitleError]}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
    </View>
    <View style={styles.rowRight}>
      {selected && <CheckIcon />}
      {actionLabel && (
        <TouchableOpacity onPress={onAction} style={styles.actionButton}>
          <Text style={styles.actionLabel}>{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  </TouchableOpacity>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────

const PaymentMathodScreen2 = ({ navigation }) => {
  const [selectedMethod, setSelectedMethod] = useState('visa');

  return (
    <>
      <View style={styles.statusBar}>
        <StatusBar barStyle="light-content" backgroundColor="#0F7754" />
      </View>
      <SafeAreaView style={styles.safe}>
        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation?.goBack()}
            style={styles.backBtn}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <BackWhiteIcon />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerLabel}>Payment Method</Text>
            <Text style={styles.headerSub}>Total amount</Text>
            <Text style={styles.headerAmount}>JMD $5,154</Text>
            <View style={styles.secureBadge}>
              <SecurePaymentIcon />
              <Text style={styles.secureText}> Secure Payment</Text>
            </View>
          </View>
          <View style={{ width: 32 }} />
        </View>

        {/* ── Body ── */}
        <ScrollView
          style={styles.body}
          contentContainerStyle={styles.bodyContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Recommended */}
          <SectionHeader title="Recommended" />
          <View style={styles.card}>
            <PaymentRow
              logo={<PaypalIcon />}
              title="PayPal"
              subtitle="taylor****@gmail.com"
              selected={selectedMethod === 'paypal'}
              onPress={() => setSelectedMethod('paypal')}
              isFirst
              isLast
            />
          </View>

          {/* Cards */}
          <SectionHeader title="Cards" actionLabel="+ Add new card" />
          <View style={styles.card}>
            <PaymentRow
              logo={<VisaCardIcon />}
              title="Tasha-Marie"
              subtitle="••••••••3"
              selected={selectedMethod === 'visa'}
              onPress={() => setSelectedMethod('visa')}
              isFirst
              borderNone
            />
          </View>
          <View style={styles.card}>
            <PaymentRow
              logo={<TashaMarieIcon />}
              title="Tasha-Marie"
              subtitle="••••••••3"
              selected={selectedMethod === 'mastercard'}
              onPress={() => setSelectedMethod('mastercard')}
              isLast
              borderNone
            />
          </View>

          {/* Wallets */}
          <SectionHeader title="Wallets" />
          <View style={styles.card}>
            <PaymentRow
              logo={<AmazoneBalanceIcon height={20} />}
              title="Amazon Pay Balance"
              subtitle="Link your Amazon Pay Balance W..."
              selected={selectedMethod === 'amazon'}
              actionLabel="LINK"
              isFirst
            />
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: appColors.placeholder,
              }}
            ></View>
            <PaymentRow
              logo={<GenieMoney />}
              title="Genie Money"
              subtitle="Unavailable due to insufficient balance"
              isLast
            />
          </View>

          {/* Netbanking */}
          <SectionHeader title="Netbanking" />
          <View style={styles.card}>
            <PaymentRow
              logo={<NetbankingIcon />}
              title="Netbanking"
              selected={selectedMethod === 'netbanking'}
              onPress={() => setSelectedMethod('netbanking')}
              actionLabel="ADD"
              isFirst
              isLast
            />
          </View>

          {/* <View style={{ height: 100 }} /> */}
        </ScrollView>

        {/* ── Footer ── */}
        <View style={styles.footer}>
          <View style={styles.securityNote}>
            <VerifyGreenIcon />
            <Text style={styles.securityNoteText}>
              We adhere entirely to the data Security Standard of the payment
              card industry.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.buyBtn}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('SuccessfulScreen')}
          >
            <Text style={styles.buyBtnText}>Buy Ticket</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const GRAY_TEXT = '#999';

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: appColors.primary,
    height: StatusBar.currentHeight,
  },
  safe: {
    flex: 1,
    backgroundColor: appColors.primary,
  },

  // ── Header ──
  header: {
    backgroundColor: appColors.primary,
    paddingTop: 12,
    paddingBottom: 28,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerLabel: {
    color: appColors.white,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  headerSub: {
    fontSize: 12,
    marginTop: 8,
    color: appColors.white,
  },
  headerAmount: {
    color: appColors.white,
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginTop: 2,
  },
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  secureText: {
    fontSize: 11,
    color: appColors.white,
  },

  // ── Body ──
  body: {
    flex: 1,
    backgroundColor: appColors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  bodyContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  // ── Section ──
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 4,
    paddingHorizontal: 2,
  },
  sectionTitle: {
    fontSize: 13,
    color: appColors.black,
    letterSpacing: 0.2,
  },
  sectionAction: {
    fontSize: 12,
    color: appColors.primary,
  },

  // ── Card Container ──
  card: {
    backgroundColor: appColors.white,
    borderRadius: 14,
    marginBottom: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: appColors.placeholder,
  },

  borderStyle: {
    borderWidth: 1,
    borderColor: appColors.placeholder,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  borderNoneStyle: {
    borderWidth: 0,
    borderColor: appColors.white,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 0,
  },
  // ── Payment Row ──
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: appColors.white,
  },
  paymentRowSelected: {
    // borderWidth: 1,
    // borderColor: appColors.primary,
    // borderRadius: 14,
    // backgroundColor: '#F0FAF4',
  },
  paymentRowDisabled: {
    opacity: 0.6,
  },
  rowFirst: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  rowLast: {
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rowText: {
    marginLeft: 12,
    flex: 1,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: appColors.black,
  },
  rowTitleDisabled: {
    color: GRAY_TEXT,
  },
  rowSubtitle: {
    fontSize: 11,
    color: GRAY_TEXT,
    marginTop: 2,
  },
  rowSubtitleError: {
    color: '#E53935',
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  actionLabel: {
    color: appColors.black,
    fontSize: 11,
    letterSpacing: 0.5,
  },

  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#EBEBEB',
    marginHorizontal: 16,
  },

  // ── Logo Styles ──
  paypalLogo: {
    flexDirection: 'row',
    backgroundColor: '#F5F8FF',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: appColors.placeholder,
  },
  visaBadge: {
    backgroundColor: '#1A1F71',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 5,
    width: 52,
    alignItems: 'center',
  },
  visaText: {
    color: appColors.white,
    fontWeight: '900',
    fontSize: 13,
    letterSpacing: 1,
  },
  mastercardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mcCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    opacity: 0.9,
  },
  amazonIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#232F3E',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Check ──
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: appColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Footer ──
  footer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 20,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#e3f7ee',
  },
  securityNoteText: {
    fontSize: 11,
    color: appColors.black,
    lineHeight: 16,
    fontWeight: '500',
    flex: 1,
  },
  buyBtn: {
    backgroundColor: '#111',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buyBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});

export default PaymentMathodScreen2;
