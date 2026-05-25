import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { appColors } from '../../utils/appColors';
import BackIcon from '../../assets/svg/BackIcon';
import MovieFrame from '../../assets/svg/MovieFrame';

// ─── Mock Data ───────────────────────────────────────────────────────────────
const TICKETS = [
  {
    id: '1',
    title: 'Mobay Reggae Nights – Performance by Taddy P & The Blow Wow Band',
    date: '25 May | 07:00 PM',
    tickets: '1 ticket',
    location: 'Harmony Beach Park, Jimmy Cliff Blvd, Montego Bay',
    status: 'finished',
    canTransfer: false,
    image: 'https://placehold.co/64x64/1a1a2e/ff6b35?text=RN',
  },
  {
    id: '2',
    title: 'Mobay Reggae Nights – Performance by Taddy P & The Blow Wow Band',
    date: '05 May | 07:00 PM',
    tickets: '3 tickets',
    location: 'Harmony Beach Park, Jimmy Cliff Blvd, Montego Bay',
    status: 'transfer',
    canTransfer: true,
    image: 'https://placehold.co/64x64/1a1a2e/ff6b35?text=RN',
  },
  {
    id: '3',
    title: 'Skinz & Nipple – Live Music & Entertainment Night',
    date: '14 Jun | 05:30 PM',
    tickets: '2 tickets',
    location: 'Pier 1, Montego Bay',
    status: 'finished',
    canTransfer: false,
    image: 'https://placehold.co/64x64/ff69b4/ffffff?text=SN',
  },
  {
    id: '4',
    title: 'Skinz & Nipple – Live Music & Entertainment Night',
    date: '14 Jun | 09:00 PM',
    tickets: '1 ticket',
    location: 'Pier 1, Montego Bay',
    status: 'finished',
    canTransfer: false,
    image: 'https://placehold.co/64x64/ff69b4/ffffff?text=SN',
  },
  {
    id: '5',
    title: 'Skinz & Nipple – Live Music & Entertainment Night',
    date: '14 Jun | 09:00 PM',
    tickets: '2 tickets',
    location: 'Pier 1, Montego Bay',
    status: 'finished',
    canTransfer: false,
    image: 'https://placehold.co/64x64/ff69b4/ffffff?text=SN',
  },
];

// ─── Sub-Components ───────────────────────────────────────────────────────────

const StatusBadge = ({ status, canTransfer }) => {
  if (canTransfer) {
    return (
      <View style={[styles.badge, styles.badgeTransfer]}>
        <Text style={[styles.badgeText, styles.badgeTransferText]}>
          Transfer
        </Text>
      </View>
    );
  }
  if (status === 'finished') {
    return (
      <View style={[styles.badge, styles.badgeFinished]}>
        <Text style={[styles.badgeText, styles.badgeFinishedText]}>
          Finished
        </Text>
      </View>
    );
  }
  return null;
};

const TicketCard = ({ item, isFirst }) => (
  <View style={[styles.card, !isFirst && styles.cardWithDash]}>
    <View style={styles.cardInner}>
      {/* Left content */}
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={3}>
          {item.title}
        </Text>
        <Text style={styles.cardMeta}>{item.date}</Text>
        <Text style={styles.cardMeta}>{item.tickets}</Text>
        <Text style={styles.cardLabel}>Location:</Text>
        <Text style={styles.cardLocation}>{item.location}</Text>
      </View>

      {/* Right image */}
      <View>
        <MovieFrame style={styles.cardImage} />
      </View>
    </View>
    <View style={styles.cardFooter}>
      <StatusBadge status={item.status} canTransfer={item.canTransfer} />
      <TouchableOpacity>
        <Text style={styles.viewDetails}>View details</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────

const EventTicket = ({ navigation }) => {
  return (
    <>
      <View style={styles.statusBar}>
        <StatusBar barStyle="light-content" backgroundColor="#0F7754" />
      </View>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={{ marginRight: 12 }}
            onPress={() => navigation.goBack()}
          >
            <BackIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Event Ticket</Text>
        </View>

        {/* Ticket List */}
        <ScrollView
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        >
          {TICKETS.map((item, index) => (
            <TicketCard key={item.id} item={item} isFirst={index === 0} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const GRAY_TEXT = '#888';

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: appColors.primary,
    height: StatusBar.currentHeight,
  },
  container: {
    flex: 1,
    backgroundColor: appColors.white,
    paddingBottom: 16,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1a1a1a',
  },

  // List
  list: {
    padding: 16,
    gap: 10,
  },

  // Card
  card: {
    backgroundColor: appColors.white,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: appColors.border,
  },
  cardWithDash: {
    // extra space handled by DashedLine
  },
  cardInner: {
    flexDirection: 'row',
    padding: 14,
    gap: 12,
  },
  cardContent: {
    flex: 1,
    gap: 3,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a1a',
    lineHeight: 18,
    marginBottom: 4,
  },
  cardMeta: {
    fontSize: 11,
    color: GRAY_TEXT,
  },
  cardLabel: {
    fontSize: 11,
    color: GRAY_TEXT,
    marginTop: 4,
  },
  cardLocation: {
    fontSize: 11,
    color: appColors.black,
    lineHeight: 15,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: appColors.border,
    paddingTop: 10,
    paddingBottom: 20,
  },
  viewDetails: {
    fontSize: 12,
    color: appColors.black,
    fontWeight: '500',
  },

  // Image
  cardImage: {
    alignSelf: 'flex-start',
  },

  // Badges
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  badgeFinished: {
    backgroundColor: '#f0f0f0',
  },
  badgeFinishedText: {
    color: '#888',
  },
  badgeTransfer: {
    backgroundColor: appColors.black,
    borderWidth: 1,
    borderColor: appColors.black,
    color: appColors.white,
  },
  badgeTransferText: {
    color: appColors.white,
  },

  // Dashed line separator
  dashedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 3,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  dash: {
    width: 4,
    height: 1.5,
    backgroundColor: '#ccc',
    borderRadius: 1,
  },
});

export default EventTicket;
