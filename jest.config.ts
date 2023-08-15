module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "./",
  moduleNameMapper: {
    "infra/(.*)$": "<rootDir>/src/infra/$1",
    "domain/(.*)$": "<rootDir>/src/domain/$1",
    "shared/(.*)$": "<rootDir>/src/shared/$1",
  },
}