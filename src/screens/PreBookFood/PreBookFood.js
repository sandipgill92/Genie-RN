import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { appColors } from '../../utils/appColors';
import BackIcon from '../../assets/svg/BackIcon';
import PopconeIcon from '../../assets/svg/PopconeIcon';
import SearchDashboardIcon from '../../assets/svg/SearchDashboardIcon';

// ─── Types ────────────────────────────────────────────────────────────────────
// ─── Mock Data ────────────────────────────────────────────────────────────────
const CATEGORIES = ['All Items', 'Veg only', 'Popcorn', 'Combo', 'cold'];

const FOOD_ITEMS = Array.from({ length: 7 }, (_, i) => ({
  id: String(i + 1),
  name: 'Popcorn Combo1',
  subtitle: 'salted',
  isTopSeller: i !== 0, // first card shows no badge, rest show Top Seller
  price: 630,
  description: 'Salted popcorn 90g + Pepsi 450 ml',
}));

// ─── FoodCard ─────────────────────────────────────────────────────────────────
const FoodCard = ({ item }) => {
  const [added, setAdded] = useState(false);

  return (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        {/* Popcorn Image */}
        <PopconeIcon width={76} height={76} />
        {/* Middle Info */}
        <View style={styles.cardInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemName}>{item.subtitle}</Text>

          {item.isTopSeller && <Text style={styles.topSeller}>Top Seller</Text>}

          <Text style={styles.price}>${item.price}</Text>
        </View>
        {/* Add Button */}
        <TouchableOpacity
          style={[styles.addBtn, added && styles.addBtnActive]}
          onPress={() => setAdded(v => !v)}
          activeOpacity={0.75}
        >
          <Text style={[styles.addBtnText, added && styles.addBtnTextActive]}>
            {added ? 'Added' : 'Add'}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
};

// ─── Screen ───────────────────────────────────────────────────────────────────
const PreBookFood = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Combo');
  const [search, setSearch] = useState('');

  return (
    <>
      <View style={styles.statusBar}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={appColors.primary}
        />
      </View>
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} activeOpacity={0.7}>
            <BackIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pre- book your food</Text>
        </View>

        {/* Search */}
        <View style={styles.searchWrap}>
          <SearchDashboardIcon width={16} height={16} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#b2afaf"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Category Tabs */}
        <View style={{ marginHorizontal: 16 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tabsRow}
            contentContainerStyle={styles.tabsContent}
          >
            {CATEGORIES.map(cat => {
              const active = activeTab === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  style={[styles.tab, active && styles.tabActive]}
                  onPress={() => setActiveTab(cat)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[styles.tabLabel, active && styles.tabLabelActive]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Food List */}
        <FlatList
          data={FOOD_ITEMS}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <FoodCard item={item} />}
          contentContainerStyle={styles.listPad}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const BORDER = '#e6e6e6';

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: appColors.primary,
    height: StatusBar.currentHeight,
  },
  safe: {
    flex: 1,
    backgroundColor: appColors.white,
  },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  backBtn: { paddingRight: 10 },
  backIcon: { fontSize: 18, color: '#222' },
  headerTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1c1c1c',
    letterSpacing: 0.1,
  },

  /* Search */
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ededed8e',
    marginHorizontal: 14,
    marginTop: 12,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ededed8e',
    paddingHorizontal: 11,
    paddingVertical: Platform.OS === 'ios' ? 10 : 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: appColors.black,
    padding: 0,
    margin: 0,
    marginLeft: 10,
  },

  /* Tabs */
  tabsRow: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: appColors.white,
    borderBottomWidth: 1,
    borderBottomColor: appColors.placeholder,
  },
  tabsContent: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1.2,
    borderColor: appColors.black,
    backgroundColor: appColors.white,
    marginRight: 6,
  },
  tabActive: {
    backgroundColor: appColors.primary,
    borderColor: appColors.primary,
    borderWidth: 1.2,
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: appColors.black,
  },
  tabLabelActive: {
    color: appColors.white,
    fontWeight: '500',
  },

  /* List */
  listPad: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 30,
  },

  /* Card */
  card: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: appColors.white,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    marginTop: 14,
  },

  cardInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 13,
    fontWeight: '700',
    color: appColors.black,
    lineHeight: 19,
  },

  topSeller: {
    fontSize: 11,
    color: appColors.primary,
    marginTop: 3,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: appColors.black,
    marginTop: 4,
  },
  description: {
    fontSize: 11,
    color: '#aaa',
    marginTop: 2,
    lineHeight: 15,
  },

  /* Add button */
  addBtn: {
    borderWidth: 0.5,
    borderColor: appColors.black,
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 5,
    marginLeft: 10,
    alignSelf: 'flex-end',
    backgroundColor: appColors.white,
  },
  addBtnActive: {
    backgroundColor: appColors.primary,
    borderColor: appColors.primary,
  },
  addBtnText: {
    fontSize: 12,
    color: appColors.black,
  },
  addBtnTextActive: {
    color: appColors.white,
  },
});

export default PreBookFood;
