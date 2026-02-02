const fs = require("fs");
const path = require("path");

// Files
const sourceFile = process.argv[2];
const errorLogFile = path.join(__dirname, "error.log");

if (!sourceFile) {
  logError("No source file provided");
  process.exit(1);
}

// Log errors to file
function logError(message, error = "") {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message} ${error}\n`;

  fs.appendFile(errorLogFile, logEntry, (err) => {
    if (err) {
      console.error("Failed to write to error log:", err.message);
    }
  });
}

// Generate safe timestamp
function getTimestamp() {
  return new Date()
    .toISOString()
    .replace(/:/g, "-")
    .replace("T", "_")
    .split(".")[0];
}

// Build backup filename
const ext = path.extname(sourceFile);
const baseName = path.basename(sourceFile, ext);
const dirName = path.dirname(sourceFile);

const backupFile = path.join(
  dirName,
  `${baseName}_backup_${getTimestamp()}${ext}`
);

// Perform backup
fs.copyFile(sourceFile, backupFile, (err) => {
  if (err) {
    console.error("Backup failed.");
    logError("Backup failed for file:", err.message);
    return;
  }

  console.log("Backup created successfully:", backupFile);
});
