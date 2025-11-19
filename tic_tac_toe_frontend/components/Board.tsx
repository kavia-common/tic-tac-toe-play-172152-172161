import React from 'react';
import { StyleSheet, View } from 'react-native';
import Cell from './Cell';
import type { Cells } from '../utils/game';

type Props = {
  cells: Cells;
  onCellPress: (index: number) => void;
  disabled?: boolean;
  winningLine?: number[] | null;
};

/**
 * PUBLIC_INTERFACE
 * Renders a 3x3 grid of Cell components.
 * It's a presentational component; logic is handled by parent.
 */
export default function Board({ cells, onCellPress, disabled, winningLine }: Props) {
  return (
    <View style={styles.boardContainer}>
      {/* Create 3 rows */}
      {[0, 1, 2].map((row) => (
        <View key={row} style={styles.row}>
          {[0, 1, 2].map((col) => {
            const idx = row * 3 + col;
            const isWinning = winningLine?.includes(idx) ?? false;
            return (
              <Cell
                key={idx}
                index={idx}
                value={cells[idx]}
                onPress={onCellPress}
                disabled={disabled || cells[idx] !== null}
                isWinning={isWinning}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  boardContainer: {
    width: '90%',
    maxWidth: 420,
    aspectRatio: 1, // square board
    alignSelf: 'center',
    padding: 8,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
});
