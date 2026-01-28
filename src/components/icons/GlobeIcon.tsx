/**
 * Globe Icon
 * Exact SVG from Figma
 */

import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';

const { width } = Dimensions.get('window');
const DESIGN_WIDTH = 390;
const scale = (size: number) => (width / DESIGN_WIDTH) * size;

export function GlobeIcon({ size }: { size?: number }) {
  // Figma: 40x40
  const iconSize = size ?? scale(40);

  return (
    <View style={[styles.container, { width: iconSize, height: iconSize }]}>
      <Svg width={iconSize} height={iconSize} viewBox="0 0 40 40" fill="none">
        <G clipPath="url(#clip0_30_2224)">
          <Path
            d="M20 38.75C22.4623 38.75 24.9005 38.265 27.1753 37.3227C29.4502 36.3805 31.5172 34.9993 33.2582 33.2582C34.9993 31.5172 36.3805 29.4502 37.3227 27.1753C38.265 24.9005 38.75 22.4623 38.75 20C38.75 17.5377 38.265 15.0995 37.3227 12.8247C36.3805 10.5498 34.9993 8.48285 33.2582 6.74175C31.5172 5.00065 29.4502 3.61953 27.1753 2.67726C24.9005 1.73498 22.4623 1.25 20 1.25M20 38.75C17.5377 38.75 15.0995 38.265 12.8247 37.3227C10.5498 36.3805 8.48285 34.9993 6.74175 33.2582C5.00065 31.5172 3.61953 29.4502 2.67726 27.1753C1.73498 24.9005 1.25 22.4623 1.25 20C1.25 17.5377 1.73498 15.0995 2.67726 12.8247C3.61953 10.5498 5.00065 8.48285 6.74175 6.74175C8.48285 5.00065 10.5498 3.61953 12.8247 2.67726C15.0995 1.73498 17.5377 1.25 20 1.25M20 38.75C25.7521 38.75 28.2104 27.9937 28.2104 20C28.2104 12.0062 25.7521 1.25 20 1.25M20 38.75C14.2479 38.75 11.7896 27.9937 11.7896 20C11.7896 12.0062 14.2479 1.25 20 1.25M2.29167 13.75H37.7083M2.29167 26.25H37.7083"
            stroke="#FEA120"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </G>
        <Defs>
          <ClipPath id="clip0_30_2224">
            <Rect width="40" height="40" fill="white" />
          </ClipPath>
        </Defs>
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
