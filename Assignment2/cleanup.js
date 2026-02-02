const fs = require("fs");
const path = require("path");

// Directory passed from command line
const targetDir = process.argv[2];

if (!targetDir) {
  console.error("Usage: node cleanup.js <directory>");
  process.exit(1);
}

const DAYS_OLD = 7;
const now = Date.now();
const maxAge = DAYS_OLD * 24 * 60 * 60 * 1000;

// Read directory contents
fs.readdir(targetDir, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err.message);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(targetDir, file);

    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error("Error getting file stats:", err.message);
        return;
      }

      // Skip directories
      if (!stats.isFile()) return;

      const fileAge = now - stats.mtimeMs;

      // Delete if older than 7 days
      if (fileAge > maxAge) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Failed to delete ${file}:`, err.message);
          } else {
            console.log(`Deleted: ${file}`);
          }
        });
      }
    });
  });
});
