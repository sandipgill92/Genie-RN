import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { appColors } from '../../utils/appColors';
import BackIcon from '../../assets/svg/BackIcon';
import DownloadIcon from '../../assets/svg/DownloadIcon';
import EventDashboardImg from '../../assets/svg/EventDashboardImg';
import CalanderIcon from '../../assets/svg/CalanderIcon';
import NextLocationIcon from '../../assets/svg/NextLocationIcon';
import LocationIconOutline from '../../assets/svg/LocationIconOutline';
import DurationIcon from '../../assets/svg/DurationIcon';
import ErrorIcon from '../../assets/svg/ErrorIcon';
import RightIcon from '../../assets/svg/RightIcon';
import UserIcon from '../../assets/svg/UserIcon';
import ChatGreenIcon from '../../assets/svg/ChatGreenIcon';
import TermConditionIcon from '../../assets/svg/TermConditionIcon';

const PROHIBITED_LEFT = ['Outside food', 'Drones', 'Weapons', 'Fireworks'];
const PROHIBITED_RIGHT = [
  'Glass items',
  'Laser pointers',
  'Sharp tools',
  'Drones',
];
const INSTRUCTIONS = [
  'Show physical ticket or QR code at entry',
  'Wristbands will be issued at the gate',
  'Government-issued ID required for entry',
  'Security check mandatory',
  'Event may be modified or cancelled by organizers',
  'Hold carnival-style attire allowed',
];

const EventDashboard = ({ navigation }) => {
  const [expanded, setExpanded] = useState(false);
  const [showAll, setShowAll] = useState(false);

  return (
    <>
      <View style={styles.statusBar}>
        <StatusBar barStyle="light-content" backgroundColor="#0F7754" />
      </View>
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={{ marginRight: 12 }}
            onPress={() => navigation.goBack()}
          >
            <BackIcon />
          </TouchableOpacity>
          <DownloadIcon />
        </View>

        {/* ── SCROLL BODY ── */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <EventDashboardImg />
          <Text style={styles.eventTitle}>
            Skinz and Nipples | St. Catherine
          </Text>

          <View style={styles.cardBoxStyle}>
            <InfoRow
              icon={<CalanderIcon />}
              label="Saturday, August 2 — 12 PM onwards"
              sub="Gates open at 11:30 AM"
              first
            />
            <InfoRow
              icon={<LocationIconOutline width={24} height={24} />}
              label="Ewerton Sports Complex,
              St. Catherine"
              sub="8.3 km away"
              last
            />
          </View>

          {/* About */}
          <SectionTitle title="About the event" />
          <Text style={styles.bodyText}>
            {expanded
              ? 'Get ready for a wild soca ride! Join us at Skinz and Nipples Extreme Soca for electrifying performances, Caribbean vibes, and a splash of unforgettable summer energy.'
              : 'Get ready for a wild rave ride. Join us at Skinz and Nipples: Extremez. Enjoy identifying performances, Caribbean vibes…'}
          </Text>
          <TouchableOpacity onPress={() => setExpanded(!expanded)}>
            <Text style={styles.readMore}>
              {expanded ? 'Read Less' : 'Read More'}
            </Text>
          </TouchableOpacity>

          {/* Event Details */}
          <View style={styles.detailsGrid}>
            {[
              { label: 'Duration', value: '12 Hours' },
              { label: 'Tickets Needed For', value: '18 years & above only' },
              {
                label: 'Entry Allowed For',
                value: 'Adults only (ID required at gate)',
              },
              { label: 'Kid Friendly?', value: 'Allowed' },
              { label: 'Event Layout', value: 'Indoor' },
            ].map((item, i) => (
              <View key={i} style={styles.detailItem}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center',
                  }}
                >
                  <DurationIcon />
                  <View>
                    <Text style={styles.detailLabel}>{item.label}</Text>
                    <Text
                      style={[
                        styles.detailValue,
                        item.danger && { color: '#e83573' },
                      ]}
                    >
                      {item.value}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.divider} />

          {/* Prohibited Items */}
          <SectionTitle title="Prohibited Items" />
          <View style={styles.twoCol}>
            <View style={styles.twoColSide}>
              {(showAll ? PROHIBITED_LEFT : PROHIBITED_LEFT.slice(0, 3)).map(
                (item, i) => (
                  <BulletItem key={i} text={item} />
                ),
              )}
            </View>
            <View style={styles.twoColSide}>
              {(showAll ? PROHIBITED_RIGHT : PROHIBITED_RIGHT.slice(0, 3)).map(
                (item, i) => (
                  <BulletItem key={i} text={item} />
                ),
              )}
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setShowAll(!showAll)}
            style={{ alignItems: 'center' }}
          >
            <Text style={styles.seeAll}>
              {showAll ? 'Show less ↑' : 'View all ↓'}
            </Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Instructions */}
          <SectionTitle title="Instructions" />
          {INSTRUCTIONS.map((item, i) => (
            <InstructionSection key={i} text={item} green />
          ))}

          {/* Venue */}
          <SectionTitle title="Venue" />
          <View style={styles.mapCard}>
            <View style={styles.mapPlaceholder}>
              <LocationIconOutline />
            </View>
            <View style={styles.mapLabel}>
              <Text style={styles.mapLabelMain}>Ewerton Sports Complex</Text>
              <Text style={styles.mapLabelSub}>
                Plot No. 22, Main Street,Ewarton Town, St.
              </Text>
              <Text style={styles.mapLabelSub}>Catherine – 1876,Jamaica,</Text>
              <Text style={styles.mapLabelSub}>West Indies</Text>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  gap: 4,
                  alignItems: 'center',
                  marginTop: 6,
                }}
              >
                <Text style={styles.directions}>Get directions </Text>
                <RightIcon height={10} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Organizer */}
          <SectionTitle title="Event Organizer" />
          <View style={styles.organizerRow}>
            <View style={styles.organizerLeft}>
              <View style={styles.avatar}>
                <UserIcon />
              </View>
              <View>
                <Text style={styles.organizerRole}>Manager</Text>
                <Text style={styles.organizerName}>Ryan Thompson</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.chatBtn}>
              <ChatGreenIcon />
              <Text style={styles.chatBtnText}>Chat</Text>
            </TouchableOpacity>
          </View>

          {/* More */}
          <SectionTitle title="More" />
          <TouchableOpacity style={styles.termsRow}>
            <View style={styles.termsLeft}>
              <View>
                <TermConditionIcon width={24} height={24} />
              </View>
              <Text style={styles.termsText}>Terms and Conditions</Text>
            </View>
            <RightIcon />
          </TouchableOpacity>

          <View style={{ height: 20 }} />
        </ScrollView>

        {/* ── BOTTOM BAR ── */}
        <View style={styles.bottomBar}>
          <View>
            <Text style={styles.fromLabel}>Starts from</Text>
            <Text style={styles.price}>J$1,400</Text>
          </View>
          <TouchableOpacity
            style={styles.bookBtn}
            onPress={() => navigation.navigate('SeatSelection')}
          >
            <Text style={styles.bookBtnText}>Book Tickets</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

/* ─────────────── SUB-COMPONENTS ─────────────── */

function InfoRow({ icon, label, sub, last, first }) {
  return (
    <View
      style={[
        styles.infoRow,
        last && { borderBottomWidth: 0, marginBottom: 0, paddingBottom: 0 },
      ]}
    >
      <View>{icon}</View>
      <View style={styles.infoText}>
        <Text style={styles.infoLabel}>{label}</Text>
        {sub ? <Text style={styles.infoSub}>{sub}</Text> : null}
      </View>
      <NextLocationIcon style={[first && { display: 'none' }]} />
    </View>
  );
}

function SectionTitle({ title }) {
  return <Text style={styles.sectionTitle}>{title}</Text>;
}

function BulletItem({ text }) {
  return (
    <View style={styles.bulletRow}>
      <View>
        <ErrorIcon />
      </View>
      <Text style={styles.bulletText}>{text}</Text>
    </View>
  );
}

function InstructionSection({ text, green }) {
  return (
    <View style={styles.bulletRow}>
      <View
        style={[styles.bullet, green && { backgroundColor: appColors.black }]}
      />
      <Text style={styles.bulletText}>{text}</Text>
    </View>
  );
}

/* ─────────────── STYLES ─────────────── */

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: appColors.primary,
    height: StatusBar.currentHeight,
  },
  safe: {
    flex: 1,
    backgroundColor: appColors.white,
  },

  // Banner
  banner: {
    width: '100%',
    height: 270,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  circle: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
  },
  headerRow: {
    position: 'absolute',
    top: 14,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    zIndex: 10,
  },
  headerBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateBadge: {
    position: 'absolute',
    top: 50,
    right: 14,
    backgroundColor: appColors.black,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    zIndex: 5,
  },
  dateBadgeMonth: {
    color: '#f96ab4',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2,
  },
  dateBadgeDay: {
    color: appColors.white,
    fontSize: 26,
    fontWeight: '900',
    lineHeight: 30,
  },
  bannerContent: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  bannerPresents: {
    color: 'rgba(255,220,240,0.9)',
    fontSize: 8,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: 6,
  },
  bannerTitle: {
    fontSize: 38,
    fontWeight: '900',
    color: appColors.white,
    lineHeight: 42,
    textAlign: 'center',
    letterSpacing: -1,
  },
  bannerAmp: { color: '#ffe066' },
  ambassadorBox: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.45)',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  ambassadorTitle: {
    color: appColors.white,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  ambassadorSub: {
    color: 'rgba(255,220,240,0.9)',
    fontSize: 8,
    marginTop: 2,
    lineHeight: 14,
    textAlign: 'center',
  },
  ambassadorPrice: {
    color: '#ffe066',
    fontSize: 13,
    fontWeight: '900',
    marginTop: 3,
  },
  venuePill: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  venuePillText: {
    color: appColors.white,
    fontSize: 10,
    fontWeight: '600',
  },

  // Promo
  promoBar: {
    backgroundColor: appColors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  promoText: {
    color: appColors.white,
    fontSize: 11,
    flex: 1,
  },
  promoBold: {
    fontWeight: '700',
  },

  // Scroll
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: appColors.black,
    marginVertical: 16,
    lineHeight: 26,
    textAlign: 'center',
  },
  cardBoxStyle: {
    borderWidth: 1,
    borderColor: appColors.placeholder,
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoText: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: appColors.black,
  },
  infoSub: {
    fontSize: 11,
    color: '#999',
    marginTop: 1,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: appColors.black,
    marginTop: 18,
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
  },
  readMore: {
    color: appColors.black,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
  },

  detailsGrid: {
    flexWrap: 'wrap',
    marginTop: 20,
  },
  detailItem: {
    marginBottom: 14,
  },
  detailLabel: {
    fontSize: 14,
    color: appColors.black,
    marginBottom: 2,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 12,
    color: appColors.black,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 6,
  },
  twoCol: {
    flexDirection: 'row',
    gap: 8,
  },
  twoColSide: {
    flex: 1,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 7,
  },
  bullet: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#ddd',
    // marginTop: 5,
    flexShrink: 0,
  },
  bulletText: {
    fontSize: 12,
    color: '#444',
    flex: 1,
    lineHeight: 18,
  },
  seeAll: {
    color: appColors.primary,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  mapCard: {
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: appColors.placeholder,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 14,
    alignItems: 'flex-start',
    gap: 10,
  },
  mapPlaceholder: {
    marginTop: 4,
  },
  mapLabel: {
    backgroundColor: appColors.white,
  },
  mapLabelMain: {
    fontSize: 15,
    fontWeight: '600',
    color: appColors.black,
  },
  mapLabelSub: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  directions: {
    color: appColors.black,
    fontSize: 12,
    fontWeight: '600',
  },

  organizerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  organizerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: appColors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  organizerName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111',
  },
  organizerRole: {
    fontSize: 11,
    color: '#999',
  },
  chatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#f4f4f4',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 7,
  },
  chatBtnText: {
    color: appColors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 1,
    borderColor: appColors.placeholder,
    borderRadius: 12,
  },
  termsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  termsText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111',
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: appColors.white,
    marginBottom: 10,
  },
  fromLabel: {
    fontSize: 10,
    color: '#999',
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
  },
  bookBtn: {
    backgroundColor: appColors.black,
    borderRadius: 16,
    paddingHorizontal: 28,
    paddingVertical: 10,
  },
  bookBtnText: {
    color: appColors.white,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});

export default EventDashboard;
