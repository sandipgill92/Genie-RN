import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  Dimensions,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import { appColors } from '../../utils/appColors';
import LocationIcon from '../../assets/svg/LocationIcon';
import DownBlackIcon from '../../assets/svg/DownBlackIcon';
import ProfileIcon from '../../assets/svg/ProfileIcon';
import SearchDashboardIcon from '../../assets/svg/SearchDashboardIcon';
import FilterIcon from '../../assets/svg/FilterIcon';
import ForYouIcon from '../../assets/svg/ForYouIcon';
import SportsIcon from '../../assets/svg/SportsIcon';
import EventsIcon from '../../assets/svg/EventsIcon';
import MovieIcon from '../../assets/svg/MovieIcon';
import LeftLine from '../../assets/svg/LeftLine';
import RightLine from '../../assets/svg/RightLine';
import FilterEventIcon from '../../assets/svg/FilterEventIcon';
import DownIcon from '../../assets/svg/DownIcon';
import ArtIcon from '../../assets/svg/ArtIcon';
import MusicIcon from '../../assets/svg/MusicIcon';
import PopularEventIcon from '../../assets/svg/PopularEventIcon';
import CocGlassIcon from '../../assets/svg/CocGlassIcon';
import TheatresNearMeIcon from '../../assets/svg/TheatresNearMeIcon';
import UpcomingMovieIcon from '../../assets/svg/UpcomingMovieIcon';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;
const CARD_SPACING = 16;

/* ─────────────────────────────────────────────
   FILTER BOTTOM SHEET
───────────────────────────────────────────── */
const SORT_OPTIONS = [
  'Popularity',
  'Date',
  'Parish',
  'Recently Added',
  'Price: Low to High',
  'Price: High to Low',
  'Distance: Nearest First',
];
const MOVIES_OPTIONS = ['2D', '4DX3D', '3D', '4DX-2D'];

const GENRE_OPTIONS = [
  'Arcades',
  'Comedy',
  'Food and Drink',
  'Games & Quizzes',
  'Live Event',
  'Music',
  'Workshops',
  'Indoor Games',
  'Screening',
];

const GENRE_OPTIONS2 = [
  'Action',
  'Adventure',
  'Animation',
  'Comedy',
  'Crime',
  'Drama',
  'Family',
  'Fantasy',
  'Horror',
  'Mystery',
];

const FilterBottomSheet = ({ visible, onClose }) => {
  const [activeTab, setActiveTab] = useState('sort'); // 'sort' | 'genre'
  const [selectedSort, setSelectedSort] = useState('Popularity');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 3,
        speed: 14,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 260,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const toggleGenre = genre => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre],
    );
  };

  const handleClearAll = () => {
    setSelectedSort('Popularity');
    setSelectedGenres([]);
  };

  const handleApply = () => {
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      {/* Dimmed backdrop */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={fs.backdrop} />
      </TouchableWithoutFeedback>

      {/* Sheet */}
      <Animated.View
        style={[fs.sheet, { transform: [{ translateY: slideAnim }] }]}
      >
        {/* Handle bar */}
        <View style={fs.handle} />

        {/* Header */}
        <View style={fs.header}>
          <Text style={fs.headerTitle}>Filter By</Text>
          <TouchableOpacity onPress={onClose} style={fs.closeBtn}>
            <Text style={fs.closeX}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Two-panel body */}
        <View style={fs.body}>
          {/* ── Left sidebar tabs ── */}
          <View style={fs.sidebar}>
            <TouchableOpacity
              style={[fs.sideTab, activeTab === 'sort' && fs.sideTabActive]}
              onPress={() => setActiveTab('sort')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  fs.sideTabText,
                  activeTab === 'sort' && fs.sideTabTextActive,
                ]}
              >
                Sort By
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[fs.sideTab, activeTab === 'genre' && fs.sideTabActive]}
              onPress={() => setActiveTab('genre')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  fs.sideTabText,
                  activeTab === 'genre' && fs.sideTabTextActive,
                ]}
              >
                Genre
              </Text>
            </TouchableOpacity>
          </View>

          {/* ── Right options panel ── */}
          <ScrollView
            style={fs.optionsPanel}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 8 }}
          >
            {activeTab === 'sort'
              ? SORT_OPTIONS.map(opt => (
                  <TouchableOpacity
                    key={opt}
                    style={fs.optionRow}
                    onPress={() => setSelectedSort(opt)}
                    activeOpacity={0.7}
                  >
                    {/* Radio */}
                    <View
                      style={[fs.radio, selectedSort === opt && fs.radioActive]}
                    >
                      {selectedSort === opt && <View style={fs.radioDot} />}
                    </View>
                    <Text
                      style={[
                        fs.optionText,
                        selectedSort === opt && fs.optionTextActive,
                      ]}
                    >
                      {opt}
                    </Text>
                  </TouchableOpacity>
                ))
              : GENRE_OPTIONS.map(opt => {
                  const checked = selectedGenres.includes(opt);
                  return (
                    <TouchableOpacity
                      key={opt}
                      style={fs.optionRow}
                      onPress={() => toggleGenre(opt)}
                      activeOpacity={0.7}
                    >
                      {/* Checkbox */}
                      <View style={[fs.checkbox, checked && fs.checkboxActive]}>
                        {checked && <Text style={fs.checkmark}>✓</Text>}
                      </View>
                      <Text
                        style={[fs.optionText, checked && fs.optionTextActive]}
                      >
                        {opt}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
          </ScrollView>
        </View>

        {/* Footer */}
        <View style={fs.footer}>
          <TouchableOpacity onPress={handleClearAll} style={fs.clearBtn}>
            <Text style={fs.clearText}>Clear all</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleApply} style={fs.applyBtn}>
            <Text style={fs.applyText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
};

const FilterBottomSheetMovies = ({ visible, onClose }) => {
  const [activeTab, setActiveTab] = useState('format'); // 'sort' | 'genre'
  const [selectedSort, setSelectedSort] = useState('2D');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 3,
        speed: 14,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 260,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const toggleGenre = genre => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre],
    );
  };

  const handleClearAll = () => {
    setSelectedSort('2D');
    setSelectedGenres([]);
  };

  const handleApply = () => {
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      {/* Dimmed backdrop */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={fs.backdrop} />
      </TouchableWithoutFeedback>

      {/* Sheet */}
      <Animated.View
        style={[fs.sheet, { transform: [{ translateY: slideAnim }] }]}
      >
        {/* Handle bar */}
        <View style={fs.handle} />

        {/* Header */}
        <View style={fs.header}>
          <Text style={fs.headerTitle}>Filter By</Text>
          <TouchableOpacity onPress={onClose} style={fs.closeBtn}>
            <Text style={fs.closeX}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Two-panel body */}
        <View style={fs.body}>
          {/* ── Left sidebar tabs ── */}
          <View style={fs.sidebar}>
            <TouchableOpacity
              style={[fs.sideTab, activeTab === 'format' && fs.sideTabActive]}
              onPress={() => setActiveTab('format')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  fs.sideTabText,
                  activeTab === 'format' && fs.sideTabTextActive,
                ]}
              >
                Format
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[fs.sideTab, activeTab === 'genre' && fs.sideTabActive]}
              onPress={() => setActiveTab('genre')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  fs.sideTabText,
                  activeTab === 'genre' && fs.sideTabTextActive,
                ]}
              >
                Genre
              </Text>
            </TouchableOpacity>
          </View>

          {/* ── Right options panel ── */}
          <ScrollView
            style={fs.optionsPanel}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 8 }}
          >
            {activeTab === 'format'
              ? MOVIES_OPTIONS.map(opt => (
                  <TouchableOpacity
                    key={opt}
                    style={fs.optionRow}
                    onPress={() => setSelectedSort(opt)}
                    activeOpacity={0.7}
                  >
                    {/* Radio */}
                    <View
                      style={[fs.radio, selectedSort === opt && fs.radioActive]}
                    >
                      {selectedSort === opt && <View style={fs.radioDot} />}
                    </View>
                    <Text
                      style={[
                        fs.optionText,
                        selectedSort === opt && fs.optionTextActive,
                      ]}
                    >
                      {opt}
                    </Text>
                  </TouchableOpacity>
                ))
              : GENRE_OPTIONS2.map(opt => {
                  const checked = selectedGenres.includes(opt);
                  return (
                    <TouchableOpacity
                      key={opt}
                      style={fs.optionRow}
                      onPress={() => toggleGenre(opt)}
                      activeOpacity={0.7}
                    >
                      {/* Checkbox */}
                      <View style={[fs.checkbox, checked && fs.checkboxActive]}>
                        {checked && <Text style={fs.checkmark}>✓</Text>}
                      </View>
                      <Text
                        style={[fs.optionText, checked && fs.optionTextActive]}
                      >
                        {opt}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
          </ScrollView>
        </View>

        {/* Footer */}
        <View style={fs.footer}>
          <TouchableOpacity onPress={handleClearAll} style={fs.clearBtn}>
            <Text style={fs.clearText}>Clear all</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleApply} style={fs.applyBtn}>
            <Text style={fs.applyText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
};

const SIDEBAR_W = 100;
const GREEN = '#0F7754';
const LIGHT_GREEN_BG = '#EAF4EF';

const fs = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: appColors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 16,
    maxHeight: height * 0.75,
    shadowColor: appColors.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 20,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: appColors.black,
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeX: {
    fontSize: 13,
    color: appColors.black,
    fontWeight: '600',
  } /* ── Two-panel layout ── */,
  body: {
    flexDirection: 'row',
    flex: 1,
    minHeight: 300,
  },

  /* Left sidebar */
  sidebar: {
    width: SIDEBAR_W,
  },
  sideTab: {
    paddingVertical: 18,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  sideTabActive: {
    backgroundColor: LIGHT_GREEN_BG,
  },
  sideTabText: {
    fontSize: 13,
    color: appColors.black,
    fontWeight: '500',
  },
  sideTabTextActive: {
    color: appColors.black,
    fontWeight: '700',
  },

  /* Right options panel */
  optionsPanel: {
    flex: 1,
    backgroundColor: LIGHT_GREEN_BG,
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
  },

  /* Radio (Sort By) */
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#C4C4C4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: appColors.white,
  },
  radioActive: {
    borderColor: GREEN,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: GREEN,
  },

  /* Checkbox (Genre) */
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#C4C4C4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: appColors.white,
  },
  checkboxActive: {
    backgroundColor: GREEN,
    borderColor: GREEN,
  },
  checkmark: {
    color: appColors.white,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 14,
  },

  optionText: {
    fontSize: 14,
    color: appColors.black,
  },
  optionTextActive: {
    color: appColors.black,
    fontWeight: '600',
  },

  /* Footer */
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: appColors.white,
  },
  clearBtn: {
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  clearText: {
    fontSize: 14,
    color: appColors.black,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  applyBtn: {
    backgroundColor: appColors.black,
    borderRadius: 20,
    paddingHorizontal: 52,
    paddingVertical: 13,
  },
  applyText: {
    fontSize: 15,
    fontWeight: '700',
    color: appColors.white,
  },
  group: {
    paddingTop: 16,
    paddingBottom: 8,
    marginBottom: 4,
    flexDirection: 'row',
  },
  groupLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111',
    marginBottom: 12,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioActive: {
    borderColor: '#0F7754',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0F7754',
  },
  optionText: {
    fontSize: 14,
    color: '#555',
  },
  optionTextActive: {
    color: '#111',
    fontWeight: '600',
  },
});

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const PromoCard = ({ onKnowMore }) => {
  const scaleAnim = useRef(new Animated.Value(0.96)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const imageSlide = useRef(new Animated.Value(30)).current;
  const imageFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 7,
        tension: 60,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 70,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.sequence([
      Animated.delay(150),
      Animated.parallel([
        Animated.spring(imageSlide, {
          toValue: 0,
          friction: 6,
          tension: 50,
          useNativeDriver: true,
        }),
        Animated.timing(imageFade, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 6,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }, { translateY: slideAnim }],
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onKnowMore}
        style={styles.cardMovies}
      >
        {/* Background bubbles / decorative circles */}
        {/* <View style={styles.bubbleLarge} />
        <View style={styles.bubbleSmall} /> */}

        {/* Left content */}
        <View style={styles.contentMovies}>
          <Text style={styles.titleMovies}>
            Get a FREE Coke + 1 Refill with every movie ticket at Nay Jamia
            Cinema
            <Text style={styles.bold}>Nay Jamia Cinema</Text>
          </Text>

          <TouchableOpacity
            onPress={onKnowMore}
            hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
          >
            <Text style={styles.knowMore}>Know more</Text>
          </TouchableOpacity>
        </View>

        {/* Right image */}
        <Animated.View
          style={[
            styles.imageContainerMovies,
            {
              opacity: imageFade,
              transform: [{ translateX: imageSlide }],
            },
          ]}
        >
          <View style={styles.imageMovies}>
            <CocGlassIcon />
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

/* ─────────────────────────────────────────────
   MAIN DASHBOARD
───────────────────────────────────────────── */

const CARD_MARGIN2 = 8;
const NUM_COLUMNS = 2;
const CARD_WIDTH2 = (width - CARD_MARGIN2 * 6) / NUM_COLUMNS;
const POSTER_HEIGHT = CARD_WIDTH2 * 1.3; // ~cinema aspect ra

const Dashboard = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('FOR YOU');
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterVisible2, setFilterVisible2] = useState(false);

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

  const blockbusterMovies = [
    {
      id: 1,
      title: 'The Thunderbolts',
      rating: 'UA 13+',
      genres: ['Sci-Fi'],
      image: require('../../assets/svg/EventImg').default,
    },
  ];

  const nowShowingMovies = [
    {
      id: 1,
      title: 'Jurassic World Rebirth',
      rating: 'UA13+',
      language: 'English',
      image: require('../../assets/svg/EventImg').default,
    },
    {
      id: 2,
      title: 'F1 The Movie',
      rating: 'UA16+',
      language: 'English',
      image: require('../../assets/svg/EventImg').default,
    },
    {
      id: 3,
      title: 'Jafaican',
      rating: 'UA 13+',
      language: 'English + Patois',
      image: require('../../assets/svg/EventImg').default,
    },
    {
      id: 4,
      title: 'The Fantastic Four First Steps',
      rating: 'UA 13+',
      language: 'English',
      image: require('../../assets/svg/EventImg').default,
    },
  ];

  const MovieCard = ({ movie }) => (
    <View style={styles.cardMovie2}>
      <Image source={movie.image} style={styles.poster} resizeMode="cover" />
      <View style={styles.infoContainer}>
        <Text style={styles.title2} numberOfLines={2}>
          {movie.title}
        </Text>
        <Text style={styles.meta2}>
          {movie.rating} | {movie.language}
        </Text>
      </View>
    </View>
  );

  const PromoCardMovies = [
    {
      id: 1,
    },
    {
      id: 2,
    },
  ];

  const events = [
    {
      id: 1,
      title: 'The Thunderbolts',
      rating: 'UA 13+',
      genres: ['Sci-Fi'],
      image: require('../../assets/svg/EventImg').default,
    },
    {
      id: 2,
      title: 'The Thunderbolts',
      rating: 'UA 13+',
      genres: ['Sci-Fi'],
      image: require('../../assets/svg/EventImg').default,
    },
    {
      id: 3,
      title: 'The Thunderbolts',
      rating: 'UA 13+',
      genres: ['Sci-Fi'],
      image: require('../../assets/svg/EventImg').default,
    },
  ];

  const movies = [
    {
      id: 1,
      title: 'Avengers - Infinity War',
      rating: 4.8,
      reviews: 1222,
      image: 'https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
    },
    {
      id: 2,
      title: 'Black Panther',
      rating: 4.7,
      reviews: 985,
      image: 'https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg',
    },
    {
      id: 3,
      title: 'Spider-Man: No Way Home',
      rating: 4.9,
      reviews: 1543,
      image: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
    },
  ];

  const handleScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (CARD_WIDTH + CARD_SPACING));
    setCurrentIndex(index);
  };

  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      <View style={styles.statusBar}>
        <StatusBar barStyle="light-content" backgroundColor="#0F7754" />
      </View>

      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.locationContainer}>
            <View style={styles.locationIcon}>
              <LocationIcon />
            </View>
            <View style={{ marginTop: -2 }}>
              <Text style={styles.locationAddress}>245 Market Street</Text>
              <Text style={styles.locationCity}>San Francisco</Text>
            </View>
            <View style={styles.dropdownIcon}>
              <DownBlackIcon />
            </View>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <View style={styles.profileIcon}>
              <ProfileIcon />
            </View>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <View style={styles.searchIcon}>
              <SearchDashboardIcon />
            </View>
            <TextInput
              style={styles.searchInput}
              placeholder="Search for movies, events"
              placeholderTextColor="#999"
            />
          </View>
          {/* ── Filter button opens bottom sheet ── */}
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setFilterVisible(true)}
          >
            <FilterIcon />
          </TouchableOpacity>
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

        {/* Main Content – FOR YOU */}
        {selectedTab === 'FOR YOU' ? (
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {/* Blockbuster Release Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <LeftLine />
                <Text style={styles.sectionTitle}>BLOCKBUSTER RELEASE</Text>
                <RightLine />
              </View>
              {blockbusterMovies.map(movie => (
                <View key={movie.id} style={styles.movieCard}>
                  <Image
                    source={movie.image}
                    style={styles.moviePoster}
                    resizeMode="cover"
                  />
                  <TouchableOpacity style={styles.playButton}>
                    <View style={styles.playButtonInner}>
                      <Text style={styles.playIcon}>▶</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.movieDetails}>
                    <View style={styles.movieInfo}>
                      <Text style={styles.movieTitle}>{movie.title}</Text>
                      <Text style={styles.movieMeta}>
                        {movie.rating} | {movie.genres.join(', ')}
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.bookButton}>
                      <Text style={styles.bookButtonText}>Book Tickets</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>

            {/* In The Spotlight Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <LeftLine />
                <Text style={styles.sectionTitle}>IN THE SPOTLIGHT</Text>
                <RightLine />
              </View>
              {blockbusterMovies.map(movie => (
                <View key={movie.id} style={styles.movieCard}>
                  <Image
                    source={movie.image}
                    style={styles.moviePoster}
                    resizeMode="cover"
                  />
                  <TouchableOpacity style={styles.playButton} />
                  <View style={styles.movieDetails}>
                    <View style={styles.movieInfo}>
                      <Text
                        style={{
                          ...styles.movieTitle,
                          color: appColors.primary,
                        }}
                      >
                        {movie.title}
                      </Text>
                      <Text style={styles.movieMeta}>
                        {movie.rating} | {movie.genres.join(', ')}
                      </Text>
                      <Text
                        style={{
                          ...styles.movieMeta,
                          color: appColors.inputLine,
                        }}
                      >
                        Memorial Weekend
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <LeftLine />
                <Text style={styles.sectionTitle}>
                  HITS FROM PREVIOUS WEEKS
                </Text>
                <RightLine />
              </View>
              <View style={styles.header1}>
                <TouchableOpacity>
                  <Text style={styles.seeAllText}>See All</Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled={false}
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + CARD_SPACING}
                decelerationRate="fast"
                contentContainerStyle={styles.scrollViewContent}
                onScroll={handleScroll}
                scrollEventThrottle={16}
              >
                {movies.map((movie, index) => (
                  <TouchableOpacity
                    key={movie.id}
                    style={[
                      styles.movieCard1,
                      index === 0 && styles.firstCard,
                      index === movies.length - 1 && styles.lastCard,
                      { borderWidth: 0 },
                    ]}
                    activeOpacity={0.9}
                  >
                    <Image
                      source={{ uri: movie.image }}
                      style={styles.movieImage}
                      resizeMode="cover"
                    />
                    <View style={styles.movieInfo1}>
                      <Text style={styles.movieTitle1}>{movie.title}</Text>
                      <View style={styles.ratingContainer}>
                        <Text style={styles.starIcon}>⭐</Text>
                        <Text style={styles.ratingText}>
                          {movie.rating} ({movie.reviews})
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <View style={styles.paginationContainer}>
                {movies.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.dot,
                      index === currentIndex
                        ? styles.activeDot
                        : styles.inactiveDot,
                    ]}
                  />
                ))}
              </View>
            </View>

            {/* Top Events */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <LeftLine />
                <Text style={styles.sectionTitle}>TOP EVENTS</Text>
                <RightLine />
              </View>
              <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled={false}
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + CARD_SPACING}
                decelerationRate="fast"
                contentContainerStyle={styles.scrollViewContent}
                onScroll={handleScroll}
                scrollEventThrottle={16}
              >
                {movies.map((movie, index) => (
                  <TouchableOpacity
                    key={movie.id}
                    style={[
                      styles.movieCard1,
                      index === 0 && styles.firstCard,
                      index === movies.length - 1 && styles.lastCard,
                    ]}
                    activeOpacity={0.9}
                  >
                    <Image
                      source={{ uri: movie.image }}
                      style={styles.movieImage}
                      resizeMode="cover"
                    />
                    <View style={[styles.movieDetails, { borderRadius: 12 }]}>
                      <View style={styles.movieInfo}>
                        <Text
                          style={{
                            ...styles.movieTitle,
                            color: appColors.primary,
                          }}
                        >
                          18 July 2025, Evening Start
                        </Text>
                        <Text style={styles.movieMeta}>
                          Montego Bay, Jamaica
                        </Text>
                        <Text
                          style={{
                            ...styles.movieMeta,
                            color: appColors.inputLine,
                          }}
                        >
                          Catherine Hall
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <LeftLine />
                <Text style={styles.sectionTitle}>TOP EVENTS</Text>
                <RightLine />
              </View>
              <View style={styles.header1}>
                <TouchableOpacity>
                  <Text style={styles.seeAllText}>See All</Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled={false}
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + CARD_SPACING}
                decelerationRate="fast"
                contentContainerStyle={styles.scrollViewContent}
                onScroll={handleScroll}
                scrollEventThrottle={16}
              >
                {movies.map((movie, index) => (
                  <TouchableOpacity
                    key={movie.id}
                    style={[
                      styles.movieCard1,
                      index === 0 && styles.firstCard,
                      index === movies.length - 1 && styles.lastCard,
                    ]}
                    activeOpacity={0.9}
                  >
                    <Image
                      source={{ uri: movie.image }}
                      style={[styles.movieImage, { height: 250 }]}
                      resizeMode="cover"
                    />
                    <TouchableOpacity style={styles.playButton}>
                      <View style={styles.playButtonInner}>
                        <Text style={styles.playIcon}>▶</Text>
                      </View>
                    </TouchableOpacity>
                    <View style={[styles.movieDetails, { borderRadius: 12 }]}>
                      <View style={styles.movieInfo}>
                        <Text style={styles.movieTitle}>
                          Final Destination Bloodlines
                        </Text>
                        <Text style={styles.movieMeta}>
                          A | English +3 Releasing on 15 May 2025
                        </Text>
                      </View>
                      <TouchableOpacity style={styles.bookButton}>
                        <Text style={styles.bookButtonText}>Book Tickets</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </ScrollView>
        ) : null}

        {selectedTab === 'SPORTS' ? null : null}

        {/* Main Content – EVENTS */}
        {selectedTab === 'EVENTS' ? (
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <LeftLine />
                <Text style={styles.sectionTitle}>FEATURED EVENTS</Text>
                <RightLine />
              </View>
              <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled={false}
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + CARD_SPACING}
                decelerationRate="fast"
                contentContainerStyle={styles.scrollViewContent}
                onScroll={handleScroll}
                scrollEventThrottle={16}
              >
                {movies.map((movie, index) => (
                  <TouchableOpacity
                    key={movie.id}
                    style={[
                      styles.movieCard1,
                      index === 0 && styles.firstCard,
                      index === movies.length - 1 && styles.lastCard,
                      { borderWidth: 0 },
                    ]}
                    activeOpacity={0.9}
                  >
                    <Image
                      source={{ uri: movie.image }}
                      style={styles.movieImage}
                      resizeMode="cover"
                    />
                    <View style={styles.movieInfo1}>
                      <Text style={styles.movieTitle1}>{movie.title}</Text>
                      <View style={styles.ratingContainer}>
                        <Text style={styles.starIcon}>⭐</Text>
                        <Text style={styles.ratingText}>
                          {movie.rating} ({movie.reviews})
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <View style={styles.paginationContainer}>
                {movies.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.dot,
                      index === currentIndex
                        ? styles.activeDot
                        : styles.inactiveDot,
                    ]}
                  />
                ))}
              </View>
            </View>

            {/* All Events */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <LeftLine />
                <Text style={styles.sectionTitle}>ALL EVENTS</Text>
                <RightLine />
              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View style={styles.slideContainer}>
                  {/* Filters chip – opens bottom sheet */}

                  <TouchableOpacity
                    style={styles.slideBtn}
                    onPress={() => setFilterVisible(true)}
                  >
                    <FilterEventIcon />
                    <Text>Filters</Text>
                    <DownIcon />
                  </TouchableOpacity>

                  <View style={styles.slideBtn}>
                    <ArtIcon />
                    <Text>Art</Text>
                  </View>
                  <View style={styles.slideBtn}>
                    <MusicIcon />
                    <Text>Music</Text>
                  </View>
                  <View style={styles.slideBtn}>
                    <PopularEventIcon />
                    <Text>Popular Event</Text>
                  </View>
                </View>
              </ScrollView>

              {blockbusterMovies.map(movie => (
                <View key={movie.id} style={styles.movieCard}>
                  <Image
                    source={movie.image}
                    style={styles.moviePoster}
                    resizeMode="cover"
                  />
                  <TouchableOpacity style={styles.playButton}>
                    <View style={styles.playButtonInner}>
                      <Text style={styles.playIcon}>▶</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.movieDetails}>
                    <View style={styles.movieInfo}>
                      <Text style={styles.movieTitle}>{movie.title}</Text>
                      <Text style={styles.movieMeta}>
                        {movie.rating} | {movie.genres.join(', ')}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.bookButton}
                      onPress={() => navigation.navigate('EventDashboard')}
                    >
                      <Text style={styles.bookButtonText}>Book Tickets</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        ) : null}

        {selectedTab === 'MOVIES' ? (
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {/* Blockbuster Release Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <LeftLine />
                <Text style={styles.sectionTitle}>BLOCKBUSTER RELEASE</Text>
                <RightLine />
              </View>
              {blockbusterMovies.map(movie => (
                <View key={movie.id} style={styles.movieCard}>
                  <Image
                    source={movie.image}
                    style={styles.moviePoster}
                    resizeMode="cover"
                  />
                  <TouchableOpacity style={styles.playButton}>
                    <View style={styles.playButtonInner}>
                      <Text style={styles.playIcon}>▶</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.movieDetails}>
                    <View style={styles.movieInfo}>
                      <Text style={styles.movieTitle}>{movie.title}</Text>
                      <Text style={styles.movieMeta}>
                        {movie.rating} | {movie.genres.join(', ')}
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.bookButton}>
                      <Text style={styles.bookButtonText}>Book Tickets</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.screenMovies}>
              <View style={[styles.sectionHeader]}>
                <LeftLine />
                <Text style={styles.sectionTitle}>BLOCKBUSTER RELEASE</Text>
                <RightLine />
              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: 4,
                  paddingVertical: 4,
                }}
              >
                <View style={styles.rowMovies}>
                  {PromoCardMovies.map(movie => (
                    <PromoCard
                      key={movie.id}
                      onKnowMore={() => console.log('Know more pressed')}
                    />
                  ))}
                </View>
              </ScrollView>

              <View
                style={{
                  flexDirection: 'row',
                  gap: 15,
                  marginTop: 30,
                  marginBottom: 15,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate('TheatresNearMe')}
                  style={[
                    styles.slideBtn,
                    {
                      width: 'auto',
                      gap: 14,
                      paddingVertical: 16,
                      paddingHorizontal: 16,
                    },
                  ]}
                >
                  <Text style={{ fontWeight: '500' }}>
                    Theatres {'\n'}near me
                  </Text>
                  <TheatresNearMeIcon />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('UpcomingMovies')}
                  style={[
                    styles.slideBtn,
                    {
                      width: 'auto',
                      gap: 14,
                      paddingVertical: 16,
                      paddingHorizontal: 16,
                    },
                  ]}
                >
                  <Text style={{ fontWeight: '500' }}>
                    Upcoming
                    {'\n'}Movies
                  </Text>
                  <UpcomingMovieIcon />
                </TouchableOpacity>
              </View>

              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <LeftLine />
                  <Text style={styles.sectionTitle}>NOW SHOWING</Text>
                  <RightLine />
                </View>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  <View style={styles.slideContainer}>
                    {/* Filters chip – opens bottom sheet */}

                    <TouchableOpacity
                      style={styles.slideBtn}
                      onPress={() => setFilterVisible2(true)}
                    >
                      <FilterEventIcon />
                      <Text>Filters</Text>
                      <DownIcon />
                    </TouchableOpacity>

                    <View style={styles.slideBtn}>
                      <Text>Now Showing</Text>
                    </View>
                    <View style={styles.slideBtn}>
                      <Text>Trending</Text>
                    </View>
                    <View style={styles.slideBtn}>
                      <Text>Language</Text>
                    </View>
                  </View>
                </ScrollView>

                <FlatList
                  data={nowShowingMovies}
                  keyExtractor={item => String(item.id)}
                  numColumns={NUM_COLUMNS}
                  contentContainerStyle={styles.listContent}
                  columnWrapperStyle={styles.columnWrapper}
                  renderItem={({ item }) => <MovieCard movie={item} />}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>
          </ScrollView>
        ) : null}
      </SafeAreaView>

      {/* ── Filter Bottom Sheet (rendered outside SafeAreaView so it covers full screen) ── */}
      <FilterBottomSheet
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
      />

      <FilterBottomSheetMovies
        visible={filterVisible2}
        onClose={() => setFilterVisible2(false)}
      />
    </>
  );
};

const CARD_HEIGHT = 110;
const CARD_RADIUS = 16;
const RED = '#E31E24';
const RED_DARK = '#C01820';

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
    justifyContent: 'space-between',
    paddingBottom: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  locationIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  locationAddress: {
    fontSize: 14,
    fontWeight: '600',
    color: appColors.black,
  },
  locationCity: {
    fontSize: 12,
    color: '#666',
  },
  dropdownIcon: {
    marginLeft: 6,
    marginTop: 4,
    color: '#666',
  },
  profileButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ededed',
    borderRadius: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 12,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: appColors.black,
  },
  filterButton: {
    marginRight: 12,
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
  content: {
    flex: 1,
  },
  section: {
    paddingVertical: 20,
  },
  screenMovies: {
    marginVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: appColors.black,
    textAlign: 'center',
    marginHorizontal: 8,
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
  movieCard: {
    borderRadius: 12,
    backgroundColor: appColors.white,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: appColors.inputLine,
    overflow: 'hidden',
  },
  moviePoster: {
    width: '100%',
    height: 400,
  },
  playButton: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -30 }],
  },
  playButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    fontSize: 24,
    color: appColors.black,
    marginLeft: 4,
  },
  movieDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: appColors.white,
  },
  movieInfo: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: appColors.black,
    marginBottom: 4,
  },
  movieMeta: {
    fontSize: 12,
    color: '#666',
  },
  bookButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: appColors.black,
    backgroundColor: appColors.white,
  },
  bookButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: appColors.black,
  },
  header1: {
    paddingHorizontal: 20,
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 14,
    color: appColors.primary,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  scrollViewContent: {},
  movieCard1: {
    width: CARD_WIDTH,
    marginRight: CARD_SPACING,
    borderRadius: 12,
    backgroundColor: appColors.white,
    borderColor: appColors.inputLine,
    borderWidth: 1,
    overflow: 'visible',
  },
  firstCard: {},
  lastCard: {
    marginRight: CARD_SPACING,
  },
  movieImage: {
    width: '100%',
    height: 400,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
  },
  movieInfo1: {
    padding: 16,
    backgroundColor: appColors.white,
    alignItems: 'center',
  },
  movieTitle1: {
    fontSize: 16,
    fontWeight: '600',
    color: appColors.black,
    textAlign: 'center',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: appColors.primary,
  },
  inactiveDot: {
    width: 8,
    backgroundColor: '#D1D5DB',
  },

  rowMovies: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4, // ← shadow room on edges
    paddingVertical: 8,
  },

  /* ── Main card ── */
  wrapper: {
    width: SCREEN_WIDTH * 0.78, // ← fixed width instead of flex: 1
    marginRight: 12,
    shadowColor: RED_DARK,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  cardMovies: {
    borderRadius: CARD_RADIUS,
    backgroundColor: RED,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    paddingLeft: 16,
    paddingVertical: 12, // ← give it some vertical breathing room
    height: CARD_HEIGHT, // ← constrain height
  },
  // Decorative translucent circles for depth
  bubbleLarge: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.07)',
    top: -40,
    right: 40,
  },
  bubbleSmall: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.06)',
    bottom: -25,
    right: 90,
  },

  /* ── Text content ── */
  contentMovies: {
    flex: 1,
    justifyContent: 'center',
  },
  titleMovies: {
    fontSize: 11,
    lineHeight: 19,
    color: appColors.white,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  bold: {
    fontWeight: '700',
  },
  knowMore: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
    color: appColors.white,
    textDecorationLine: 'underline',
    textDecorationColor: 'rgba(255,255,255,0.7)',
    opacity: 0.9,
  },

  /* ── Drink image ── */
  imageContainerMovies: {
    width: 72,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 4,
  },
  imageMovies: {
    width: 100,
    height: 95,
    marginBottom: -4,
  },

  listContent: {
    rowGap: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    // rowGap: 10,
    // columnGap: 10,
  },

  // ── Card ─────────────────────────────────────────────
  cardMovie2: {
    width: CARD_WIDTH2,
    backgroundColor: appColors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: appColors.placeholder,
    overflow: 'hidden',
  },

  // ── Poster ───────────────────────────────────────────
  poster: {
    width: '100%',
    height: POSTER_HEIGHT,
    backgroundColor: '#D0D0D0',
  },

  // ── Info below poster ─────────────────────────────────
  infoContainer: {
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 10,
  },

  title2: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
    lineHeight: 18,
    marginBottom: 3,
  },

  meta2: {
    fontSize: 11,
    color: '#888888',
    fontWeight: '400',
  },
});

export default Dashboard;
