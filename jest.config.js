module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@assets/(.*)$': '<rootDir>/assets/$1',
    '^@context/(.*)$': '<rootDir>/context/$1',
    '^@navigation/(.*)$': '<rootDir>/navigation/$1',
    '^@screens/(.*)$': '<rootDir>/screens/$1',
    '^@services/(.*)$': '<rootDir>/services/$1',
    '^@utils/(.*)$': '<rootDir>/utils/$1',
    '^@components/(.*)$': '<rootDir>/components/$1',
    '^@models/(.*)$': '<rootDir>/types/$1',
    '^@const/(.*)$': '<rootDir>/constants/$1',
  },
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/', '/dist/', '/build/'],
};
