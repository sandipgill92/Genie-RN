import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import { appColors } from '../../utils/appColors';
import BackIconBg from '../../assets/svg/BackIconBg';
import SearchIconBg from '../../assets/svg/SearchIconBg';
import DownloadIconBg from '../../assets/svg/DownloadIconBg';
import FilterEventIcon from '../../assets/svg/FilterEventIcon';
import DownIcon from '../../assets/svg/DownIcon';
import UserIcon from '../../assets/svg/UserIcon';
import FireIcon from '../../assets/svg/FireIcon';
import BookingModal from '../../screens/Modal/BookingModal/BookingModal';
import AdventureIcon from '../../assets/svg/AdventureIcon';
import SciFiIcon from '../../assets/svg/SciFiIcon';
import ThrillerIcon from '../../assets/svg/ThrillerIcon';

// ─── DATA ────────────────────────────────────────────────────────────────────

const GENRES = [
  {
    icon: <FireIcon />,
    name: 'Action',
  },
  {
    icon: <AdventureIcon />,
    name: 'Adventure',
  },
  {
    icon: <SciFiIcon />,
    name: 'Sci-Fi',
  },
  {
    icon: <ThrillerIcon />,
    name: 'Thriller',
  },
];

const CAST = [
  {
    id: '1',
    initials: 'SJ',
    name: 'Scarlett',
    surname: 'Johansson',
    color: '#e17055',
  },
  {
    id: '2',
    initials: 'JB',
    name: 'Jonathan',
    surname: 'Bailey',
    color: '#0984e3',
  },
  {
    id: '3',
    initials: 'RF',
    name: 'Rajesh',
    surname: 'Parekh',
    color: '#d63031',
  },
];

const DATES = [
  { day: 18, label: 'FRI' },
  { day: 19, label: 'SAT' },
  { day: 20, label: 'SUN' },
];

const VENUES = [
  {
    id: '1',
    name: 'Yaaš Screens, Montego Bay Mall',
    distance: '3.1km away • Imax Compatible',
    times: [
      { time: '03:08 PM', sub: '3D', type: 'available' },
      { time: '05:50 PM', sub: '3D', type: 'available' },
      { time: '09:00 PM', sub: '30/50', type: 'filling' },
      { time: '11:10 PM', sub: '20/40', type: 'sold' },
    ],
    badge: null,
  },
  {
    id: '2',
    name: 'Yaaš Screens, Montego Bay Mall',
    distance: '3.7km away • Imax Compatible',
    times: [
      { time: '03:08 PM', sub: '3D', type: 'available' },
      { time: '05:50 PM', sub: '3D', type: 'available' },
      { time: '09:00 PM', sub: '50/50', type: 'available' },
      { time: '11:10 PM', sub: '20/40', type: 'sold' },
    ],
    badge: null,
  },
  {
    id: '3',
    name: 'Yaaš Screens, Montego Bay Mall',
    distance: '3.7km away • Imax Compatible',
    times: [
      { time: '03:08 PM', sub: 'Dolby', type: 'filling' },
      { time: '05:50 PM', sub: '3D', type: 'available' },
      { time: '09:00 PM', sub: '50/50', type: 'sold' },
      { time: '11:10 PM', sub: '20/40', type: 'filling' },
    ],
    badge: 'Dolby Atmos + M-Ticket',
  },
  {
    id: '4',
    name: 'Yaaš Screens, Montego Bay Mall',
    distance: '3.7km away • Imax Compatible',
    times: [
      { time: '03:08 PM', sub: '3D', type: 'available' },
      { time: '05:50 PM', sub: '3D', type: 'available' },
      { time: '09:00 PM', sub: '30/50', type: 'filling' },
      { time: '11:10 PM', sub: '20/40', type: 'sold' },
    ],
    badge: null,
  },
  {
    id: '5',
    name: 'Yaaš Screens, Montego Bay Mall',
    distance: '3.7km away • Imax Compatible',
    times: [
      { time: '03:08 PM', sub: '3D', type: 'available' },
      { time: '05:50 PM', sub: 'Dolby', type: 'filling' },
      { time: '09:00 PM', sub: '30/50', type: 'available' },
      { time: '11:10 PM', sub: '50/50', type: 'sold' },
    ],
    badge: 'Dolby Atmos + M-Ticket',
  },
  {
    id: '6',
    name: 'Yaaš Screens, Montego Bay Mall',
    distance: '3.7km away • Imax Compatible',
    times: [
      { time: '03:08 PM', sub: '3D', type: 'available' },
      { time: '05:50 PM', sub: '3D', type: 'available' },
      { time: '09:00 PM', sub: '50/50', type: 'available' },
      { time: '11:10 PM', sub: '20/40', type: 'sold' },
    ],
    badge: null,
  },
];

// ─── TIME SLOT BUTTON ─────────────────────────────────────────────────────────

const TIME_STYLES = {
  available: {
    wrapper: { backgroundColor: '#e8f8f0', borderColor: '#e8f8f0' },
    timeText: { color: '#1e8449' },
    subText: { color: '#000' },
  },
  filling: {
    wrapper: { backgroundColor: '#fff3e0', borderColor: '#fff3e0' },
    timeText: { color: '#d35400' },
    subText: { color: '#000' },
  },
  sold: {
    wrapper: { backgroundColor: '#fdecea', borderColor: '#fdecea' },
    timeText: { color: '#c0392b' },
    subText: { color: '#000' },
  },
};

const TimeSlot = ({ time, sub, type, onPress }) => {
  const ts = TIME_STYLES[type];

  return (
    <>
      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={onPress}
          style={[styles.timeSlot, ts.wrapper]}
          activeOpacity={0.7}
        >
          <Text style={[styles.timeSlotTime, ts.timeText]}>{time}</Text>
        </TouchableOpacity>
        <Text style={[styles.timeSlotSub, ts.subText]}>{sub}</Text>
      </View>
    </>
  );
};

// ─── VENUE CARD ───────────────────────────────────────────────────────────────

const VenueCard = ({ venue, onTimePress }) => (
  <View style={styles.venueCard}>
    <View style={styles.venueHeader}>
      <View style={[styles.venueLogo]}>
        <Image
          source={require('../../assets/img/Mask group.png')}
          style={{ width: 40, height: 40 }}
        />
      </View>
      <View style={styles.venueInfo}>
        <Text style={styles.venueName}>{venue.name}</Text>
        <Text style={styles.venueDistance}>{venue.distance}</Text>
        <Text style={styles.venueDistance2}>Get Free Coke +1 Refill</Text>
      </View>
    </View>

    <View style={styles.timeSlotsRow}>
      {venue.times.map((slot, idx) => (
        <TimeSlot
          key={idx}
          time={slot.time}
          sub={slot.sub}
          type={slot.type}
          onPress={onTimePress}
        />
      ))}
    </View>

    {/* {venue.badge && (
      <View style={styles.venueBadge}>
        <Text style={styles.venueBadgeIcon}>🎬 </Text>
        <Text style={styles.venueBadgeText}>{venue.badge}</Text>
      </View>
    )} */}
  </View>
);

// ─── MAIN SCREEN ──────────────────────────────────────────────────────────────

const MainMovieScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(18);
  const [cartVisible, setCartVisible] = useState(false);

  return (
    <>
      <View style={styles.statusBar}>
        <StatusBar barStyle="light-content" backgroundColor="#0F7754" />
      </View>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* ── POSTER / HEADER ── */}
          <View style={styles.poster}>
            {/* Nav arrows */}
            <View style={styles.navRow}>
              <TouchableOpacity>
                <BackIconBg />
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity>
                  <SearchIconBg />
                </TouchableOpacity>
                <TouchableOpacity>
                  <DownloadIconBg />
                </TouchableOpacity>
              </View>
            </View>

            {/* Logo + trailer */}
            <View style={styles.posterCenter}>
              <Text style={styles.posterSub}>JURASSIC WORLD</Text>
              <Text style={styles.posterTitle}>REBIRTH</Text>
              <TouchableOpacity style={styles.trailerBtn} activeOpacity={0.8}>
                <Text style={styles.trailerIcon}>▶ </Text>
                <Text style={styles.trailerText}>Watch Trailer</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Genre tags */}
          <View style={styles.genreRow}>
            {GENRES.map(g => (
              <View key={g} style={styles.genrePill}>
                <Text style={styles.genreText}>
                  {g.icon} {g.name}
                </Text>
              </View>
            ))}
          </View>
          {/* ── MOVIE INFO ── */}
          <View style={styles.infoSection}>
            <Text style={styles.movieTitle}>Jurassic World Rebirth</Text>
            <Text style={styles.movieMeta}>
              UA13+ | English +1 more | 2hr 13 min
            </Text>
            <Text style={styles.movieMeta2}>
              Set five years after Jurassic World Dominion on{'\n'}
              Ambitious expedition ventures into secrets old animal h...
            </Text>

            {/* Cast */}
            <Text style={styles.castLabel}>Star cast</Text>
            <View style={styles.castRow}>
              {CAST.map(c => (
                <View key={c.id} style={styles.castItem}>
                  <View
                    style={[styles.castAvatar, { backgroundColor: c.color }]}
                  >
                    <UserIcon />
                  </View>
                  <View>
                    <Text style={styles.castName}>{c.name}</Text>
                    <Text style={styles.castSurname}>{c.surname}</Text>
                  </View>
                </View>
              ))}
            </View>

            <TouchableOpacity>
              <Text style={styles.viewMore}>View more details</Text>
            </TouchableOpacity>
          </View>

          {/* ── PROMO BANNER ── */}
          {/* <View style={styles.promoBanner}>
            <View style={styles.promoLeft}>
              <Text style={styles.promoText}>
                Enjoy FLATRATE so you collect and
              </Text>
              <Text style={styles.promoText}>
                get free Jurassic World Merchandise
              </Text>
            </View>
            <View style={styles.promoBadge}>
              <Text style={styles.promoBadgeText}>JW</Text>
            </View>
          </View> */}

          {/* Pagination dots */}
          {/* <View style={styles.dotsRow}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View> */}

          {/* ── DATE SELECTOR ── */}
          <View style={styles.dateSection}>
            <Text style={styles.monthLabel}>JUL</Text>
            <View style={styles.datesRow}>
              {DATES.map(d => {
                const isActive = d.day === selectedDate;
                return (
                  <TouchableOpacity
                    key={d.day}
                    style={[styles.dateBox, isActive && styles.dateBoxActive]}
                    onPress={() => setSelectedDate(d.day)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[styles.dateNum, isActive && styles.dateNumActive]}
                    >
                      {d.day}
                    </Text>
                    <Text
                      style={[styles.dateDay, isActive && styles.dateDayActive]}
                    >
                      {d.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* ── FILTER ROW ── */}
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{
              marginHorizontal: 16,
            }}
          >
            <View style={styles.slideContainer}>
              {/* Filters chip – opens bottom sheet */}

              <TouchableOpacity style={styles.slideBtn}>
                <FilterEventIcon />
                <Text style={{ fontSize: 13 }}>Filters</Text>
                <DownIcon />
              </TouchableOpacity>

              <View style={styles.slideBtn}>
                <Text style={{ fontSize: 13 }}>English</Text>
                <DownIcon />
              </View>
              <View style={styles.slideBtn}>
                <Text>Theatre Offers</Text>
              </View>
              <View style={styles.slideBtn}>
                <Text style={{ fontSize: 13 }}>After 5PM</Text>
              </View>
            </View>
          </ScrollView>

          {/* ── LEGEND ── */}
          <View style={styles.legendRow}>
            {[
              { color: '#f39c12', label: 'Subtitles' },
              { color: '#27ae60', label: 'Available' },
              { color: '#e67e22', label: 'Filling Fast' },
              { color: '#e74c3c', label: 'Not Available' },
            ].map(item => (
              <View key={item.label} style={styles.legendItem}>
                <View
                  style={[styles.legendDot, { backgroundColor: item.color }]}
                />
                <Text style={styles.legendText}>{item.label}</Text>
              </View>
            ))}
          </View>

          {/* ── VENUES ── */}
          <View style={styles.venueList}>
            {VENUES.map(v => (
              <VenueCard
                key={v.id}
                venue={v}
                onTimePress={() => setCartVisible(true)}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      <BookingModal
        navigation={navigation}
        visible={cartVisible}
        onCancel={() => setCartVisible(false)}
        onConfirm={() => {
          setCartVisible(false);
          navigation.navigate('MainMovieScreenOption');
        }}
      />
    </>
  );
};

// ─── STYLES ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: appColors.primary,
    height: StatusBar.currentHeight,
  },
  safeArea: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  scroll: {
    flex: 1,
  },

  // Poster
  poster: {
    backgroundColor: '#1a0800',
    paddingBottom: 14,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 16,
  },

  posterCenter: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  posterSub: {
    color: '#c8a060',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 3,
    marginBottom: 2,
  },
  posterTitle: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: 2,
  },
  trailerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d63031',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginTop: 10,
  },
  trailerIcon: {
    color: '#fff',
    fontSize: 11,
  },
  trailerText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  genreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    marginTop: 12,
  },
  genrePill: {
    backgroundColor: '#ebeaea',
    borderRadius: 24,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
    flexDirection: 'row',
  },
  genreText: {
    color: appColors.black,
    fontSize: 12,
  },

  // Movie info
  infoSection: {
    backgroundColor: appColors.white,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 4,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginBottom: 4,
  },
  movieMeta: {
    fontSize: 10,
    color: '#999',
    lineHeight: 15,
    marginBottom: 8,
  },
  movieMeta2: {
    fontSize: 11,
    color: appColors.black,
    lineHeight: 15,
    marginBottom: 20,
  },
  castLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: appColors.black,
    marginBottom: 8,
  },
  castRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 8,
  },
  castItem: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: 8,
  },
  castAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  castInitials: {
    color: appColors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  castName: {
    fontSize: 11,
    fontWeight: '600',
    color: appColors.black,
  },
  castSurname: {
    fontSize: 10,
    color: appColors.black,
  },
  viewMore: {
    fontSize: 11,
    color: appColors.black,
    fontWeight: '500',
    marginVertical: 10,
    textAlign: 'center',
  },

  // Promo banner
  promoBanner: {
    backgroundColor: '#d63031',
    marginHorizontal: 14,
    marginTop: 4,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  promoLeft: {},
  promoText: {
    color: '#ffcccc',
    fontSize: 9,
    fontWeight: '500',
    lineHeight: 14,
  },
  promoBadge: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  promoBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },

  // Dots
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  dot: {
    width: 6,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ccc',
  },
  dotActive: {
    width: 18,
    backgroundColor: '#333',
  },

  // Date selector
  dateSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  monthLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#999',
    letterSpacing: 1,
    transform: [{ rotate: '270deg' }],
    width: 28,
    textAlign: 'center',
  },
  datesRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },
  dateBox: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    paddingVertical: 8,
    alignItems: 'center',
  },
  dateBoxActive: {
    backgroundColor: '#59d3a4',
    borderColor: '#59d3a4',
  },
  dateNum: {
    fontSize: 20,
    fontWeight: '800',
    color: '#333',
  },
  dateNumActive: {
    color: '#fff',
  },
  dateDay: {
    fontSize: 9,
    fontWeight: '600',
    color: '#999',
    marginTop: 1,
  },
  dateDayActive: {
    color: '#fff',
  },

  // Filters
  filterRow: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    gap: 7,
    alignItems: 'center',
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  filterText: {
    fontSize: 11,
    color: '#333',
    fontWeight: '500',
  },
  filterIcon: {
    fontSize: 11,
    color: '#555',
  },

  // Legend
  legendRow: {
    backgroundColor: '#eeeeee',
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 2,
  },
  legendText: {
    fontSize: 9,
    color: '#555',
  },

  // Venue list
  venueList: {
    paddingHorizontal: 8,
    paddingBottom: 24,
    gap: 8,
  },
  venueCard: {
    backgroundColor: '#fff',
    overflow: 'hidden',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: appColors.placeholder,
  },
  venueHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    gap: 10,
  },
  venueLogo: {
    borderRadius: '50%',
  },

  venueInfo: {
    flex: 1,
    marginBottom: 12,
  },
  venueName: {
    fontSize: 12,
    fontWeight: '700',
    color: appColors.black,
    marginBottom: 2,
  },
  venueDistance: {
    fontSize: 10,
    color: appColors.black,
  },
  venueDistance2: {
    fontSize: 10,
    color: appColors.white,
    backgroundColor: appColors.primary,
    marginTop: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 24,
    alignSelf: 'flex-start',
  },
  timeSlotsRow: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 12,
    paddingBottom: 12,
    justifyContent: 'space-between',
  },
  timeSlot: {
    flex: 1,
    borderRadius: 6,
    borderWidth: 1.5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  timeSlotTime: {
    fontSize: 10,
    fontWeight: '700',
  },
  timeSlotSub: {
    fontSize: 8,
    marginTop: 2,
  },
  venueBadge: {
    backgroundColor: '#e8f8f0',
    borderTopWidth: 1,
    borderTopColor: '#d5f0e0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  venueBadgeIcon: {
    fontSize: 10,
  },
  venueBadgeText: {
    fontSize: 9,
    color: '#1e8449',
    fontWeight: '600',
  },
  slideContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    marginBottom: 30,
  },
  slideBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: appColors.black,
    borderRadius: 8,
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
});

export default MainMovieScreen;
