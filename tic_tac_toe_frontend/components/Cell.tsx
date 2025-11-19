import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';
import type { CellValue } from '../utils/game';

type Props = {
  index: number;
  value: CellValue;
  onPress: (index: number) => void;
  disabled?: boolean;
  isWinning?: boolean;
};

/**
 * PUBLIC_INTERFACE
 * A single tappable cell in the Tic Tac Toe board.
 * Renders the current value (X/O) and highlights if part of the winning line.
 */
export default function Cell({ index, value, onPress, disabled, isWinning }: Props) {
  const handlePress = () => {
    if (!disabled) {
      onPress(index);
    }
  };

  const tintStyle: ViewStyle = isWinning
    ? { backgroundColor: '#DBEAFE' } // subtle blue tint for winning cells
    : {};

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Cell ${index + 1}`}
      style={({ pressed }) => [
        styles.cell,
        tintStyle,
        pressed && !disabled ? styles.pressed : undefined,
        disabled ? styles.disabled : undefined,
      ]}
      onPress={handlePress}
    >
      <Text style={[styles.cellText, value === 'X' ? styles.xText : value === 'O' ? styles.oText : undefined]}>
        {value ?? ''}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    margin: 6,
    alignItems: 'center',
    justifyContent: 'center',
    // Subtle shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.9,
  },
  cellText: {
    fontSize: 42,
    fontWeight: '800',
    color: colors.text,
  },
  xText: {
    color: colors.primary,
  },
  oText: {
    color: colors.secondary,
  },
});
