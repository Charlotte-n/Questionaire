/** @type {import('ts-jest').JestConfigWithTsJest} **/

/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
    preset: 'ts-jest/presets/js-with-ts',
    testEnvironment: 'jsdom',
    transform: {
        '^.+.js$': 'babel-jest',
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    moduleNameMapper: {
        '^lodash-es$': 'lodash',
    },
    clearMocks: true,
    moduleDirectories: ['node_modules', 'src'],
    transformIgnorePatterns: ['node_modules/(?!(spacetime)/)'],
}
