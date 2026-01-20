const fs = require("fs");
const path = require("path");

const BACKUP_DIR = path.join(__dirname, "backup");
const ERROR_LOG = path.join(__dirname, "error.log");

function logError(error) {
  const timestamp = new Date().toISOString();
  const message = `[${timestamp}] ${error.message}\n`;

  fs.appendFile(ERROR_LOG, message, (err) => {
    if (err) {
      console.error("Failed to write to error log:", err.message);
    }
  });
}

function backupFile(sourceFile) {
  try {

    if (!fs.existsSync(sourceFile)) {
      throw new Error(`Source file not found: ${sourceFile}`);
    }

    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }

    const ext = path.extname(sourceFile);
    const name = path.basename(sourceFile, ext);

    const timestamp = new Date()
      .toISOString()
      .replace(/[:.-]/g, "")
      .slice(0, 15);

    const backupFileName = `${name}_${timestamp}${ext}`;
    const backupPath = path.join(BACKUP_DIR, backupFileName);

    fs.copyFileSync(sourceFile, backupPath);
    console.log("Backup successful:", backupFileName);

  } catch (error) {
    console.error("Backup failed:", error.message);
    logError(error);
  }
}

backupFile(path.join(__dirname, "app.log"));
