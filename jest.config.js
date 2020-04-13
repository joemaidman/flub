module.exports = {
    roots: ['<rootDir>/src'],
    modulePathIgnorePatterns: ['<rootDir>/src/api/test.ts'],
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
};
