/** @type {import('jest').Config} */
export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.js'],
  moduleFileExtensions: ['js', 'jsx', 'json'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(js|jsx)$': [
      'babel-jest',
      { presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]] },
    ],
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  collectCoverageFrom: ['src/**/*.{js,jsx}', '!src/main.jsx', '!src/**/index.{js,jsx}'],
};
