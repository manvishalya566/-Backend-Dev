const fs = require("fs");
const path = require("path");

// Get file name from command line
const sourceFile = process.argv[2];

if (!sourceFile) {
  console.error("Usage: node backup.js <filename>");
  process.exit(1);
}

// Generate timestamp safe for filenames
function getTimestamp() {
  const now = new Date();
  return now
    .toISOString()
    .replace(/:/g, "-")
    .replace("T", "_")
    .split(".")[0];
}

// Build backup file name
const ext = path.extname(sourceFile);
const baseName = path.basename(sourceFile, ext);
const dirName = path.dirname(sourceFile);

const backupFile = path.join(
  dirName,
  `${baseName}_${getTimestamp()}${ext}`
);

// Copy file
fs.copyFile(sourceFile, backupFile, (err) => {
  if (err) {
    console.error("Backup failed:", err.message);
    return;
  }
  console.log("Backup created:", backupFile);
});
