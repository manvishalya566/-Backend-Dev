const fs = require("fs");
const path = require("path");

// Path to the log file
const logFile = path.join(__dirname, "app.log");

// Function to log messages
function logMessage(message) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;

  fs.appendFile(logFile, logEntry, (err) => {
    if (err) {
      console.error("Failed to write to log file:", err);
    }
  });
}

// Example usage
logMessage("Application started");
logMessage("User logged in");
logMessage("Application finished");
