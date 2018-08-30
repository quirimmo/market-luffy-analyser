module.exports = {
  "setupFiles": [
		"<rootDir>/test/test-shim.js",
		"<rootDir>/test/test-setup.js"
	],
	"moduleFileExtensions": [
		"ts",
		"tsx",
		"js"
	],
	"moduleNameMapper": {
		"\\.(css|less)$": "<rootDir>/test/style-mock.js"
	},
	"transform": {
		".+\\.(css|styl|less|sass|scss)$": "<rootDir>/node_modules/jest-css-modules-transform",
		".(tsx|ts)": "<rootDir>/test/test-preprocessor.js"
	},
	"testMatch": [
		"**/*.spec.(ts|tsx|js)"
	],
	"collectCoverageFrom": [
		"src/**/*.{tsx}",
		"!src/index.tsx",
		"!<rootDir>/node_modules/",
		"!<rootDir>/test/"
	]
}