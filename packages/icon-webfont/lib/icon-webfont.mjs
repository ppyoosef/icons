"use strict";

import { webfont } from "webfont";
import * as fs from "fs";
import template from "lodash.template";

const formats = ["ttf", "woff", "woff2"];
const fontHeight = 1000;

fs.mkdirSync(`dist/fonts`, { recursive: true });

await webfont({
  files: `../../icons/*.svg`,
  fontName: "icons",
  prependUnicode: false,
  formats,
  normalize: true,
  fontHeight,
  descent: 100,
  ascent: 900,
  fixedWidth: false,
})
  .then((result) => {
    formats.forEach((format) => {
      fs.writeFileSync(`dist/fonts/icons.${format}`, result[format]);
    });

    const glyphs = result.glyphsData
      .map((icon) => icon.metadata)
      .sort(function (a, b) {
        return ("" + a.name).localeCompare(b.name);
      });

    const options = {
      name: `Icons`,
      fileName: `icons`,
      glyphs,
      v: "0.0.1",
      aliases: {},
    };

    //scss
    const compiled = template(fs.readFileSync(`lib/icon-font.scss`).toString());
    const resultSCSS = compiled(options);
    fs.writeFileSync(`dist/icons.scss`, resultSCSS);

    //html
    const compiledHtml = template(
      fs.readFileSync(`lib/icon-font.html`).toString()
    );
    const resultHtml = compiledHtml(options);
    fs.writeFileSync(`dist/icons.html`, resultHtml);
  })
  .catch((error) => {
    throw error;
  });
