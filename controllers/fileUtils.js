const fs = require("fs");

function readFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeFile(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = { readFile, writeFile };
