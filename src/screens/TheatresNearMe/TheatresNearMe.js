import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { appColors } from '../../utils/appColors';
import TheatresNearMeIcon from '../../assets/svg/TheatresNearMeIcon';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOVIES = [
  {
    id: 'm1',
    title: 'F1 The Movie',
    poster: 'https://image.tmdb.org/t/p/w500/f45sMVdSKRyGnTDuoFOCrjHdGEL.jpg',
    genre: 'Action',
    rating: 'UA',
  },
  {
    id: 'm2',
    title: 'Jurassic World Rebirth',
    poster: 'https://image.tmdb.org/t/p/w500/k3fCMpyFYNsLSMdEnVTKIqLZTjW.jpg',
    genre: 'Adventure',
    rating: 'UA',
  },
  {
    id: 'm3',
    title: 'Mission Impossible 8',
    poster: 'https://image.tmdb.org/t/p/w500/z53D72EAOxGRqdr7KXXWp9dJiDe.jpg',
    genre: 'Thriller',
    rating: 'UA',
  },
  {
    id: 'm4',
    title: 'Avengers: Doomsday',
    poster: 'https://image.tmdb.org/t/p/w500/z53D72EAOxGRqdr7KXXWp9dJiDe.jpg',
    genre: 'Action',
    rating: 'UA',
  },
];

const SHOWTIMES = ['10:00 AM', '1:00 PM', '4:15 PM', '7:30 PM', '10:45 PM'];

const THEATRES = [
  {
    id: 't1',
    initial: 'Y',
    name: 'Yaad Screens, Montage Bay Mall',
    location: 'Montage Bay Mall',
    tags: [
      'Instant Booking',
      'Mobile Ticket',
      'Recliner Seats',
      'Premium Food',
    ],
    movies: MOVIES,
    showtimes: SHOWTIMES,
  },
  {
    id: 't2',
    initial: 'P',
    name: 'PVR Cinemas, City Centre',
    location: 'City Centre Mall',
    tags: [
      'Cancellations Available',
      'Mobile Tickets',
      'Food & Gifts',
      'Parking',
    ],
    movies: [...MOVIES].reverse(),
    showtimes: ['11:00 AM', '2:30 PM', '5:45 PM', '9:00 PM'],
  },
  {
    id: 't3',
    initial: 'I',
    name: 'INOX, Treasure Island',
    location: 'Treasure Island Mall',
    tags: [
      'Instant Booking',
      'Mobile Ticket',
      'Recliner Seats',
      'Premium Food',
    ],
    movies: MOVIES,
    showtimes: ['9:30 AM', '12:45 PM', '3:50 PM', '7:00 PM', '10:15 PM'],
  },
];

// ─── Subcomponents ────────────────────────────────────────────────────────────

function MovieCard({ movie, navigation, onPress }) {
  return (
    <TouchableOpacity
      style={styles.movieCard}
      activeOpacity={0.85}
      onPress={onPress}
    >
      {/* Poster */}
      <Image
        source={{ uri: movie.poster }}
        style={styles.moviePoster}
        resizeMode="cover"
      />

      {/* Info */}
      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle} numberOfLines={1}>
          {movie.title}
        </Text>
        <Text style={styles.movieGenre}>{movie.genre}</Text>
      </View>
    </TouchableOpacity>
  );
}

function TheatreSection({ theatre, navigation }) {
  return (
    <View style={styles.theatreSection}>
      {/* Theatre header */}
      <View style={styles.theatreHeader}>
        <Image source={require('../../assets/img/Mask group.png')} />

        <View style={styles.theatreInfo}>
          <Text style={styles.theatreName} numberOfLines={1}>
            {theatre.name}
          </Text>
          <Text style={styles.theatreLocation}>{theatre.location}</Text>
          <Text
            style={[
              styles.theatreLocation,
              { color: appColors.black, fontSize: 13 },
            ]}
          >
            Instant Booking, Mobile Ticket, Recliner Seats, Premium Food
          </Text>
        </View>
      </View>

      {/* Movie Cards */}
      <FlatList
        data={theatre.movies}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.moviesList}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            showtimes={theatre.showtimes}
            onPress={() => navigation.navigate('MainMovieScreen')}
          />
        )}
      />
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

const TheatresNearMe = ({ navigation }) => {
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
            <Text style={styles.headerTitle}>Theatres near me</Text>
            <View>
              <TheatresNearMeIcon width={120} height={120} />
            </View>
          </View>
        </ImageBackground>

        {/* Theatre list */}
        <FlatList
          data={THEATRES}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => (
            <View style={styles.sectionSeparator} />
          )}
          renderItem={({ item }) => (
            <TheatreSection theatre={item} navigation={navigation} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const ORANGE = '#E8421A';
const LIGHT_ORANGE = '#FFF0EC';
const DARK = '#1A1A1A';
const MUTED = '#888';
const CARD_BG = '#FFFFFF';
const BORDER = '#ECECEC';

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

  // ── List ──
  listContent: {
    paddingBottom: 24,
  },
  sectionSeparator: {
    height: 8,
    backgroundColor: appColors.white,
  },

  // ── Theatre section ──
  theatreSection: {
    backgroundColor: CARD_BG,
    paddingTop: 14,
  },
  theatreHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    marginBottom: 24,
    gap: 10,
  },
  theatreInitialBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: ORANGE,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    shadowColor: ORANGE,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  theatreInitial: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  theatreInfo: {
    flex: 1,
  },
  theatreName: {
    fontSize: 14,
    fontWeight: '700',
    color: DARK,
    letterSpacing: -0.1,
  },
  theatreLocation: {
    fontSize: 12,
    color: MUTED,
    marginTop: 1,
  },

  // ── Tags ──
  tagsRow: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    gap: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tag: {
    backgroundColor: LIGHT_ORANGE,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#FDDDD4',
  },
  tagText: {
    fontSize: 11,
    color: ORANGE,
    fontWeight: '600',
  },

  divider: {
    height: 1,
    backgroundColor: BORDER,
    marginHorizontal: 16,
    marginBottom: 12,
  },

  // ── Movie cards ──
  moviesList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  movieCard: {
    width: 160,
    backgroundColor: CARD_BG,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    borderWidth: 1,
    borderColor: BORDER,
  },
  moviePoster: {
    width: '100%',
    height: 210,
    backgroundColor: '#DDD',
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  ratingText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
  },
  movieInfo: {
    padding: 10,
  },
  movieTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: DARK,
    marginBottom: 2,
  },
  movieGenre: {
    fontSize: 11,
    color: MUTED,
    marginBottom: 8,
  },
  showtimesRow: {
    gap: 5,
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  showtimePill: {
    borderWidth: 1,
    borderColor: ORANGE,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  showtimeText: {
    fontSize: 10,
    color: ORANGE,
    fontWeight: '600',
  },
});

export default TheatresNearMe;
