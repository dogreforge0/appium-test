const wd = require('wd');
const driver = wd.promiseChainRemote({
  host: 'localhost',
  port: 4723,  // Appium server port
});

driver
  .init({
    platformName: 'Android',
    deviceName: 'emulator-5554',  // Update with actual emulator device ID
    appPackage: 'com.android.calculator2', // Example app
    appActivity: '.Calculator', // Example activity
  })
  .sleep(5000) // Wait for the app to load
  .takeScreenshot()
  .then(function (data) {
    // Save screenshot
    require('fs').writeFileSync('/tmp/screenshot.png', new Buffer(data, 'base64'));
  })
  .finally(function () {
    driver.quit();
  });
