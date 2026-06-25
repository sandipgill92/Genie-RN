import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Animated,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { appColors } from '../../utils/appColors';
import UpcomingMovieIcon from '../../assets/svg/UpcomingMovieIcon';
import LeftLine from '../../assets/svg/LeftLine';
import RightLine from '../../assets/svg/RightLine';
import FilterEventIcon from '../../assets/svg/FilterEventIcon';
import DownIcon from '../../assets/svg/DownIcon';

const { width, height } = Dimensions.get('window');

const CARD_MARGIN2 = 8;
const NUM_COLUMNS = 2;
const CARD_WIDTH2 = (width - CARD_MARGIN2 * 6) / NUM_COLUMNS;
const POSTER_HEIGHT = CARD_WIDTH2 * 1.3; // ~cinema aspect ra

const MOVIES_OPTIONS = ['2D', '4DX3D', '3D', '4DX-2D'];

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

const UpcomingMovies = ({ navigation }) => {
  const [filterVisible2, setFilterVisible2] = useState(false);

  return (
    <>
      <View style={styles.statusBar}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={appColors.primary}
        />
      </View>
      <SafeAreaView style={styles.safe}>
        {/* ── Header with background image ── */}
        <ImageBackground
          source={require('../../assets/img/Layer_1.png')}
          style={styles.headerBg}
          resizeMode="cover"
          // For a local asset use: source={require('../../assets/images/theatres_header_bg.png')}
        >
          {/* Dark-green overlay so text stays readable */}
          <View style={styles.headerOverlay}>
            <Text style={styles.headerTitle}>Upcoming {'\n'}Movies</Text>
            <View>
              <UpcomingMovieIcon width={120} height={120} />
            </View>
          </View>
        </ImageBackground>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <View style={[styles.sectionHeader, { marginBottom: 24 }]}>
              <LeftLine />
              <Text style={styles.sectionTitle}>COMING SOON</Text>
              <RightLine />
            </View>

            <View style={styles.movieCard}>
              <Image
                source={require('../../assets/svg/EventImg').default}
                style={styles.moviePoster}
                resizeMode="cover"
              />

              <View style={styles.movieDetails}>
                <View style={styles.movieInfo}>
                  <Text style={styles.movieTitle}>
                    The Conjuring{'\n'} Last Rites
                  </Text>
                  <Text style={styles.movieMeta}>UA 16+ | English</Text>
                  <Text style={[styles.movieMeta, { fontSize: 11 }]}>
                    Release: September 5, 2025
                  </Text>
                </View>
                <TouchableOpacity style={styles.bookButton}>
                  <Text style={styles.bookButtonText}>Reminder</Text>
                </TouchableOpacity>
              </View>
            </View>

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
                  <Text>This Month</Text>
                </View>
                <View style={styles.slideBtn}>
                  <Text>Next Month</Text>
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
        </ScrollView>
      </SafeAreaView>

      <FilterBottomSheetMovies
        visible={filterVisible2}
        onClose={() => setFilterVisible2(false)}
      />
    </>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: appColors.primary,
    height: StatusBar.currentHeight,
  },
  safe: {
    flex: 1,
    backgroundColor: appColors.white,
  },

  // ── Header ──
  headerBg: {
    width: '100%',
    // Fixed height keeps the image banner compact; adjust to taste
    height: 200,
    justifyContent: 'center',
  },
  headerOverlay: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    // Semi-transparent green overlay — mirrors the screenshot's tint
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: appColors.black,
  },
  section: {
    paddingVertical: 20,
    paddingHorizontal: 16,
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
    paddingHorizontal: 16,
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

  movieCard: {
    borderRadius: 12,
    backgroundColor: appColors.white,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: appColors.inputLine,
    overflow: 'hidden',
    marginBottom: 40,
  },
  moviePoster: {
    width: '100%',
  },
  movieDetails: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: appColors.white,
  },
  movieInfo: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: appColors.black,
    marginBottom: 4,
  },
  movieMeta: {
    fontSize: 12,
    color: appColors.black,
  },
  bookButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: appColors.placeholder,
    backgroundColor: appColors.white,
  },
  bookButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: appColors.black,
  },
});

export default UpcomingMovies;
