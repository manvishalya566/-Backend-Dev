const fs = require("fs");
const path = require("path");

const DIRECTORY = "./logs";   // change to your directory
const DAYS = 7;

function cleanupOldFiles(dir, days) {
  const now = Date.now();
  const maxAge = days * 24 * 60 * 60 * 1000; // days → ms

  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isFile()) {
      const fileAge = now - stats.mtimeMs;

      if (fileAge > maxAge) {
        fs.unlinkSync(filePath);
        console.log(`Deleted: ${file}`);
      }
    }
  });
}

cleanupOldFiles(DIRECTORY, DAYS);
