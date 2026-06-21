import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import {
  colors,
  gradients,
  layout,
  radius,
  shadows,
  spacing,
  typography,
} from "./tokens";

export type Tone = "primary" | "success" | "warning" | "danger" | "muted";

export type ScreenName =
  | "Landing"
  | "Onboarding"
  | "Dashboard"
  | "Projects"
  | "Project Detail"
  | "Create Project"
  | "Tasks"
  | "Calendar"
  | "Notes"
  | "Analytics"
  | "Settings";

type BaseProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

type TextVariant =
  | "display"
  | "h1"
  | "h2"
  | "h3"
  | "body"
  | "caption"
  | "micro";

const toneColors: Record<Tone, string> = {
  primary: colors.primary,
  success: colors.success,
  warning: colors.warning,
  danger: colors.danger,
  muted: colors.textTertiary,
};

export function AppText({
  children,
  variant = "body",
  color = colors.textPrimary,
  style,
}: {
  children: ReactNode;
  variant?: TextVariant;
  color?: string;
  style?: StyleProp<TextStyle>;
}) {
  const baseFamily =
    variant === "display" || variant === "h1" || variant === "h2"
      ? typography.families.display
      : typography.families.text;

  return (
    <Text
      style={[
        styles.text,
        typography[variant],
        { color, fontFamily: baseFamily },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

export function ScreenShell({
  activeScreen,
  children,
  onNavigate,
  showBottomNavigation = true,
}: {
  activeScreen: ScreenName;
  children: ReactNode;
  onNavigate: (screen: ScreenName) => void;
  showBottomNavigation?: boolean;
}) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.backgroundOrbTop} />
      <View style={styles.backgroundOrbBottom} />
      <ScrollView
        contentContainerStyle={[
          styles.screenContent,
          showBottomNavigation && styles.screenContentWithNavigation,
        ]}
        showsVerticalScrollIndicator={false}
      >
        <ScreenRail activeScreen={activeScreen} onNavigate={onNavigate} />
        {children}
      </ScrollView>
      {showBottomNavigation ? (
        <BottomNavigation activeScreen={activeScreen} onNavigate={onNavigate} />
      ) : null}
    </SafeAreaView>
  );
}

function ScreenRail({
  activeScreen,
  onNavigate,
}: {
  activeScreen: ScreenName;
  onNavigate: (screen: ScreenName) => void;
}) {
  const screens: ScreenName[] = [
    "Landing",
    "Onboarding",
    "Dashboard",
    "Projects",
    "Project Detail",
    "Create Project",
    "Tasks",
    "Calendar",
    "Notes",
    "Analytics",
    "Settings",
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.screenRail}
    >
      {screens.map((screen) => {
        const active = screen === activeScreen;

        return (
          <Pressable
            accessibilityRole="button"
            key={screen}
            onPress={() => onNavigate(screen)}
            style={[
              styles.screenRailItem,
              active && styles.screenRailItemActive,
            ]}
          >
            <AppText
              variant="micro"
              color={active ? colors.textPrimary : colors.textTertiary}
            >
              {screen}
            </AppText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

export function Card({
  children,
  style,
  gradient = false,
}: BaseProps & { gradient?: boolean }) {
  if (gradient) {
    return (
      <LinearGradient
        colors={gradients.card}
        style={[styles.card, styles.gradientCard, style]}
      >
        {children}
      </LinearGradient>
    );
  }

  return <View style={[styles.card, style]}>{children}</View>;
}

export function SectionHeader({
  title,
  action,
}: {
  title: string;
  action?: string;
}) {
  return (
    <View style={styles.sectionHeader}>
      <AppText variant="h3">{title}</AppText>
      {action ? (
        <AppText variant="caption" color={colors.secondary}>
          {action}
        </AppText>
      ) : null}
    </View>
  );
}

export function StatusPill({ label, tone }: { label: string; tone: Tone }) {
  return (
    <View style={[styles.pill, { backgroundColor: `${toneColors[tone]}24` }]}>
      <View style={[styles.pillDot, { backgroundColor: toneColors[tone] }]} />
      <AppText variant="micro" color={toneColors[tone]}>
        {label}
      </AppText>
    </View>
  );
}

export function MetricCard({
  label,
  value,
  delta,
  tone = "primary",
}: {
  label: string;
  value: string;
  delta: string;
  tone?: Tone;
}) {
  return (
    <Card style={styles.metricCard}>
      <View
        style={[
          styles.metricIcon,
          { backgroundColor: `${toneColors[tone]}20` },
        ]}
      >
        <AppText variant="caption" color={toneColors[tone]}>
          {label.slice(0, 2).toUpperCase()}
        </AppText>
      </View>
      <AppText variant="caption" color={colors.textTertiary}>
        {label}
      </AppText>
      <AppText variant="h2">{value}</AppText>
      <StatusPill label={delta} tone={tone} />
    </Card>
  );
}

export function GradientButton({
  label,
  onPress,
  style,
}: {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={style}>
      <LinearGradient colors={gradients.hero} style={styles.gradientButton}>
        <AppText variant="body" style={styles.gradientButtonLabel}>
          {label}
        </AppText>
      </LinearGradient>
    </Pressable>
  );
}

export function GhostButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={styles.ghostButton}
    >
      <AppText variant="body" color={colors.secondary}>
        {label}
      </AppText>
    </Pressable>
  );
}

export function QuickAction({
  label,
  detail,
  tone,
  onPress,
}: {
  label: string;
  detail: string;
  tone: Tone;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={styles.quickAction}
    >
      <View
        style={[
          styles.quickActionIcon,
          { backgroundColor: `${toneColors[tone]}24` },
        ]}
      >
        <AppText variant="caption" color={toneColors[tone]}>
          {label.slice(0, 1)}
        </AppText>
      </View>
      <AppText variant="caption">{label}</AppText>
      <AppText variant="micro" color={colors.textTertiary}>
        {detail}
      </AppText>
    </Pressable>
  );
}

export function MiniBarChart({
  values,
  tone = "primary",
}: {
  values: number[];
  tone?: Tone;
}) {
  const maxValue = Math.max(...values);

  return (
    <View style={styles.barChart}>
      {values.map((value, index) => (
        <View key={`${value}-${index}`} style={styles.barTrack}>
          <LinearGradient
            colors={[toneColors[tone], `${toneColors[tone]}55`]}
            style={[
              styles.barFill,
              { height: `${Math.max(16, (value / maxValue) * 100)}%` },
            ]}
          />
        </View>
      ))}
    </View>
  );
}

export function LineChart({
  values,
  tone = "primary",
}: {
  values: number[];
  tone?: Tone;
}) {
  const maxValue = Math.max(...values);

  return (
    <View style={styles.lineChart}>
      {values.map((value, index) => {
        const height = Math.max(12, (value / maxValue) * 112);

        return (
          <View key={`${value}-${index}`} style={styles.linePointColumn}>
            <View
              style={[
                styles.linePoint,
                {
                  backgroundColor: toneColors[tone],
                  marginTop: layout.chartHeight - height - 34,
                },
              ]}
            />
            {index < values.length - 1 ? (
              <View
                style={[
                  styles.lineSegment,
                  {
                    backgroundColor: `${toneColors[tone]}66`,
                    transform: [
                      {
                        rotate: values[index + 1] > value ? "-16deg" : "16deg",
                      },
                    ],
                  },
                ]}
              />
            ) : null}
          </View>
        );
      })}
    </View>
  );
}

export function DonutChart({
  segments,
}: {
  segments: { label: string; value: string; tone: Tone; width: number }[];
}) {
  return (
    <View style={styles.donutWrap}>
      <View style={styles.donutRing}>
        <View style={styles.donutInner}>
          <AppText variant="h2">$18.4k</AppText>
          <AppText variant="micro" color={colors.textTertiary}>
            Pipeline
          </AppText>
        </View>
      </View>
      <View style={styles.donutLegend}>
        {segments.map((segment) => (
          <View key={segment.label} style={styles.legendRow}>
            <View style={styles.legendTrack}>
              <View
                style={[
                  styles.legendFill,
                  {
                    backgroundColor: toneColors[segment.tone],
                    width: `${segment.width}%`,
                  },
                ]}
              />
            </View>
            <AppText variant="caption" style={styles.legendLabel}>
              {segment.label}
            </AppText>
            <AppText variant="caption" color={colors.textSecondary}>
              {segment.value}
            </AppText>
          </View>
        ))}
      </View>
    </View>
  );
}

export function ProjectCard({
  name,
  client,
  value,
  progress,
  status,
  tone,
  onPress,
}: {
  name: string;
  client: string;
  value: string;
  progress: number;
  status: string;
  tone: Tone;
  onPress: () => void;
}) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress}>
      <Card style={styles.projectCard}>
        <View style={styles.projectCardHeader}>
          <View>
            <AppText variant="h3">{name}</AppText>
            <AppText variant="caption" color={colors.textTertiary}>
              {client}
            </AppText>
          </View>
          <StatusPill label={status} tone={tone} />
        </View>
        <View style={styles.progressTrack}>
          <LinearGradient
            colors={[toneColors[tone], colors.secondary]}
            style={[styles.progressFill, { width: `${progress}%` }]}
          />
        </View>
        <View style={styles.projectCardFooter}>
          <AppText variant="caption" color={colors.textTertiary}>
            Progress {progress}%
          </AppText>
          <AppText variant="caption">{value}</AppText>
        </View>
      </Card>
    </Pressable>
  );
}

export function TaskRow({
  title,
  meta,
  checked,
  tone = "primary",
}: {
  title: string;
  meta: string;
  checked: boolean;
  tone?: Tone;
}) {
  return (
    <View style={styles.taskRow}>
      <View
        style={[
          styles.checkbox,
          checked && {
            backgroundColor: toneColors[tone],
            borderColor: toneColors[tone],
          },
        ]}
      >
        {checked ? (
          <AppText variant="micro" color={colors.background}>
            ✓
          </AppText>
        ) : null}
      </View>
      <View style={styles.taskCopy}>
        <AppText variant="body" style={checked && styles.taskDone}>
          {title}
        </AppText>
        <AppText variant="caption" color={colors.textTertiary}>
          {meta}
        </AppText>
      </View>
    </View>
  );
}

export function EmptyState({
  title,
  body,
  action,
  tone = "primary",
}: {
  title: string;
  body: string;
  action: string;
  tone?: Tone;
}) {
  return (
    <Card style={styles.emptyState} gradient>
      <View
        style={[styles.emptyOrb, { backgroundColor: `${toneColors[tone]}22` }]}
      >
        <AppText variant="h2" color={toneColors[tone]}>
          {title.slice(0, 1)}
        </AppText>
      </View>
      <AppText variant="h3">{title}</AppText>
      <AppText
        variant="caption"
        color={colors.textSecondary}
        style={styles.centeredText}
      >
        {body}
      </AppText>
      <View
        style={[
          styles.emptyAction,
          { backgroundColor: `${toneColors[tone]}22` },
        ]}
      >
        <AppText variant="caption" color={toneColors[tone]}>
          {action}
        </AppText>
      </View>
    </Card>
  );
}

export function StateCard({
  title,
  body,
  tone,
}: {
  title: string;
  body: string;
  tone: Tone;
}) {
  return (
    <View
      style={[styles.stateCard, { backgroundColor: `${toneColors[tone]}18` }]}
    >
      <StatusPill label={title} tone={tone} />
      <AppText
        variant="caption"
        color={colors.textSecondary}
        style={styles.stateBody}
      >
        {body}
      </AppText>
    </View>
  );
}

export function FormField({
  label,
  value,
  placeholder,
  multiline = false,
}: {
  label: string;
  value?: string;
  placeholder?: string;
  multiline?: boolean;
}) {
  return (
    <View style={styles.formField}>
      <AppText variant="caption" color={colors.textSecondary}>
        {label}
      </AppText>
      <TextInput
        editable={false}
        multiline={multiline}
        placeholder={placeholder}
        placeholderTextColor={colors.textTertiary}
        style={[styles.input, multiline && styles.textArea]}
        value={value}
      />
    </View>
  );
}

export function BottomNavigation({
  activeScreen,
  onNavigate,
}: {
  activeScreen: ScreenName;
  onNavigate: (screen: ScreenName) => void;
}) {
  const tabs: { label: string; screen: ScreenName; icon: string }[] = [
    { label: "Home", screen: "Dashboard", icon: "H" },
    { label: "Projects", screen: "Projects", icon: "P" },
    { label: "Tasks", screen: "Tasks", icon: "T" },
    { label: "Calendar", screen: "Calendar", icon: "C" },
    { label: "Stats", screen: "Analytics", icon: "A" },
  ];

  return (
    <View style={styles.navigationWrap} pointerEvents="box-none">
      <View style={styles.navigationPill}>
        {tabs.map((tab) => {
          const active = activeScreen === tab.screen;

          return (
            <Pressable
              accessibilityRole="button"
              key={tab.screen}
              onPress={() => onNavigate(tab.screen)}
              style={[
                styles.navigationItem,
                active && styles.navigationItemActive,
              ]}
            >
              <AppText
                variant="caption"
                color={active ? colors.background : colors.textSecondary}
              >
                {tab.icon}
              </AppText>
              {active ? (
                <AppText variant="micro" color={colors.background}>
                  {tab.label}
                </AppText>
              ) : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export const screenStyles = StyleSheet.create({
  heroTitle: {
    marginTop: spacing.md,
  },
  heroCopy: {
    marginTop: spacing.md,
  },
  row: {
    flexDirection: "row",
    gap: spacing.md,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  half: {
    flexBasis: "47%",
    flexGrow: 1,
  },
  stack: {
    gap: spacing.md,
  },
  largeStack: {
    gap: spacing.xl,
  },
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backgroundOrbTop: {
    position: "absolute",
    top: -140,
    right: -120,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "rgba(117, 139, 253, 0.22)",
  },
  backgroundOrbBottom: {
    position: "absolute",
    bottom: 80,
    left: -130,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "rgba(165, 184, 255, 0.12)",
  },
  screenContent: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.md,
    paddingBottom: spacing.xxl,
    gap: spacing.xl,
  },
  screenContentWithNavigation: {
    paddingBottom: layout.bottomNavigationHeight + spacing.huge,
  },
  screenRail: {
    gap: spacing.xs,
    paddingRight: spacing.xl,
  },
  screenRailItem: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  screenRailItemActive: {
    backgroundColor: "rgba(117, 139, 253, 0.22)",
  },
  text: {
    includeFontPadding: false,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    ...shadows.soft,
  },
  gradientCard: {
    overflow: "hidden",
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pill: {
    alignItems: "center",
    alignSelf: "flex-start",
    borderRadius: radius.pill,
    flexDirection: "row",
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  pillDot: {
    borderRadius: radius.pill,
    height: 7,
    width: 7,
  },
  metricCard: {
    flexBasis: "47%",
    flexGrow: 1,
    gap: spacing.sm,
  },
  metricIcon: {
    alignItems: "center",
    borderRadius: radius.md,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  gradientButton: {
    alignItems: "center",
    borderRadius: radius.pill,
    justifyContent: "center",
    minHeight: 58,
    paddingHorizontal: spacing.xl,
    ...shadows.floating,
  },
  gradientButtonLabel: {
    color: colors.background,
    fontWeight: "800",
  },
  ghostButton: {
    alignItems: "center",
    borderRadius: radius.pill,
    minHeight: 56,
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.glass,
  },
  quickAction: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    flexBasis: "47%",
    flexGrow: 1,
    gap: spacing.xs,
    padding: spacing.md,
  },
  quickActionIcon: {
    alignItems: "center",
    borderRadius: radius.md,
    height: 38,
    justifyContent: "center",
    width: 38,
  },
  barChart: {
    alignItems: "flex-end",
    flexDirection: "row",
    gap: spacing.sm,
    height: 140,
  },
  barTrack: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: radius.pill,
    flex: 1,
    height: "100%",
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  barFill: {
    borderRadius: radius.pill,
    width: "100%",
  },
  lineChart: {
    flexDirection: "row",
    height: layout.chartHeight,
    justifyContent: "space-between",
    overflow: "hidden",
  },
  linePointColumn: {
    flex: 1,
    position: "relative",
  },
  linePoint: {
    borderRadius: radius.pill,
    height: 14,
    width: 14,
    zIndex: 2,
  },
  lineSegment: {
    borderRadius: radius.pill,
    height: 4,
    left: 11,
    position: "absolute",
    top: 72,
    width: 44,
  },
  donutWrap: {
    gap: spacing.xl,
  },
  donutRing: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.primary,
    borderColor: colors.secondary,
    borderRadius: 88,
    borderRightColor: colors.success,
    borderTopColor: colors.warning,
    borderWidth: 18,
    height: 176,
    justifyContent: "center",
    width: 176,
  },
  donutInner: {
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 58,
    height: 116,
    justifyContent: "center",
    width: 116,
  },
  donutLegend: {
    gap: spacing.sm,
  },
  legendRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
  },
  legendTrack: {
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    flex: 1,
    height: 8,
    overflow: "hidden",
  },
  legendFill: {
    borderRadius: radius.pill,
    height: "100%",
  },
  legendLabel: {
    minWidth: 74,
  },
  projectCard: {
    gap: spacing.md,
  },
  projectCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  progressTrack: {
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    height: 10,
    overflow: "hidden",
  },
  progressFill: {
    borderRadius: radius.pill,
    height: "100%",
  },
  projectCardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  taskRow: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.md,
  },
  checkbox: {
    alignItems: "center",
    borderColor: colors.muted,
    borderRadius: radius.sm,
    borderWidth: 1,
    height: 30,
    justifyContent: "center",
    width: 30,
  },
  taskCopy: {
    flex: 1,
    gap: spacing.xxs,
  },
  taskDone: {
    color: colors.textTertiary,
    textDecorationLine: "line-through",
  },
  emptyState: {
    alignItems: "center",
    gap: spacing.md,
  },
  emptyOrb: {
    alignItems: "center",
    borderRadius: radius.xl,
    height: 72,
    justifyContent: "center",
    width: 72,
  },
  centeredText: {
    textAlign: "center",
  },
  emptyAction: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  stateCard: {
    borderRadius: radius.lg,
    gap: spacing.sm,
    padding: spacing.md,
  },
  stateBody: {
    maxWidth: 260,
  },
  formField: {
    gap: spacing.xs,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    color: colors.textPrimary,
    fontSize: typography.body.fontSize,
    minHeight: 56,
    paddingHorizontal: spacing.md,
  },
  textArea: {
    minHeight: 112,
    paddingTop: spacing.md,
    textAlignVertical: "top",
  },
  navigationWrap: {
    bottom: layout.bottomNavigationOffset,
    left: 0,
    paddingHorizontal: spacing.xl,
    position: "absolute",
    right: 0,
  },
  navigationPill: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "rgba(29, 38, 64, 0.86)",
    borderRadius: radius.pill,
    flexDirection: "row",
    gap: spacing.xs,
    padding: spacing.xs,
    ...shadows.floating,
  },
  navigationItem: {
    alignItems: "center",
    borderRadius: radius.pill,
    flexDirection: "row",
    gap: spacing.xs,
    minHeight: 52,
    minWidth: 52,
    justifyContent: "center",
    paddingHorizontal: spacing.md,
  },
  navigationItemActive: {
    backgroundColor: colors.accent,
  },
});
