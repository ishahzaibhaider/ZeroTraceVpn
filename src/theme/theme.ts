/**
 * Theme configuration based on Figma design
 * Contains colors, typography, spacing, and other design tokens
 */

export const theme = {
  colors: {
    // Primary Colors
    primary: {
      blue: '#0c64e0',
    },
    
    // Base Colors
    white: '#ffffff',
    dark: '#141419',
    
    // Grey Scale
    grey: {
      base: '#939393',
      light15: 'rgba(147, 147, 147, 0.15)',
      light30: 'rgba(147, 147, 147, 0.3)',
      light45: 'rgba(147, 147, 147, 0.45)',
      light60: 'rgba(147, 147, 147, 0.6)',
    },
    
    // Background Colors
    background: {
      light: '#ffffff',
      dark: '#141419',
      grey: '#ededed',
      overlay: 'rgba(20, 20, 25, 0.12)',
    },
    
    // Status Colors
    status: {
      connected: '#0c64e0',
      disconnected: '#939393',
      connecting: '#0c64e0',
    },
  },
  
  typography: {
    fonts: {
      poppins: {
        regular: 'Poppins-Regular',
        medium: 'Poppins-Medium',
        semiBold: 'Poppins-SemiBold',
        bold: 'Poppins-Bold',
      },
      inter: {
        bold: 'Inter-Bold',
      },
      roboto: {
        medium: 'Roboto-Medium',
      },
    },
    
    sizes: {
      xs: 10,
      sm: 13.605,
      base: 14,
      md: 16,
      lg: 18,
      xl: 22,
      '2xl': 32,
    },
    
    lineHeights: {
      tight: 1.45,
      normal: 1.5,
      relaxed: 1.651,
    },
  },
  
  spacing: {
    xs: 4,
    sm: 6,
    md: 8,
    base: 10,
    lg: 12,
    xl: 16,
    '2xl': 20,
    '3xl': 24,
    '4xl': 32,
    '5xl': 48,
  },
  
  borderRadius: {
    sm: 5,
    md: 33.573,
    lg: 40,
    xl: 53.716,
    full: 99999,
  },
  
  // Screen dimensions (from Figma)
  screen: {
    width: 390,
    height: 844,
  },
} as const;

export type Theme = typeof theme;

