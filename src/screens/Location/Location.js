import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { appColors } from '../../utils/appColors';
import BackWhiteIcon from '../../assets/svg/BackWhiteIcon';
import DownWhiteIcon from '../../assets/svg/DownWhiteIcon';
import SearchIcon from '../../assets/svg/SearchIcon';
import MontagoIcon from '../../assets/svg/MontagoIcon';
import SpanishTowerIcon from '../../assets/svg/SpanishTowerIcon';
import KingstonIcon from '../../assets/svg/KingstonIcon';
import BuffBayIcon from '../../assets/svg/BuffBayIcon';

const Location = ({ navigation }) => {
  const [selectedCity, setSelectedCity] = useState('Jamaica');

  const eventsNearYou = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400',
      title: 'Sip and Paint',
      date: 'Jan 24, 2PM to 5PM',
      location: 'Marvys, Florida',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
      title: 'Vealfest',
      date: 'Jan 3 - Jan 4',
      location: 'Emancipation Park',
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400',
      title: 'Sip and Paint',
      date: 'Jan 24, 2PM to 5PM',
      location: 'Marvys, Florida',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
      title: 'Vealfest',
      date: 'Jan 3 - Jan 4',
      location: 'Emancipation Park',
    },
  ];

  const hubsNearYou = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400',
      title: 'Tropical Plaza',
      subtitle: 'Half Way Tree',
      distance: '1.6 miles',
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400',
      title: 'Carib 5 Cinema',
      subtitle: 'Cross Roads',
      distance: '2 Miles',
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400',
      title: 'Sovereign',
      subtitle: 'Kingston',
      distance: '4 miles',
    },
  ];

  const popularCities = [
    { id: 1, name: 'Montego Bay', icon: <MontagoIcon /> },
    { id: 2, name: 'Spanish Town', icon: <SpanishTowerIcon /> },
    { id: 3, name: 'Kingston', icon: <KingstonIcon /> },
    { id: 4, name: 'Buff Bay', icon: <BuffBayIcon /> },
    { id: 5, name: 'Spanish Town', icon: <SpanishTowerIcon /> },
    { id: 6, name: 'Kingston', icon: <KingstonIcon /> },
  ];

  return (
    <>
      <View style={styles.statusBar}>
        <StatusBar barStyle="light-content" backgroundColor="#0F7754" />
      </View>

      <SafeAreaView style={styles.container}>
        {/* Fixed Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <BackWhiteIcon
              onPress={() => {
                navigation.goBack();
              }}
            />
            <TouchableOpacity style={styles.citySelector}>
              <Text style={styles.cityText}>{selectedCity}</Text>
              <DownWhiteIcon />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <SearchIcon />
            <TextInput
              style={styles.searchInput}
              placeholder="Search city, area or Event"
              placeholderTextColor={appColors.border}
            />
          </View>
        </View>

        {/* Scrollable Content */}
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Banner */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScrollBanner}
          >
            <View style={styles.bannerContainer}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
                }}
                style={styles.bannerImage}
              />
              <View style={styles.bannerOverlay}>
                <Text style={styles.bannerText}>50% OFF</Text>
                <Text style={styles.bannerSubtext}>Dancehall Nights</Text>
                <TouchableOpacity style={styles.bookButton}>
                  <Text style={styles.bookButtonText}>Book Ticket</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.bannerContainer}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
                }}
                style={styles.bannerImage}
              />
              <View style={styles.bannerOverlay}>
                <Text style={styles.bannerText}>50% OFF</Text>
                <Text style={styles.bannerSubtext}>Dancehall Nights</Text>
                <TouchableOpacity style={styles.bookButton}>
                  <Text style={styles.bookButtonText}>Book Ticket</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.bannerContainer}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
                }}
                style={styles.bannerImage}
              />
              <View style={styles.bannerOverlay}>
                <Text style={styles.bannerText}>50% OFF</Text>
                <Text style={styles.bannerSubtext}>Dancehall Nights</Text>
                <TouchableOpacity style={styles.bookButton}>
                  <Text style={styles.bookButtonText}>Book Ticket</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.bannerContainer}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
                }}
                style={styles.bannerImage}
              />
              <View style={styles.bannerOverlay}>
                <Text style={styles.bannerText}>50% OFF</Text>
                <Text style={styles.bannerSubtext}>Dancehall Nights</Text>
                <TouchableOpacity style={styles.bookButton}>
                  <Text style={styles.bookButtonText}>Book Ticket</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          {/* Events Near You */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Events Near You</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalScroll}
            >
              {eventsNearYou.map(event => (
                <TouchableOpacity key={event.id} style={styles.eventCard}>
                  <Image
                    source={{ uri: event.image }}
                    style={styles.eventImage}
                  />
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventDate}>{event.date}</Text>
                  <Text style={styles.eventLocation}>{event.location}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Hubs Near You */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hubs near you</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalScroll}
            >
              {hubsNearYou.map(hub => (
                <TouchableOpacity key={hub.id} style={styles.hubCard}>
                  <Image source={{ uri: hub.image }} style={styles.hubImage} />
                  <Text style={styles.hubTitle}>{hub.title}</Text>
                  {/* <Text style={styles.hubSubtitle}>{hub.subtitle}</Text> */}
                  <Text style={styles.hubDistance}>{hub.distance}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Popular Cities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Popular Cities</Text>
            <View style={styles.citiesGrid}>
              {popularCities.map(city => (
                <TouchableOpacity key={city.id} style={styles.cityCard}>
                  <View style={styles.cityIconContainer}>
                    <Text style={styles.cityIcon}>{city.icon}</Text>
                  </View>
                  <Text style={styles.cityName}>{city.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: appColors.primary,
    height: StatusBar.currentHeight,
  },
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  header: {
    backgroundColor: appColors.primary,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  citySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  cityText: {
    color: appColors.white,
    fontSize: 18,
    fontWeight: '600',
    marginRight: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: appColors.placeholder,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '300',
    color: appColors.white,
  },
  scrollView: {
    flex: 1,
  },
  bannerContainer: {
    margin: 16,
    marginRight: 0,
    borderRadius: 12,
    overflow: 'hidden',
    height: 180,
    width: 300,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    left: 16,
    bottom: 16,
  },
  bannerText: {
    color: appColors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  bannerSubtext: {
    color: appColors.white,
    fontSize: 14,
    marginTop: 4,
  },
  bookButton: {
    backgroundColor: appColors.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  bookButtonText: {
    color: appColors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    marginTop: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginLeft: 16,
    marginBottom: 12,
  },
  horizontalScroll: {
    paddingLeft: 16,
  },
  horizontalScrollBanner: {
    width: '100%',
    flexDirection: 'row',
  },
  eventCard: {
    width: 190,
    marginRight: 12,
  },
  eventImage: {
    width: 190,
    height: 250,
    borderRadius: 8,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
  },
  eventDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  eventLocation: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  hubCard: {
    width: 120,
    marginRight: 12,
  },
  hubImage: {
    width: 120,
    height: 100,
    borderRadius: 8,
  },
  hubTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
  },
  hubSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  hubDistance: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  citiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 16,
    gap: 10,
    justifyContent: 'space-between',
  },
  cityCard: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 20,
    backgroundColor: appColors.cardBg,
    paddingVertical: 12,
    borderRadius: 12,
    paddingHorizontal: 8,
  },
  cityIconContainer: {
    borderRadius: 12,
    backgroundColor: appColors.cardBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  cityIcon: {
    fontSize: 32,
  },
  cityName: {
    fontSize: 10,
    color: appColors.black,
    textAlign: 'center',
  },
});

export default Location;
