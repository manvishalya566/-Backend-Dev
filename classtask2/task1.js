const fs = require("fs");
const path = require("path");

const [, , command, ...args] = process.argv;

function handleError(err) {
  if (err.code === "ENOENT") console.error("File or directory not found");
  else if (err.code === "EACCES") console.error("Permission denied");
  else console.error(err.message);
}

switch (command) {
  case "read": {
    const file = args[0];
    fs.readFile(file, "utf8", (err, data) => {
      if (err) return handleError(err);
      console.log(data);
    });
    break;
  }

  case "write": {
    const [file, ...content] = args;
    fs.writeFile(file, content.join(" "), (err) => {
      if (err) return handleError(err);
      console.log("File written successfully");
    });
    break;
  }

  case "append": {
    const [file, ...content] = args;
    fs.appendFile(file, content.join(" ") + "\n", (err) => {
      if (err) return handleError(err);
      console.log("Content appended");
    });
    break;
  }

  case "copy": {
    const [src, dest] = args;
    fs.copyFile(src, dest, (err) => {
      if (err) return handleError(err);
      console.log("File copied");
    });
    break;
  }

  case "delete": {
    const file = args[0];
    fs.unlink(file, (err) => {
      if (err) return handleError(err);
      console.log("File deleted");
    });
    break;
  }

  case "list": {
    const dir = args[0] || ".";
    fs.readdir(dir, (err, files) => {
      if (err) return handleError(err);
      files.forEach((file) => console.log(file));
    });
    break;
  }

  default:
    console.log(`
Usage:
 node fileManager.js read <file>
 node fileManager.js write <file> <content>
 node fileManager.js append <file> <content>
 node fileManager.js copy <source> <destination>
 node fileManager.js delete <file>
 node fileManager.js list <directory>
`);
}
