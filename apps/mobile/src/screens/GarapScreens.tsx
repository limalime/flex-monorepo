import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import {
  AppText,
  Card,
  DonutChart,
  EmptyState,
  FormField,
  GhostButton,
  GradientButton,
  LineChart,
  MetricCard,
  MiniBarChart,
  ProjectCard,
  QuickAction,
  ScreenName,
  ScreenShell,
  SectionHeader,
  StateCard,
  StatusPill,
  TaskRow,
  Tone,
  screenStyles,
} from "../design-system/components";
import { colors, gradients, radius, spacing } from "../design-system/tokens";

type Project = {
  name: string;
  client: string;
  value: string;
  progress: number;
  status: string;
  tone: Tone;
};

type Task = {
  title: string;
  meta: string;
  checked: boolean;
  tone?: Tone;
};

const projects: Project[] = [
  {
    name: "ZK Quest Sprint",
    client: "Polygon Guild",
    value: "$4,800",
    progress: 72,
    status: "Active",
    tone: "primary",
  },
  {
    name: "Airdrop Ops",
    client: "LayerZero hunt",
    value: "$1,250",
    progress: 38,
    status: "Pending",
    tone: "warning",
  },
  {
    name: "Bounty Audit",
    client: "Safe DAO",
    value: "$9,200",
    progress: 91,
    status: "Winning",
    tone: "success",
  },
];

const tasks: Task[] = [
  {
    title: "Submit Orbit contest proof",
    meta: "Due today · 2.4 ETH pool",
    checked: false,
    tone: "warning",
  },
  {
    title: "Invoice zkSync landing work",
    meta: "Ready · $3,200 milestone",
    checked: false,
    tone: "success",
  },
  {
    title: "Review wallet test notes",
    meta: "Completed · Base bounty",
    checked: true,
    tone: "primary",
  },
];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

export function GarapApp() {
  const [activeScreen, setActiveScreen] = useState<ScreenName>("Landing");

  return (
    <ScreenShell
      activeScreen={activeScreen}
      onNavigate={setActiveScreen}
      showBottomNavigation={
        activeScreen !== "Landing" && activeScreen !== "Onboarding"
      }
    >
      {renderScreen(activeScreen, setActiveScreen)}
    </ScreenShell>
  );
}

function renderScreen(
  activeScreen: ScreenName,
  onNavigate: (screen: ScreenName) => void,
) {
  switch (activeScreen) {
    case "Landing":
      return <LandingScreen onNavigate={onNavigate} />;
    case "Onboarding":
      return <OnboardingScreen onNavigate={onNavigate} />;
    case "Projects":
      return <ProjectsScreen onNavigate={onNavigate} />;
    case "Project Detail":
      return <ProjectDetailScreen onNavigate={onNavigate} />;
    case "Create Project":
      return <CreateProjectScreen onNavigate={onNavigate} />;
    case "Tasks":
      return <TasksScreen />;
    case "Calendar":
      return <CalendarScreen />;
    case "Notes":
      return <NotesScreen />;
    case "Analytics":
      return <AnalyticsScreen />;
    case "Settings":
      return <SettingsScreen />;
    case "Dashboard":
    default:
      return <DashboardScreen onNavigate={onNavigate} />;
  }
}

function LandingScreen({
  onNavigate,
}: {
  onNavigate: (screen: ScreenName) => void;
}) {
  return (
    <View style={screenStyles.largeStack}>
      <View style={styles.brandRow}>
        <LinearGradient colors={gradients.hero} style={styles.logoMark}>
          <AppText variant="h2" color={colors.background}>
            G
          </AppText>
        </LinearGradient>
        <View>
          <AppText variant="caption" color={colors.textTertiary}>
            Garap
          </AppText>
          <AppText variant="micro" color={colors.secondary}>
            Crypto productivity OS
          </AppText>
        </View>
      </View>
      <Card gradient style={styles.landingHero}>
        <StatusPill label="Dark mode default" tone="primary" />
        <AppText variant="display" style={screenStyles.heroTitle}>
          Track every bounty, airdrop, contest, and solo build.
        </AppText>
        <AppText
          variant="body"
          color={colors.textSecondary}
          style={screenStyles.heroCopy}
        >
          Premium Android workspace with portfolio-style revenue analytics,
          deadlines, notes, and task execution.
        </AppText>
        <View style={styles.heroStats}>
          <View>
            <AppText variant="h1">$18.4k</AppText>
            <AppText variant="caption" color={colors.textTertiary}>
              open pipeline
            </AppText>
          </View>
          <View>
            <AppText variant="h1">74%</AppText>
            <AppText variant="caption" color={colors.textTertiary}>
              win rate
            </AppText>
          </View>
        </View>
      </Card>
      <View style={screenStyles.row}>
        <GradientButton
          label="Start tracking"
          onPress={() => onNavigate("Onboarding")}
          style={styles.flexButton}
        />
        <GhostButton
          label="Preview app"
          onPress={() => onNavigate("Dashboard")}
        />
      </View>
      <View style={screenStyles.grid}>
        <MetricCard label="Bounties" value="16" delta="+4 this week" />
        <MetricCard
          label="Airdrops"
          value="28"
          delta="8 hot leads"
          tone="success"
        />
      </View>
    </View>
  );
}

function OnboardingScreen({
  onNavigate,
}: {
  onNavigate: (screen: ScreenName) => void;
}) {
  const steps = [
    {
      title: "Capture every opportunity",
      body: "Create project records for freelance work, DAO bounties, airdrop tasks, contests, and indie builds.",
      tone: "primary" as Tone,
    },
    {
      title: "Prioritize like a portfolio",
      body: "Score revenue, probability, deadlines, and effort in one crypto-native dashboard.",
      tone: "success" as Tone,
    },
    {
      title: "Ship with calm focus",
      body: "Daily tasks, calendar pressure, notes, and success states keep every deliverable moving.",
      tone: "warning" as Tone,
    },
  ];

  return (
    <View style={screenStyles.largeStack}>
      <View>
        <AppText variant="h1">Build your hunter command center</AppText>
        <AppText
          variant="body"
          color={colors.textSecondary}
          style={screenStyles.heroCopy}
        >
          Three focused setup cards establish Garap as a premium productivity
          layer.
        </AppText>
      </View>
      {steps.map((step, index) => (
        <Card
          key={step.title}
          style={styles.onboardingCard}
          gradient={index === 0}
        >
          <View
            style={[
              styles.stepIndex,
              { backgroundColor: `${toneColor(step.tone)}22` },
            ]}
          >
            <AppText variant="caption" color={toneColor(step.tone)}>
              0{index + 1}
            </AppText>
          </View>
          <View style={styles.onboardingCopy}>
            <AppText variant="h2">{step.title}</AppText>
            <AppText variant="body" color={colors.textSecondary}>
              {step.body}
            </AppText>
          </View>
        </Card>
      ))}
      <View style={styles.progressDots}>
        <View style={styles.dotActive} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
      <GradientButton
        label="Open dashboard"
        onPress={() => onNavigate("Dashboard")}
      />
    </View>
  );
}

function DashboardScreen({
  onNavigate,
}: {
  onNavigate: (screen: ScreenName) => void;
}) {
  return (
    <View style={screenStyles.largeStack}>
      <View style={styles.welcomeCard}>
        <View>
          <AppText variant="caption" color={colors.textTertiary}>
            Welcome back, Lima
          </AppText>
          <AppText variant="h1">You have 5 high-value moves today.</AppText>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => onNavigate("Settings")}
          style={styles.avatar}
        >
          <AppText variant="caption" color={colors.background}>
            LI
          </AppText>
        </Pressable>
      </View>
      <View style={screenStyles.grid}>
        <MetricCard
          label="Revenue"
          value="$12.8k"
          delta="+18.4%"
          tone="success"
        />
        <MetricCard label="Pipeline" value="$31.2k" delta="+6 opps" />
        <MetricCard
          label="Win Rate"
          value="74%"
          delta="+9 pts"
          tone="success"
        />
        <MetricCard
          label="Overdue"
          value="2"
          delta="needs focus"
          tone="danger"
        />
      </View>
      <Card style={screenStyles.stack}>
        <SectionHeader title="Revenue chart" action="6 months" />
        <MiniBarChart values={[42, 58, 46, 76, 62, 94]} tone="primary" />
        <View style={styles.monthLabels}>
          {months.map((month) => (
            <AppText key={month} variant="micro" color={colors.textTertiary}>
              {month}
            </AppText>
          ))}
        </View>
      </Card>
      <Card style={screenStyles.stack}>
        <SectionHeader title="Upcoming deadlines" action="View calendar" />
        <DeadlineRow
          title="Orbit proof submission"
          meta="Today, 19:00"
          tone="warning"
        />
        <DeadlineRow
          title="Safe DAO audit report"
          meta="Tomorrow, 09:30"
          tone="primary"
        />
        <DeadlineRow
          title="Airdrop wallet rotation"
          meta="Friday, 15:00"
          tone="success"
        />
      </Card>
      <View style={screenStyles.stack}>
        <SectionHeader title="Today's tasks" action="Open tasks" />
        {tasks.map((task) => (
          <TaskRow key={task.title} {...task} />
        ))}
      </View>
      <View style={screenStyles.grid}>
        <QuickAction
          label="New project"
          detail="Track bounty"
          tone="primary"
          onPress={() => onNavigate("Create Project")}
        />
        <QuickAction
          label="Add note"
          detail="Save alpha"
          tone="success"
          onPress={() => onNavigate("Notes")}
        />
        <QuickAction
          label="Analytics"
          detail="Review wins"
          tone="warning"
          onPress={() => onNavigate("Analytics")}
        />
        <QuickAction
          label="Project detail"
          detail="Open sprint"
          tone="danger"
          onPress={() => onNavigate("Project Detail")}
        />
      </View>
    </View>
  );
}

function ProjectsScreen({
  onNavigate,
}: {
  onNavigate: (screen: ScreenName) => void;
}) {
  return (
    <View style={screenStyles.largeStack}>
      <View style={styles.titleRow}>
        <View>
          <AppText variant="h1">Projects</AppText>
          <AppText variant="body" color={colors.textSecondary}>
            Active work ranked by upside, deadline, and probability.
          </AppText>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => onNavigate("Create Project")}
          style={styles.floatingAdd}
        >
          <AppText variant="h2" color={colors.background}>
            +
          </AppText>
        </Pressable>
      </View>
      <View style={styles.filterRow}>
        <FilterChip label="All" active />
        <FilterChip label="Bounties" />
        <FilterChip label="Airdrops" />
        <FilterChip label="Builds" />
      </View>
      {projects.map((project) => (
        <ProjectCard
          key={project.name}
          {...project}
          onPress={() => onNavigate("Project Detail")}
        />
      ))}
      <EmptyState
        title="No archived contests"
        body="Finished contest work will appear here with win/loss and payout records."
        action="Archive appears automatically"
        tone="muted"
      />
    </View>
  );
}

function ProjectDetailScreen({
  onNavigate,
}: {
  onNavigate: (screen: ScreenName) => void;
}) {
  return (
    <View style={screenStyles.largeStack}>
      <Card gradient style={screenStyles.stack}>
        <StatusPill label="Active sprint" tone="primary" />
        <AppText variant="h1">ZK Quest Sprint</AppText>
        <AppText variant="body" color={colors.textSecondary}>
          Deliver a quest landing page, wallet checklist, and final proof
          package for Polygon Guild.
        </AppText>
        <View style={screenStyles.grid}>
          <MetricCard
            label="Payout"
            value="$4.8k"
            delta="USDC"
            tone="success"
          />
          <MetricCard
            label="Due In"
            value="3d"
            delta="priority"
            tone="warning"
          />
        </View>
      </Card>
      <Card style={screenStyles.stack}>
        <SectionHeader title="Milestone progress" action="72%" />
        <View style={styles.largeProgressTrack}>
          <LinearGradient
            colors={gradients.hero}
            style={styles.largeProgressFill}
          />
        </View>
        <View style={styles.timeline}>
          <TimelineItem title="Brief" status="Done" tone="success" />
          <TimelineItem title="Prototype" status="Done" tone="success" />
          <TimelineItem title="Submission" status="Now" tone="warning" />
          <TimelineItem title="Payout" status="Next" tone="muted" />
        </View>
      </Card>
      <Card style={screenStyles.stack}>
        <SectionHeader title="Project tasks" action="5 open" />
        <TaskRow
          title="Compress proof video"
          meta="30 min · high confidence"
          checked={false}
        />
        <TaskRow
          title="Ship mobile responsive pass"
          meta="1.5 hrs · visual QA"
          checked={false}
        />
        <TaskRow
          title="Create wallet evidence bundle"
          meta="Done yesterday"
          checked
        />
      </Card>
      <StateCard
        title="Success state"
        body="Milestone accepted. Payout tracking and testimonial prompts unlock after completion."
        tone="success"
      />
      <GradientButton
        label="Create similar project"
        onPress={() => onNavigate("Create Project")}
      />
    </View>
  );
}

function CreateProjectScreen({
  onNavigate,
}: {
  onNavigate: (screen: ScreenName) => void;
}) {
  return (
    <View style={screenStyles.largeStack}>
      <View>
        <AppText variant="h1">Create project</AppText>
        <AppText
          variant="body"
          color={colors.textSecondary}
          style={screenStyles.heroCopy}
        >
          Fast capture for opportunities before they disappear from Discord, X,
          or bounty boards.
        </AppText>
      </View>
      <Card style={screenStyles.stack}>
        <FormField label="Project name" value="Base Builder Grant" />
        <FormField label="Category" value="Bounty · Onchain UX" />
        <FormField label="Expected payout" value="$6,500 USDC" />
        <FormField label="Deadline" value="June 28, 2026 · 22:00" />
        <FormField
          label="Notes"
          multiline
          value="Need prototype, short demo video, wallet proof, and final thread."
        />
      </Card>
      <Card style={screenStyles.stack}>
        <SectionHeader title="Priority score" action="82 / 100" />
        <View style={screenStyles.grid}>
          <ScorePill label="Revenue" value="High" tone="success" />
          <ScorePill label="Deadline" value="Near" tone="warning" />
          <ScorePill label="Confidence" value="Medium" tone="primary" />
          <ScorePill label="Effort" value="Low" tone="success" />
        </View>
      </Card>
      <View style={screenStyles.row}>
        <GradientButton
          label="Save project"
          onPress={() => onNavigate("Project Detail")}
          style={styles.flexButton}
        />
        <GhostButton label="Cancel" onPress={() => onNavigate("Projects")} />
      </View>
      <StateCard
        title="Error state"
        body="Missing payout data is highlighted before a project can enter active tracking."
        tone="danger"
      />
    </View>
  );
}

function TasksScreen() {
  return (
    <View style={screenStyles.largeStack}>
      <View>
        <AppText variant="h1">Tasks</AppText>
        <AppText variant="body" color={colors.textSecondary}>
          A calm execution list for high-leverage crypto work.
        </AppText>
      </View>
      <View style={styles.filterRow}>
        <FilterChip label="Today" active />
        <FilterChip label="Upcoming" />
        <FilterChip label="Won" />
        <FilterChip label="Risk" />
      </View>
      <Card style={screenStyles.stack}>
        <SectionHeader title="Focus queue" action="5 tasks" />
        {tasks.map((task) => (
          <TaskRow key={task.title} {...task} />
        ))}
        <TaskRow
          title="DM contest steward"
          meta="Blocked · needs payout clarification"
          checked={false}
          tone="danger"
        />
      </Card>
      <EmptyState
        title="Inbox zero"
        body="Captured tasks from new opportunities land here before being assigned to a project."
        action="No loose tasks"
        tone="success"
      />
    </View>
  );
}

function CalendarScreen() {
  const days = Array.from({ length: 35 }, (_, index) => index + 1);

  return (
    <View style={screenStyles.largeStack}>
      <View>
        <AppText variant="h1">Calendar</AppText>
        <AppText variant="body" color={colors.textSecondary}>
          Deadline pressure without the harsh calendar UI.
        </AppText>
      </View>
      <Card style={screenStyles.stack}>
        <SectionHeader title="June 2026" action="3 hot dates" />
        <View style={styles.calendarGrid}>
          {days.map((day) => {
            const active = day === 12 || day === 18 || day === 26;

            return (
              <View
                key={day}
                style={[styles.calendarDay, active && styles.calendarDayActive]}
              >
                <AppText
                  variant="caption"
                  color={active ? colors.background : colors.textSecondary}
                >
                  {day}
                </AppText>
              </View>
            );
          })}
        </View>
      </Card>
      <Card style={screenStyles.stack}>
        <SectionHeader title="Deadline stack" />
        <DeadlineRow
          title="Orbit proof submission"
          meta="Jun 12 · 19:00"
          tone="warning"
        />
        <DeadlineRow
          title="Safe DAO report"
          meta="Jun 18 · 09:30"
          tone="primary"
        />
        <DeadlineRow
          title="Base grant demo"
          meta="Jun 26 · 22:00"
          tone="success"
        />
      </Card>
    </View>
  );
}

function NotesScreen() {
  return (
    <View style={screenStyles.largeStack}>
      <View>
        <AppText variant="h1">Notes</AppText>
        <AppText variant="body" color={colors.textSecondary}>
          Save alpha, client context, payout rules, and proof snippets.
        </AppText>
      </View>
      <Card gradient style={screenStyles.stack}>
        <StatusPill label="Pinned alpha" tone="primary" />
        <AppText variant="h2">Airdrop criteria changed</AppText>
        <AppText variant="body" color={colors.textSecondary}>
          New Base campaign rewards weekly streaks and verified builder
          activity. Rebalance task weight toward commits and forum replies.
        </AppText>
      </Card>
      <View style={screenStyles.grid}>
        <NoteTile
          title="Contest rubric"
          body="Judges favor shipped demos with clean walkthroughs."
        />
        <NoteTile
          title="Wallet hygiene"
          body="Rotate claim wallet before final campaign window."
        />
      </View>
      <EmptyState
        title="Empty research board"
        body="Create a note from any project to collect links, risks, and claim instructions."
        action="Ready for first note"
      />
    </View>
  );
}

function AnalyticsScreen() {
  return (
    <View style={screenStyles.largeStack}>
      <View>
        <AppText variant="h1">Analytics</AppText>
        <AppText variant="body" color={colors.textSecondary}>
          Crypto portfolio style reporting for your freelance and bounty
          pipeline.
        </AppText>
      </View>
      <Card gradient style={screenStyles.stack}>
        <SectionHeader title="Portfolio view" action="+22.8%" />
        <DonutChart
          segments={[
            { label: "Freelance", value: "$8.2k", tone: "primary", width: 78 },
            { label: "Bounties", value: "$6.4k", tone: "success", width: 62 },
            { label: "Airdrops", value: "$3.8k", tone: "warning", width: 44 },
          ]}
        />
      </Card>
      <Card style={screenStyles.stack}>
        <SectionHeader title="Monthly revenue" action="$12.8k" />
        <LineChart values={[28, 46, 38, 66, 58, 88]} tone="success" />
      </Card>
      <Card style={screenStyles.stack}>
        <SectionHeader title="Project performance" action="Top categories" />
        <PerformanceRow
          label="Bounty audits"
          value="$9.2k"
          percent={82}
          tone="success"
        />
        <PerformanceRow
          label="Landing builds"
          value="$4.8k"
          percent={64}
          tone="primary"
        />
        <PerformanceRow
          label="Airdrop tasks"
          value="$1.8k"
          percent={36}
          tone="warning"
        />
      </Card>
      <View style={screenStyles.grid}>
        <MetricCard label="Wins" value="14" delta="+5 MoM" tone="success" />
        <MetricCard label="Losses" value="5" delta="-2 MoM" tone="danger" />
        <MetricCard
          label="Avg Payout"
          value="$914"
          delta="+31%"
          tone="primary"
        />
        <MetricCard
          label="Hit Rate"
          value="74%"
          delta="strong"
          tone="success"
        />
      </View>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={screenStyles.largeStack}>
      <Card gradient style={styles.profileCard}>
        <View style={styles.profileAvatar}>
          <AppText variant="h2" color={colors.background}>
            LI
          </AppText>
        </View>
        <View style={styles.profileCopy}>
          <AppText variant="h2">Lima</AppText>
          <AppText variant="body" color={colors.textSecondary}>
            Solo builder · bounty hunter
          </AppText>
        </View>
      </Card>
      <Card style={screenStyles.stack}>
        <SectionHeader title="Workspace" />
        <SettingRow label="Dark mode" value="Default" />
        <SettingRow label="Currency" value="USD / ETH" />
        <SettingRow label="Notifications" value="Deadline smart nudges" />
        <SettingRow label="Data sync" value="Private cloud vault" />
      </Card>
      <Card style={screenStyles.stack}>
        <SectionHeader title="States" />
        <StateCard
          title="Success"
          body="All project automations are synced and deadline reminders are healthy."
          tone="success"
        />
        <StateCard
          title="Warning"
          body="Two projects have deadlines inside 24 hours and need prioritization."
          tone="warning"
        />
        <StateCard
          title="Error"
          body="A payout wallet is missing for one archived bounty."
          tone="danger"
        />
      </Card>
    </View>
  );
}

function DeadlineRow({
  title,
  meta,
  tone,
}: {
  title: string;
  meta: string;
  tone: Tone;
}) {
  return (
    <View style={styles.deadlineRow}>
      <View
        style={[styles.deadlineAccent, { backgroundColor: toneColor(tone) }]}
      />
      <View style={styles.deadlineCopy}>
        <AppText variant="body">{title}</AppText>
        <AppText variant="caption" color={colors.textTertiary}>
          {meta}
        </AppText>
      </View>
    </View>
  );
}

function FilterChip({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <View style={[styles.filterChip, active && styles.filterChipActive]}>
      <AppText
        variant="caption"
        color={active ? colors.background : colors.textSecondary}
      >
        {label}
      </AppText>
    </View>
  );
}

function TimelineItem({
  title,
  status,
  tone,
}: {
  title: string;
  status: string;
  tone: Tone;
}) {
  return (
    <View style={styles.timelineItem}>
      <View
        style={[styles.timelineDot, { backgroundColor: toneColor(tone) }]}
      />
      <AppText variant="caption">{title}</AppText>
      <AppText variant="micro" color={toneColor(tone)}>
        {status}
      </AppText>
    </View>
  );
}

function ScorePill({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: Tone;
}) {
  return (
    <View style={styles.scorePill}>
      <AppText variant="micro" color={colors.textTertiary}>
        {label}
      </AppText>
      <AppText variant="caption" color={toneColor(tone)}>
        {value}
      </AppText>
    </View>
  );
}

function NoteTile({ title, body }: { title: string; body: string }) {
  return (
    <Card style={[screenStyles.half, styles.noteTile]}>
      <AppText variant="h3">{title}</AppText>
      <AppText variant="caption" color={colors.textSecondary}>
        {body}
      </AppText>
    </Card>
  );
}

function PerformanceRow({
  label,
  value,
  percent,
  tone,
}: {
  label: string;
  value: string;
  percent: number;
  tone: Tone;
}) {
  return (
    <View style={styles.performanceRow}>
      <View style={styles.performanceCopy}>
        <AppText variant="caption">{label}</AppText>
        <AppText variant="caption" color={colors.textSecondary}>
          {value}
        </AppText>
      </View>
      <View style={styles.performanceTrack}>
        <View
          style={[
            styles.performanceFill,
            {
              backgroundColor: toneColor(tone),
              width: `${percent}%`,
            },
          ]}
        />
      </View>
    </View>
  );
}

function SettingRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.settingRow}>
      <AppText variant="body">{label}</AppText>
      <AppText variant="caption" color={colors.textTertiary}>
        {value}
      </AppText>
    </View>
  );
}

function toneColor(tone: Tone) {
  switch (tone) {
    case "success":
      return colors.success;
    case "warning":
      return colors.warning;
    case "danger":
      return colors.danger;
    case "muted":
      return colors.textTertiary;
    case "primary":
    default:
      return colors.primary;
  }
}

const styles = StyleSheet.create({
  brandRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
  },
  logoMark: {
    alignItems: "center",
    borderRadius: radius.xl,
    height: 58,
    justifyContent: "center",
    width: 58,
  },
  landingHero: {
    gap: spacing.lg,
    minHeight: 410,
    justifyContent: "space-between",
  },
  heroStats: {
    backgroundColor: "rgba(16, 21, 34, 0.42)",
    borderRadius: radius.xl,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: spacing.lg,
  },
  flexButton: {
    flex: 1,
  },
  onboardingCard: {
    flexDirection: "row",
    gap: spacing.lg,
  },
  stepIndex: {
    alignItems: "center",
    borderRadius: radius.lg,
    height: 52,
    justifyContent: "center",
    width: 52,
  },
  onboardingCopy: {
    flex: 1,
    gap: spacing.sm,
  },
  progressDots: {
    alignSelf: "center",
    flexDirection: "row",
    gap: spacing.xs,
  },
  dot: {
    backgroundColor: colors.muted,
    borderRadius: radius.pill,
    height: 8,
    width: 8,
  },
  dotActive: {
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    height: 8,
    width: 28,
  },
  welcomeCard: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  avatar: {
    alignItems: "center",
    backgroundColor: colors.accent,
    borderRadius: radius.xl,
    height: 54,
    justifyContent: "center",
    width: 54,
  },
  monthLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deadlineRow: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.md,
  },
  deadlineAccent: {
    borderRadius: radius.pill,
    height: 38,
    width: 5,
  },
  deadlineCopy: {
    flex: 1,
    gap: spacing.xxs,
  },
  titleRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between",
  },
  floatingAdd: {
    alignItems: "center",
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    height: 56,
    justifyContent: "center",
    width: 56,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
  },
  filterChip: {
    backgroundColor: colors.glass,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  filterChipActive: {
    backgroundColor: colors.accent,
  },
  largeProgressTrack: {
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    height: 16,
    overflow: "hidden",
  },
  largeProgressFill: {
    borderRadius: radius.pill,
    height: "100%",
    width: "72%",
  },
  timeline: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timelineItem: {
    alignItems: "center",
    gap: spacing.xs,
  },
  timelineDot: {
    borderRadius: radius.pill,
    height: 14,
    width: 14,
  },
  scorePill: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    flexBasis: "47%",
    flexGrow: 1,
    gap: spacing.xs,
    padding: spacing.md,
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
  },
  calendarDay: {
    alignItems: "center",
    aspectRatio: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    justifyContent: "center",
    width: "13.1%",
  },
  calendarDayActive: {
    backgroundColor: colors.accent,
  },
  noteTile: {
    gap: spacing.sm,
    minHeight: 150,
  },
  performanceRow: {
    gap: spacing.sm,
  },
  performanceCopy: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  performanceTrack: {
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    height: 10,
    overflow: "hidden",
  },
  performanceFill: {
    borderRadius: radius.pill,
    height: "100%",
  },
  profileCard: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.lg,
  },
  profileAvatar: {
    alignItems: "center",
    backgroundColor: colors.accent,
    borderRadius: radius.xxl,
    height: 76,
    justifyContent: "center",
    width: 76,
  },
  profileCopy: {
    flex: 1,
  },
  settingRow: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: spacing.md,
  },
});
