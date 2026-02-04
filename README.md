# Payslips App

## Prerequisites
Follow the official React Native environment setup for iOS and Android:
https://reactnative.dev/docs/set-up-your-environment

## Installation
1. `npm install`
2. `npx expo prebuild --clean`
3. Run `npm run ios` or `npm run android`.

## Architecture
The app follows a feature-first structure with shared UI and domain modules:

- **screens/**: Feature screens and their styles. Each screen has its own folder (e.g., payslip list, payslip details) to keep UI and layout co-located.
- **components/**: Reusable UI components (button, list, list item, modal) used across screens.
- **context/**: Global state and derived data. `PayslipsContext` owns the payslips list, sorting state, and exposes a `visiblePayslips` selector used by screens.
- **navigation/**: React Navigation setup and type definitions.
- **services/**: Helpers for file system access, asset resolution, downloading, and sharing payslips, abstracting third party package logic.
- **utils/**: Small pure utilities like date formatting and file extension helpers.
- **constants/**: Mock data and static app constants.
- **types/**: Shared TypeScript types for domain models like `Payslip`.

## Tech stack
- Expo
- React Navigation
- React Context
- date-fns
- ESLint
- Prettier
- TypeScript

## Known limitations and improvements
1. Simulate an HTTP request to fetch payslips, including loading and error states.
2. Add search by year or ID.
3. Expand unit tests and add end-to-end tests.
4. Introduce a styling system or UI library.
5. Saving to a user-accessible folder on Android requires a more native approach; on iOS it was enough to choose the correct folder.
6. Expo was chosen due to simplicity, I choose a blank typescript template since I'm not a fan of the folder based routing, it limits you in a lot of ways
7. Accesibility was not taken into account, but it could a good nice to have
8. Since it was a simple enough app, there was no need for env configuration but it would be a ntice to have
9. Husky was used to check and fix lint and prettier errors while doing a commit on the staged files