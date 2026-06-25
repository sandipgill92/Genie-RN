import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  FlatList,
  ImageBackground,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MovieFrameIcon from '../../assets/svg/MovieFrameIcon';
import { appColors } from '../../utils/appColors';
import BackIcon from '../../assets/svg/BackIcon';
import CameraGreenIcon from '../../assets/svg/CameraGreenIcon';
import DownloadIcon from '../../assets/svg/DownloadIcon';
import FireIcon from '../../assets/svg/FireIcon';
import AdventureIcon from '../../assets/svg/AdventureIcon';
import SciFiIcon from '../../assets/svg/SciFiIcon';
import ThrillerIcon from '../../assets/svg/ThrillerIcon';
import UserIcon from '../../assets/svg/UserIcon';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOVIE = {
  title: 'Jurassic World',
  subtitle: 'REBIRTH',
  genre: 'Adventure',
  duration: '2hr 13 min',
  rating: 4.5,
  synopsis:
    'Set four years after the destruction of Isla Nublar, dinosaurs now live—and hunt—alongside humans all over the world. This fragile balance will reshape the future and determine, once and for all, whether human This fragile balance will reshap the future and determine.',
  genres: [
    { icon: <FireIcon />, label: 'Action' },
    { icon: <AdventureIcon />, label: 'Adventure' },

    { icon: <SciFiIcon />, label: 'Sci-Fi' },

    { icon: <ThrillerIcon />, label: 'Thriller' },
  ],
  cast: [
    { id: '1', name: 'Scarlett\nJohansson', initials: 'SJ', color: '#E8A87C' },
    { id: '2', name: 'Jonathan\nBailey', initials: 'JB', color: '#7CB9E8' },
    { id: '3', name: 'Rupert\nFriend', initials: 'RF', color: '#90EE90' },
  ],
  reviews: [
    {
      id: '1',
      type: 'Trav-9897',
      title: 'Just more of the same',
      text: 'I wish I could take a previous review for a Jurassic park clone and insert it here to get across the effort the studio is putting... ',
    },
    {
      id: '2',
      type: 'Trav-9897',
      title: 'Just more of the same',
      text: 'I wish I could take a previous review for a Jurassic park clone and insert it here to get across the effort the studio is putting... ',
    },
  ],
  videos: [
    {
      id: '1',
      label:
        'JURASSIC WORLD:REBIRTH | Official English TRailer 1 (Universal Studio) -HD',
    },
  ],
  posters: [
    { id: '1', color: '#1a1a2e' },
    { id: '2', color: '#16213e' },
  ],
};

const TABS = [
  'Synopsis',
  'Cast',
  'Rating & Reviews',
  'Videos',
  'Poster & Wallpaper',
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const CastCard = ({ item }) => (
  <View style={styles.castCard}>
    <View>
      <UserIcon />
    </View>
    <Text style={styles.castName}>{item.name}</Text>
  </View>
);

const ReviewCard = ({ item }) => (
  <View style={styles.reviewCard}>
    <Text style={styles.reviewType}>⭐⭐⭐ {item.type}</Text>
    <Text style={styles.reviewTitle}>{item.title}</Text>
    <Text style={styles.reviewText}>{item.text}</Text>
  </View>
);

const VideoCard = ({ item }) => (
  <View style={styles.videoCard}>
    {/* Thumbnail placeholder */}
    <ImageBackground
      style={styles.videoThumb}
      imageStyle={{ borderRadius: 12 }}
      source={require('../../assets/svg/MovieFrameIcon')}
    >
      <View style={styles.playOverlay}>
        <View style={styles.playButton}>
          <Text style={styles.playIcon}>▶</Text>
        </View>
      </View>
      {/* Jurassic World logo placeholder */}
      {/* <View style={styles.videoLogo}>
        <Text style={styles.videoLogoText}>JURASSIC{'\n'}WORLD</Text>
      </View> */}
    </ImageBackground>
    <Text style={styles.videoLabel} numberOfLines={2}>
      {item.label}
    </Text>
  </View>
);

const PosterCard = ({ item }) => (
  <View style={styles.posterCard}>
    <MovieFrameIcon height="200" />
  </View>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────
const MainMovieScreenOption = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Synopsis');
  const scrollViewRef = useRef(null);
  const tabScrollRef = useRef(null);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Synopsis':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Synopsis</Text>
            <Text style={styles.synopsisText}>{MOVIE.synopsis}</Text>
            <View style={styles.chipRow}>
              {MOVIE.genres.map(g => (
                <View style={styles.chip}>
                  {g.icon}
                  <Text style={styles.chipText}>{g.label}</Text>
                </View>
              ))}
            </View>
          </View>
        );
      case 'Cast':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Casts</Text>
            <FlatList
              data={MOVIE.cast}
              keyExtractor={i => i.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => <CastCard item={item} />}
              contentContainerStyle={{ gap: 20 }}
            />
          </View>
        );
      case 'Rating & Reviews':
        return (
          <View style={styles.section}>
            <View style={styles.ratingHeader}>
              <Text style={styles.sectionTitle}>Rating & Reviews</Text>
            </View>
            <View style={styles.ratingRow}>
              <Text style={styles.bigRating}>⭐ {MOVIE.rating}</Text>
            </View>
            <FlatList
              data={MOVIE.reviews}
              keyExtractor={i => i.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => <ReviewCard item={item} />}
              contentContainerStyle={{ gap: 12 }}
            />
          </View>
        );
      case 'Videos':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Videos</Text>
            {MOVIE.videos.map(v => (
              <VideoCard key={v.id} item={v} />
            ))}
          </View>
        );
      case 'Poster & Wallpaper':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Poster & Wallpaper</Text>
            <FlatList
              data={MOVIE.posters}
              keyExtractor={i => i.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => <PosterCard item={item} />}
              contentContainerStyle={{ gap: 12 }}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <View style={styles.statusBar}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={appColors.primary}
        />
      </View>
      <SafeAreaView style={styles.safe} edges={['bottom', 'left', 'right']}>
        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <BackIcon />
          </TouchableOpacity>
          <TouchableOpacity>
            <DownloadIcon />
          </TouchableOpacity>
        </View>
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* ── Hero Row ── */}
          <View style={styles.heroRow}>
            {/* Poster */}
            <View style={styles.posterWrapper}>
              <MovieFrameIcon />
            </View>

            {/* Info cards */}
            <View style={styles.infoCards}>
              <View style={styles.infoCard}>
                <CameraGreenIcon />
                <Text style={styles.infoLabel}>Genre</Text>
                <Text style={styles.infoValue}>{MOVIE.genre}</Text>
              </View>
              <View style={styles.infoCard}>
                <Text style={styles.infoIcon}>🕐</Text>
                <Text style={styles.infoLabel}>Duration</Text>
                <Text style={styles.infoValue}>{MOVIE.duration}</Text>
              </View>
              <View style={styles.infoCard}>
                <Text style={styles.infoIcon}>⭐</Text>
                <Text style={styles.infoLabel}>Rating</Text>
                <Text style={styles.infoValue}>{MOVIE.rating}\5</Text>
              </View>
            </View>
          </View>

          {/* ── Tab Bar ── */}
          <ScrollView
            ref={tabScrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabContainer}
          >
            {TABS.map(tab => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* ── Tab Content ── */}
          {renderTabContent()}

          {/* ── Casts (always shown below Synopsis) ── */}
          {activeTab === 'Synopsis' && (
            <>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Casts</Text>
                <FlatList
                  data={MOVIE.cast}
                  keyExtractor={i => i.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => <CastCard item={item} />}
                  contentContainerStyle={{ gap: 20 }}
                />
              </View>

              <View style={styles.section}>
                <View style={styles.ratingRow}>
                  <Text style={styles.sectionTitle}>Rating & Reviews</Text>
                </View>
                <Text style={styles.bigRating}>⭐ {MOVIE.rating}</Text>
                <FlatList
                  data={MOVIE.reviews}
                  keyExtractor={i => i.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => <ReviewCard item={item} />}
                  contentContainerStyle={{ gap: 12 }}
                />
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Videos</Text>
                {MOVIE.videos.map(v => (
                  <VideoCard key={v.id} item={v} />
                ))}
                {/* Pagination dots */}
                {/* <View style={styles.dotsRow}>
                  <View style={[styles.dot, styles.dotActive]} />
                  <View style={styles.dot} />
                </View> */}
              </View>

              <View style={[styles.section, { paddingBottom: 40 }]}>
                <Text style={styles.sectionTitle}>Poster & Wallpaper</Text>
                <FlatList
                  data={MOVIE.posters}
                  keyExtractor={i => i.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => <PosterCard item={item} />}
                  contentContainerStyle={{ gap: 12 }}
                />
              </View>
            </>
          )}

          {/* {activeTab !== 'Synopsis' && <View style={{ height: 40 }} />} */}
        </ScrollView>
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

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  // Hero
  heroRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 10,
    gap: 16,
    alignItems: 'flex-start',
  },
  posterWrapper: {
    width: SCREEN_WIDTH * 0.5,
  },
  posterImage: {
    width: '100%',
    aspectRatio: 0.7,
    justifyContent: 'flex-end',
  },
  posterOverlay: {
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  posterTitleSmall: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 2,
  },
  posterTitleLarge: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1,
  },
  posterTitleSub: {
    color: '#E8C547',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 3,
  },
  infoCards: {
    flex: 1,
    justifyContent: 'center',
    gap: 12,
  },
  infoCard: {
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#EBEBF0',
    alignItems: 'center',
  },
  infoIcon: {
    fontSize: 18,
    marginBottom: 2,
  },
  infoLabel: {
    fontSize: 11,
    color: '#9A9A9A',
    fontWeight: '500',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 13,
    color: '#1A1A1A',
    fontWeight: '500',
  },

  // Tabs
  tabContainer: {
    paddingHorizontal: 16,
    gap: 0,
  },
  tab: {
    paddingTop: 10,
    // paddingHorizontal: 14,
    marginRight: 24,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: appColors.primary,
  },
  tabText: {
    fontSize: 13,
    color: appColors.black,
    fontWeight: '40',
  },
  activeTabText: {
    color: appColors.black,
    fontWeight: '700',
  },

  // Sections
  section: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: appColors.black,
    marginBottom: 10,
    letterSpacing: -0.3,
  },

  // Synopsis
  synopsisText: {
    fontSize: 13,
    lineHeight: 20,
    color: appColors.black,
    marginBottom: 14,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
    justifyContent: 'space-between',
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#ebeaea',
    flexDirection: 'row',
    gap: 4,
  },
  chipText: {
    fontSize: 12,
    color: '#444',
    fontWeight: '400',
  },

  // Cast
  castCard: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  castAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },

  castName: {
    fontSize: 11,
    color: appColors.black,
    fontWeight: '400',
    lineHeight: 15,
  },

  // Rating
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bigRating: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 14,
  },
  reviewCard: {
    width: SCREEN_WIDTH * 0.6,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: appColors.placeholder,
    gap: 10,
  },
  reviewType: {
    fontSize: 9,
    color: '#878787',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  reviewTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: appColors.black,
  },
  reviewText: {
    fontSize: 11.5,
    color: appColors.black,
    lineHeight: 17,
  },

  // Video
  videoCard: {
    marginBottom: 12,
  },
  videoThumb: {
    width: '100%',
    height: 190,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: 20,
    color: '#1A1A1A',
    marginLeft: 4,
  },
  videoLogo: {
    position: 'absolute',
    bottom: 14,
    left: 14,
  },
  videoLogoText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 2,
    lineHeight: 20,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  videoLabel: {
    marginTop: 8,
    fontSize: 12.5,
    color: '#333',
    fontWeight: '600',
    lineHeight: 17,
  },

  // Dots
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 12,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#D0D0D0',
  },
  dotActive: {
    backgroundColor: '#3366FF',
    width: 20,
  },

  // Poster
  posterCard: {
    width: SCREEN_WIDTH * 0.38,
    borderRadius: 14,
  },
});

export default MainMovieScreenOption;
