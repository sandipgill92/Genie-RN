import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import { appColors } from '../../utils/appColors';
import BackIcon from '../../assets/svg/BackIcon';
import EventDashboardImg from '../../assets/svg/EventDashboardImg';
import ETicketIcon from '../../assets/svg/ETicketIcon';
import RightIcon from '../../assets/svg/RightIcon';
import ViewEventOfferIcon from '../../assets/svg/ViewEventOfferIcon';
import PaymentDealIcon from '../../assets/svg/PaymentDealIcon';
import ProfileIconEvent from '../../assets/svg/ProfileIconEvent';
import GenieMoneyGreenIcon from '../../assets/svg/GenieMoneyGreenIcon';
import OfferApplyModal from '../Modal/OfferApplyModal/OfferApplyModal';
import RemoveCartModal from '../Modal/RemoveCartModal/RemoveCartModal';
import GenieMoneyModal from '../Modal/GenieMoneyModal/GenieMoneyModal';
import GenieMoneyModal2 from '../Modal/GenieMoneyModal2/GenieMoneyModal2';
import DolarGreenIcon from '../../assets/svg/DolarGreenIcon';
import PopconeIcon from '../../assets/svg/PopconeIcon';
import TermQuestionIcon from '../../assets/svg/TermQuestionIcon';

// ── Countdown timer helper ──────────────────────────────────────────────────
function useCountdown(initialSeconds = 281) {
  const [secs, setSecs] = useState(initialSeconds);
  useEffect(() => {
    const id = setInterval(() => setSecs(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, []);
  const m = String(Math.floor(secs / 60)).padStart(2, '0');
  const s = String(secs % 60).padStart(2, '0');
  return `${m}:${s}`;
}

// ── Shared primitives ───────────────────────────────────────────────────────
const HR = ({ style }) => <View style={[styles.hr, style]} />;

const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeaderRow}>
    <HR style={styles.sectionLine} />
    <Text style={styles.sectionTitle}>{title}</Text>
    <HR style={styles.sectionLine} />
  </View>
);

const OfferRow = ({ icon, label, onPress }) => (
  <TouchableOpacity
    style={styles.offerRow}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.offerIcon}>
      <View>{icon}</View>
    </View>
    <Text style={styles.offerLabel}>{label}</Text>
    <RightIcon />
  </TouchableOpacity>
);

const FOOD_ITEMS = [
  {
    id: '1',
    name: 'Popcorn Combo 1',
    variant: 'Salted',
    price: 630,
    image: {
      uri: 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=400&q=80',
    },
  },
  {
    id: '2',
    name: 'Popcorn Combo 1',
    variant: 'Salted',
    price: 630,
    image: {
      uri: 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=400&q=80',
    },
  },
  {
    id: '3',
    name: 'Popcorn Combo 2',
    variant: 'Butter',
    price: 750,
    image: {
      uri: 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=400&q=80',
    },
  },
  {
    id: '4',
    name: 'Nachos Combo',
    variant: 'Classic',
    price: 890,
    image: {
      uri: 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=400&q=80',
    },
  },
];

const FoodCard = ({ item }) => {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <View style={styles.card2}>
      <View style={styles.cardImage2}>
        <PopconeIcon width="100%" height="100%" />
      </View>
      <View style={styles.cardBody2}>
        <Text style={styles.cardName2} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.cardVariant2} numberOfLines={1}>
          {item.variant}
        </Text>
        <View style={styles.cardFooter2}>
          <Text style={styles.cardPrice2}>₹{item.price}</Text>
          <TouchableOpacity
            style={[styles.addButton2, added && styles.addButtonAdded2]}
            onPress={handleAdd}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.addButtonText2,
                added && styles.addButtonTextAdded2,
              ]}
            >
              {added ? '✓' : 'Add'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// ── Main screen ─────────────────────────────────────────────────────────────
const ReviewBooking = ({ navigation }) => {
  const countdown = useCountdown(281);
  const [showModal, setShowModal] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const [genieMoneyVisible, setGenieMoneyVisible] = useState(false);
  const [genieModal2Visible, setGenieModal2Visible] = useState(false);

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
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <BackIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Review Your Booking</Text>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Timer banner */}
          <View style={styles.banner}>
            <Text style={styles.bannerText}>
              Secure your ticket in{' '}
              <Text style={styles.bannerBold}>{countdown} </Text>mins
            </Text>
          </View>

          {/* Event card */}
          <View style={styles.eventCard}>
            {/* Replace with <Image source={{ uri }} style={styles.eventImg} resizeMode="cover" /> */}
            <EventDashboardImg width={110} height={110} />
            <View style={styles.eventDetails}>
              <Text style={styles.eventName} numberOfLines={2}>
                Skinz Nipples A – The Ultimate Carnival Bash
              </Text>
              <Text style={styles.eventMeta}>
                Parish Grounds, Montego Bay, Jamaica
              </Text>
              <Text style={[styles.eventMeta, { color: appColors.black }]}>
                General Zone Access | GA-182
              </Text>
              <Text style={styles.eventTags}>
                Non-stop rides · Under 0.6 · Free shots
              </Text>
            </View>
          </View>

          <HR />

          {/* Date / Ticket / E-ticket block */}

          <View style={styles.block}>
            <Text style={styles.dateText}>Fri, 02 Aug{'   '}9 PM</Text>
            <HR style={styles.blockDivider} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 4,
                marginVertical: 4,
              }}
            >
              <View style={styles.ticketRow}>
                <Text style={styles.ticketLabel}>
                  1 × Phase 2 | General Zone
                </Text>
                <Text
                  style={[
                    styles.ticketLabel,
                    { fontSize: 10, color: '#b9b9b9' },
                  ]}
                >
                  Seat: GA-102
                </Text>
              </View>
              <View style={styles.ticketRight}>
                <Text style={styles.ticketPrice}>JMD 6,100</Text>
                <TouchableOpacity>
                  <Text style={styles.removeBtn}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>

            <HR style={styles.blockDivider} />
            <View style={styles.eticketRow}>
              <ETicketIcon />
              <Text style={styles.eticketText}>
                E-Ticket: Entry with QR code in the Genie app
              </Text>
            </View>
          </View>
          <View style={styles.offerList}>
            <TouchableOpacity style={styles.offerRow} activeOpacity={0.7}>
              <View style={styles.offerIcon}>
                <DolarGreenIcon />
              </View>
              <Text
                style={[styles.offerLabel, { fontSize: 12, color: '#7b7b7b' }]}
              >
                Get 50% refund if cancelled today between 01:40 PM - 2:40
              </Text>
            </TouchableOpacity>
          </View>

          {/* Offers */}
          <View style={{ marginTop: 14 }} />
          <SectionHeader title="OFFERS" />
          <View style={styles.offerList}>
            <OfferRow
              icon={<ViewEventOfferIcon />}
              label="View all event offers"
            />
            <HR />
            <OfferRow
              icon={<PaymentDealIcon />}
              label="View all payment deals"
            />
          </View>

          <View>
            <Text style={styles.sectionTitle2}>Food and beverages</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {FOOD_ITEMS.map(item => (
                <FoodCard key={item.id} item={item} />
              ))}
            </ScrollView>
          </View>

          {/* Payment Summary */}
          <View style={{ marginTop: 20 }}>
            <SectionHeader title="PAYMENT SUMMARY" />
            <View style={styles.card}>
              <View style={styles.payRow}>
                <Text style={[styles.payLabel, { fontSize: 12 }]}>
                  Order amount
                </Text>
                <Text style={styles.payValue}>JMD 6,000</Text>
              </View>
              {/* <HR style={styles.cardDivider} /> */}
              <View style={[styles.payRow, { marginTop: 10 }]}>
                <Text style={styles.payLabel}>Booking fee (incl. of tax)</Text>
                <Text
                  style={[styles.payValue, styles.mutedValue, { fontSize: 11 }]}
                >
                  JMD $354
                </Text>
              </View>
              <HR style={styles.cardDivider} />
              <View style={styles.payRow}>
                <Text style={styles.totalLabel}>Grand Total</Text>
                <Text style={styles.totalValue}>JMD 6,354</Text>
              </View>
            </View>
          </View>

          {/* Invoice Details */}
          <View style={{ marginTop: 20 }}>
            <SectionHeader title="INVOICE DETAILS" />
            <View style={styles.card}>
              <View style={styles.invoiceTop}>
                <View style={styles.invoiceAvatar}>
                  <ProfileIconEvent />
                </View>
                <View style={styles.invoiceInfo}>
                  <Text style={styles.invoiceName}>Tasha-Marie</Text>
                  <Text style={styles.invoiceMeta}>+1 (876) 927-6463</Text>
                  <Text style={styles.invoiceMeta}>tasha@email.com</Text>
                  <Text style={styles.invoiceMeta}>Jamaica</Text>
                </View>
                <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
                >
                  <Text style={styles.editBtn}>Edit </Text>
                  <RightIcon width={5} />
                </TouchableOpacity>
              </View>
              <View style={styles.invoiceNote}>
                <Text style={styles.invoiceNoteText}>
                  Information mentioned above will be used for generating the
                  invoice and sending out the tickets.
                </Text>
              </View>
            </View>
          </View>

          <View style={{ height: 12 }} />
          <View style={styles.offerList}>
            <OfferRow
              icon={<TermQuestionIcon />}
              label="Terms and conditions"
            />
          </View>
        </ScrollView>

        {/* Genie Money bar */}
        <View style={styles.cardShadow}>
          <TouchableOpacity
            style={styles.genieBar}
            activeOpacity={0.8}
            onPress={() => setGenieModal2Visible(true)}
          >
            <View style={styles.genieLeft}>
              <View style={styles.genieIcon}>
                <GenieMoneyGreenIcon />
              </View>
              <Text style={styles.genieText}>
                Genie Money{' '}
                <Text style={styles.genieBalance}>Balance: JMD $0</Text>
              </Text>
            </View>
            <RightIcon width={6} />
          </TouchableOpacity>

          {/* CTA button */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.payBtn}
              activeOpacity={0.85}
              onPress={() => setCartVisible(true)}
            >
              <Text style={styles.payBtnText}>Add Payment Method</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <OfferApplyModal
        navigation={navigation}
        visible={showModal}
        onClose={() => setShowModal(false)}
      />

      <RemoveCartModal
        navigation={navigation}
        visible={cartVisible}
        onCancel={() => setCartVisible(false)}
        onConfirm={() => {
          setCartVisible(false);
          setGenieMoneyVisible(true);
        }}
      />

      <GenieMoneyModal
        navigation={navigation}
        visible={genieMoneyVisible}
        onClose={() => setGenieMoneyVisible(false)}
        onOpenModal={() => {
          setGenieMoneyVisible(false);
          setGenieModal2Visible(true);
        }}
      />

      <GenieMoneyModal2
        navigation={navigation}
        visible={genieModal2Visible}
        onClose={() => setGenieModal2Visible(false)}
      />
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
    gap: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: appColors.black,
  },

  scroll: {
    flex: 1,
    backgroundColor: appColors.white,
    paddingHorizontal: 16,
  },
  content: {
    paddingBottom: 20,
  },

  banner: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 9,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderRadius: 14,
  },
  bannerText: {
    fontSize: 12,
    color: appColors.black,
  },
  bannerBold: {
    fontWeight: '700',
    color: appColors.primary,
  },

  eventCard: {
    flexDirection: 'row',
    gap: 0,
    paddingVertical: 16,
    alignItems: 'center',
  },

  eventDetails: {
    flex: 1,
  },
  eventName: {
    fontSize: 13,
    fontWeight: '500',
    color: appColors.black,
    lineHeight: 18,
    marginBottom: 4,
  },
  eventMeta: {
    fontSize: 11,
    color: '#666',
    lineHeight: 20,
  },
  eventTags: {
    fontSize: 10.5,
    color: '#999',
    marginTop: 3,
  },

  hr: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 4,
  },

  block: {
    padding: 14,
    borderWidth: 1,
    borderColor: appColors.placeholder,
    borderRadius: 14,
    marginVertical: 20,
  },
  blockDivider: {
    marginVertical: 13,
  },
  dateText: {
    fontSize: 13,
    fontWeight: '500',
    color: appColors.black,
  },
  ticketRow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  ticketLabel: {
    fontSize: 13,
    color: appColors.black,
    fontWeight: '500',
    flex: 1,
  },
  ticketRight: {
    alignItems: 'flex-end',
    flexShrink: 0,
  },
  ticketPrice: {
    fontSize: 12,
    fontWeight: '500',
    color: appColors.black,
  },
  removeBtn: {
    fontSize: 11,
    color: '#ff4d4d',
    fontWeight: '500',
    marginTop: 3,
    textDecorationStyle: 'dashed',
  },
  eticketRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  eticketIcon: {
    fontSize: 12,
  },
  eticketText: {
    fontSize: 11,
    color: appColors.black,
    flex: 1,
  },

  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  sectionLine: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: appColors.black,
    letterSpacing: 0.6,
    marginHorizontal: 10,
  },

  offerList: {
    borderWidth: 1,
    borderColor: appColors.placeholder,
    paddingHorizontal: 16,
    paddingVertical: 2,
    borderRadius: 14,
  },
  offerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
  },
  offerIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  offerLabel: {
    flex: 1,
    fontSize: 13,
    color: appColors.black,
  },
  chevron: {
    fontSize: 18,
    color: '#bbb',
    lineHeight: 22,
  },

  card: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: appColors.placeholder,
    borderRadius: 14,
    padding: 14,
  },
  cardDivider: { marginVertical: 10 },

  payRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  payLabel: {
    fontSize: 11,
  },
  payValue: {
    fontSize: 12,
    color: appColors.black,
  },
  mutedValue: {
    color: '#888',
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: appColors.black,
  },
  totalValue: {
    fontSize: 14,
    fontWeight: '600',
    color: appColors.black,
  },

  invoiceTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  invoiceAvatar: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginTop: 4,
  },
  invoiceInfo: {
    flex: 1,
  },
  invoiceName: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 3,
  },
  invoiceMeta: {
    fontSize: 11,
    lineHeight: 17,
  },
  editBtn: {
    fontSize: 12,
    fontWeight: '500',
  },
  invoiceNote: {
    padding: 9,
    borderTopColor: appColors.placeholder,
    borderTopWidth: 1,
  },
  invoiceNoteText: {
    fontSize: 10,
    lineHeight: 15,
  },

  cardShadow: {
    paddingTop: 10,
    marginHorizontal: 6,
    backgroundColor: appColors.white,
    borderRadius: 14,

    // iOS shadow
    ...Platform.select({
      ios: {
        shadowColor: appColors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
      },
      // Android shadow (elevation)
      android: {
        elevation: 12,
      },
    }),
  },
  genieBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: appColors.placeholder,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginHorizontal: 10,
    borderTopLeftRaduis: 14,
    borderTopRightRaduis: 14,
  },
  genieLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  genieIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  genieText: {
    fontSize: 13,
    color: appColors.black,
  },
  genieBalance: {
    color: '#ff0404',
    fontWeight: '600',
  },

  footer: {
    paddingHorizontal: 16,
    paddingBottom: 28,
    paddingTop: 10,
    backgroundColor: appColors.white,
  },
  payBtn: {
    backgroundColor: appColors.black,
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  payBtnText: {
    color: appColors.white,
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  sectionTitle2: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 14,
    paddingHorizontal: 16,
    marginTop: 24,
  },
  scrollContent: {
    paddingLeft: 16,
    paddingRight: 8,
  },

  // Card
  card2: {
    width: 148,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    marginRight: 12,
    overflow: 'hidden',
  },
  cardImage2: {
    width: '100%',
    height: 110,
  },
  cardBody2: {
    padding: 10,
  },
  cardName2: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  cardVariant2: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 10,
  },
  cardFooter2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardPrice2: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A1A1A',
  },

  // Add Button
  addButton2: {
    borderWidth: 1.5,
    borderColor: appColors.placeholder,
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 3,
  },
  addButtonAdded2: {
    backgroundColor: appColors.placeholder,
    borderColor: appColors.placeholder,
  },
  addButtonText2: {
    fontSize: 13,
    fontWeight: '600',
    color: appColors.black,
  },
  addButtonTextAdded2: {
    color: appColors.white,
  },
});

export default ReviewBooking;
