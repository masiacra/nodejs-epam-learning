module.exports = {
    env: {
        browser: false,
        node: true,
        es2021: true,
    },
    extends: ['node', 'prettier'],
    parserOptions: {
        ecmaFeatures: {},
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [],
    rules: {
        ['import/no-commonjs']: 'off',
        ['import/prefer-default-export']: 'off',
    },
    ignorePatterns: ['node_modules'],
};
