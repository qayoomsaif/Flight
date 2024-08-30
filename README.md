# Flight

Flight repo.

# Features

- **Advanced Filtering**: Search results can be filtered by stops, airlines, departure and arrival times, price range, baggage options, and airports.
- **Dynamic Filters**: Filter options are dynamically sourced from an external API (`filterData`).
- **Responsive Design**: Optimized for mobile and desktop devices.
- **Redux Integration**: State management for filters and other application states using Redux.
- **Theming Support**: Consistent styling with support for light and dark modes.
- **TypeScript**: Full TypeScript integration for improved development efficiency and reliability.
- **Custom Paths**: Simplified module imports with configured custom paths.

## Installation

### Prerequisites

- Node.js
- npm (Node Package Manager)
- CocoaPods (for iOS development)
**Clone the Repository**

   ```bash
   git clone https://github.com/qayoomsaif/Flight
   cd Flight
   ```

## Getting Started


Install dependencies using npm:

```bash
npm install
```

Alternatively, you can use yarn:

```bash
yarn install
```

### CocoaPods

Ensure CocoaPods dependencies are installed:

```bash
npx pod-install
```

### Running the iOS App

To run the iOS application:

```bash
npx react-native run-ios
```


## Project Structure

- `src/`: Main source directory.
- `@all-types/`: TypeScript type definitions.
- `@all-assets/`: Static assets like images and fonts.
- `@components/`: Reusable React components.
- `@hooks/`: Custom React hooks.
- `@navigation/`: Navigation components and setup.
- `@redux/`: Redux actions, reducers, and store configuration.
- `@screens/`: React components for different screens.
- `@theme/`: Theme configurations and styling.
- `@utilities/`: Utility functions and helpers.

## Custom Paths Configuration

Configure module resolution paths in your TypeScript configuration file to simplify imports.

**`tsconfig.json`:**

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@all-types/_": ["all-types/_"],
      "@all-assets/_": ["assets/_"],
      "@components/_": ["components/_"],
      "@hooks/_": ["hooks/_"],
      "@navigation/_": ["navigation/_"],
      "@redux/_": ["redux/_"],
      "@screens/_": ["screens/_"],
      "@theme/_": ["theme/_"],
      "@utilities/_": ["utilities/_"]
    }
  }
}
```
## Development Guidelines

- **Reusable Components**: Design components to be reusable across different parts of the application.
- **TypeScript**: Leverage TypeScript throughout the project to ensure type safety and enhance development.
- **Mock Data**: Utilize custom mock data for testing and developing UI components.

## Running the Application

- **Development**: Use `npm start` to run the application in development mode.
- **Production**: Follow the build and deployment instructions as required for production environments.

## Contact Information

For support or inquiries, please reach out:

- **Phone**: +92333 7779690

