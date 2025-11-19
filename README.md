# Tic Tac Toe - React Native (Expo)

This is a simple two-player Tic Tac Toe mobile app built with React Native (Expo). It follows the "Ocean Professional" theme.

Features:
- 3x3 grid with tappable cells
- Alternating turns (X always starts)
- Win detection across rows, columns, and diagonals
- Draw detection when the board is full without a winner
- Status banner showing turn, winner, or draw
- Reset button to start a new game
- Modern UI with rounded corners, subtle shadows, and theme colors

Tech:
- Expo
- React Native
- TypeScript

Run locally:
- npm install
- npm start
  - This launches the web preview directly on port 3000 (Expo web)
- If you need native builds, run `expo prebuild` and platform-specific builds in a proper environment. The CI preview here is web-only and doesn't include Android Gradle tooling.

Folder structure (selected):
- App.tsx – entry point and game state
- components/Board.tsx – grid rendering
- components/Cell.tsx – single cell
- utils/game.ts – game logic helpers
- theme/colors.ts – app color palette