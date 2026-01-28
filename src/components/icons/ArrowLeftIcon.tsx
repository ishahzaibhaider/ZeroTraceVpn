/**
 * Arrow Left Icon (Back Arrow)
 * Matching Figma design - left-pointing chevron for navigation
 */

import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');
const DESIGN_WIDTH = 390;
const scale = (size: number) => (width / DESIGN_WIDTH) * size;

export function ArrowLeftIcon({ size, color }: { size?: number; color?: string }) {
  const iconSize = size ?? scale(24);
  const chevronWidth = scale(6);
  const chevronHeight = scale(10);
  const iconColor = color ?? '#141419';
  
  return (
    <View style={[styles.container, { width: iconSize, height: iconSize }]}>
      <Svg width={iconSize} height={iconSize} viewBox={`0 0 ${iconSize} ${iconSize}`}>
        {/* Left-pointing chevron */}
        <Path
          d={`M ${iconSize / 2 + chevronWidth / 2} ${iconSize / 2 - chevronHeight / 2} L ${iconSize / 2 - chevronWidth / 2} ${iconSize / 2} L ${iconSize / 2 + chevronWidth / 2} ${iconSize / 2 + chevronHeight / 2}`}
          fill="none"
          stroke={iconColor}
          strokeWidth={scale(2)}
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
