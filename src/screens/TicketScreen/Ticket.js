import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { appColors } from '../../utils/appColors';
import AddAppleWalletIcon from '../../assets/svg/AddAppleWalletIcon';
import AddGoogleWalletIcon from '../../assets/svg/AddGoogleWalletIcon';

const { width } = Dimensions.get('window');
const TICKET_WIDTH = width - 48;

// Simple barcode renderer using thin/thick lines
const Barcode = () => {
  const bars = [
    3, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 1, 3,
    2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 1,
    2, 1, 3, 2, 1, 3, 1, 2, 2, 1,
  ];
  return (
    <View style={barcodeStyles.container}>
      {bars.map((width, i) => (
        <View
          key={i}
          style={[
            barcodeStyles.bar,
            {
              width: width * 2,
              backgroundColor: i % 2 === 0 ? appColors.black : 'transparent',
            },
          ]}
        />
      ))}
    </View>
  );
};

const barcodeStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 64,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  bar: {
    height: '100%',
  },
});

// Dashed separator with side notches
const TicketSeparator = () => (
  <View style={separatorStyles.wrapper}>
    <View style={separatorStyles.notchLeft} />
    <View style={separatorStyles.dashes}>
      {Array.from({ length: 28 }).map((_, i) => (
        <View key={i} style={separatorStyles.dash} />
      ))}
    </View>
    <View style={separatorStyles.notchRight} />
  </View>
);

const separatorStyles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 0,
  },
  notchLeft: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: appColors.primary,
    marginLeft: -9,
  },
  notchRight: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: appColors.primary,
    marginRight: -9,
  },
  dashes: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  dash: {
    width: 6,
    height: 1.5,
    backgroundColor: '#D0D0D0',
    borderRadius: 2,
  },
});

const InfoRow = ({ label, value, label2, value2 }) => (
  <View style={infoStyles.row}>
    <View style={infoStyles.col}>
      <Text style={infoStyles.label}>{label}</Text>
      <Text style={infoStyles.value}>{value}</Text>
    </View>
    {label2 && (
      <View style={[infoStyles.col, { alignItems: 'flex-end' }]}>
        <Text style={infoStyles.label}>{label2}</Text>
        <Text style={infoStyles.value}>{value2}</Text>
      </View>
    )}
  </View>
);

const infoStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  col: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    color: '#999',
    marginBottom: 3,
    fontWeight: '400',
  },
  value: {
    fontSize: 14,
    color: appColors.black,
    fontWeight: '500',
  },
});

const Ticket = ({ navigation }) => {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle="light-content" backgroundColor="#2d7a52" />

      <Text style={styles.screenTitle}>Ticket</Text>

      {/* ── Ticket Card ── */}
      <View style={[styles.ticket, { width: TICKET_WIDTH }]}>
        {/* Event Banner */}
        <View style={{ paddingTop: 16, paddingHorizontal: 20 }}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
            }}
            style={styles.eventBanner}
            resizeMode="cover"
          />
        </View>

        {/* Event Title */}
        <Text style={styles.eventTitle}>Skinz and Nipples</Text>

        {/* Separator 1 */}
        <TicketSeparator />

        {/* Location */}
        <InfoRow
          label="Location"
          value="Ewerton Sports Complex, St. Catherine"
        />

        {/* Name + Seat */}
        <InfoRow
          label="Name"
          value="Tasha-Marie"
          label2="Seat"
          value2="2(Platinum VIP)"
        />

        {/* Date + Time */}
        <InfoRow
          label="Date"
          value="Fri, 02 Aug 2025"
          label2="Time"
          value2="9:00 PM"
        />

        {/* Separator 2 */}
        <TicketSeparator />

        {/* Barcode */}
        <Barcode />
      </View>

      {/* ── Wallet Buttons ── */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.walletBtn} activeOpacity={0.85}>
          <AddAppleWalletIcon width={24} height={24} />
          <Text style={styles.walletBtnText}>Add to Apple watch</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.walletBtn} activeOpacity={0.85}>
          <AddGoogleWalletIcon width={24} height={24} />
          <Text style={styles.walletBtnText}>Add to Google watch</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: appColors.primary,
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: 52,
    paddingBottom: 40,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: appColors.white,
    marginBottom: 24,
    letterSpacing: 0.3,
  },

  // ── Ticket ──
  ticket: {
    backgroundColor: appColors.white,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: appColors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 10,
  },
  eventBanner: {
    width: '100%',
    height: 170,
    overflow: 'hidden',
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: appColors.black,
    textAlign: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },

  // ── Buttons ──
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 28,
    paddingHorizontal: 4,
  },
  walletBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: appColors.black,
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderRadius: 32,
    gap: 8,
  },

  walletBtnText: {
    color: appColors.white,
    fontSize: 11,
    fontWeight: '500',
  },
});

export default Ticket;
