/**
 * Search Icon
 * Magnifying glass icon for search bar
 */

import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');
const DESIGN_WIDTH = 390;
const scale = (size: number) => (width / DESIGN_WIDTH) * size;

export function SearchIcon({ size, color }: { size?: number; color?: string }) {
  const iconSize = size ?? scale(20);
  const iconColor = color ?? 'rgba(147, 147, 147, 0.6)';
  
  return (
    <View style={[styles.container, { width: iconSize, height: iconSize }]}>
      <Svg width={iconSize} height={iconSize} viewBox="0 0 20 20" fill="none">
        <Circle
          cx="8.5"
          cy="8.5"
          r="5.5"
          stroke={iconColor}
          strokeWidth={1.2}
        />
        <Path
          d="M13.5 13.5L17 17"
          stroke={iconColor}
          strokeWidth={1.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
