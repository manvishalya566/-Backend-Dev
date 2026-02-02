const fs = require("fs");
const path = require("path");

const sourceDir = path.join(__dirname, "uploads");
const backupDir = path.join(__dirname, "backup");
const logFile = path.join(__dirname, "backup.log");

const DAYS_7 = 7 * 24 * 60 * 60 * 1000;

async function log(message) {
  const time = new Date().toISOString();
  await fs.promises.appendFile(logFile, `[${time}] ${message}\n`);
}

async function ensureDir(dir) {
  try {
    await fs.promises.access(dir);
  } catch {
    await fs.promises.mkdir(dir, { recursive: true });
    await log(`Created directory: ${dir}`);
  }
}

async function backupAndCleanup() {
  try {
    await fs.promises.access(sourceDir);
  } catch {
    await log("Source directory missing. Exiting.");
    return;
  }

  await ensureDir(backupDir);

  const files = await fs.promises.readdir(sourceDir);

  for (const file of files) {
    const filePath = path.join(sourceDir, file);

    try {
      const stats = await fs.promises.stat(filePath);
      if (!stats.isFile()) continue;

      const backupFile = `${Date.now()}-${file}`;
      await fs.promises.copyFile(filePath, path.join(backupDir, backupFile));
      await log(`Backed up: ${file}`);

      if (Date.now() - stats.mtimeMs > DAYS_7) {
        await fs.promises.unlink(filePath);
        await log(`Deleted old file: ${file}`);
      }
    } catch (err) {
      await log(`Error processing ${file}: ${err.message}`);
    }
  }
}

backupAndCleanup();
