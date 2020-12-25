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
