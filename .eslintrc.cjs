module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['**/*.jsx'],
            parser: '@babel/eslint-parser',
            parserOptions: {
                requireConfigFile: false,
                ecmaVersion: 2018,
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
                babelOptions: {
                    presets: ['@babel/preset-react'],
                },
            },
        },
    ],

    ignorePatterns: [
        'dist',
        '.eslintrc.cjs',
        'src/main.jsx',
    ],
    parser: '@babel/eslint-parser',
    parserOptions: {
        requireConfigFile: false,
        ecmaVersion: '2018',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
        babelOptions: {
            presets: ['@babel/preset-react'],
        },
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    plugins: [
        'react',
        'prettier',
        'react-refresh',
    ],
    rules: {
        'no-unused-vars': 'off',
        'react/prop-types': 'error',
        'prettier/prettier': 'off',
        'react/react-in-jsx-scope': 'off',
    },

};
