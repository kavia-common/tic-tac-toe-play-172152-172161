import React, { useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Pressable } from 'react-native';
import Board from './components/Board';
import { colors } from './theme/colors';
import { calculateWinner, isDraw, nextPlayer, type Cells } from './utils/game';

export default function App() {
  // Maintain a flat 9-length array for the grid
  const [cells, setCells] = useState<Cells>(Array(9).fill(null));
  const [gameKey, setGameKey] = useState(0); // used to reset animations/press states if any

  const winnerInfo = useMemo(() => calculateWinner(cells), [cells]);
  const draw = useMemo(() => isDraw(cells), [cells]);
  const turn = useMemo(() => nextPlayer(cells), [cells]);

  const statusText = useMemo(() => {
    if (winnerInfo) return `${winnerInfo.winner} wins!`;
    if (draw) return "It's a draw";
    return `${turn}'s turn`;
  }, [winnerInfo, draw, turn]);

  const isBoardDisabled = Boolean(winnerInfo) || draw;

  // Handle a tap on a cell: ignore if game ended or cell is filled
  const handleCellPress = (index: number) => {
    if (cells[index] !== null || isBoardDisabled) return;

    setCells((prev) => {
      const updated = [...prev];
      updated[index] = nextPlayer(prev); // place current player's symbol
      return updated;
    });
  };

  const handleReset = () => {
    setCells(Array(9).fill(null));
    setGameKey((k) => k + 1);
  };

  const statusStyle =
    winnerInfo
      ? styles.statusWinner
      : draw
      ? styles.statusDraw
      : styles.statusTurn;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/* Status Banner */}
        <View style={[styles.statusContainer, statusStyle]}>
          <Text style={styles.statusText}>{statusText}</Text>
        </View>

        {/* Board */}
        <View style={styles.boardWrapper}>
          <Board
            key={gameKey}
            cells={cells}
            onCellPress={handleCellPress}
            disabled={isBoardDisabled}
            winningLine={winnerInfo?.line ?? null}
          />
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <Pressable
            accessibilityRole="button"
            onPress={handleReset}
            style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryButtonPressed]}
          >
            <Text style={styles.primaryButtonText}>Reset</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 24,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusContainer: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: colors.surface,
    // subtle shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 2,
  },
  statusTurn: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statusWinner: {
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: '#DBEAFE', // light blue tint
  },
  statusDraw: {
    borderWidth: 1,
    borderColor: colors.secondary,
    backgroundColor: '#FEF3C7', // light amber
  },
  statusText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  boardWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  controls: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 14,
    minWidth: 140,
    alignItems: 'center',
    justifyContent: 'center',
    // subtle shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  primaryButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
