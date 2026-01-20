const fs = require("fs").promises;
const path = require("path");

const [, , command, filePath, extra] = process.argv;

async function handleError(error) {
  if (error.code === "ENOENT") {
    console.error("Error: File or directory not found.");
  } else if (error.code === "EACCES") {
    console.error("Error: Permission denied.");
  } else {
    console.error("Unexpected Error:", error.message);
  }
}

async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    console.log(data);
  } catch (error) {
    handleError(error);
  }
}

async function writeFile(filePath, content) {
  try {
    await fs.writeFile(filePath, content);
    console.log("File written successfully.");
  } catch (error) {
    handleError(error);
  }
}

async function appendFile(filePath, content) {
  try {
    await fs.appendFile(filePath, content + "\n");
    console.log("Content appended successfully.");
  } catch (error) {
    handleError(error);
  }
}

async function copyFile(src, dest) {
  try {
    await fs.copyFile(src, dest);
    console.log("File copied successfully.");
  } catch (error) {
    handleError(error);
  }
}

async function deleteFile(filePath) {
  try {
    await fs.unlink(filePath);
    console.log("File deleted successfully.");
  } catch (error) {
    handleError(error);
  }
}

async function listDirectory(dirPath) {
  try {
    const files = await fs.readdir(dirPath);
    files.forEach(file => console.log(file));
  } catch (error) {
    handleError(error);
  }
}

(async () => {
  switch (command) {
    case "read":
      await readFile(filePath);
      break;
    case "write":
      await writeFile(filePath, extra);
      break;
    case "append":
      await appendFile(filePath, extra);
      break;
    case "copy":
      await copyFile(filePath, extra);
      break;
    case "delete":
      await deleteFile(filePath);
      break;
    case "list":
      await listDirectory(filePath);
      break;
    default:
      console.log("Invalid command.");
  }
})();
