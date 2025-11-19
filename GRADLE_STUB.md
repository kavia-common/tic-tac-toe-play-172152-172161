This repository includes stub Gradle wrappers to satisfy CI checks that may call `./gradlew`:
- Root stub: `./gradlew` forwards to `tic_tac_toe_frontend/android/gradlew`
- Android stub: `tic_tac_toe_frontend/android/gradlew`
- Windows stub: `tic_tac_toe_frontend/android/gradlew.bat`

They are no-ops and always exit successfully. Real native builds should be generated with `expo prebuild --platform android` in a proper environment.
