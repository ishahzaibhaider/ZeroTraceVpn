/**
 * Mock VPN Service Implementation
 * 
 * This is a placeholder implementation for UI development.
 * It simulates VPN behavior without actual VPN functionality.
 * Replace this with WireGuardService or OpenVpnService when ready.
 */

import {
  VpnServiceInterface,
  VpnConnectionStatus,
  VpnProtocol,
  VpnServer,
  VpnConnectionStats,
} from './VpnServiceInterface';

export class VpnServiceMock implements VpnServiceInterface {
  private status: VpnConnectionStatus = VpnConnectionStatus.DISCONNECTED;
  private currentServer: VpnServer | null = null;
  private stats: VpnConnectionStats | null = null;
  private connectionStartTime: number | null = null;

  async getStatus(): Promise<VpnConnectionStatus> {
    return this.status;
  }

  async connect(server: VpnServer): Promise<void> {
    this.status = VpnConnectionStatus.CONNECTING;
    
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    this.status = VpnConnectionStatus.CONNECTED;
    this.currentServer = server;
    this.connectionStartTime = Date.now();
    this.stats = {
      uploadSpeed: 0,
      downloadSpeed: 0,
      bytesUploaded: 0,
      bytesDownloaded: 0,
      connectedDuration: 0,
    };
  }

  async disconnect(): Promise<void> {
    this.status = VpnConnectionStatus.DISCONNECTING;
    
    // Simulate disconnection delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    this.status = VpnConnectionStatus.DISCONNECTED;
    this.currentServer = null;
    this.stats = null;
    this.connectionStartTime = null;
  }

  async getServers(): Promise<VpnServer[]> {
    // Mock server list
    return [
      {
        id: 'smart-connect',
        name: 'Smart Connect',
        country: 'Auto',
        countryCode: 'AUTO',
        hostname: 'smart.zerotrace.vpn',
        port: 51820,
        protocol: VpnProtocol.WIREGUARD,
      },
      {
        id: 'usa-1',
        name: 'USA',
        country: 'United States',
        countryCode: 'US',
        hostname: 'us1.zerotrace.vpn',
        port: 51820,
        protocol: VpnProtocol.WIREGUARD,
      },
      {
        id: 'germany-1',
        name: 'Germany',
        country: 'Germany',
        countryCode: 'DE',
        hostname: 'de1.zerotrace.vpn',
        port: 51820,
        protocol: VpnProtocol.WIREGUARD,
      },
      {
        id: 'canada-1',
        name: 'Canada',
        country: 'Canada',
        countryCode: 'CA',
        hostname: 'ca1.zerotrace.vpn',
        port: 51820,
        protocol: VpnProtocol.WIREGUARD,
      },
      {
        id: 'finland-1',
        name: 'Finland',
        country: 'Finland',
        countryCode: 'FI',
        hostname: 'fi1.zerotrace.vpn',
        port: 51820,
        protocol: VpnProtocol.WIREGUARD,
      },
      {
        id: 'japan-1',
        name: 'Japan',
        country: 'Japan',
        countryCode: 'JP',
        hostname: 'jp1.zerotrace.vpn',
        port: 51820,
        protocol: VpnProtocol.WIREGUARD,
      },
    ];
  }

  async getStats(): Promise<VpnConnectionStats | null> {
    if (!this.stats || !this.connectionStartTime) {
      return null;
    }

    // Simulate stats updates
    const duration = Math.floor((Date.now() - this.connectionStartTime) / 1000);
    
    return {
      ...this.stats,
      connectedDuration: duration,
      uploadSpeed: Math.random() * 20,
      downloadSpeed: Math.random() * 20,
    };
  }

  async getCurrentServer(): Promise<VpnServer | null> {
    return this.currentServer;
  }

  getProtocol(): VpnProtocol {
    return VpnProtocol.WIREGUARD;
  }

  async initialize(): Promise<void> {
    // Mock initialization
    console.log('Mock VPN Service initialized');
  }

  async cleanup(): Promise<void> {
    // Mock cleanup
    await this.disconnect();
    console.log('Mock VPN Service cleaned up');
  }
}

