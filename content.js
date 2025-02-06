"use strict";

(() => {
  /**
   * Flag to ensure that simulated click events are not re-intercepted.
   */
  let simulatedClick = false;

  /**
   * Enables any "Generate report" (deep backtest) buttons on the page.
   *
   * The function looks for buttons with a specific CSS selector. If a button is
   * disabled via the aria-disabled attribute or a native disabled attribute,
   * it resets these so that the button is interactive.
   */
  const enableDeepBacktestButton = () => {
    const buttons = document.querySelectorAll(
      "button.generateReportBtn-zf0MHBzY[data-overflow-tooltip-text='Generate report ']"
    );
    buttons.forEach((button) => {
      if (button.getAttribute("aria-disabled") === "true") {
        button.setAttribute("aria-disabled", "false");
      }
      if (button.hasAttribute("disabled")) {
        button.removeAttribute("disabled");
      }
    });
  };

  // Immediately enable the button on script load.
  enableDeepBacktestButton();

  /**
   * Debounces the re-enabling of deep backtest buttons.
   *
   * This helps to avoid calling enableDeepBacktestButton too frequently when the DOM changes.
   */
  let debounceTimeout;
  const debounceEnable = () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(enableDeepBacktestButton, 200);
  };

  // Set up a MutationObserver to watch for changes in the DOM.
  const observer = new MutationObserver(() => {
    debounceEnable();
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
  });

  /**
   * Returns a random delay between a specified minimum and maximum in milliseconds.
   *
   * @param {number} min - The minimum delay in milliseconds.
   * @param {number} max - The maximum delay in milliseconds.
   * @returns {number} A random delay value between min and max.
   */
  const randomDelay = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  /**
   * Intercepts clicks on the deep backtest (Generate report) button.
   *
   * If the user clicks the button while the settings dialog is open, the
   * script temporarily hides the dialog, simulates the click after a short delay,
   * then restores the dialog.
   */
  document.addEventListener(
    "click",
    (e) => {
      // Detect if the click originates from the specific deep backtest button.
      const button = e.target.closest(
        "button.generateReportBtn-zf0MHBzY[data-overflow-tooltip-text='Generate report ']"
      );
      if (!button) return;

      // Allow programmatically triggered click events without interception.
      if (simulatedClick) {
        simulatedClick = false;
        return;
      }

      // Locate the settings dialog identified by its data-dialog-name.
      const dialog = document.querySelector(
        "div[data-dialog-name='TradeAlgo Strategy Tester']"
      );

      if (dialog && dialog.style.display !== "none") {
        // Prevent the default behavior and propagation when the dialog is visible.
        e.stopImmediatePropagation();
        e.preventDefault();

        // Temporarily hide the dialog by storing its original display style.
        const originalDisplay = dialog.style.display;
        dialog.style.display = "none";

        // After a random short delay, simulate the button click.
        setTimeout(() => {
          simulatedClick = true;
          button.click();
        }, randomDelay(40, 70));

        // Restore the dialog's display state after another random delay.
        setTimeout(() => {
          dialog.style.display = originalDisplay;
        }, randomDelay(300, 500));
      }
    },
    true // Use the capture phase for early event interception.
  );
})();
