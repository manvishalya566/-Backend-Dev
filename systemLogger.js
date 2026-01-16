
const os = require("os");
const fs = require("fs");

setInterval(() => {
  const logData = `
Time: ${new Date().toLocaleString()}
Platform: ${os.platform()}
CPU: ${os.cpus()[0].model}
Total Memory: ${os.totalmem()}
Free Memory: ${os.freemem()}
-----------------------------------
`;

  fs.appendFile("system.log", logData, (err) => {
    if (err) {
      console.error("Error writing system info:", err);
    } else {
      console.log("System information logged");
    }
  });
}, 5000);
