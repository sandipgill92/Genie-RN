import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  LayoutAnimation,
  UIManager,
  Modal,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import BackIcon from '../../assets/svg/BackIcon';
import { appColors } from '../../utils/appColors';
import ForYouIcon from '../../assets/svg/ForYouIcon';
import SportsIcon from '../../assets/svg/SportsIcon';
import EventsIcon from '../../assets/svg/EventsIcon';
import MovieIcon from '../../assets/svg/MovieIcon';
import SearchDashboardIcon from '../../assets/svg/SearchDashboardIcon';
import ChatBtnIcon from '../../assets/svg/ChatBtnIcon';
import AppSupportIcon from '../../assets/svg/AppSupportIcon';
import EventTickectChatIcon from '../../assets/svg/EventTickectChatIcon';
import SportTicketChatIcon from '../../assets/svg/SportTicketChatIcon';
import MovieTicketChatIcon from '../../assets/svg/MovieTicketChatIcon';

const { height } = Dimensions.get('window');

const chatOptions = [
  {
    id: 1,
    icon: <AppSupportIcon />,
    label: 'App support',
    screen: '',
  },
  {
    id: 2,
    icon: <EventTickectChatIcon />,
    label: 'Event tickets',
    screen: 'EventTicket',
  },
  {
    id: 3,
    icon: <SportTicketChatIcon />,
    label: 'Sport tickets',
    screen: '',
  },
  {
    id: 4,
    icon: <MovieTicketChatIcon />,
    label: 'Movie tickets',
    screen: 'MovieTicketDetail',
  },
];

// Enable LayoutAnimation on Android
// if (
//   Platform.OS === 'android' &&
//   UIManager.setLayoutAnimationEnabledExperimental
// ) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

const FAQ_ITEMS = [
  { id: 1, question: 'How do I manage all the notifications on the App?' },
  { id: 2, question: 'How can I add/ modify the payment method' },
  { id: 3, question: 'Which modes of payment are available on the Genie app?' },
  { id: 4, question: 'How can I reach out to customer support?' },
  { id: 5, question: 'How can I change my phone number on the Genie app?' },
  { id: 6, question: 'Where can I find the term of services?' },
];

const AccordionItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(prev => !prev);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={toggle}
      style={styles.accordionItem}
    >
      <View style={styles.accordionRow}>
        <Text style={styles.accordionQuestion}>{item.question}</Text>
        <Text
          style={[
            styles.accordionChevron,
            expanded && styles.accordionChevronOpen,
          ]}
        >
          ›
        </Text>
      </View>
      {expanded && (
        <Text style={styles.accordionAnswer}>
          Please contact our support team at support@genieapp.com or use the
          chat option below for immediate assistance.
        </Text>
      )}
    </TouchableOpacity>
  );
};

const HowCanWeHelpYou = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('FOR YOU');
  const [visible, setVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current;

  const filteredFAQs = FAQ_ITEMS.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const tabs = [
    {
      id: 'FOR YOU',
      label: 'FOR YOU',
      icon: (
        <ForYouIcon
          style={{ fill: selectedTab === 'FOR YOU' ? '#0F7754' : '#999' }}
        />
      ),
    },
    {
      id: 'SPORTS',
      label: 'SPORTS',
      icon: (
        <SportsIcon
          style={{ fill: selectedTab === 'SPORTS' ? '#0F7754' : '#999' }}
        />
      ),
    },
    {
      id: 'EVENTS',
      label: 'EVENTS',
      icon: (
        <EventsIcon
          style={{ fill: selectedTab === 'EVENTS' ? '#0F7754' : '#999' }}
        />
      ),
    },
    {
      id: 'MOVIES',
      label: 'MOVIES',
      icon: (
        <MovieIcon
          style={{ fill: selectedTab === 'MOVIES' ? '#0F7754' : '#999' }}
        />
      ),
    },
  ];

  const openSheet = () => {
    setVisible(true);
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      bounciness: 4,
    }).start();
  };

  const closeSheet = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };

  return (
    <>
      <View style={styles.statusBar}>
        <StatusBar barStyle="light-content" backgroundColor="#0F7754" />
      </View>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <BackIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.backBtn} onPress={openSheet}>
            <Text style={styles.headerTitle}>All support tickets</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          // showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Page Title */}
          <Text style={styles.pageTitle}>How can we help you?</Text>

          {/* Search Bar */}
          <View style={styles.searchWrapper}>
            <View style={styles.searchIcon}>
              <SearchDashboardIcon />
            </View>

            <TextInput
              style={styles.searchInput}
              placeholder="Search for FAQs"
              placeholderTextColor="#b0b0b0"
              value={searchQuery}
              onChangeText={setSearchQuery}
              returnKeyType="search"
            />
          </View>

          {/* Category Tabs */}
          <View style={styles.tabsContainer}>
            {tabs.map(tab => (
              <TouchableOpacity
                key={tab.id}
                style={styles.tab}
                onPress={() => setSelectedTab(tab.id)}
              >
                <Text style={styles.tabIcon}>{tab.icon}</Text>
                <Text
                  style={[
                    styles.tabLabel,
                    selectedTab === tab.id && styles.tabLabelActive,
                  ]}
                >
                  {tab.label}
                </Text>
                {selectedTab === tab.id && <View style={styles.tabIndicator} />}
              </TouchableOpacity>
            ))}
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* FAQ Section */}
          <Text style={styles.sectionTitle}>All Questions</Text>

          <View style={styles.accordionList}>
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map(item => (
                <AccordionItem key={item.id} item={item} />
              ))
            ) : (
              <Text style={styles.noResults}>
                No results found for "{searchQuery}"
              </Text>
            )}
          </View>
        </ScrollView>

        {/* Chat Button */}
        <View style={styles.chatButtonWrapper}>
          <TouchableOpacity
            style={styles.chatButton}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Chat')}
          >
            <ChatBtnIcon />
            <Text style={styles.chatButtonText}>Chat with us</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <View>
        {/* Bottom Sheet Modal */}
        <Modal transparent visible={visible} animationType="none">
          {/* Backdrop */}
          <TouchableWithoutFeedback onPress={closeSheet}>
            <View style={styles.backdrop} />
          </TouchableWithoutFeedback>

          {/* Sheet */}
          <Animated.View
            style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}
          >
            {/* Handle Bar */}
            <View style={styles.handle} />

            <Text style={styles.sheetTitle}>Chat with us</Text>

            {/* 2x2 Grid */}
            <View style={styles.grid}>
              {chatOptions.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.card}
                  activeOpacity={0.7}
                  onPress={() => {
                    // closeSheet();
                    navigation.navigate(item.screen);
                  }}
                >
                  <Text style={styles.cardIcon}>{item.icon}</Text>
                  <Text style={styles.cardLabel}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: appColors.primary,
    height: StatusBar.currentHeight,
  },
  safeArea: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0,
  },
  backBtn: {
    marginRight: 12,
  },
  backArrow: {
    fontSize: 22,
    color: '#111',
    fontWeight: '300',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'right',
    fontSize: 15,
    fontWeight: '500',
    color: appColors.black,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: appColors.black,
    marginTop: 20,
    marginBottom: 16,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: appColors.placeholder,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 14 : 14,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
    color: '#999',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#111',
    padding: 0,
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 0,
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
    paddingBottom: 8,
    position: 'relative',
  },
  tabIcon: {
    fontSize: 22,
    marginBottom: 4,
    opacity: 0.35,
  },
  tabIconActive: {
    opacity: 1,
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: '#bbb',
    letterSpacing: 0.5,
  },
  tabLabelActive: {
    color: '#2ecc71',
  },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    left: '15%',
    right: '15%',
    height: 2,
    backgroundColor: '#2ecc71',
    borderRadius: 2,
  },

  tabsContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    position: 'relative',
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#999',
  },
  tabLabelActive: {
    color: appColors.primary,
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 6,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: appColors.primary,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },

  divider: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
    marginBottom: 12,
  },
  accordionList: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  accordionItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  accordionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accordionQuestion: {
    flex: 1,
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: '400',
    lineHeight: 20,
    paddingRight: 12,
  },
  accordionChevron: {
    fontSize: 22,
    color: '#999',
    transform: [{ rotate: '90deg' }],
    lineHeight: 22,
  },
  accordionChevronOpen: {
    transform: [{ rotate: '270deg' }],
    color: appColors.primary,
  },
  accordionAnswer: {
    marginTop: 10,
    fontSize: 13,
    color: '#666',
    lineHeight: 19,
  },
  noResults: {
    textAlign: 'center',
    color: '#aaa',
    fontSize: 14,
    marginTop: 24,
  },
  chatButtonWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: appColors.white,
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 28 : 16,
    paddingTop: 10,
  },
  chatButton: {
    backgroundColor: appColors.black,
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  chatButtonIcon: {
    fontSize: 18,
  },
  chatButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: appColors.white,
    letterSpacing: 0.2,
  },

  // Backdrop
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  // Bottom Sheet
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 36,
  },

  // Handle
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },

  sheetTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    marginBottom: 14,
  },

  // Grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  card: {
    width: '48%',
    backgroundColor: '#ebebeb',
    borderRadius: 14,
    padding: 14,
    minHeight: 85,
    justifyContent: 'space-between',
  },
  cardIcon: {
    fontSize: 22,
    marginBottom: 6,
  },
  cardLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#222',
  },
});

export default HowCanWeHelpYou;
