/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "\\.scss$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

module.exports = config;
