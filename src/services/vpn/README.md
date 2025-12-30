# VPN Service Module

This module provides a clean interface for VPN functionality, allowing you to easily swap between different VPN protocols (WireGuard, OpenVPN) without changing the UI code.

## Architecture

### VpnServiceInterface

The `VpnServiceInterface` defines the contract that all VPN implementations must follow:

```typescript
interface VpnServiceInterface {
  getStatus(): Promise<VpnConnectionStatus>;
  connect(server: VpnServer): Promise<void>;
  disconnect(): Promise<void>;
  getServers(): Promise<VpnServer[]>;
  getStats(): Promise<VpnConnectionStats | null>;
  getCurrentServer(): Promise<VpnServer | null>;
  getProtocol(): VpnProtocol;
  initialize(): Promise<void>;
  cleanup(): Promise<void>;
}
```

### Current Implementation

- **VpnServiceMock**: A mock implementation for UI development that simulates VPN behavior without actual network connections.

## Creating a New VPN Implementation

To add WireGuard or OpenVPN support:

1. Create a new service class:

```typescript
// src/services/vpn/WireGuardService.ts
import { VpnServiceInterface, VpnConnectionStatus, VpnProtocol, VpnServer, VpnConnectionStats } from './VpnServiceInterface';

export class WireGuardService implements VpnServiceInterface {
  async getStatus(): Promise<VpnConnectionStatus> {
    // Implement WireGuard status check
  }

  async connect(server: VpnServer): Promise<void> {
    // Implement WireGuard connection
  }

  // ... implement all other methods
}
```

2. Update the service factory or dependency injection:

```typescript
// In your screen or service provider
import { WireGuardService } from './WireGuardService';

const vpnService = new WireGuardService();
```

3. The UI code remains unchanged - it works with any implementation of `VpnServiceInterface`.

## Usage Example

```typescript
import { VpnServiceMock } from './services/vpn';

const vpnService = new VpnServiceMock();

// Initialize
await vpnService.initialize();

// Get available servers
const servers = await vpnService.getServers();

// Connect to a server
await vpnService.connect(servers[0]);

// Get connection status
const status = await vpnService.getStatus();

// Get statistics
const stats = await vpnService.getStats();

// Disconnect
await vpnService.disconnect();

// Cleanup
await vpnService.cleanup();
```

## Future Implementations

### WireGuardService

Will use:
- `react-native-wireguard` or native modules
- WireGuard configuration files
- Key management

### OpenVpnService

Will use:
- `react-native-openvpn` or native modules
- OpenVPN configuration files
- Certificate management

