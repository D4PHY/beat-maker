var fs = require("fs");

console.log("Going to read sounds directory");

fs.readdir("./sounds-library", function (err, files) {
  if (err) {
    return console.error(err);
  }
  console.log("teeeeeeest", files);
  fs.writeFile("sounds-lib.json", JSON.stringify(files), function (err) {
    if (err) {
      return console.error(err);
    }
  });
});

// READ DOCUMENTATION: https://www.tutorialspoint.com/nodejs/nodejs_file_system.htm

// Update json file with the names of the .wavs found in sound-library directory:
// 1. Make sure you have Node installed
// 2. Open VSCode terminal (Ctrl + `)
// 3. Run comand: node server
// 4. Run command: node update-sound-lib.js
