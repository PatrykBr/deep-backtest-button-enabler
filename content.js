"use strict";

(() => {
  // Configuration for selectors and delay settings.
  const CONFIG = {
    buttonSelector: "button[data-overflow-tooltip-text*='Generate report']",
    dialogSelector: "div[data-dialog-name='TradeAlgo Strategy Tester']",
    debounceDelay: 200,
    clickDelay: { min: 40, max: 70 },
    restoreDelay: { min: 300, max: 500 },
    debug: false, // Set to true to enable detailed logging
  };

  // Flag to prevent processing simulated clicks.
  let simulatedClick = false;

  /**
   * Returns a random delay between the specified min and max (inclusive).
   * @param {number} min - Minimum delay in ms.
   * @param {number} max - Maximum delay in ms.
   * @returns {number} A random delay.
   */
  const randomDelay = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  /**
   * Simple sleep helper using a promise.
   * @param {number} ms - Milliseconds to sleep.
   * @returns {Promise} A promise that resolves after ms delay.
   */
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  /**
   * Enables all "Generate report" buttons by removing disabling attributes.
   */
  const enableDeepBacktestButtons = () => {
    try {
      const buttons = document.querySelectorAll(CONFIG.buttonSelector);
      buttons.forEach((button) => {
        if (button.getAttribute("aria-disabled") === "true") {
          button.setAttribute("aria-disabled", "false");
          if (CONFIG.debug) console.log("Removed aria-disabled from button", button);
        }
        if (button.hasAttribute("disabled")) {
          button.removeAttribute("disabled");
          if (CONFIG.debug) console.log("Removed disabled attribute from button", button);
        }
      });
    } catch (error) {
      console.error("[DeepBacktest] Error enabling buttons:", error);
    }
  };

  // Immediately enable the buttons when the script loads.
  enableDeepBacktestButtons();

  /**
   * Debounces calls to enableDeepBacktestButtons.
   */
  let debounceTimeout;
  const debounceEnable = () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(enableDeepBacktestButtons, CONFIG.debounceDelay);
  };

  // Use a MutationObserver to watch for changes in the DOM.
  const observer = new MutationObserver(() => {
    debounceEnable();
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
  });

  /**
   * Hides the dialog, simulates a button click, and then restores the dialog.
   * Uses async/await for clearer sequential logic.
   * @param {HTMLElement} button - The button to click.
   * @param {HTMLElement} dialog - The dialog to temporarily hide.
   */
  const simulateClickWithDialogBypass = async (button, dialog) => {
    try {
      const originalDisplay = dialog.style.display || "";
      dialog.style.display = "none";
      if (CONFIG.debug) console.log("Dialog hidden");

      await sleep(randomDelay(CONFIG.clickDelay.min, CONFIG.clickDelay.max));
      simulatedClick = true;
      button.click();
      if (CONFIG.debug) console.log("Button clicked");

      await sleep(randomDelay(CONFIG.restoreDelay.min, CONFIG.restoreDelay.max));
      dialog.style.display = originalDisplay;
      if (CONFIG.debug) console.log("Dialog restored");
    } catch (error) {
      console.error("[DeepBacktest] Error simulating click:", error);
    }
  };

  /**
   * Intercepts clicks on the “Generate report” button and bypasses the dialog if necessary.
   */
  document.addEventListener(
    "click",
    (event) => {
      try {
        const button = event.target.closest(CONFIG.buttonSelector);
        if (!button) return;

        if (simulatedClick) {
          simulatedClick = false;
          return;
        }

        const dialog = document.querySelector(CONFIG.dialogSelector);
        if (dialog && dialog.style.display !== "none") {
          event.stopImmediatePropagation();
          event.preventDefault();
          if (CONFIG.debug) console.log("Intercepted click to bypass the dialog");
          simulateClickWithDialogBypass(button, dialog);
        }
      } catch (error) {
        console.error("[DeepBacktest] Error in click event handler:", error);
      }
    },
    true // Use capture phase for early interception.
  );
})();