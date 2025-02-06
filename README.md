# Deep Backtest Button Enabler

This extension enables the deep backtest button on TradingView, even when the settings dialog is open. It continuously monitors the page for changes and ensures the button remains enabled. It also intercepts the click event to temporarily hide an interfering dialog and simulate the click.

## Features

- **Button Enabling:** Automatically re-enables the "Generate report" button if TradingView disables it.
- **Dynamic DOM Monitoring:** Uses a MutationObserver with a debouncing mechanism to detect DOM changes and maintain the button state.
- **Smart Click Interception:** Temporarily hides the settings dialog and simulates a click on the button.
- **Randomized Delays:** Applies random delays during the process to mimic natural user behavior.
- **Cross-Browser Compatibility:** Works on both Chrome and Firefox.

## Installation

### For Chrome

1. **Clone the repository:**

   ```bash
   git clone https://github.com/PatrykBr/deep-backtest-button-enabler.git
   cd deep-backtest-button-enabler
   ```

2. **Load the Extension in Chrome:**
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable "Developer mode" (toggle switch in the top right).
   - Click "Load unpacked" and select the repository folder.

### For Firefox

1. **Clone the repository:**

   ```bash
   git clone https://github.com/PatrykBr/deep-backtest-button-enabler.git
   cd deep-backtest-button-enabler
   ```

2. **Load the Extension in Firefox:**
   - Open Firefox and navigate to `about:debugging#/runtime/this-firefox`.
   - Click "Load Temporary Add-on…".
   - Choose any file within the extension's folder (e.g., select the `manifest.json` file).

## Usage

- Navigate to TradingView.
- The extension will continuously monitor the page and ensure that the deep backtest button remains enabled, even if currently disabled by the site.
