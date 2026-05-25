import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { appColors } from '../../../utils/appColors';

const GenieMoneyModal2 = ({ visible, onClose, onReadMore, navigation }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.card}>
            {/* Header Row */}
            <View style={styles.header}>
              <Text style={styles.title}>Genie Money</Text>
              <Text style={styles.closeIcon}>$0</Text>
            </View>

            {/* Body Text */}
            <Text style={styles.bodyText}>
              This includes balances credited via add money promotional/customer
              delight credits and order refunds
            </Text>

            {/* Read more */}
            {/* <TouchableOpacity onPress={onReadMore}> */}
            <Text style={styles.readMore}>Read more</Text>
            {/* </TouchableOpacity> */}

            {/* Divider */}
            <View style={styles.divider} />

            {/* Okay Button */}
            <TouchableOpacity
              style={styles.okayButton}
              onPress={() => {
                onClose();
                navigation.navigate('AddMoney');
              }}
            >
              <Text style={styles.okayText}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
  },
  card: {
    backgroundColor: appColors.white,
    borderRadius: 16,
    overflow: 'hidden',
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },

  closeIcon: {
    fontSize: 16,
    fontWeight: '600',
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    width: '100%',
    marginHorizontal: 16,
  },

  // Body
  bodyText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  readMore: {
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  // Okay button
  okayButton: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  okayText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default GenieMoneyModal2;
