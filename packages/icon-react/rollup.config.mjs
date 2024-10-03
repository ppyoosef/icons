import jsx from "rollup-plugin-jsx";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import pkg from "./package.json" assert { type: 'json' };

const name = pkg.name
	.replace(/^(@\S+\/)?(jsx-)?(\S+)/, "$3")
	.replace(/^\w/, (m) => m.toUpperCase())
	.replace(/-\w/g, (m) => m[1].toUpperCase());

export default {
	input: "lib/index.js",
	output: [
		{ file: "dist/index.mjs", format: "esm", sourcemap: true, },
		{ file: "dist/index.js", format: "cjs", name, sourcemap: true, },
	],
	plugins: [resolve(), commonjs(), jsx({ factory: "React.createElement" })],
};