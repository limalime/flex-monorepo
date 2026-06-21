---
name: testing-garap-mobile
description: Test the Garap Expo mobile UI screen set and design-system flows. Use when verifying changes under apps/mobile.
---

# Testing Garap mobile

## Devin Secrets Needed

None. The Garap mobile app currently runs as a local static Expo UI with no backend, login, or API credentials.

## Setup

From the repo root, install workspace dependencies:

```sh
pnpm install
```

The mobile app lives in `apps/mobile`.

## Validated checks

Run these before reporting results:

```sh
pnpm --filter mobile lint
pnpm --filter mobile check-types
pnpm --filter mobile build
```

`pnpm --filter mobile build` exports the Android bundle via Expo.

## Visual runtime testing

Prefer Android emulator testing when `adb` and `emulator` are available in the environment. If Android tooling is unavailable, a browser-based Expo web fallback can still verify the React Native screen flow, but be explicit that it is not Android-native runtime coverage.

For web fallback, the app might need temporary local web runtime dependencies (`react-native-web`, `react-dom`, and `@expo/metro-runtime`). If you add them only for testing, save and restore tracked package files before finishing so the PR stays focused.

A proven fallback flow is:

```sh
pnpm --filter mobile exec expo export --platform web --output-dir /home/ubuntu/garap-web-export
(cd /home/ubuntu/garap-web-export && python3 -m http.server 8080)
```

Then open `http://localhost:8080` in Chrome.

## Core screen assertions

Verify the full Garap flow visually:

1. Landing shows Garap branding, hero copy, `$18.4k`, `74%`, `Start tracking`, and `Preview app`.
2. `Start tracking` opens onboarding with the three setup cards and `Open dashboard`.
3. `Open dashboard` opens Dashboard with KPI cards, revenue chart, deadlines, tasks, quick actions, and floating bottom nav.
4. `New project` opens Create Project with form fields, priority score, save CTA, and error state.
5. Screen rail reaches Project Detail, Projects, Notes, and Settings.
6. Floating bottom nav reaches Tasks, Calendar, and Analytics.

When recording, annotate each major screen transition and one consolidated assertion per screen group.