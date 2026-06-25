import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from 'react-native';
import Svg, { Path, Circle, Line, Text as SvgText } from 'react-native-svg';
import SettingIcon from '../../assets/svg/SettingIcon';
import BackIcon from '../../assets/svg/BackIcon';

const { width } = Dimensions.get('window');

const SEAT_CATEGORIES = [
  {
    id: 'golden',
    label: 'Golden VIP',
    subtitle: 'Best View & Amenities',
    price: 'JMD $3,500',
    color: '#C9A227',
  },
  {
    id: 'silver',
    label: 'Silver VIP',
    subtitle: 'Comfort & Proximity',
    price: 'JMD $2,000',
    color: '#A8A8A8',
  },
  {
    id: 'platinum',
    label: 'Platinum VIP',
    subtitle: 'Premium Front Row',
    price: 'JMD $5,000',
    color: '#1A5C3A',
  },
  {
    id: 'standard',
    label: 'Standard',
    subtitle: 'General Access',
    price: 'JMD $1,000',
    color: '#7B4F2E',
  },
];

// ─── Donut Chart ──────────────────────────────────────────────────────────────
const DonutChart = () => {
  // Fixed SVG canvas: 360x340, donut centered at (180, 170)
  const VW = 360;
  const VH = 340;
  const cx = 180;
  const cy = 165;
  const outerR = 100;
  const innerR = 62;

  const rad = deg => (deg * Math.PI) / 180;
  const px = (r, deg) => cx + r * Math.cos(rad(deg));
  const py = (r, deg) => cy + r * Math.sin(rad(deg));

  // Segment: start/end in degrees (0 = right, -90 = top)
  // Total 360, gaps of 2deg each (4 gaps = 8deg total)
  // Percentages: golden 22%, platinum 30%, standard 30%, silver 18%
  // Sweeps (minus gap): 79.2-2=77.2, 108-2=106, 108-2=106, 64.8-2=62.8
  const segs = [
    { color: '#C9A227', start: -100, end: -100 + 77.2 }, // Golden VIP
    { color: '#1A5C3A', start: -100 + 77.2 + 2, end: -100 + 77.2 + 2 + 106 }, // Platinum
    {
      color: '#7B4F2E',
      start: -100 + 77.2 + 2 + 106 + 2,
      end: -100 + 77.2 + 2 + 106 + 2 + 106,
    }, // Standard
    {
      color: '#A8A8A8',
      start: -100 + 77.2 + 2 + 106 + 2 + 106 + 2,
      end: -100 + 77.2 + 2 + 106 + 2 + 106 + 2 + 62.8,
    }, // Silver
  ];

  const segPath = s => {
    const large = s.end - s.start > 180 ? 1 : 0;
    return [
      `M ${px(outerR, s.start)} ${py(outerR, s.start)}`,
      `A ${outerR} ${outerR} 0 ${large} 1 ${px(outerR, s.end)} ${py(
        outerR,
        s.end,
      )}`,
      `L ${px(innerR, s.end)} ${py(innerR, s.end)}`,
      `A ${innerR} ${innerR} 0 ${large} 0 ${px(innerR, s.start)} ${py(
        innerR,
        s.start,
      )}`,
      'Z',
    ].join(' ');
  };

  return (
    <Svg width={width} height={VH} viewBox={`0 0 ${VW} ${VH}`}>
      {/* Outer & inner guide rings */}
      <Circle
        cx={cx}
        cy={cy}
        r={outerR + 5}
        fill="none"
        stroke="#e8e8e8"
        strokeWidth={1}
      />
      <Circle
        cx={cx}
        cy={cy}
        r={innerR - 5}
        fill="none"
        stroke="#e8e8e8"
        strokeWidth={1}
      />

      {/* Segments */}
      {segs.map((s, i) => (
        <Path key={i} d={segPath(s)} fill={s.color} />
      ))}

      {/* White inner disk */}
      <Circle cx={cx} cy={cy} r={innerR - 7} fill="#ffffff" />

      {/* Stage text */}
      <SvgText
        x={cx}
        y={cy}
        textAnchor="middle"
        fontSize={15}
        fontWeight="700"
        fill="#222222"
      >
        Stage
      </SvgText>
      {/* <Line
        x1={cx - 24}
        y1={cy + 3}
        x2={cx + 24}
        y2={cy + 3}
        stroke="#dddddd"
        strokeWidth={0.8}
      />
      <SvgText
        x={cx}
        y={cy + 16}
        textAnchor="middle"
        fontSize={8}
        fill="#bbbbbb"
        letterSpacing={1}
      >
        FRONT ROW
      </SvgText> */}

      {/* ── Labels ── */}

      {/* Golden VIP — top right */}
      <Circle cx={270} cy={62} r={5} fill="#C9A227" />
      <Line
        x1={264}
        y1={62}
        x2={252}
        y2={75}
        stroke="#C9A227"
        strokeWidth={0.8}
      />
      <SvgText x={275} y={57} fontSize={10} fontWeight="700" fill="#111111">
        Golden VIP
      </SvgText>
      <SvgText x={275} y={70} fontSize={9} fill="#C9A227">
        JMD $3,500
      </SvgText>

      {/* Platinum VIP — right */}
      <Circle cx={292} cy={178} r={5} fill="#1A5C3A" />
      <Line
        x1={287}
        y1={178}
        x2={275}
        y2={178}
        stroke="#1A5C3A"
        strokeWidth={0.8}
      />
      <SvgText x={298} y={173} fontSize={10} fontWeight="700" fill="#111111">
        Platinum VIP
      </SvgText>
      <SvgText x={298} y={186} fontSize={9} fill="#1A5C3A">
        JMD $5,000
      </SvgText>

      {/* Regular Seats — bottom center */}
      <Circle cx={cx + 20} cy={cy + outerR + 10} r={5} fill="#7B4F2E" />
      <Line
        x1={cx + 20}
        y1={cy + outerR + 5}
        x2={cx + 20}
        y2={cy + outerR - 2}
        stroke="#7B4F2E"
        strokeWidth={0.8}
      />
      <SvgText
        x={cx + 20}
        y={cy + outerR + 24}
        textAnchor="middle"
        fontSize={10}
        fontWeight="700"
        fill="#111111"
      >
        Regular Seats
      </SvgText>
      <SvgText
        x={cx + 20}
        y={cy + outerR + 36}
        textAnchor="middle"
        fontSize={9}
        fill="#7B4F2E"
      >
        JMD $1,000
      </SvgText>

      {/* Silver VIP — left */}
      <Circle cx={68} cy={178} r={5} fill="#A8A8A8" />
      <Line
        x1={73}
        y1={178}
        x2={85}
        y2={178}
        stroke="#A8A8A8"
        strokeWidth={0.8}
      />
      <SvgText
        x={62}
        y={173}
        textAnchor="end"
        fontSize={10}
        fontWeight="700"
        fill="#111111"
      >
        Silver VIP
      </SvgText>
      <SvgText x={62} y={186} textAnchor="end" fontSize={9} fill="#A8A8A8">
        JMD $2,000
      </SvgText>
    </Svg>
  );
};

// ─── Seat Card ────────────────────────────────────────────────────────────────
const SeatCard = ({ category, isSelected, onPress }) => (
  <TouchableOpacity
    style={[
      styles.card,
      isSelected && {
        backgroundColor: category.color,
        borderColor: category.color,
      },
    ]}
    onPress={onPress}
    activeOpacity={0.85}
  >
    <View style={[styles.badge, { backgroundColor: category.color }]}>
      <Text style={styles.badgeText}>20%</Text>
    </View>

    <View style={styles.cardInfo}>
      <Text style={[styles.cardLabel, isSelected && styles.whiteText]}>
        {category.label}
      </Text>
      <Text style={[styles.cardSubtitle, isSelected && styles.whiteTextMuted]}>
        {category.subtitle}
      </Text>
      <Text style={[styles.cardPrice, isSelected && styles.whiteText]}>
        {category.price}
      </Text>
    </View>

    <View style={[styles.arrowBtn, { backgroundColor: category.color }]}>
      <Text style={styles.arrowText}>↗</Text>
    </View>
  </TouchableOpacity>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────
const SeatSelection = ({ navigation }) => {
  const [selected, setSelected] = useState('golden');

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0F7754" />
      <View style={styles.statusBarBg} />
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <BackIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Discover Seat</Text>
          <TouchableOpacity>
            <SettingIcon />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Donut Chart */}
          <View style={styles.chartWrap}>
            <DonutChart />
          </View>

          {/* Section title */}
          <Text style={styles.sectionTitle}>
            Unlock your perfect{'\n'}seat experience
          </Text>

          {/* Cards */}
          {SEAT_CATEGORIES.map(cat => (
            <SeatCard
              key={cat.id}
              category={cat}
              isSelected={selected === cat.id}
              onPress={() => setSelected(cat.id)}
            />
          ))}
        </ScrollView>

        {/* CTA Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.ctaBtn}
            onPress={() => navigation?.navigate('InvoiceDetail')}
          >
            <Text style={styles.ctaText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  statusBarBg: {
    backgroundColor: '#0F7754',
    height: StatusBar.currentHeight || 0,
  },
  safe: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111111',
    letterSpacing: -0.2,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  chartWrap: {
    alignItems: 'center',
    paddingTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111111',
    textAlign: 'center',
    lineHeight: 28,
    letterSpacing: -0.3,
    marginTop: 4,
    marginBottom: 16,
    paddingHorizontal: 36,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 14,
    marginBottom: 10,
    borderRadius: 16,
    borderWidth: 1.2,
    borderColor: '#ebebeb',
    padding: 13,
    gap: 12,
    backgroundColor: '#ffffff',
  },
  badge: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.3,
  },
  cardInfo: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 11,
    color: '#aaaaaa',
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111111',
  },
  whiteText: {
    color: '#ffffff',
  },
  whiteTextMuted: {
    color: 'rgba(255,255,255,0.8)',
  },
  arrowBtn: {
    width: 34,
    height: 34,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  arrowText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '700',
  },
  footer: {
    paddingHorizontal: 14,
    paddingBottom: 20,
    paddingTop: 10,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f2f2f2',
  },
  ctaBtn: {
    backgroundColor: '#111111',
    borderRadius: 28,
    paddingVertical: 15,
    alignItems: 'center',
  },
  ctaText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.2,
  },
});

export default SeatSelection;
