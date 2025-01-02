const wd = require("wd");
const path = require("path");
const fs = require("fs");

// Appium capabilities
const caps = {
  platformName: "Android",
  platformVersion: "10", // Adjust based on the Android version of your emulator
  deviceName: "emulator-5554", // Emulator device name (default emulator)
  appPackage: "com.android.chrome", // Example app - Chrome, change if needed
  appActivity: "com.google.android.apps.chrome.Main", // Activity of the app
  automationName: "UiAutomator2",
  noReset: true,
  fullContextList: true
};

// Create a driver instance to interact with the Appium server
const driver = wd.promiseChainRemote({
  protocol: "http",
  host: "localhost", // Appium server host
  port: 4723 // Appium server port
});

// Function to capture screenshot
async function takeScreenshot() {
  try {
    const screenshot = await driver.takeScreenshot(); // Take screenshot
    const screenshotPath = path.resolve(__dirname, "screenshot.png");
    fs.writeFileSync(screenshotPath, screenshot, "base64");
    console.log("Screenshot captured and saved to screenshot.png");
  } catch (error) {
    console.error("Error taking screenshot: ", error);
  }
}

async function runTest() {
  try {
    // Start the driver session with the provided capabilities
    await driver.init(caps);

    // Wait for the app to launch
    console.log("Waiting for the app to load...");
    await driver.waitForElementByAccessibilityId("Google", 5000); // Example: wait for the "Google" button in Chrome

    // Perform a simple test (e.g., click the Google search button or open a URL)
    console.log("Navigating in the app...");
    await driver.elementByAccessibilityId("Search or type web address").sendKeys("https://www.google.com");
    await driver.elementByAccessibilityId("Search or type web address").sendKeys("\n");

    // Take a screenshot after the interaction
    await takeScreenshot();

    // Clean up
    await driver.quit();
  } catch (error) {
    console.error("Test failed: ", error);
    await driver.quit();
  }
}

// Start the test
runTest();
