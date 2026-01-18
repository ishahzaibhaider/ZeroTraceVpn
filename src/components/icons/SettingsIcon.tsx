/**
 * Settings Icon (Gear)
 * SVG-based gear icon for crisp rendering
 */

import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');
const DESIGN_WIDTH = 390;
const scale = (size: number) => (width / DESIGN_WIDTH) * size;

export const SettingsIcon = () => {
  const iconSize = scale(20);
  const centerX = iconSize / 2;
  const centerY = iconSize / 2;
  const outerRadius = iconSize / 2 - scale(1);
  const innerRadius = scale(5);
  const centerRadius = scale(2.5);
  
  // Create gear path with 8 teeth
  const teeth = 8;
  const angleStep = (2 * Math.PI) / teeth;
  const points: string[] = [];
  
  for (let i = 0; i < teeth; i++) {
    const angle1 = i * angleStep;
    const angle2 = (i + 0.5) * angleStep;
    const angle3 = (i + 1) * angleStep;
    
    // Outer point (tooth tip)
    const outerX1 = centerX + outerRadius * Math.cos(angle1);
    const outerY1 = centerY + outerRadius * Math.sin(angle1);
    
    // Middle point (tooth base outer)
    const midX = centerX + innerRadius * Math.cos(angle2);
    const midY = centerY + innerRadius * Math.sin(angle2);
    
    // Outer point (next tooth tip)
    const outerX2 = centerX + outerRadius * Math.cos(angle3);
    const outerY2 = centerY + outerRadius * Math.sin(angle3);
    
    // Inner point (tooth base inner)
    const innerX = centerX + innerRadius * Math.cos(angle2);
    const innerY = centerY + innerRadius * Math.sin(angle2);
    
    if (i === 0) {
      points.push(`M ${outerX1} ${outerY1}`);
    }
    points.push(`L ${midX} ${midY}`);
    points.push(`L ${outerX2} ${outerY2}`);
  }
  
  // Close the path
  points.push('Z');
  
  const gearPath = points.join(' ');
  
  return (
    <View style={[styles.container, { width: iconSize, height: iconSize }]}>
      <Svg width={iconSize} height={iconSize} viewBox={`0 0 ${iconSize} ${iconSize}`}>
        {/* Gear outer shape */}
        <Path
          d={gearPath}
          fill="#FFFFFF"
          stroke="none"
        />
        {/* Center circle */}
        <Circle
          cx={centerX}
          cy={centerY}
          r={centerRadius}
          fill="#FFFFFF"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

