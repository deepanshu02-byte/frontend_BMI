import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    collectCoverage: true,
    collectCoverageFrom: ['src/components/reusable/**/*.{ts,tsx}', '!src/**/*.d.ts', '!**/vendor/**'],
    coverageDirectory: 'coverage',
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    transformIgnorePatterns: ['/node_modules/'],
    coverageReporters: ['lcov', 'html', 'text'],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/coverage',
        '/dist',
        'package.json',
        'package-lock.json',
        'pnpm-lock.json',
        'yarn-lock.json',
        'jest.setup.ts',
        'main.tsx',
        'src/validators',
        'src/utils',
        'src/constants',
        'src/assets',
        'src/components/reusable/Table.tsx',
    ],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
};

export default config;