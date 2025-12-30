/**
 * VPN Service Interface
 * 
 * This interface defines the contract for VPN implementations.
 * WireGuard and OpenVPN implementations will implement this interface,
 * allowing the UI to work with any VPN protocol without modification.
 */

export enum VpnConnectionStatus {
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  DISCONNECTING = 'disconnecting',
  ERROR = 'error',
}

export enum VpnProtocol {
  WIREGUARD = 'wireguard',
  OPENVPN = 'openvpn',
}

export interface VpnServer {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  flag?: string; // URL or asset path to flag icon
  hostname: string;
  port: number;
  protocol: VpnProtocol;
}

export interface VpnConnectionStats {
  uploadSpeed: number; // in Mbps
  downloadSpeed: number; // in Mbps
  bytesUploaded: number;
  bytesDownloaded: number;
  connectedDuration: number; // in seconds
}

export interface VpnServiceInterface {
  /**
   * Get the current connection status
   */
  getStatus(): Promise<VpnConnectionStatus>;
  
  /**
   * Connect to a VPN server
   * @param server The server to connect to
   */
  connect(server: VpnServer): Promise<void>;
  
  /**
   * Disconnect from the current VPN connection
   */
  disconnect(): Promise<void>;
  
  /**
   * Get list of available servers
   */
  getServers(): Promise<VpnServer[]>;
  
  /**
   * Get connection statistics (speed, data usage, etc.)
   */
  getStats(): Promise<VpnConnectionStats | null>;
  
  /**
   * Get the currently connected server (if any)
   */
  getCurrentServer(): Promise<VpnServer | null>;
  
  /**
   * Get the protocol type this service implements
   */
  getProtocol(): VpnProtocol;
  
  /**
   * Initialize the VPN service
   */
  initialize(): Promise<void>;
  
  /**
   * Cleanup resources when service is no longer needed
   */
  cleanup(): Promise<void>;
}

