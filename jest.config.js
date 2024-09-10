/** @type {import('ts-jest').JestConfigWithTsJest} **/
/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
    preset: 'ts-jest',
    transform: {
        '^.+.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.app.json' }],
    },
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    setupFilesAfterEnv: ['@testing-library/jest-dom/jest-globals'],
}
