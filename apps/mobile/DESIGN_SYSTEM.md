# Garap mobile design system

Garap is a dark-first Android productivity interface for crypto freelancers, bounty hunters, airdrop hunters, contest participants, and solo builders.

## Color tokens

| Token        | Hex       | Usage                                           |
| ------------ | --------- | ----------------------------------------------- |
| `primary`    | `#758BFD` | Primary CTAs, active navigation, key highlights |
| `secondary`  | `#8FA4FF` | Secondary emphasis and chart fills              |
| `accent`     | `#A5B8FF` | Soft accents, empty states, gradients           |
| `background` | `#101522` | App canvas                                      |
| `card`       | `#171E2F` | Elevated cards                                  |
| `surface`    | `#1D2640` | Controls, sheets, inputs                        |
| `success`    | `#4ADE80` | Won projects, positive revenue                  |
| `warning`    | `#FACC15` | Deadlines and pending work                      |
| `danger`     | `#F87171` | Lost projects, overdue work                     |

Supporting neutrals are `textPrimary #F8FAFC`, `textSecondary #B9C4E2`, `textTertiary #6F7EA6`, and glass overlays from `rgba(255,255,255,0.05)` to `rgba(255,255,255,0.12)`.

## Gradients

Gradient use is intentionally limited to roughly 20% of the UI:

- `hero`: `#758BFD → #A5B8FF`
- `card`: `rgba(117,139,253,0.22) → rgba(29,38,64,0.2)`
- `success`: `#4ADE80 → #8FA4FF`
- `danger`: `#F87171 → #758BFD`
- `glass`: translucent white-to-transparent overlays for premium surfaces

## Typography

Garap uses SF Pro Display for expressive headings and SF Pro Text for interface copy.

| Style   | Size | Line height | Weight |
| ------- | ---: | ----------: | ------ |
| Display |   38 |          44 | 800    |
| H1      |   30 |          36 | 800    |
| H2      |   24 |          30 | 700    |
| H3      |   20 |          26 | 700    |
| Body    |   16 |          24 | 500    |
| Caption |   13 |          18 | 600    |
| Micro   |   11 |          14 | 700    |

## Spacing and shape

Spacing follows an 8pt system with large mobile-first gaps: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64`. Primary cards use 24px radii, hero/sheet surfaces use 32px radii, and bottom navigation uses a 999px pill radius.

## Components

- `ScreenShell`: Safe-area dark canvas with screen preview rail and optional floating navigation.
- `Card`: Premium elevated surface with optional gradient treatment.
- `MetricCard`: Crypto portfolio style KPI card with trend pill.
- `GradientButton`: Primary Android CTA.
- `MiniBarChart`, `LineChart`, `DonutChart`: Lightweight chart primitives built with React Native views.
- `BottomNavigation`: Floating glass pill navigation.
- `ProjectCard`, `TaskRow`, `QuickAction`, `StatusPill`: Productivity primitives for Garap workflows.
- `EmptyState` and `StateCard`: Empty, success, warning, and error messaging states.

## Screen set

The app implements Landing, Onboarding, Dashboard, Projects List, Project Detail, Create Project, Tasks List, Calendar, Notes, Analytics, and Settings screens in `src/screens/GarapScreens.tsx`.
