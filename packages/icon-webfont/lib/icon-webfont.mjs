'use strict';

// module.exports = iconWebfont;

// function iconWebfont() {
//   return 'Hello from iconWebfont';
// }


import { webfont } from "webfont";
import * as fs from 'fs'
import template from 'lodash.template'
// import { getPackageDir, getPackageJson, getAliases, types, asyncForEach, toPascalCase } from '../../../.build/helpers.mjs'

const formats = ['ttf', 'woff', 'woff2']
// const p = getPackageJson()
// const DIR = getPackageDir('icons-webfont')
const fontHeight = 1000

// const aliases = getAliases(true)

fs.mkdirSync(`../dist/fonts`, { recursive: true })

// types.push('all')

// const getAlliasesFlat = () => {
//   let allAliases = {}

//   Object.entries(aliases).forEach(([type, aliases]) => {
//     Object.entries(aliases).forEach(([from, to]) => {
//       allAliases[`${from}${type !== 'outline' ? `-${type}` : ''}`] = `${to}${type !== 'outline' ? `-${type}` : ''}`
//     })
//   })

//   return allAliases
// }

// asyncForEach(types, async type => {
  console.log(`Building webfont for icons`)

  await webfont({
    files: `../../icons/*.svg`,
    fontName: 'icons',
    prependUnicode: true,
    formats,
    normalize: true,
    fontHeight,
    descent: 100,
    ascent: 900,
    fixedWidth: false
  })
    .then((result) => {
      formats.forEach(format => {
        fs.writeFileSync(`../dist/fonts/icons.${format}`, result[format])
      })

      const glyphs = result.glyphsData
        .map(icon => icon.metadata)
        .sort(function (a, b) {
          return ('' + a.name).localeCompare(b.name)
        })

      const options = {
        name: `Icons`,
        fileName: `icons`,
        glyphs,
        v: "0.0.1",
        aliases: {}
      }

      //scss
      const compiled = template(fs.readFileSync(`lib/icon-font.scss`).toString())
      const resultSCSS = compiled(options)
      fs.writeFileSync(`../dist/icons.scss`, resultSCSS)

      //html
      const compiledHtml = template(fs.readFileSync(`lib/icon-font.html`).toString())
      const resultHtml = compiledHtml(options)
      fs.writeFileSync(`../dist/icons.html`, resultHtml)
    })
    .catch((error) => {
      throw error;
    });
// })