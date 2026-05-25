import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { appColors } from '../../utils/appColors';
import BackWhiteIcon from '../../assets/svg/BackWhiteIcon';
import EventfinishTick from '../../assets/svg/EventfinishTick';
import EventTicketHistoryBg from '../../assets/svg/EventTicketHistoryBg';
import TicketDeliveryHome from '../../assets/svg/TicketDeliveryHome';
import TrackingDetail from '../../assets/svg/TrackingDetail';
import RightIcon from '../../assets/svg/RightIcon';
import EventfinishTickSmall from '../../assets/svg/EventfinishTickSmall';
import LocationIconOutline from '../../assets/svg/LocationIconOutline';
import TermConditionIcon from '../../assets/svg/TermConditionIcon';
import ChatIcon from '../../assets/svg/ChatIcon';
import BillIcon from '../../assets/svg/BillIcon';
import ProfileIconEvent from '../../assets/svg/ProfileIconEvent';

const GREEN = '#2ecc8a';
const TEXT_PRIMARY = '#111827';
const TEXT_SECONDARY = '#6b7280';
const BORDER = '#e5e7eb';

const SectionDivider = ({ title }) => (
  <View style={styles.sectionDivider}>
    <View style={styles.dividerLine} />
    <Text style={styles.dividerText}>{title}</Text>
    <View style={styles.dividerLine} />
  </View>
);

const EventTicketHistoryViewDetail = ({ navigation }) => {
  return (
    <>
      <View style={styles.statusBar}>
        <StatusBar barStyle="light-content" backgroundColor="#2ecc8a" />
      </View>
      <SafeAreaView style={styles.safeArea}>
        <EventTicketHistoryBg
          style={styles.background}
          width="100%"
          height={304}
        />
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation && navigation.goBack()}
          >
            <BackWhiteIcon />
          </TouchableOpacity>
          <View style={styles.checkIconCircle}>
            <EventfinishTick />
            <Text style={styles.headerTitle}>Event is finished</Text>
          </View>
          {/* Event Card */}
          <View style={styles.eventCard}>
            <View style={styles.eventImagePlaceholder}>
              <Text style={styles.eventImageEmoji}>🎵</Text>
            </View>
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle} numberOfLines={3}>
                Mobay Reggae Nights – Performance by Teddy P & The Blow Wow Band
              </Text>
              <Text style={styles.eventCategory}>Music</Text>
            </View>
          </View>
        </View>

        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {/* Date & Location */}
          <View style={styles.card}>
            <Text style={styles.dateText}>25 May | 01:30 PM</Text>
            <View style={styles.locationRow}>
              <LocationIconOutline style={styles.locationIcon} />
              <Text style={styles.locationText}>
                Harmony Beach Pub, Jimmy Cliff Blvd, Montego Bay
              </Text>
            </View>

            {/* Ticket Delivery */}
            <View style={styles.deliveryHeader}>
              <TicketDeliveryHome style={styles.deliveryIcon} />
              <View style={styles.deliveryTextBlock}>
                <Text style={styles.deliveryTitle}>
                  Ticket Delivery at Home
                </Text>
                <Text style={styles.deliveryAddress}>
                  12 Seaview, Seaview, Montego Bay, St. James, Jamaica, JM
                </Text>
              </View>
            </View>

            <View style={styles.deliveryHeader}>
              <TrackingDetail style={styles.deliveryIcon} />
              <View style={styles.deliveryTextBlock}>
                <Text style={styles.deliveryTitle}>Tracking details</Text>
                <Text style={styles.deliveryAddress}>
                  Tickets will be delivered by Gomex Couriers
                </Text>
              </View>
            </View>

            {/* ✅ Fix 4: Replaced gap with marginBottom for older RN compatibility */}
            <View style={{ marginBottom: 12 }}>
              <View style={styles.trackingSteps}>
                <EventfinishTickSmall style={styles.trackingStepIcon} />
                <Text>Printed</Text>
              </View>
              <View style={styles.trackingSteps}>
                <EventfinishTickSmall style={styles.trackingStepIcon} />
                <Text>Shipped</Text>
              </View>
              <View style={styles.trackingSteps}>
                <EventfinishTickSmall style={styles.trackingStepIcon} />
                <Text>In transit</Text>
              </View>
              <View style={styles.trackingSteps}>
                <EventfinishTickSmall style={styles.trackingStepIcon} />
                <Text>Out of delivery</Text>
              </View>
              <Text style={styles.deliveryAddress}>
                Received by Tasha Marie on June 1 2025 at 2:56 PM
              </Text>
            </View>

            <View style={styles.awsRow}>
              <View>
                <Text style={styles.awsValue}>AWS Number</Text>
                <Text style={styles.awsLabel}>4241551</Text>
              </View>
              <TouchableOpacity style={styles.trackButton}>
                <Text style={styles.trackButtonText}>Track</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Venue Section */}
          <SectionDivider title="VENUE" />

          <View style={styles.card}>
            <View style={styles.venueRow}>
              <View style={styles.venuePinIcon}>
                <LocationIconOutline />
              </View>
              <View style={styles.venueInfo}>
                <Text style={styles.venueName}>Ewerton Sports Complex</Text>
                <Text style={styles.venueAddress}>
                  Plot No. 22, Main Street,Ewarton Town, St.
                </Text>
                <Text style={styles.venueAddress}>
                  Catherine – 1876,Jamaica,
                </Text>
                <Text style={styles.venueAddress}>West Indies</Text>
                {/* <Text style={styles.venueDistance}>Show miles</Text> */}
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 8,
                  }}
                >
                  <Text style={styles.directionsLink}>Get directions</Text>{' '}
                  <RightIcon style={styles.rightIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Order Details Section */}
          <SectionDivider title="ORDER DETAILS" />

          <View style={styles.card}>
            <View style={styles.orderRow}>
              <View style={[styles.venuePinIcon, { marginTop: 4 }]}>
                <BillIcon />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  flex: 1,
                }}
              >
                <View>
                  <Text style={styles.orderTotal}>Total bill $443.40</Text>
                  <Text style={styles.orderItems}>incl.taxes & fees</Text>
                </View>
                <TouchableOpacity style={{ marginTop: 4 }}>
                  <RightIcon style={styles.rightIcon} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.bookedByRow}>
              <View style={{ marginTop: 4, marginRight: 10 }}>
                <ProfileIconEvent />
              </View>
              <View>
                <Text style={styles.bookedByName}>
                  <Text style={[styles.orderItems, { fontWeight: '400' }]}>
                    Invoice send to{' '}
                  </Text>
                  Tasha Marie
                </Text>
                <Text style={styles.bookedByPhone}>+1 (876) 487-5641</Text>
                <Text style={styles.bookedByEmail}>tasha@mail.com</Text>
                <Text style={styles.bookedByEmail}>Jamaica</Text>
              </View>
            </View>
          </View>

          {/* Help Section */}
          <SectionDivider title="NEED HELP WITH BOOKING" />

          <View style={styles.card}>
            <TouchableOpacity style={styles.helpRow}>
              <View style={styles.helpIcon}>
                <ChatIcon />
              </View>
              <Text style={styles.helpText}>Chat with us</Text>
              <RightIcon style={styles.rightIcon} />
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.helpRow}>
              <View style={styles.helpIcon}>
                <TermConditionIcon />
              </View>
              <Text style={styles.helpText}>Terms and conditions</Text>
              <RightIcon style={styles.rightIcon} />
            </TouchableOpacity>
          </View>

          <View style={{ height: 32 }} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: '#29c081',
    height: StatusBar.currentHeight,
  },
  safeArea: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    top: -8,
    left: 0,
    right: 0,
  },
  header: {
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  backButton: {
    paddingVertical: 16,
  },
  checkIconCircle: {
    alignItems: 'center',
    marginBottom: 16,
  },
  checkIconText: {
    color: appColors.white,
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: appColors.black,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.2,
    marginTop: 8,
  },
  container: {
    flex: 1,
    backgroundColor: appColors.white,
    // paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    backgroundColor: appColors.white,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: appColors.border,
  },
  eventCard: {
    marginTop: 16,
    borderRadius: 12,
    paddingVertical: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  eventImagePlaceholder: {
    width: 60,
    height: 70,
    borderRadius: 8,
    backgroundColor: appColors.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  eventImageEmoji: {
    fontSize: 24,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    lineHeight: 20,
    marginBottom: 4,
  },
  eventCategory: {
    fontSize: 12,
    color: TEXT_SECONDARY,
  },
  dateText: {
    fontSize: 13,
    fontWeight: '600',
    color: TEXT_PRIMARY,
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  locationIcon: {
    fontSize: 13,
    marginRight: 6,
    marginTop: 1,
  },
  locationText: {
    fontSize: 13,
    color: TEXT_SECONDARY,
    flex: 1,
    lineHeight: 18,
  },
  deliveryHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 14,
  },
  deliveryTextBlock: {
    flex: 1,
    marginLeft: 10,
  },
  deliveryIcon: {
    marginTop: 2,
  },
  deliveryTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    marginBottom: 2,
  },
  deliveryAddress: {
    fontSize: 11,
    color: TEXT_SECONDARY,
    lineHeight: 16,
  },
  trackingTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    marginBottom: 2,
  },
  trackingSubtitle: {
    fontSize: 11,
    color: TEXT_SECONDARY,
    marginBottom: 12,
  },
  trackingSteps: {
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackingStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  trackingStepIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  trackingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#d1d5db',
    marginRight: 10,
  },
  trackingDotDone: {
    backgroundColor: GREEN,
  },
  trackingDotActive: {
    backgroundColor: GREEN,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  trackingLabel: {
    fontSize: 13,
    color: TEXT_SECONDARY,
  },
  trackingLabelDone: {
    color: TEXT_PRIMARY,
    fontWeight: '500',
  },
  awsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingTop: 12,
    marginTop: 4,
  },
  awsLabel: {
    fontSize: 11,
    color: TEXT_SECONDARY,
    marginBottom: 2,
  },
  awsValue: {
    fontSize: 13,
    fontWeight: '600',
    color: TEXT_PRIMARY,
  },
  trackButton: {
    borderWidth: 1.5,
    borderColor: appColors.black,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  trackButtonText: {
    borderColor: appColors.black,
    fontSize: 13,
    fontWeight: '700',
  },
  sectionDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#d1d5db',
  },
  dividerText: {
    fontSize: 11,
    fontWeight: '700',
    color: TEXT_SECONDARY,
    letterSpacing: 0.8,
    marginHorizontal: 8,
  },
  venueRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  venuePinIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  venueInfo: {
    flex: 1,
  },
  venueName: {
    fontSize: 14,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    marginBottom: 3,
  },
  venueAddress: {
    fontSize: 12,
    color: TEXT_SECONDARY,
    lineHeight: 17,
    marginBottom: 3,
  },
  venueDistance: {
    fontSize: 11,
    color: TEXT_SECONDARY,
  },
  directionsLink: {
    fontSize: 14,
    fontWeight: '600',
    color: appColors.black,
  },
  rightIcon: {
    marginLeft: 10,
    marginTop: 2,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderTotal: {
    fontSize: 14,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    marginBottom: 2,
  },
  orderItems: {
    fontSize: 12,
    color: TEXT_SECONDARY,
  },
  expandIcon: {
    fontSize: 22,
    color: TEXT_SECONDARY,
  },
  divider: {
    height: 1,
    backgroundColor: BORDER,
    marginVertical: 12,
  },
  bookedByRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fef3c7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12, // ✅ replaced gap
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#d97706',
  },
  bookedByName: {
    fontSize: 13,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    marginBottom: 1,
  },
  bookedByPhone: {
    fontSize: 12,
    color: TEXT_SECONDARY,
  },
  bookedByEmail: {
    fontSize: 12,
    color: TEXT_SECONDARY,
  },
  bookedByApp: {
    fontSize: 12,
    color: GREEN,
    fontWeight: '600',
    marginTop: 2,
  },
  helpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  helpIcon: {
    marginRight: 12,
  },
  helpText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    color: TEXT_PRIMARY,
  },
});

export default EventTicketHistoryViewDetail;
