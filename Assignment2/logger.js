const fs = require("fs");

function logMessage(message) {
  const timestamp = new Date().toISOString();
  const log = `${timestamp} - ${message}\n`;

  fs.appendFile("app.log", log, (err) => {
    if (err) {
      console.error("Error writing log:", err);
    } else {
      console.log("Log saved");
    }
  });
}

logMessage("Application started");
logMessage("User logged in");
logMessage("Application ended");