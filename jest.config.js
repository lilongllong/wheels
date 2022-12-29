module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  // Equivalent to "compileOptions.baseUrl" in tsconfig.json
  moduleDirectories: ['node_modules', 'src'],
  // Ensure "window", "document", etc. are available
  testEnvironment: 'jsdom',
  // setup "require.context"
  setupFilesAfterEnv: ['./jest.setup.config.ts'],
  collectCoverage: true,
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['/src/utils/**/*.{ts, .tsx}', './src/components/**/*.{ts, .tsx}'],
  reporters: ['default', 'jest-junit'],
  transformIgnorePatterns: ['/node_modules/', '\\.pnp\\.[^\\/]+$'],
  transform: {
    // 使用 swc
    // '^.+\\.(ts|tsx)$': ['@swc/jest'],
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  maxWorkers: 1,
};
