/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};

// export default {
//   preset: 'ts-jest',
//   transform: {
//     '^.+\\.tsx?$': 'ts-jest',
//     // process `*.tsx` files with `ts-jest`
//   },
//   rootDir: 'src',
//   moduleNameMapper: {
//     '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__ mocks __/fileMock.js',
//     '^@app/(.*)$': '<rootDir>/$1',
//   },
// };