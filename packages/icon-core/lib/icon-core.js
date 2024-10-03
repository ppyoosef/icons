'use strict';
const fs = require('fs');
const path = require('path');

module.exports = createIconDataList;

function createIconDataList() {
  const icons = [];
  const filesInDirectory = fs.readdirSync(path.join(__dirname,`../../../icons`), { withFileTypes: true });

  filesInDirectory.forEach((file) => {
    const data = fs.readFileSync(path.join(__dirname,`../../../icons/${file.name}`), 'utf8');
    // Remove unnecessary html tags
    var rawData = data
        .replace(`<?xml version="1.0" encoding="UTF-8" standalone="no"?>`, '')
        .replace('<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">', '')
        .replace(/<svg.*>/gi, "\n")
        .replace(/<rect\s+id="[^"]*"\s+x="[^"]*"\s+y="[^"]*"\s+width="24"\s+height="24"\s+style="fill:none;"\s*\/?>/gi, "")
        .replace(/<rect\s+id="[^"]*"\s+serif:id="[^"]*"\s+x="[^"]*"\s+y="[^"]*"\s+width="24"\s+height="24"\s+style="fill:none;"\s*\/?>/gi, "")
        .replace(/style=\".*\"/gi, "\n")
        .replace(/serif:id=\".*\">/gi, ">")
        .replace(/ serif:id=\".*\" /gi, " ")
        .replace(/>\s+</g, "><")
        .replace(`</svg>`, '')
        .replace(/\n|\r/g, "");

    icons.push({ name: file.name.replace('.svg', ''), svg: rawData });
});
createIconDataFile(icons);
}

function createIconDataFile(data, iconStyle) {
  let fileContent = `export const icons = ${JSON.stringify(data, null, 2)
      // .replace(/"([^"]+)":/g, '$1:')
      // .replace(/'/g, "\'")
      // .replace(/"/g, "'")
      };`;

  fs.writeFile(path.join(__dirname, `./icon-data.js`), fileContent, (err) => {
      if (err) throw err;
      console.log('File saved successfully!');
      // copyFileToPackage(iconStyle);
  });
}

createIconDataList();
