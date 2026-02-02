const fs = require("fs");
const path = require("path");

const targetDir = process.argv[2];

if (!targetDir) {
  console.error("Usage: node explorer.js <directory>");
  process.exit(1);
}

// Convert bytes to readable format
function formatSize(bytes) {
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;

  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }

  return `${bytes.toFixed(2)} ${units[i]}`;
}

// Recursively explore directories
function exploreDirectory(dir, indent = "") {
  fs.readdir(dir, { withFileTypes: true }, (err, items) => {
    if (err) {
      console.error("Error reading directory:", err.message);
      return;
    }

    items.forEach((item) => {
      const fullPath = path.join(dir, item.name);

      fs.stat(fullPath, (err, stats) => {
        if (err) {
          console.error("Error getting stats:", err.message);
          return;
        }

        const size = item.isFile() ? formatSize(stats.size) : "-";

        console.log(`${indent}${item.name}  (${size})`);

        if (item.isDirectory()) {
          exploreDirectory(fullPath, indent + "  ");
        }
      });
    });
  });
}

// Start exploring
exploreDirectory(targetDir);
