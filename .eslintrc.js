module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: [
        'next',
        'eslint:recommended',
        'plugin:react/recommended',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: [
        'react',
    ],
    settings: {
        react: {
            version: 'detect',
        },
    },
    ignorePatterns: [],
    rules: {
        'no-use-before-define': 0,
        'no-undef': 0,
        'no-console': 0,
        'quotes': [
            'error',
            'single',
        ],
        'curly': [
            'error',
            'all',
        ],
        'default-case': 'error',
        'vars-on-top': 'error',
        'one-var': 0,
        'no-async-promise-executor': 0,
        'brace-style': [
            'error',
            '1tbs',
        ],
        'camelcase': [
            'error',
            {
                'properties': 'never',
            },
        ],
        'comma-dangle': ['error', 'always-multiline'],
        'comma-spacing': [
            'error',
            {
                'after': true,
                'before': false,
            },
        ],
        'comma-style': [
            'error',
            'last',
        ],
        'spaced-comment': [
            'error',
            'always',
        ],
        'space-unary-ops': 'error',
        'space-infix-ops': 'error',
        'space-in-parens': [
            'error',
            'never',
        ],
        'space-before-blocks': 'error',
        'semi-spacing': [
            'error',
            {
                'before': false,
                'after': true,
            },
        ],
        'keyword-spacing': [
            'error',
            {
                'after': true,
                'before': true,
            },
        ],
        'no-trailing-spaces': 'error',
        'no-unneeded-ternary': 'error',
        'no-multiple-empty-lines': [
            'error',
            {
                'max': 1,
            },
        ],
        'newline-per-chained-call': [
            'error',
            {
                'ignoreChainWithDepth': 3,
            },
        ],
        'newline-before-return': 'error',
        'padding-line-between-statements': [
            'error',
            { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*'},
            { blankLine: 'any',    prev: ['const', 'let', 'var'], next: ['const', 'let', 'var']},
        ],
        'multiline-ternary': [
            'error',
            'never',
        ],
        'max-params': [
            'error',
            6,
        ],
        'max-nested-callbacks': [
            'error',
            4,
        ],
        'lines-around-directive': [
            'error',
            'always',
        ],
        'lines-around-comment': [
            'error',
            {
                'beforeBlockComment': true,
            },
        ],
        'linebreak-style': [
            'error',
            'unix',
        ],
        'line-comment-position': [
            'error',
            {
                'position': 'above',
            },
        ],
        'key-spacing': [
            'error',
            {
                'beforeColon': false,
                'afterColon': true,
                'mode': 'strict',
            },
        ],
        'indent': [
            'error',
            4,
        ],
        'func-style': [
            'error',
            'expression',
        ],
        'func-call-spacing': [
            'error',
            'never',
        ],
        'eol-last': [
            'error',
            'always',
        ],
        'consistent-this': [
            'error',
            'that',
        ],
        'require-atomic-updates': 0,
        'no-prototype-builtins': 0,
        'no-return-assign': 0,
        // React
        'react/prop-types': 0,
        'react/no-unescaped-entities': 0,
        'react/display-name': 0,
        'react/react-in-jsx-scope': 0,
        'react-hooks/exhaustive-deps': 0,
        // Next
        '@next/next/no-img-element': 0,
    },
};
