/*global module */
/*esLint no-undef: "error"*/
module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/unit/**/*.spec.ts'],
  // globals: {
  //   'ts-jest': {
  //     tsConfig: 'test/tsconfig.json',
  //   },
  // },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: './unit.junit.xml',
        outputDirectory: './test-reports',
        suiteNameTemplate: '{filename}',
        classNameTemplate: '{classname}',
        titleTemplate: '{title}',
      },
    ],
  ],
  collectCoverageFrom: ['**/src/**/*.ts'],
  coveragePathIgnorePatterns: ['./src/index.ts'],
  // coverageThreshold: {
  //   global: {
  //     functions: 100,
  //     branches: 100,
  //     lines: 100,
  //   },
  // },
};
