/**
 * Connect Button Component
 * Matches Figma design exactly:
 * - Ellipse 5708 (outermost) - ripple effect
 * - Ellipse 5709 (inner) - white circle with blue border
 * - Vector - power icon (blue circle with line)
 */

import React, { useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import Svg, { Ellipse, Path, Circle, G } from 'react-native-svg';
import { theme } from '../theme';

const { width } = Dimensions.get('window');
const DESIGN_WIDTH = 390;
const scale = (size: number) => (width / DESIGN_WIDTH) * size;

interface ConnectButtonProps {
  onPress: () => void;
}

export default function ConnectButton({ onPress }: ConnectButtonProps) {
  // Ripple effect animation for Ellipse 5708 (outermost)
  const rippleScale = useRef(new Animated.Value(1)).current;
  const rippleOpacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // Continuous ripple effect on outermost ellipse (moderate speed - 2s cycle)
    const ripple = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(rippleScale, {
            toValue: 1.15, // Scale up to 115%
            duration: 2000, // Moderate speed
            useNativeDriver: true,
          }),
          Animated.timing(rippleOpacity, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(rippleScale, {
            toValue: 1,
            duration: 0, // Reset instantly
            useNativeDriver: true,
          }),
          Animated.timing(rippleOpacity, {
            toValue: 0.3,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ])
    );
    ripple.start();

    return () => {
      ripple.stop();
    };
  }, []);

  const buttonSize = scale(190);
  const centerX = buttonSize / 2;
  const centerY = buttonSize / 2;
  const innerRadius = centerX - scale(4);
  const outerRadius = centerX - scale(2);

  return (
    <TouchableOpacity
      style={[styles.container, { width: buttonSize, height: buttonSize }]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* Ellipse 5708 - Outermost ellipse with ripple effect */}
      <Animated.View
        style={[
          styles.rippleEllipse,
          {
            width: outerRadius * 2,
            height: outerRadius * 2,
            borderRadius: outerRadius,
            borderWidth: scale(2),
            transform: [{ scale: rippleScale }],
            opacity: rippleOpacity,
          },
        ]}
      />

      {/* Main Button SVG - Ellipse 5709 + Vector */}
      <Svg
        width={buttonSize}
        height={buttonSize}
        viewBox={`0 0 ${buttonSize} ${buttonSize}`}
        style={styles.svg}
      >
        {/* Ellipse 5709 - Inner white circle with blue border */}
        <Circle
          cx={centerX}
          cy={centerY}
          r={innerRadius}
          fill={theme.colors.white}
          stroke={theme.colors.primary.blue}
          strokeWidth={scale(4)}
        />

        {/* Vector - Power Icon */}
        <G>
          {/* Power icon circle (open at top) */}
          <Path
            d={`M ${centerX} ${centerY - scale(18)} A ${scale(18)} ${scale(18)} 0 1 1 ${centerX} ${centerY + scale(18)}`}
            fill="none"
            stroke={theme.colors.primary.blue}
            strokeWidth={scale(3.5)}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Power icon vertical line */}
          <Path
            d={`M ${centerX} ${centerY - scale(6)} L ${centerX} ${centerY + scale(12)}`}
            stroke={theme.colors.primary.blue}
            strokeWidth={scale(3.5)}
            strokeLinecap="round"
          />
        </G>
      </Svg>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  rippleEllipse: {
    position: 'absolute',
    borderColor: theme.colors.white,
    alignSelf: 'center',
  },
  svg: {
    position: 'absolute',
  },
});
