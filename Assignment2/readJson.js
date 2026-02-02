const fs = require("fs");

// Read the JSON file
fs.readFile("data.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  try {
    // Parse JSON string into JavaScript object
    const jsonObject = JSON.parse(data);
    console.log("Parsed object:", jsonObject);
  } catch (parseError) {
    console.error("Error parsing JSON:", parseError);
  }
});
