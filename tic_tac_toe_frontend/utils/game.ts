export type CellValue = 'X' | 'O' | null;
export type Cells = CellValue[];

/**
 * PUBLIC_INTERFACE
 * Calculates the winner of a Tic Tac Toe board.
 * @param cells - A flat array of 9 cells with 'X' | 'O' | null.
 * @returns An object containing the winner ('X' or 'O') and the winning line indices, or null if no winner.
 */
export function calculateWinner(cells: Cells): { winner: 'X' | 'O'; line: number[] } | null {
  // All possible winning lines by indices in a 3x3 grid.
  const lines: number[][] = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    const va = cells[a];
    if (va && va === cells[b] && va === cells[c]) {
      return { winner: va, line: [a, b, c] };
    }
  }
  return null;
}

/**
 * PUBLIC_INTERFACE
 * Determines if the board is a draw (no empty cells and no winner).
 * @param cells - A flat array of 9 cells with 'X' | 'O' | null.
 * @returns True if it's a draw, otherwise false.
 */
export function isDraw(cells: Cells): boolean {
  return cells.every((c) => c !== null) && !calculateWinner(cells);
}

/**
 * PUBLIC_INTERFACE
 * Determines the next player based on the current board state.
 * X always starts first. If X and O counts are equal, it's X's turn; otherwise O's.
 * @param cells - A flat array of 9 cells with 'X' | 'O' | null.
 * @returns 'X' or 'O' indicating whose turn is next.
 */
export function nextPlayer(cells: Cells): 'X' | 'O' {
  const xCount = cells.filter((c) => c === 'X').length;
  const oCount = cells.filter((c) => c === 'O').length;
  return xCount === oCount ? 'X' : 'O';
}
