const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

// Get input file from command line
const inputFile = process.argv[2];

if (!inputFile) {
  console.error("Usage: node compress.js <file>");
  process.exit(1);
}

// Output file name
const outputFile = `${inputFile}.gz`;

// Create streams
const readStream = fs.createReadStream(inputFile);
const writeStream = fs.createWriteStream(outputFile);
const gzip = zlib.createGzip();

// Handle errors
readStream.on("error", console.error);
writeStream.on("error", console.error);

// Pipe streams together
readStream
  .pipe(gzip)
  .pipe(writeStream)
  .on("finish", () => {
    console.log("File compressed successfully:", outputFile);
  });
