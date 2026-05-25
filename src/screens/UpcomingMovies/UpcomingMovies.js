import React from 'react';
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
} from 'react-native';
import { appColors } from '../../utils/appColors';
import UpcomingMovieIcon from '../../assets/svg/UpcomingMovieIcon';
import LeftLine from '../../assets/svg/LeftLine';
import RightLine from '../../assets/svg/RightLine';
import FilterEventIcon from '../../assets/svg/FilterEventIcon';
import DownIcon from '../../assets/svg/DownIcon';

const { width } = Dimensions.get('window');

const CARD_MARGIN2 = 8;
const NUM_COLUMNS = 2;
const CARD_WIDTH2 = (width - CARD_MARGIN2 * 6) / NUM_COLUMNS;
const POSTER_HEIGHT = CARD_WIDTH2 * 1.3; // ~cinema aspect ra

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

const UpcomingMovies = ({ navigation }) => {
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

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <LeftLine />
            <Text style={styles.sectionTitle}>NOW SHOWING</Text>
            <RightLine />
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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
      </SafeAreaView>
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

export default UpcomingMovies;
