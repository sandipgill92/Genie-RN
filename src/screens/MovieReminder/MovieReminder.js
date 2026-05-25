import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { appColors } from '../../utils/appColors';
import BackIcon from '../../assets/svg/BackIcon';
import MovieReminderIcon from '../../assets/svg/MovieReminderIcon';

const MovieReminder = ({ navigation }) => {
  return (
    <>
      <View style={styles.statusBar}>
        <StatusBar barStyle="light-content" backgroundColor="#0F7754" />
      </View>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <BackIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Movie Reminders</Text>
        </View>

        {/* Empty State Content */}
        <View style={styles.content}>
          {/* Illustration */}
          <View style={styles.illustrationContainer}>
            <MovieReminderIcon />
          </View>

          {/* Text */}
          <Text style={styles.title}>You don’t have any reminders set</Text>
          <Text style={styles.subtitle}>
            Set reminders for your favourites upcomming movies
          </Text>

          {/* CTA Button */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Explore upcomming movies</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: appColors.primary,
    height: StatusBar.currentHeight,
  },
  safeArea: {
    flex: 1,
    backgroundColor: appColors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 0,
  },
  backButton: {
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: appColors.black,
    letterSpacing: -0.2,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingBottom: 60,
  },
  illustrationContainer: {
    marginBottom: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: appColors.black,
    marginBottom: 10,
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
  },
  button: {
    borderWidth: 1.5,
    borderColor: '#CBD5E0',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderWidth: 1,
    borderColor: appColors.placeholder,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: appColors.black,
    letterSpacing: -0.1,
  },
});

export default MovieReminder;
