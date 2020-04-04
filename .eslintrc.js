module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/eslint-recommended'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'auto-import'],
    rules: {
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'double'],
        semi: ['error', 'never'],
        'auto-import/auto-import': [
            2,
            {
                rootPath: './src',
                packages: {
                    d3: 'd3',
                    bloodhound: 'Bloodhound',
                    moment: 'moment',
                    alkali: {
                        hasExports: 'module-path/to/alkali',
                    },
                    dgrid: {
                        modulesIn: './bower_components/dgrid',
                    },
                    dstore: {
                        modulesIn: './bower_components/dstore',
                    },
                },
            },
        ],
    },
}
