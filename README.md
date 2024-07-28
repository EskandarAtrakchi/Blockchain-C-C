# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Calorie Calculator Component

This React page is designed to calculate and record the daily calorie needs based on user inputs such as gender, age, height, weight, and activity level. Below is a breakdown of the components and functionalities used in this page.

## Imports and Dependencies

- **Modal Component**: Imported for displaying the calculated calorie needs in a modal.
- **CSS Styles**: Importing the main CSS file.
- **React**: Core React library for building the UI.
- **Wagmi Hooks**: Used for interacting with a smart contract (writing data and waiting for transaction receipt).
- **ABI**: Importing the ABI for contract interaction.
- **UI Components**: Importing custom UI components like `Card`, `Label`, `Select`, `Input`, and `Button`.
- **State Management**: Using `useState` for managing component state.
- **ConnectButton**: Component for handling blockchain connection.
- **RetrieveRecords**: Component for fetching records (presumably from the blockchain).

## Component: `Calculate`

### State Variables
- **hash, error, isPending, writeContract**: From `useWriteContract` hook for managing contract write operations.
- **gender, age, height, weight, activityLevel, result, isModalOpen**: Various states for user inputs and results.

### Activity Level Mapping
A map that translates activity levels to specific numeric values used in the calorie calculation.

### Functions

#### `calculateCalories`
Calculates the daily calorie needs based on the user's input using the BMR (Basal Metabolic Rate) formula and activity level.

#### `submit`
Handles form submission, writes the calculated data to the smart contract, and manages state for transaction handling.

### `useWaitForTransactionReceipt`
Manages the state of the transaction (loading, success, error).

### JSX Layout
The component returns a form with:
- **Inputs**: For gender, age, height, weight, and activity level.
- **Button**: To trigger the calorie calculation.
- **Modal**: To display the calculated calorie needs and transaction status.

### Form Submission
The form collects user input, triggers the calorie calculation, and submits the data to the smart contract.

### Conditional Rendering
Based on the transaction state, different messages and transaction details are displayed in the modal.

## Usage
This page provides an interactive form for users to input their details and calculate their daily calorie needs. The results are displayed in a modal, and the calculated data is recorded on the blockchain via a smart contract.

### Example Usage
1. User fills out the form with their details.
2. User clicks "Calculate Calories".
3. The calculated daily calorie needs are displayed in a modal.
4. The calculated data is submitted and recorded on the blockchain.

## Dependencies
- React
- Wagmi for blockchain interactions
- Custom UI components
- CSS for styling

This page integrates with a smart contract to store user-submitted data and provides a seamless UI for calculating and displaying daily calorie needs.


## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
