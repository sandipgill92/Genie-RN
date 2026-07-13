import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import BackIcon from '../../assets/svg/BackIcon';
import Svg, { Path } from 'react-native-svg';
import { appColors } from '../../utils/appColors';

const StarIcon = ({
  filled = false,
  size = 32,
  color = '#FFA500',
  borderColor = '#000',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12 2l2.909 6.583 7.091.61-5.364 4.73 1.618 6.977L12 17.27l-6.254 3.63 1.618-6.977L2 9.193l7.091-.61L12 2z"
        fill={filled ? color : 'none'}
        stroke={borderColor}
        strokeWidth={filled ? 0 : 1}
      />
    </Svg>
  );
};

const ShareFeedback = ({ navigation }) => {
  const [rating, setRating] = useState(4);
  const [feedbackText, setFeedbackText] = useState('');

  const handleSubmit = () => {
    console.log({ rating, feedbackText });
  };

  return (
    <>
      <View style={styles.statusBar}>
        <StatusBar barStyle="light-content" backgroundColor="#0F7754" />
      </View>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIcon />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Share Feedback</Text>
          </View>

          {/* Card */}
          <View style={styles.content}>
            <View style={styles.card}>
              <Text style={styles.question}>Enjoying Genie App so far?</Text>

              {/* Star Rating */}
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map(star => (
                  <TouchableOpacity key={star} onPress={() => setRating(star)}>
                    <StarIcon filled={star <= rating} />
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.divider} />

              <Text style={styles.label}>Tell us more</Text>
              <TextInput
                style={styles.textArea}
                multiline
                numberOfLines={4}
                value={feedbackText}
                onChangeText={setFeedbackText}
                placeholder="Eg: The event I liked was not Listed"
                placeholderTextColor="#999"
                textAlignVertical="top"
              />
            </View>
          </View>
        </KeyboardAvoidingView>

        {/* Submit Button - fixed at bottom */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit Feedback</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 16,
    color: appColors.black,
  },
  content: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  card: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 16,
  },
  question: {
    fontSize: 15,
    fontWeight: '600',
    color: appColors.black,
    marginBottom: 14,
    textAlign: 'center',
  },
  starsRow: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'center',
  },
  star: {
    marginRight: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: appColors.black,
    marginBottom: 8,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: appColors.black,
    minHeight: 90,
  },
  submitButton: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    backgroundColor: appColors.black,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  submitText: {
    color: appColors.white,
    fontSize: 15,
    fontWeight: '600',
  },
});

export default ShareFeedback;
