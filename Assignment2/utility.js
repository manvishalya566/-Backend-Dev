const fs = require("fs/promises");
const path = require("path");

async function backupFile(sourceFile, backupDir) {
  await fs.mkdir(backupDir, { recursive: true });

  const ext = path.extname(sourceFile);
  const name = path.basename(sourceFile, ext);

  const timestamp = new Date()
    .toISOString()
    .replace(/[:.-]/g, "")
    .slice(0, 15);

  const backupPath = path.join(
    backupDir,
    `${name}_${timestamp}${ext}`
  );

  await fs.copyFile(sourceFile, backupPath);
  console.log(`Backup created: ${backupPath}`);
}

backupFile("example.txt", "backup");
