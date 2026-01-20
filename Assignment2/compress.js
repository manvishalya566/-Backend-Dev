const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

function compressFile(inputFile) {
  if (!fs.existsSync(inputFile)) {
    console.log("File not found:", inputFile);
    return;
  }

  const outputFile = `${inputFile}.gz`;

  const readStream = fs.createReadStream(inputFile);
  const writeStream = fs.createWriteStream(outputFile);
  const gzip = zlib.createGzip();

  readStream
    .pipe(gzip)
    .pipe(writeStream)
    .on("finish", () => {
      console.log("File compressed successfully:", outputFile);
    })
    .on("error", (err) => {
      console.error("Compression error:", err);
    });
}

compressFile(path.join(__dirname, "app.log"));
