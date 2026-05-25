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
import Svg, { Path, Circle, G, Text as SvgText } from 'react-native-svg';
import { appColors } from '../../utils/appColors';
import SettingIcon from '../../assets/svg/SettingIcon';
import BackIcon from '../../assets/svg/BackIcon';
import StageImg from '../../assets/svg/StageImg';

const { width } = Dimensions.get('window');

// ─── Seat Categories ─────────────────────────────────────────────────────────
const SEAT_CATEGORIES = [
  {
    id: 'golden',
    label: 'Golden VIP',
    subtitle: 'Best View & Amenities',
    price: 'JMD $3,500',
    color: '#F5C518',
    discount: '20%',
    percentage: 0.22,
  },
  {
    id: 'silver',
    label: 'Silver VIP',
    subtitle: 'Comfort & Proximity',
    price: 'JMD $2,000',
    color: '#B0B0B0',
    discount: '20%',
    percentage: 0.18,
  },
  {
    id: 'platinum',
    label: 'Platinum VIP',
    subtitle: 'Premium Front Row',
    price: 'JMD $5,000',
    color: '#1A5C3A',
    discount: '20%',
    percentage: 0.3,
  },
  {
    id: 'standard',
    label: 'Standard',
    subtitle: 'General Access',
    price: 'JMD $1,000',
    color: '#8B5E3C',
    discount: '20%',
    percentage: 0.3,
  },
];

// ─── Donut Chart ──────────────────────────────────────────────────────────────
const DonutChart = ({ categories, selectedId }) => {
  const size = width * 0.72;
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size * 0.42;
  const innerR = size * 0.265;
  const ringGap = size * 0.03;

  const polarToCartesian = (cx, cy, r, angleDeg) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  const arcPath = (cx, cy, r, startAngle, endAngle) => {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const large = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 0 ${end.x} ${end.y}`;
  };

  const donutSegment = (cx, cy, outerR, innerR, startAngle, endAngle) => {
    const p1 = polarToCartesian(cx, cy, outerR, startAngle);
    const p2 = polarToCartesian(cx, cy, outerR, endAngle);
    const p3 = polarToCartesian(cx, cy, innerR, endAngle);
    const p4 = polarToCartesian(cx, cy, innerR, startAngle);
    const large = endAngle - startAngle > 180 ? 1 : 0;
    return [
      `M ${p1.x} ${p1.y}`,
      `A ${outerR} ${outerR} 0 ${large} 1 ${p2.x} ${p2.y}`,
      `L ${p3.x} ${p3.y}`,
      `A ${innerR} ${innerR} 0 ${large} 0 ${p4.x} ${p4.y}`,
      'Z',
    ].join(' ');
  };

  // Build segments with gap
  const GAP_DEG = 3;
  let currentAngle = -30;
  const segments = categories.map(cat => {
    const sweep = cat.percentage * 360 - GAP_DEG;
    const start = currentAngle;
    const end = currentAngle + sweep;
    currentAngle += cat.percentage * 360;
    return { ...cat, startAngle: start, endAngle: end };
  });

  // Label positions (midpoint of arc, outer ring)
  const labelR = outerR + size * 0.085;

  return (
    <View style={{ width: size, height: size, alignSelf: 'center' }}>
      {/* <Svg width={size} height={size}>
        <Circle
          cx={cx}
          cy={cy}
          r={outerR + ringGap}
          fill="none"
          stroke="#E8E8E8"
          strokeWidth={1.5}
        />
        <Circle
          cx={cx}
          cy={cy}
          r={innerR - ringGap}
          fill="none"
          stroke="#E8E8E8"
          strokeWidth={1.5}
        />

        {segments.map(seg => {
          const isSelected = seg.id === selectedId;
          const mid = (seg.startAngle + seg.endAngle) / 2;
          const labelPos = polarToCartesian(cx, cy, labelR, mid);
          return (
            <G key={seg.id}>
              <Path
                d={donutSegment(
                  cx,
                  cy,
                  outerR,
                  innerR,
                  seg.startAngle,
                  seg.endAngle,
                )}
                fill={seg.color}
                opacity={isSelected ? 1 : 0.75}
              />
              <Circle cx={labelPos.x} cy={labelPos.y} r={5} fill={seg.color} />
            </G>
          );
        })}

        <Circle cx={cx} cy={cy} r={innerR - ringGap - 4} fill="#FAFAFA" />
        <SvgText
          x={cx}
          y={cy + 7}
          textAnchor="middle"
          fontSize={18}
          fontWeight="600"
          fill="#1A1A1A"
          fontFamily="Georgia"
        >
          Stage
        </SvgText>
      </Svg> */}

      {/* Category labels (absolute) */}
      {/* {segments.map(seg => {
        const mid = (seg.startAngle + seg.endAngle) / 2;
        const pos = polarToCartesian(cx, cy, labelR + size * 0.07, mid);
        const isLeft = pos.x < cx;
        return (
          <View
            key={seg.id + '_label'}
            style={[
              styles.chartLabel,
              {
                left: pos.x - (isLeft ? 80 : 0),
                top: pos.y - 18,
                width: 80,
                alignItems: isLeft ? 'flex-end' : 'flex-start',
              },
            ]}
          >
            <Text style={styles.chartLabelName}>{seg.label}</Text>
            <Text style={[styles.chartLabelPrice, { color: seg.color }]}>
              {seg.price}
            </Text>
          </View>
        );
      })} */}
    </View>
  );
};

// ─── Seat Card ────────────────────────────────────────────────────────────────
const SeatCard = ({ category, isSelected, onPress }) => {
  const isDark = category.id === 'platinum' && isSelected;
  return (
    <TouchableOpacity
      style={[
        styles.card,
        isSelected && {
          borderColor: category.color,
          borderWidth: 1,
          backgroundColor: category.color,
          color: appColors.white,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* Left badge */}
      <View style={[styles.badge, { backgroundColor: category.color }]}>
        <Text style={styles.badgeText}>{category.discount}</Text>
      </View>

      {/* Info */}
      <View style={styles.cardInfo}>
        <Text
          style={[
            styles.cardLabel,
            isSelected && {
              color: appColors.white,
            },
          ]}
        >
          {category.label}
        </Text>
        <Text
          style={[
            styles.cardSubtitle,
            isSelected && {
              color: appColors.white,
            },
          ]}
        >
          {category.subtitle}
        </Text>
        <Text
          style={[
            styles.cardPrice,
            isSelected && {
              color: appColors.white,
            },
          ]}
        >
          {category.price}
        </Text>
      </View>

      {/* Arrow */}
      <View style={[styles.arrowBtn, { backgroundColor: category.color }]}>
        <Text style={styles.arrowText}>↗</Text>
      </View>
    </TouchableOpacity>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
const SeatSelection = ({ navigation }) => {
  const [selected, setSelected] = useState('platinum');

  return (
    <>
      <View style={styles.statusBar}>
        <StatusBar barStyle="light-content" backgroundColor="#0F7754" />
      </View>
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation?.goBack()}
          >
            <BackIcon />
          </TouchableOpacity>
          <TouchableOpacity>
            <SettingIcon />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.headerTitle}>Discover Seat</Text>

          {/* Chart */}
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <StageImg categories={SEAT_CATEGORIES} selectedId={selected} />
          </View>

          {/* Subtitle */}
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

        {/* CTA */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.ctaBtn}
            onPress={() => navigation.navigate('InvoiceDetail')}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 22,
    color: appColors.black,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: appColors.black,
    letterSpacing: 0.2,
    textAlign: 'center',
  },
  infoBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoIcon: { fontSize: 15 },
  // Scroll
  scroll: {
    flex: 1,
    padding: 16,
    paddingTop: 0,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  // Chart label overlay
  chartLabel: {
    position: 'absolute',
  },
  chartLabelName: {
    fontSize: 10,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  chartLabelPrice: {
    fontSize: 9,
    fontWeight: '500',
    marginTop: 1,
  },
  // Section title
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: appColors.black,
    textAlign: 'center',
    lineHeight: 28,
    marginVertical: 40,
    paddingHorizontal: 32,
  },
  // Cards
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    padding: 14,
    gap: 12,
  },
  badge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: appColors.white,
  },
  cardInfo: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  arrowBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  arrowText: {
    fontSize: 16,
    color: appColors.white,
    fontWeight: '700',
  },
  // Footer
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    backgroundColor: appColors.white,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  ctaBtn: {
    backgroundColor: '#1A1A1A',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '700',
    color: appColors.white,
    letterSpacing: 0.4,
  },
});

export default SeatSelection;
