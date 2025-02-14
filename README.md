# Deep Backtest Button Enabler

Deep Backtest Button Enabler is a lightweight browser extension that ensures the deep backtest button on TradingView remains enabled—even when the settings dialog is open. It continuously monitors the page for changes and dynamically intercepts clicks to trigger the deep backtest functionality, bypassing any UI restrictions.

## Features

- **Automatic Button Re-Enabling:**  
  Detects and removes disabling attributes from the "Generate report" button, ensuring it remains interactive.
  
- **Dynamic DOM Monitoring:**  
  Utilizes a MutationObserver with a debouncing mechanism to monitor and react to changes in the DOM, so the button stays enabled regardless of TradingView's updates.
  
- **Smart Click Interception:**  
  Intercepts click events on the deep backtest button. If an interfering settings dialog is open, the extension temporarily hides the dialog, simulates the click, and restores the dialog—all with minimal disruption.
  
- **Randomized Delays:**  
  Implements randomized delay intervals when simulating clicks and restoring dialogs to mimic natural user behavior and avoid detection.
  
- **Cross-Browser Compatibility:**  
  Works seamlessly on both Chrome and Firefox.

## Installation

### For Chrome

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/PatrykBr/deep-backtest-button-enabler.git
   cd deep-backtest-button-enabler
   ```

2. **Load the Extension:**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle switch in the top right).
   - Click "Load unpacked" and select the repository folder.

### For Firefox

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/PatrykBr/deep-backtest-button-enabler.git
   cd deep-backtest-button-enabler
   ```

2. **Load the Extension:**
   - Open Firefox and go to `about:debugging#/runtime/this-firefox`
   - Click "Load Temporary Add-on…"
   - Select any file within the repository folder (for example, the `manifest.json` file).

## Usage

1. Navigate to TradingView.
2. The extension automatically monitors the page and keeps the deep backtest button enabled.
3. When clicking the "Generate report" button, if the settings dialog is visible, it will be temporarily hidden to let the click register, then immediately restored.

## Disclaimer

This extension is an independent project and is **not affiliated with, endorsed by, or associated with TradingView or its parent company**. The developer of this extension assumes no responsibility or liability for any consequences, issues, or damages that may arise from its use. Use this extension at your own risk.

## Contributing

Contributions, bug reports, and feature suggestions are welcome! Feel free to open an issue or submit a pull request on [GitHub](https://github.com/PatrykBr/deep-backtest-button-enabler).

## License

This project is licensed under the **MIT License**. Please see the [LICENSE](LICENSE) file for more details.
