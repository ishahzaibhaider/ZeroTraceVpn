/**
 * Splash Screen
 * First screen shown when app launches - Based on Figma design
 */

import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { theme } from '../theme';

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const progressAnim = useRef(new Animated.Value(0)).current;
  const heartbeatAnim = useRef(new Animated.Value(1)).current;
  const [progressText, setProgressText] = useState('0%');

  useEffect(() => {
    // Heartbeat animation - subtle pulse effect (slight grow and shrink)
    const heartbeat = Animated.loop(
      Animated.sequence([
        Animated.timing(heartbeatAnim, {
          toValue: 1.06, // Scale up to 106% - subtle growth
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(heartbeatAnim, {
          toValue: 1, // Scale back to normal
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    heartbeat.start();

    // Update progress text as animation progresses
    const progressListener = progressAnim.addListener(({ value }) => {
      setProgressText(`${Math.round(value)}%`);
    });

    // Progress bar animation - from 0% to 100% over 3.5 seconds
    const progressAnimation = Animated.timing(progressAnim, {
      toValue: 100,
      duration: 3500, // 3.5 seconds - not too fast, not too slow
      useNativeDriver: false, // width animation doesn't support native driver
    });
    progressAnimation.start();

    // Navigate after progress completes (3.5 seconds)
    const timer = setTimeout(() => {
      heartbeat.stop();
      navigation.replace('Onboarding');
    }, 3500);

    return () => {
      clearTimeout(timer);
      heartbeat.stop();
      progressAnimation.stop();
      progressAnim.removeListener(progressListener);
    };
  }, [navigation, progressAnim, heartbeatAnim]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary.blue} />
      
      {/* Status Bar Area - matches Figma design */}
      <View style={styles.statusBar}>
        <Text style={styles.statusBarTime}>9:41</Text>
        <View style={styles.statusBarIcons}>
          {/* Status bar icons would go here - using placeholders */}
          <View style={styles.statusIcon} />
          <View style={styles.statusIcon} />
          <View style={styles.statusIcon} />
        </View>
      </View>

      {/* Main Content - Centered */}
      <View style={styles.bodyContainer}>
        {/* Logo Container - White circle with logo inside */}
        <View style={styles.logoContainer}>
          <Animated.View
            style={[
              styles.logoImageContainer,
              {
                transform: [{ scale: heartbeatAnim }],
              },
            ]}
          >
            <Image 
              source={require('../../assets/logo.png')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
          </Animated.View>
        </View>

        {/* Text Container */}
        <View style={styles.textContainer}>
          {/* ZeroTrace Title - SVG text in Figma, using Text for now */}
          <Text style={styles.title}>ZeroTrace</Text>
          {/* Subtitle */}
          <Text style={styles.subtitle}>Online Security- One Click Away</Text>
        </View>
      </View>

      {/* Progress Section */}
      <View style={styles.progressSection}>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <Animated.View
              style={[
                styles.progressBarFill,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>
          <Text style={styles.progressText}>{progressText}</Text>
        </View>
      </View>

      {/* Footer - Home Indicator */}
      <View style={styles.footer}>
        <View style={styles.footerBar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary.blue,
    width: width,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    height: 48,
  },
  statusBarTime: {
    fontSize: 13.605,
    fontFamily: theme.typography.fonts.roboto.medium,
    color: theme.colors.white,
    fontWeight: '500',
  },
  statusBarIcons: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  statusIcon: {
    width: 20,
    height: 20,
    backgroundColor: theme.colors.white,
    borderRadius: 2,
    opacity: 0.8,
  },
  bodyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xl,
  },
  logoContainer: {
    width: 150,
    height: 150,
    borderRadius: 991.337,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  logoImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 99.6,
    height: 114,
  },
  textContainer: {
    alignItems: 'center',
    gap: 2,
    width: '100%',
  },
  title: {
    fontSize: theme.typography.sizes.xl,
    fontFamily: theme.typography.fonts.poppins.semiBold,
    color: theme.colors.white,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
    // Figma uses SVG text, this is close approximation
  },
  subtitle: {
    fontSize: theme.typography.sizes.lg,
    fontFamily: theme.typography.fonts.poppins.medium,
    color: theme.colors.white,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: theme.typography.sizes.lg * theme.typography.lineHeights.relaxed,
  },
  progressSection: {
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing['3xl'],
    width: '100%',
  },
  progressBarContainer: {
    width: '100%',
    height: 33,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBarBackground: {
    width: 300,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 80,
    overflow: 'hidden',
    position: 'absolute',
    top: 27,
  },
  progressBarFill: {
    height: 6,
    backgroundColor: theme.colors.white,
    borderRadius: 80,
  },
  progressText: {
    fontSize: theme.typography.sizes.lg,
    fontFamily: theme.typography.fonts.poppins.medium,
    color: theme.colors.white,
    fontWeight: '500',
    position: 'absolute',
    left: '50%',
    top: 0,
    transform: [{ translateX: -20 }],
    minWidth: 40,
    textAlign: 'center',
  },
  footer: {
    paddingVertical: theme.spacing.base,
    alignItems: 'center',
    width: '100%',
  },
  footerBar: {
    width: 122,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: theme.borderRadius.sm,
  },
});

