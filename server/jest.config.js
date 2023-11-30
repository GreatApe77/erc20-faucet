
/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.test.ts?(x)'],
    moduleNameMapper:{
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@test/(.*)$': '<rootDir>/__tests__/$1',
    }


}