module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.ts?$": "ts-jest"
	},
  "testMatch": [
		"<rootDir>/src/**/*.spec.(ts|tsx|js)"
	],
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ]
}