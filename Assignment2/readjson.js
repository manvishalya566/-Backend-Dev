const fs = require("fs");
fs.readFile("data.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const jsonObject = JSON.parse(data);

  console.log("JavaScript Object:", jsonObject);
  console.log("Name:", jsonObject.name);
  console.log("Skills:", jsonObject.skills);
});