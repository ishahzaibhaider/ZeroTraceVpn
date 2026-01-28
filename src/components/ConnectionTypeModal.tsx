/**
 * Connection Type Modal
 * Modal popup for selecting VPN connection protocol - Matching Figma design
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  Pressable,
} from 'react-native';
import { theme } from '../theme';
import { VpnProtocol } from '../services/vpn';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const DESIGN_WIDTH = 390;
const scale = (size: number) => (width / DESIGN_WIDTH) * size;

interface ConnectionTypeModalProps {
  visible: boolean;
  onClose: () => void;
  selectedProtocol?: VpnProtocol | 'default';
  onSelectProtocol?: (protocol: VpnProtocol | 'default') => void;
}

export default function ConnectionTypeModal({
  visible,
  onClose,
  selectedProtocol = 'default',
  onSelectProtocol,
}: ConnectionTypeModalProps) {
  const [localSelected, setLocalSelected] = useState<VpnProtocol | 'default'>(selectedProtocol);

  const handleSelect = (protocol: VpnProtocol | 'default') => {
    setLocalSelected(protocol);
    if (onSelectProtocol) {
      onSelectProtocol(protocol);
    }
  };

  const protocols = [
    {
      id: 'default' as const,
      title: 'Default',
      description: 'Automatically selects the best protocol for optimal speed and security.',
    },
    {
      id: VpnProtocol.OPENVPN,
      title: 'OpenVPN',
      description: 'Trusted and stable connection',
    },
    {
      id: VpnProtocol.WIREGUARD,
      title: 'WireGuard',
      description: 'Fast and modern protocol',
    },
  ];

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Connection Type</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Svg width={scale(24)} height={scale(24)} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M18 6L6 18M6 6L18 18"
                  stroke={theme.colors.white}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>
          </View>

          {/* Options List */}
          <View style={styles.optionsContainer}>
            {protocols.map((protocol, index) => {
              const isSelected = localSelected === protocol.id;
              return (
                <View key={protocol.id}>
                  <TouchableOpacity
                    style={styles.optionItem}
                    onPress={() => handleSelect(protocol.id)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.optionContent}>
                      {/* Radio Button */}
                      <View style={[styles.radioButton, isSelected && styles.radioButtonSelected]}>
                        {isSelected && (
                          <Svg width={scale(12)} height={scale(12)} viewBox="0 0 12 12" fill="none">
                            <Path
                              d="M10 3L4.5 8.5L2 6"
                              stroke={theme.colors.white}
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </Svg>
                        )}
                      </View>
                      {/* Text Content */}
                      <View style={styles.optionTextContainer}>
                        <Text style={styles.optionTitle}>{protocol.title}</Text>
                        <Text style={styles.optionDescription}>{protocol.description}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  {index < protocols.length - 1 && <View style={styles.divider} />}
                </View>
              );
            })}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.9,
    maxWidth: scale(350),
    backgroundColor: theme.colors.white,
    borderRadius: scale(12),
    paddingTop: scale(24),
    paddingBottom: scale(24),
    paddingHorizontal: scale(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scale(4) },
    shadowOpacity: 0.3,
    shadowRadius: scale(8),
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(24),
    position: 'relative',
  },
  title: {
    fontSize: scale(18),
    fontFamily: theme.typography.fonts.poppins.bold,
    color: theme.colors.dark,
    fontWeight: '700',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: theme.colors.grey.light30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionsContainer: {
    gap: 0,
  },
  optionItem: {
    paddingVertical: scale(16),
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: scale(12),
  },
  radioButton: {
    width: scale(24),
    height: scale(24),
    borderRadius: scale(12),
    borderWidth: scale(2),
    borderColor: theme.colors.grey.base,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(2),
  },
  radioButtonSelected: {
    backgroundColor: theme.colors.primary.blue,
    borderColor: theme.colors.primary.blue,
  },
  optionTextContainer: {
    flex: 1,
    gap: scale(4),
  },
  optionTitle: {
    fontSize: scale(16),
    fontFamily: theme.typography.fonts.poppins.semiBold,
    color: theme.colors.dark,
    fontWeight: '600',
  },
  optionDescription: {
    fontSize: scale(14),
    fontFamily: theme.typography.fonts.poppins.regular,
    color: theme.colors.grey.base,
    lineHeight: scale(20),
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.grey.light30,
    marginLeft: scale(36), // Align with text content
  },
});
