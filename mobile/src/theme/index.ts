/**
 * BeautyBook Haiti - Design System
 * Liquid Glass Theme
 */

import { colors } from './colors';
import { spacing, borderRadius, shadows } from './spacing';
import { typography } from './typography';

export const theme = {
  colors,
  spacing,
  borderRadius,
  shadows,
  typography,
} as const;

/**
 * Glassmorphism Effect Styles
 * iOS 18-inspired liquid glass design
 */
export const glassStyles = {
  // Light Glass Card
  cardLight: {
    backgroundColor: colors.glass.light,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.border.light,
    ...shadows.md,
    overflow: 'hidden' as const,
  },

  // Medium Glass Card
  cardMedium: {
    backgroundColor: colors.glass.medium,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.border.light,
    ...shadows.lg,
    overflow: 'hidden' as const,
  },

  // Dark Glass Card
  cardDark: {
    backgroundColor: colors.glass.dark,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.border.light,
    ...shadows.lg,
    overflow: 'hidden' as const,
  },

  // Button Glass
  buttonGlass: {
    backgroundColor: colors.glass.medium,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border.light,
    ...shadows.md,
    overflow: 'hidden' as const,
  },

  // Input Glass
  inputGlass: {
    backgroundColor: colors.glass.light,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border.light,
    ...shadows.sm,
  },

  // Bottom Sheet Glass
  bottomSheetGlass: {
    backgroundColor: colors.glass.light,
    borderTopLeftRadius: borderRadius['2xl'],
    borderTopRightRadius: borderRadius['2xl'],
    borderWidth: 1,
    borderColor: colors.border.light,
    ...shadows.xl,
  },

  // Navigation Bar Glass
  navBarGlass: {
    backgroundColor: colors.glass.light,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
    ...shadows.sm,
  },

  // Tab Bar Glass
  tabBarGlass: {
    backgroundColor: colors.glass.light,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    ...shadows.lg,
  },
} as const;

export type Theme = typeof theme;
export type GlassStyles = typeof glassStyles;

export { colors, spacing, borderRadius, shadows, typography };
