import { Platform } from "react-native";

export const colors = {
  primary: "#758BFD",
  secondary: "#8FA4FF",
  accent: "#A5B8FF",
  background: "#101522",
  card: "#171E2F",
  surface: "#1D2640",
  success: "#4ADE80",
  warning: "#FACC15",
  danger: "#F87171",
  textPrimary: "#F8FAFC",
  textSecondary: "#B9C4E2",
  textTertiary: "#6F7EA6",
  muted: "#36415F",
  glass: "rgba(255, 255, 255, 0.08)",
  glassStrong: "rgba(255, 255, 255, 0.14)",
  shadow: "rgba(0, 0, 0, 0.45)",
  transparent: "transparent",
} as const;

export const gradients = {
  hero: [colors.primary, colors.accent] as const,
  card: ["rgba(117, 139, 253, 0.24)", "rgba(29, 38, 64, 0.2)"] as const,
  glass: ["rgba(255, 255, 255, 0.12)", "rgba(255, 255, 255, 0.03)"] as const,
  success: [colors.success, colors.secondary] as const,
  danger: [colors.danger, colors.primary] as const,
  surface: [colors.surface, colors.card] as const,
};

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  huge: 48,
  hero: 64,
} as const;

export const radius = {
  sm: 14,
  md: 18,
  lg: 24,
  xl: 28,
  xxl: 32,
  pill: 999,
} as const;

export const typography = {
  families: {
    display: Platform.select({
      ios: "SF Pro Display",
      android: "sans-serif",
      default: "System",
    }),
    text: Platform.select({
      ios: "SF Pro Text",
      android: "sans-serif",
      default: "System",
    }),
  },
  display: {
    fontSize: 38,
    lineHeight: 44,
    fontWeight: "800" as const,
  },
  h1: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "800" as const,
  },
  h2: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "700" as const,
  },
  h3: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "700" as const,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500" as const,
  },
  caption: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600" as const,
  },
  micro: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "700" as const,
  },
} as const;

export const shadows = {
  soft: {
    shadowColor: colors.shadow,
    shadowOpacity: 0.22,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10,
  },
  floating: {
    shadowColor: colors.primary,
    shadowOpacity: 0.22,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 16 },
    elevation: 16,
  },
} as const;

export const layout = {
  screenPadding: spacing.xl,
  bottomNavigationHeight: 76,
  bottomNavigationOffset: 18,
  chartHeight: 156,
} as const;
