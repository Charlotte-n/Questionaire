const config = {
    preset: 'ts-jest',
    clearMocks: true,
    moduleNameMapper: {
        '^lodash-es$': 'lodash',
    },
    collectCoverage: true,
    coverageDirectory: 'coverage',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleFileExtensions: [
        'js',
        'mjs',
        'cjs',
        'jsx',
        'ts',
        'tsx',
        'json',
        'node',
    ],

    testEnvironment: 'jsdom',
}

export default config
