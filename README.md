# ZeroTrace VPN

A modern VPN application built with React Native (Expo) featuring a beautiful UI and modular VPN protocol support.

## Project Structure

```
ZeroTraceVpn/
├── src/
│   ├── components/          # Reusable UI components
│   ├── screens/             # Screen components
│   │   ├── SplashScreen.tsx
│   │   ├── OnboardingScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── ServerListScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   └── ConnectionTypeScreen.tsx
│   ├── navigation/          # Navigation setup
│   │   ├── AppNavigator.tsx
│   │   ├── MainNavigator.tsx
│   │   └── types.ts
│   ├── theme/               # Theme configuration
│   │   ├── theme.ts
│   │   └── index.ts
│   └── services/            # Business logic & VPN services
│       └── vpn/
│           ├── VpnServiceInterface.ts
│           ├── VpnServiceMock.ts
│           └── index.ts
├── App.tsx                  # Main app entry point
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── babel.config.js
```

## Features

- ✅ **Modular Architecture**: UI separated from VPN logic
- ✅ **VPN Service Interface**: Easy to swap between WireGuard/OpenVPN
- ✅ **Beautiful UI**: Based on Figma design with consistent theming
- ✅ **Navigation**: React Navigation with Splash → Onboarding → Main flow
- ✅ **Theme System**: Centralized colors, fonts, and spacing
- ✅ **TypeScript**: Full type safety

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on iOS:
```bash
npm run ios
```

4. Run on Android:
```bash
npm run android
```

## VPN Service Implementation

The app uses a mock VPN service for UI development. To implement actual VPN functionality:

1. Create a new service class (e.g., `WireGuardService.ts` or `OpenVpnService.ts`)
2. Implement the `VpnServiceInterface` interface
3. Replace `VpnServiceMock` with your implementation in the screens

Example:
```typescript
import { VpnServiceInterface } from './VpnServiceInterface';

export class WireGuardService implements VpnServiceInterface {
  // Implement all interface methods
}
```

## Theme

The theme is defined in `src/theme/theme.ts` and includes:
- Colors (primary, dark, grey variants)
- Typography (fonts, sizes, line heights)
- Spacing
- Border radius

All values are based on the Figma design.

## Navigation

- **Splash Screen**: Initial loading screen
- **Onboarding**: First-time user introduction
- **Main Navigator**: 
  - Home (Dashboard)
  - Server List
  - Settings
  - Connection Type

## Development Notes

- All UI components are "dumb" components - they receive props and display UI
- VPN logic is handled through the service interface
- The mock service simulates VPN behavior for UI testing
- Replace placeholders (icons, images) with actual assets

## Next Steps

1. Add actual VPN protocol implementations (WireGuard/OpenVPN)
2. Add authentication/onboarding persistence
3. Add real server data fetching
4. Add animations and transitions
5. Add error handling and loading states
6. Add unit and integration tests

