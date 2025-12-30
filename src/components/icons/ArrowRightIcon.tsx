/**
 * Arrow Right Icon (Light)
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';

export const ArrowRightIcon = () => (
  <View style={styles.container}>
    <View style={styles.arrow} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: 8,
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderLeftColor: '#141419',
    borderTopWidth: 4,
    borderTopColor: 'transparent',
    borderBottomWidth: 4,
    borderBottomColor: 'transparent',
  },
});

