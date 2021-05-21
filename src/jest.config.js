module.exports = {
  roots: ["<rootDir>"],
  setupFiles: ["./jest.config.js", "jest-canvas-mock"],
  moduleFileExtensions: ["js", "ts", "tsx", "json"],
  testPathIgnorePatterns: [
    "<rootDir>[/\\\\](node_modules)[/\\\\]",
    "<rootDir>/src/index.tsx",
    "<rootDir>/src/*.config.js",
    "<rootDir>/src/*.(js|ts)",
  ],
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$"],
  collectCoverageFrom: [
    "<rootDir>/components/**/*.+(js|ts|tsx)",
    "<rootDir>/lib/**/*.+(js|ts|tsx)",
    "<rootDir>/src/App.tsx",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest",
  },
  collectCoverage: true,
  coverageReporters: ["lcov"],
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      statements: 80,
      functions: 80,
      lines: 80,
    },
  },
};
