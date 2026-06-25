import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { appColors } from '../../utils/appColors';
import BackIcon from '../../assets/svg/BackIcon';
import DownloadIcon from '../../assets/svg/DownloadIcon';
import ScreenWayIcon from '../../assets/svg/ScreenWayIcon';

// ─── Config ──────────────────────────────────────────────────────────────────

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
const COLS = 12;
const AISLE_AFTER = [3, 8]; // aisle gap after col index 3 and 8

const OCCUPIED_SEATS = new Set([
  'A1',
  'A2',
  'A3',
  'A5',
  'A7',
  'A9',
  'A11',
  'B2',
  'B4',
  'B6',
  'B8',
  'B10',
  'C1',
  'C3',
  'C5',
  'C7',
  'D2',
  'D4',
  'D6',
  'D8',
  'D10',
  'D11',
  'E1',
  'E3',
  'E5',
  'E9',
  'E11',
  'F1',
  'F2',
  'F3',
  'F5',
  'F7',
  'F8',
  'G2',
  'G4',
  'G5',
  'G7',
  'G9',
  'G11',
  'H1',
  'H3',
  'H6',
  'H8',
  'H10',
  'I2',
  'I4',
  'I6',
  'I7',
  'I9',
  'I11',
  'K1',
  'K2',
  'K3',
  'K4',
  'K5',
  'K6',
  'K7',
  'K8',
  'L1',
  'L2',
  'L3',
  'L4',
  'L5',
  'L6',
  'L7',
  'L8',
  'L9',
  'L10',
  'L11',
  'L12',
]);

const MOVIE = {
  title: 'Jurassic World Rebirth',
  location: 'Yaad Screens, Montego Bay Mall',
  datetime: 'Sat, 18th Jul, 2025 | 03:00PM',
  date: 'Friday, 23rd June 2024',
};

// ─── Colors ───────────────────────────────────────────────────────────────────

const COLORS = {
  textDark: '#1a1a1a',
  textMid: '#444444',
  textLight: '#888888',
  border: '#e8e8e8',
  seatOccupiedBg: '#f0f0f0',
  seatOccupiedBorder: '#d8d8d8',
  seatAvailableBorder: '#cccccc',
  screenBg: '#f7f7f5',
};

// ─── Placeholder icon components (swap with your SVG icons) ──────────────────
const ShareUpArrow = () => (
  <View style={styles.shareIconBox}>
    {/* Replace with your <ShareIcon /> */}
    <Text style={{ fontSize: 16, color: COLORS.textDark }}>{'⬆'}</Text>
  </View>
);

const JWBadge = () => (
  // Replace with your actual Jurassic World logo: <JWLogo width={28} height={28} />
  <View style={styles.jwBadge}>
    <Text style={styles.jwBadgeText}>JW</Text>
  </View>
);

// ─── Screen Arc (pure RN — no SVG dependency) ─────────────────────────────────

const ScreenArc = () => (
  <View style={styles.arcClip}>
    <View style={styles.arcCircle} />
  </View>
);

// ─── Single Seat ─────────────────────────────────────────────────────────────

const Seat = React.memo(({ id, status, onPress }) => {
  const isOccupied = status === 'occupied';
  const isSelected = status === 'selected';

  return (
    <TouchableOpacity
      onPress={() => !isOccupied && onPress(id)}
      activeOpacity={isOccupied ? 1 : 0.65}
      style={[
        styles.seat,
        isOccupied && styles.seatOccupied,
        isSelected && styles.seatSelected,
      ]}
    >
      {isOccupied ? (
        <Text style={styles.seatX}>×</Text>
      ) : (
        <Text style={[styles.seatId, isSelected && styles.seatIdSelected]}>
          {id}
        </Text>
      )}
    </TouchableOpacity>
  );
});

// ─── Main Screen ─────────────────────────────────────────────────────────────

const SeatBooking = ({ navigation }) => {
  const [selectedSeats, setSelectedSeats] = useState(new Set(['J10', 'J11']));

  const toggleSeat = useCallback(id => {
    setSelectedSeats(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const getSeatStatus = useCallback(
    id => {
      if (OCCUPIED_SEATS.has(id)) return 'occupied';
      if (selectedSeats.has(id)) return 'selected';
      return 'available';
    },
    [selectedSeats],
  );

  const sortedSelected = [...selectedSeats].sort().join(', ') || '—';

  return (
    <>
      <View style={styles.statusBar}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={appColors.primary}
        />
      </View>
      <SafeAreaView style={styles.safe}>
        {/* ── Header ── */}
        <View style={styles.header}>
          {/* Back button */}
          <TouchableOpacity
            onPress={() => navigation?.goBack()}
            // hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <BackIcon />
          </TouchableOpacity>

          {/* Logo + Title */}
          <View style={styles.headerCenter}>
            <View style={styles.headerTitleBlock}>
              <Text style={styles.movieTitle} numberOfLines={1}>
                {MOVIE.title}
              </Text>
              <Text style={styles.movieSub} numberOfLines={1}>
                {MOVIE.location}
              </Text>
            </View>
          </View>

          {/* Share button */}
          <TouchableOpacity style={styles.shareBtn}>
            {/* Replace with: <ShareIcon width={22} height={22} /> */}
            <DownloadIcon height={16} />
            <Text style={styles.shareLabel}>Share seat{'\n'}map</Text>
          </TouchableOpacity>
        </View>

        {/* ── Date / Time ── */}
        <View style={styles.dateRow}>
          <Text style={styles.dateText}>{MOVIE.datetime}</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          {/* ── Screen area ── */}
          <View style={styles.screenArea}>
            <ScreenWayIcon />
            {/* <Text style={styles.screenLabel}>Screen this way</Text>
            <ScreenArc /> */}
          </View>

          {/* ── Seat Grid ── */}
          <View style={styles.gridWrapper}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.gridScroll}
            >
              <View>
                {ROWS.map(row => (
                  <View key={row} style={styles.seatRow}>
                    {Array.from({ length: COLS }, (_, i) => i + 1).map(col => (
                      <React.Fragment key={col}>
                        {AISLE_AFTER.includes(col - 1) && (
                          <View style={styles.aisle} />
                        )}
                        <Seat
                          id={`${row}${col}`}
                          status={getSeatStatus(`${row}${col}`)}
                          onPress={toggleSeat}
                        />
                      </React.Fragment>
                    ))}
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* ── Legend ── */}
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendSeat, styles.legendAvailable]} />
              <Text style={styles.legendText}>Available</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendSeat, styles.legendOccupied]}>
                <Text style={styles.legendX}>×</Text>
              </View>
              <Text style={styles.legendText}>Occupied</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendSeat, styles.legendSelected]} />
              <Text style={styles.legendText}>Selected</Text>
            </View>
          </View>

          {/* ── Summary ── */}
          <View style={styles.summary}>
            <Text style={styles.summaryHeading}>Summary</Text>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Date</Text>
              <Text style={styles.summaryValue}>{MOVIE.date}</Text>
            </View>

            <View style={styles.summaryDivider} />

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Seats Selected</Text>
              <Text style={styles.summaryValue}>{sortedSelected}</Text>
            </View>

            <View style={styles.summaryDivider} />

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Location</Text>
              <Text
                style={[
                  styles.summaryValue,
                  { maxWidth: 190, textAlign: 'right' },
                ]}
              >
                {MOVIE.location}
              </Text>
            </View>
          </View>

          <View style={{ height: 24 }} />
        </ScrollView>

        {/* ── Continue Button ── */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.continueBtn}
            activeOpacity={0.85}
            onPress={() => {
              /* navigation.navigate('Payment', { seats: sortedSelected }) */
            }}
          >
            <Text style={styles.continueBtnText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const SEAT_SIZE = 26;
const SEAT_GAP = 5;

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 6,
  },
  backBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#f3f3f3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 10,
  },
  jwBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#c8102e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  jwBadgeText: {
    color: appColors.white,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  headerTitleBlock: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textDark,
    letterSpacing: -0.2,
  },
  movieSub: {
    fontSize: 10.5,
    color: appColors.black,
    marginTop: 1,
  },
  shareBtn: {
    alignItems: 'center',
    gap: 3,
  },
  shareIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#f3f3f3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareLabel: {
    fontSize: 8.5,
    color: appColors.black,
    textAlign: 'center',
    lineHeight: 12,
  },

  // ── Date row ──
  dateRow: {
    alignItems: 'flex-end',
    paddingVertical: 9,

    paddingHorizontal: 16,
  },
  dateText: {
    fontSize: 12.5,
    color: COLORS.textMid,
    fontWeight: '500',
    textAlign: 'right',
  },

  // ── Scroll ──
  scroll: {
    paddingBottom: 8,
  },

  // ── Screen area ──
  screenArea: {
    alignItems: 'center',
    paddingTop: 18,
    marginBottom: 10,
  },
  moviePoster: {
    width: '100%',
    height: 200,
  },
  screenLabel: {
    fontSize: 11.5,
    color: appColors.black,
    letterSpacing: 0.4,
    marginBottom: 10,
  },
  arcClip: {
    height: 22,
    width: 260,
    overflow: 'hidden',
  },
  arcCircle: {
    width: 260,
    height: 260,
    borderRadius: 130,
    borderWidth: 2.5,
    borderColor: appColors.primary,
    ...Platform.select({
      ios: {
        shadowColor: appColors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
    }),
  },

  // ── Seat Grid ──
  gridWrapper: {
    backgroundColor: COLORS.screenBg,
    paddingBottom: 14,
  },
  gridScroll: {
    paddingHorizontal: 14,
  },
  seatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SEAT_GAP,
    marginBottom: SEAT_GAP,
  },
  aisle: {
    width: 10,
  },
  seat: {
    width: SEAT_SIZE,
    height: SEAT_SIZE - 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: appColors.black,
    backgroundColor: appColors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seatOccupied: {
    backgroundColor: COLORS.seatOccupiedBg,
    borderColor: COLORS.seatOccupiedBorder,
  },
  seatSelected: {
    backgroundColor: appColors.primary,
    borderColor: appColors.primary,
  },
  seatX: {
    fontSize: 14,
    color: '#bbbbbb',
    lineHeight: 16,
    fontWeight: '300',
  },
  seatId: {
    fontSize: 6,
    color: appColors.black,
    fontWeight: '600',
    textAlign: 'center',
  },
  seatIdSelected: {
    color: appColors.white,
  },

  // ── Legend ──
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 22,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  legendSeat: {
    width: 16,
    height: 14,
    borderRadius: 3,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendAvailable: {
    backgroundColor: appColors.white,
    borderColor: COLORS.seatAvailableBorder,
  },
  legendOccupied: {
    backgroundColor: COLORS.seatOccupiedBg,
    borderColor: COLORS.seatOccupiedBorder,
  },
  legendX: {
    fontSize: 11,
    color: '#bbbbbb',
    lineHeight: 13,
    fontWeight: '300',
  },
  legendSelected: {
    backgroundColor: appColors.primary,
    borderColor: appColors.primary,
  },
  legendText: {
    fontSize: 11,
    color: appColors.black,
  },

  // ── Summary ──
  summary: {
    marginHorizontal: 16,
    marginTop: 4,
  },
  summaryHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 11,
  },
  summaryDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.border,
  },
  summaryLabel: {
    fontSize: 13,
    color: appColors.black,
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textDark,
  },

  // ── Footer ──
  footer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 10 : 18,
    backgroundColor: appColors.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.border,
  },
  continueBtn: {
    backgroundColor: appColors.black,
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueBtnText: {
    color: appColors.white,
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
});

export default SeatBooking;
