const config = {
  transform: {
    "\\.[jt]sx?$": ["babel-jest", { excludeJestPreset: true }],
  },
  setupFiles: ["dotenv/config"],
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transformIgnorePatterns: ["node_modules/(?!(@prisma|@babel))"],
  setupFilesAfterEnv: ["<rootDir>/test/setup.ts"],
  testTimeout: 30000,
};

export default config;
