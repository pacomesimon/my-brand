import fs from 'fs';

fs.copyFile("./src/test/README.md", "./README.md", (err) => {
    if (err) {
      console.log("\n README FILE COPYING Error Found:", err);
    }
    else {
      console.log("\n README FILE INITIALIZED");
    }
});