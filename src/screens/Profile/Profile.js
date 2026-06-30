import React from 'react';
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
import LogoutIcon from '../../assets/svg/LogoutIcon';
import AboutUsIcon from '../../assets/svg/AboutUsIcon';
import BackIcon from '../../assets/svg/BackIcon';
import ProfileImg from '../../assets/svg/ProfileImg';
import EditIcon from '../../assets/svg/EditIcon';
import EventTickect from '../../assets/svg/EventTickect';
import MovieTicket from '../../assets/svg/MovieTicket';
import SportTicket from '../../assets/svg/SportTicket';
import RightIcon from '../../assets/svg/RightIcon';
import CollectedVoucher from '../../assets/svg/CollectedVoucher';
import GenieMoney from '../../assets/svg/GenieMoney';
import YourReview from '../../assets/svg/YourReview';
import MovieReminder from '../../assets/svg/MovieReminder';
import PaymentSetting from '../../assets/svg/PaymentSetting';
import Appearance from '../../assets/svg/Appearance';
import FrequentlyQuestion from '../../assets/svg/FrequentlyQuestion';
import Chat from '../../assets/svg/Chat';
import ShareFeedback from '../../assets/svg/ShareFeedback';
import AccountSetting from '../../assets/svg/AccountSetting';
import NotificationSetting from '../../assets/svg/NotificationSetting';

const Profile = ({ navigation }) => {
  const MenuItem = ({
    icon,
    title,
    onPress,
    rightIcon = 'chevron-forward',
  }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        {icon && <View style={{ marginRight: 10, width: 24 }}>{icon}</View>}
        {/* <LogoutIcon /> */}

        <Text>{title}</Text>
      </View>
      {rightIcon && <RightIcon />}
    </TouchableOpacity>
  );

  const MenuItem2 = ({
    icon,
    title,
    onPress,
    rightIcon = 'chevron-forward',
    isLast = false,
  }) => (
    <TouchableOpacity
      style={[styles.menuItem2, isLast && styles.menuItem2Last]}
      onPress={onPress}
    >
      <View style={styles.menuItemLeft}>
        {icon && <View style={{ marginRight: 10, width: 24 }}>{icon}</View>}
        {/* <LogoutIcon /> */}

        <Text>{title}</Text>
      </View>
      {rightIcon && <RightIcon />}
    </TouchableOpacity>
  );

  const BookingCard = ({ icon, title, onPress }) => (
    <TouchableOpacity style={styles.bookingCard} onPress={onPress}>
      {icon && <View style={{ width: 24 }}>{icon}</View>}
      <Text style={styles.bookingCardText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.statusBar}>
        <StatusBar barStyle="light-content" backgroundColor="#0F7754" />
      </View>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIcon />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Profile</Text>
            <View style={{ width: 24 }} />
          </View>

          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <ProfileImg />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Tasha Marie</Text>
              <Text style={styles.profileEmail}>+1 (876) 987-6543</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfile')}
            >
              <EditIcon />
            </TouchableOpacity>
          </View>

          {/* All Bookings Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>All bookings</Text>
            <View style={styles.bookingCardsContainer}>
              <BookingCard
                icon={<EventTickect />}
                title="Event tickets"
                onPress={() => navigation.navigate('EventTicket')}
              />
              <BookingCard
                icon={<MovieTicket />}
                title="Movie tickets"
                onPress={() => navigation.navigate('MovieTicketDetail')}
              />
              <BookingCard
                icon={<SportTicket />}
                title="Sport tickets"
                // onPress={() => navigation.navigate('SportTicket')}
              />
            </View>
          </View>

          {/* Vouchers Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vouchers</Text>
            <MenuItem
              icon={<CollectedVoucher />}
              title="Clubcard vouchers"
              onPress={() => {}}
            />
          </View>

          {/* Payment Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment</Text>
            <MenuItem
              icon={<GenieMoney />}
              title="Saved Money"
              onPress={() => {}}
            />
          </View>

          {/* Manage Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Manage</Text>
            <View style={styles.bookingCardsContainer2}>
              <MenuItem2
                icon={<YourReview />}
                title="Your tickets"
                onPress={() => {}}
              />
              <MenuItem2
                icon={<MovieReminder />}
                title="Movie reminders"
                onPress={() => {
                  navigation.navigate('MovieReminder');
                }}
              />
              <MenuItem2
                icon={<PaymentSetting />}
                title="Payment settings"
                onPress={() => {
                  navigation.navigate('PaymentSetting');
                }}
              />
              <MenuItem2
                icon={<Appearance />}
                title="Appearance"
                onPress={() => {}}
                isLast={true}
              />
            </View>
          </View>

          {/* Support Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support</Text>
            <View style={styles.bookingCardsContainer2}>
              <MenuItem2
                icon={<FrequentlyQuestion />}
                title="Frequently asked questions"
                onPress={() => {
                  navigation.navigate('HowCanWeHelpYou');
                }}
              />
              <MenuItem2
                icon={<Chat />}
                title="Chat with us"
                onPress={() => {
                  navigation.navigate('Chat');
                }}
              />
              <MenuItem2
                icon={<ShareFeedback />}
                title="Give feedback"
                onPress={() => {}}
                isLast={true}
              />
            </View>
          </View>

          {/* More Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>More</Text>
            <View style={styles.bookingCardsContainer2}>
              <MenuItem2
                icon={<NotificationSetting />}
                title="Notification settings"
                onPress={() => {}}
              />

              <MenuItem2
                icon={<AccountSetting />}
                title="Account settings"
                onPress={() => {}}
              />
              <MenuItem2
                icon={<AboutUsIcon />}
                title="About us"
                onPress={() => {}}
                isLast={true}
              />
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton}>
            <LogoutIcon />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: appColors.primary,
    height: StatusBar.currentHeight,
  },
  container: {
    flex: 1,
    backgroundColor: appColors.white,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 16,
    paddingBottom: 16,
    backgroundColor: appColors.white,
    position: 'fixed',
    top: 0,
    left: 0,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: appColors.black,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: appColors.white,
    paddingVertical: 16,
  },
  profileImageContainer: {
    borderRadius: 45,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: appColors.black,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    backgroundColor: appColors.white,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: appColors.black,
    paddingVertical: 12,
  },
  bookingCardsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  bookingCardsContainer2: {
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 12,
  },
  bookingCard: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  bookingCardText: {
    fontSize: 12,
    color: appColors.black,
    marginTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 12,
  },
  menuItem2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    marginHorizontal: 16,
    borderColor: '#F0F0F0',
    borderRadius: 0,
  },
  menuItem2Last: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: appColors.white,
    marginTop: 20,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  logoutText: {
    fontSize: 14,
    color: appColors.black,
    marginLeft: 8,
  },
});

export default Profile;
