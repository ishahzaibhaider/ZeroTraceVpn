/**
 * Settings Icon (Gear)
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';

export const SettingsIcon = () => (
  <View style={styles.container}>
    <View style={styles.gear}>
      <View style={styles.tooth1} />
      <View style={styles.tooth2} />
      <View style={styles.tooth3} />
      <View style={styles.tooth4} />
      <View style={styles.tooth5} />
      <View style={styles.tooth6} />
      <View style={styles.center} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gear: {
    width: 20,
    height: 20,
    position: 'relative',
  },
  tooth1: {
    position: 'absolute',
    top: 0,
    left: 8,
    width: 4,
    height: 3,
    backgroundColor: '#ffffff',
    borderRadius: 1,
  },
  tooth2: {
    position: 'absolute',
    top: 3,
    right: 0,
    width: 3,
    height: 4,
    backgroundColor: '#ffffff',
    borderRadius: 1,
  },
  tooth3: {
    position: 'absolute',
    bottom: 3,
    right: 0,
    width: 3,
    height: 4,
    backgroundColor: '#ffffff',
    borderRadius: 1,
  },
  tooth4: {
    position: 'absolute',
    bottom: 0,
    left: 8,
    width: 4,
    height: 3,
    backgroundColor: '#ffffff',
    borderRadius: 1,
  },
  tooth5: {
    position: 'absolute',
    bottom: 3,
    left: 0,
    width: 3,
    height: 4,
    backgroundColor: '#ffffff',
    borderRadius: 1,
  },
  tooth6: {
    position: 'absolute',
    top: 3,
    left: 0,
    width: 3,
    height: 4,
    backgroundColor: '#ffffff',
    borderRadius: 1,
  },
  center: {
    position: 'absolute',
    top: 7,
    left: 7,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ffffff',
  },
});

