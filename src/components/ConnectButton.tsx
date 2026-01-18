/**
 * Connect Button Component
 * Exact Figma SVG implementation with ripple effect
 */

import React, { useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';
import Svg, { Path, Circle, G, ClipPath, Defs, Rect } from 'react-native-svg';
import { theme } from '../theme';

const { width } = Dimensions.get('window');
const DESIGN_WIDTH = 390;
const scale = (size: number) => (width / DESIGN_WIDTH) * size;

interface ConnectButtonProps {
  onPress: () => void;
}

export default function ConnectButton({ onPress }: ConnectButtonProps) {
  const buttonWidth = scale(226);
  const buttonHeight = scale(208);
  
  // Ripple effect animation for the outermost light blue ring
  const rippleScale = useRef(new Animated.Value(1)).current;
  const rippleOpacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    // Continuous ripple effect with moderate speed (2.5s cycle)
    const ripple = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(rippleScale, {
            toValue: 1.2, // Scale up to 120%
            duration: 2500, // Moderate speed - 2.5 seconds
            useNativeDriver: true,
          }),
          Animated.timing(rippleOpacity, {
            toValue: 0,
            duration: 2500,
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
            toValue: 0.4,
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

  return (
    <TouchableOpacity
      style={[styles.container, { width: buttonWidth, height: buttonHeight }]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* Static base SVG */}
      <Svg
        width={buttonWidth}
        height={buttonHeight}
        viewBox="0 0 226 208"
        style={styles.svg}
        preserveAspectRatio="none"
      >
        <Defs>
          <ClipPath id="clip0_70_449">
            <Rect width="226" height="208" fill="white" />
          </ClipPath>
          <ClipPath id="clip1_70_449">
            <Rect width="226" height="103" fill="white" />
          </ClipPath>
          <ClipPath id="clip2_70_449">
            <Rect width="190" height="190" fill="white" transform="translate(19 18)" />
          </ClipPath>
        </Defs>
        
        <G clipPath="url(#clip0_70_449)">
          {/* White top curved section */}
          <G clipPath="url(#clip1_70_449)">
            <Path
              d="M226 105C226 89.7087 226 89.199 220.738 73.6701C214.913 59.1912 205.957 46.0353 195.192 34.9536C184.428 23.872 171.649 15.0815 157.585 9.08416C143.521 3.0868 128.447 -6.85038e-07 113.224 0C98.0016 6.85038e-07 82.9278 3.0868 68.8637 9.08416C54.7996 15.0815 42.0206 23.872 31.2564 34.9537C20.4922 46.0353 11.9536 59.1912 6.12805 73.6701C0.302513 88.149 0 89.2731 0 105H113.224H226Z"
              fill="white"
            />
          </G>
          
          {/* Light blue ring and white circle with power icon */}
          <G clipPath="url(#clip2_70_449)">
            {/* Static light blue ring */}
            <Path
              d="M209 113C209 165.467 166.467 208 114 208C61.5329 208 19 165.467 19 113C19 60.5329 61.5329 18 114 18C166.467 18 209 60.5329 209 113ZM31.2465 113C31.2465 158.703 68.2965 195.753 114 195.753C159.703 195.753 196.753 158.703 196.753 113C196.753 67.2965 159.703 30.2465 114 30.2465C68.2965 30.2465 31.2465 67.2965 31.2465 113Z"
              fill="#A3C9FF"
            />
            
            {/* White circle with blue border */}
            <Circle
              cx="113.5"
              cy="112.5"
              r="65.5"
              fill="white"
              stroke="#0C64E0"
              strokeWidth="4"
            />
            
            {/* Power icon */}
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M116.771 109.228V91.7525C116.766 91.0207 116.472 90.3206 115.953 89.805C115.434 89.2894 114.732 89 114 89C113.269 89 112.567 89.2894 112.048 89.805C111.529 90.3206 111.235 91.0207 111.23 91.7525V109.228C111.235 109.959 111.529 110.659 112.048 111.175C112.567 111.691 113.269 111.98 114 111.98C114.732 111.98 115.434 111.691 115.953 111.175C116.472 110.659 116.766 109.959 116.771 109.228ZM138 112.991C138 117.199 136.894 121.333 134.794 124.978C132.694 128.624 129.674 131.653 126.035 133.763C122.396 135.873 118.267 136.989 114.061 137C109.856 137.011 105.721 135.916 102.072 133.824C98.4221 131.733 95.386 128.719 93.2674 125.084C91.1488 121.45 90.0222 117.322 90.0003 113.114C89.9785 108.907 91.0621 104.767 93.1428 101.111C95.2235 97.4541 98.2281 94.4087 101.856 92.2796C102.281 92.0296 102.766 91.8966 103.259 91.8939C103.753 91.8913 104.239 92.0191 104.667 92.2645C105.096 92.5099 105.452 92.8641 105.7 93.2914C105.947 93.7186 106.078 94.2038 106.078 94.6977C106.078 95.7867 105.653 96.6641 104.701 97.2269C101.964 98.8479 99.6946 101.154 98.1175 103.918C96.5404 106.682 95.7093 109.809 95.7061 112.991C95.7061 123.084 103.914 131.294 114 131.294C124.086 131.294 132.295 123.084 132.295 112.991C132.292 109.809 131.461 106.682 129.884 103.918C128.307 101.154 126.038 98.848 123.3 97.2269C122.877 96.9839 122.525 96.6321 122.283 96.2079C122.041 95.7837 121.917 95.3024 121.923 94.814C121.923 93.7113 122.362 92.8209 123.334 92.2639C123.76 92.0124 124.247 91.8811 124.742 91.8839C125.237 91.8867 125.722 92.0235 126.145 92.2798C129.752 94.4017 132.742 97.4285 134.821 101.061C136.901 104.693 137.996 108.806 138 112.991Z"
              fill="#0C64E0"
            />
          </G>
        </G>
      </Svg>
      
      {/* Animated ripple effect on the outermost light blue ring */}
      <Animated.View
        style={[
          styles.rippleContainer,
          {
            transform: [{ scale: rippleScale }],
            opacity: rippleOpacity,
          },
        ]}
      >
        <Svg
          width={buttonWidth}
          height={buttonHeight}
          viewBox="0 0 226 208"
          style={styles.rippleSvg}
          preserveAspectRatio="none"
        >
          <Defs>
            <ClipPath id="clip2_ripple">
              <Rect width="190" height="190" fill="white" transform="translate(19 18)" />
            </ClipPath>
          </Defs>
          <G clipPath="url(#clip2_ripple)">
            {/* Animated light blue ring for ripple effect */}
            <Path
              d="M209 113C209 165.467 166.467 208 114 208C61.5329 208 19 165.467 19 113C19 60.5329 61.5329 18 114 18C166.467 18 209 60.5329 209 113ZM31.2465 113C31.2465 158.703 68.2965 195.753 114 195.753C159.703 195.753 196.753 158.703 196.753 113C196.753 67.2965 159.703 30.2465 114 30.2465C68.2965 30.2465 31.2465 67.2965 31.2465 113Z"
              fill="#A3C9FF"
            />
          </G>
        </Svg>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  svg: {
    position: 'absolute',
  },
  rippleContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  rippleSvg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
