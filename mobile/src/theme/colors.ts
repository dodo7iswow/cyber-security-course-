/**
 * BeautyBook Haiti - Color Palette
 * Liquid Glass Design System
 */

export const colors = {
  // Primary Brand Colors
  primary: {
    50: '#FFE5EF',
    100: '#FFCCE0',
    200: '#FF99C0',
    300: '#FF66A1',
    400: '#FF3381',
    500: '#FF0062', // Main brand color
    600: '#CC004E',
    700: '#99003B',
    800: '#660027',
    900: '#330014',
  },

  // Accent Colors
  accent: {
    pink: '#FF6B9D',
    purple: '#A855F7',
    blue: '#3B82F6',
    teal: '#14B8A6',
    gold: '#F59E0B',
  },

  // Neutral Colors
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },

  // Glass Background Colors (with alpha)
  glass: {
    light: 'rgba(255, 255, 255, 0.7)',
    medium: 'rgba(255, 255, 255, 0.5)',
    dark: 'rgba(0, 0, 0, 0.3)',
    darkMedium: 'rgba(0, 0, 0, 0.5)',
    darkStrong: 'rgba(0, 0, 0, 0.7)',
  },

  // Semantic Colors
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',

  // Background Gradients
  gradients: {
    primary: ['#FF6B9D', '#FF0062'],
    purple: ['#A855F7', '#7C3AED'],
    sunset: ['#FF6B9D', '#F59E0B'],
    ocean: ['#3B82F6', '#14B8A6'],
    dark: ['#171717', '#404040'],
  },

  // Text Colors
  text: {
    primary: '#171717',
    secondary: '#525252',
    tertiary: '#A3A3A3',
    inverse: '#FFFFFF',
  },

  // System Colors
  background: {
    light: '#FFFFFF',
    dark: '#000000',
    gradient: '#F5F5F5',
  },

  border: {
    light: 'rgba(255, 255, 255, 0.2)',
    dark: 'rgba(0, 0, 0, 0.1)',
  },
} as const;

export type Colors = typeof colors;
