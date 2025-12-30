# ZeroTrace VPN - Project Structure

## Complete Folder Structure

```
ZeroTraceVpn/
├── .expo/                      # Expo configuration
│   └── settings.json
├── src/                        # Source code directory
│   ├── components/            # Reusable UI components
│   │   ├── Button.tsx         # Button component
│   │   ├── Card.tsx           # Card component
│   │   └── index.ts          # Component exports
│   ├── navigation/            # Navigation setup
│   │   ├── AppNavigator.tsx   # Root navigator (Splash → Onboarding → Main)
│   │   ├── MainNavigator.tsx  # Main app navigator (Home, Settings, etc.)
│   │   ├── types.ts          # Navigation type definitions
│   │   └── index.ts          # Navigation exports
│   ├── screens/               # Screen components
│   │   ├── SplashScreen.tsx   # Initial splash screen
│   │   ├── OnboardingScreen.tsx # First-time user onboarding
│   │   ├── HomeScreen.tsx     # Main dashboard/home screen
│   │   ├── ServerListScreen.tsx # Server selection screen
│   │   ├── SettingsScreen.tsx # Settings screen
│   │   ├── ConnectionTypeScreen.tsx # VPN protocol selection
│   │   └── index.ts          # Screen exports
│   ├── services/              # Business logic & services
│   │   └── vpn/               # VPN service module
│   │       ├── VpnServiceInterface.ts  # VPN interface contract
│   │       ├── VpnServiceMock.ts         # Mock implementation for UI dev
│   │       ├── index.ts                 # Service exports
│   │       └── README.md                # VPN service documentation
│   └── theme/                 # Theme configuration
│       ├── theme.ts           # Theme definitions (colors, fonts, spacing)
│       └── index.ts          # Theme exports
├── App.tsx                    # Main app entry point
├── app.json                   # Expo app configuration
├── babel.config.js           # Babel configuration (NativeWind)
├── metro.config.js            # Metro bundler configuration
├── nativewind-env.d.ts       # NativeWind TypeScript definitions
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── README.md                 # Project documentation
└── PROJECT_STRUCTURE.md      # This file
```

## Key Design Decisions

### 1. Separation of Concerns
- **UI Components** (`src/components/`): Reusable, "dumb" components
- **Screens** (`src/screens/`): Screen-level components that compose UI components
- **Services** (`src/services/`): Business logic, API calls, VPN functionality
- **Theme** (`src/theme/`): Centralized design tokens

### 2. VPN Service Architecture
- **Interface-based**: `VpnServiceInterface` defines the contract
- **Mock Implementation**: `VpnServiceMock` for UI development
- **Easy to Swap**: Replace mock with WireGuard/OpenVPN without UI changes

### 3. Navigation Flow
```
Splash Screen
    ↓
Onboarding Screen (first time only)
    ↓
Main Navigator
    ├── Home Screen (Dashboard)
    ├── Server List Screen
    ├── Settings Screen
    └── Connection Type Screen
```

### 4. Styling Approach
- **NativeWind**: Tailwind CSS for React Native
- **Theme System**: Centralized colors, fonts, spacing from Figma
- **Consistent**: All styles reference theme values

## Next Steps for Implementation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Add Assets**
   - Logo images (SVG/PNG)
   - Country flags
   - Icons (or use icon library like `@expo/vector-icons`)

3. **Implement VPN Protocols**
   - Create `WireGuardService.ts` implementing `VpnServiceInterface`
   - Create `OpenVpnService.ts` implementing `VpnServiceInterface`
   - Replace `VpnServiceMock` in screens with actual implementation

4. **Add Features**
   - Authentication/User accounts
   - Server data fetching from API
   - Connection persistence
   - Error handling
   - Loading states
   - Animations

5. **Testing**
   - Unit tests for services
   - Component tests
   - Integration tests
   - E2E tests

## File Naming Conventions

- **Components**: PascalCase (e.g., `Button.tsx`)
- **Screens**: PascalCase with "Screen" suffix (e.g., `HomeScreen.tsx`)
- **Services**: PascalCase with "Service" suffix (e.g., `VpnServiceMock.ts`)
- **Types/Interfaces**: PascalCase (e.g., `VpnServiceInterface.ts`)
- **Utilities**: camelCase (e.g., `formatTime.ts`)

## Import Patterns

```typescript
// Theme
import { theme } from '../theme';

// Services
import { VpnServiceMock, VpnConnectionStatus } from '../services/vpn';

// Navigation
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

// Components
import { Button, Card } from '../components';
```

