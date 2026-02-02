const fs = require("fs");
const readline = require("readline");
const path = require("path");

const logFilePath = path.join(__dirname, "server.log");
const reportPath = path.join(__dirname, "summary.txt");

let totalLines = 0;
let errorCount = 0;
let warningCount = 0;
let infoCount = 0;

const readStream = fs.createReadStream(logFilePath, { encoding: "utf8" });

const rl = readline.createInterface({
  input: readStream,
  crlfDelay: Infinity,
});

rl.on("line", (line) => {
  totalLines++;

  if (line.includes("ERROR")) errorCount++;
  else if (line.includes("WARNING")) warningCount++;
  else if (line.includes("INFO")) infoCount++;
});

rl.on("close", () => {
  const report =
    `Log File Analysis Report\n` +
    `------------------------\n` +
    `Total Lines: ${totalLines}\n` +
    `ERROR: ${errorCount}\n` +
    `WARNING: ${warningCount}\n` +
    `INFO: ${infoCount}\n`;

  fs.createWriteStream(reportPath).write(report);
});
