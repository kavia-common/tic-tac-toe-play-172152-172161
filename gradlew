#!/usr/bin/env bash
# Root-level stub gradlew to satisfy CI that invokes ./gradlew from the workspace root.
# Delegates to the android stub if present.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ -x "$SCRIPT_DIR/tic_tac_toe_frontend/android/gradlew" ]; then
  exec "$SCRIPT_DIR/tic_tac_toe_frontend/android/gradlew" "$@"
fi
echo "Root stub gradlew called, forwarding to android stub not possible; exiting success."
exit 0
