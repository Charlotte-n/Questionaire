const config = {
    preset: 'ts-jest',
    clearMocks: true,
    moduleNameMapper: {
        '^lodash-es$': 'lodash',
        '^uuid$': 'uuid',
        '\\.(css|less|scss|sss|styl)$': 'jest-css-modules',
    },
    collectCoverage: true,
    coverageDirectory: 'coverage',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.(t)s$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest',
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
    transformIgnorePatterns: ['<rootDir>/node_modules/.+.(js|jsx)$'],
}

export default config
