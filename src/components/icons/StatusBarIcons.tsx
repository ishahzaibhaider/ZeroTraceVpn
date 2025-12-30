/**
 * Status Bar Icons (Cellular, WiFi, Battery)
 * Simple SVG-like components using View
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';

export const CellularIcon = () => (
  <View style={styles.container}>
    <View style={styles.bar1} />
    <View style={styles.bar2} />
    <View style={styles.bar3} />
    <View style={styles.bar4} />
  </View>
);

export const WifiIcon = () => (
  <View style={styles.wifiContainer}>
    <View style={styles.wifiArc1} />
    <View style={styles.wifiArc2} />
    <View style={styles.wifiDot} />
  </View>
);

export const BatteryIcon = () => (
  <View style={styles.batteryContainer}>
    <View style={styles.batteryBody} />
    <View style={styles.batteryTip} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: 15.302,
    height: 9.409,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
  },
  bar1: {
    width: 3,
    height: 4,
    backgroundColor: '#ffffff',
    borderRadius: 0.5,
  },
  bar2: {
    width: 3,
    height: 6,
    backgroundColor: '#ffffff',
    borderRadius: 0.5,
  },
  bar3: {
    width: 3,
    height: 8,
    backgroundColor: '#ffffff',
    borderRadius: 0.5,
  },
  bar4: {
    width: 3,
    height: 9.409,
    backgroundColor: '#ffffff',
    borderRadius: 0.5,
  },
  wifiContainer: {
    width: 13.801,
    height: 9.704,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wifiArc1: {
    width: 10,
    height: 6,
    borderWidth: 1.5,
    borderColor: '#ffffff',
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 10,
    position: 'absolute',
    top: 0,
  },
  wifiArc2: {
    width: 6,
    height: 4,
    borderWidth: 1.5,
    borderColor: '#ffffff',
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 6,
    position: 'absolute',
    top: 3,
  },
  wifiDot: {
    width: 2,
    height: 2,
    backgroundColor: '#ffffff',
    borderRadius: 1,
    position: 'absolute',
    bottom: 0,
  },
  batteryContainer: {
    width: 21.897,
    height: 9.998,
    flexDirection: 'row',
    alignItems: 'center',
  },
  batteryBody: {
    width: 18,
    height: 9.998,
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 1.5,
    backgroundColor: 'transparent',
  },
  batteryTip: {
    width: 2,
    height: 4,
    backgroundColor: '#ffffff',
    borderRadius: 0.5,
    marginLeft: 1,
  },
});

