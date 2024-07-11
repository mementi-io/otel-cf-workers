import globals from 'globals'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'

export default [
	{
		name: 'global-ignores',
		ignores: ['bin/', '.wrangler/', 'babel.config.js', 'jest.config.js', 'eslint.config.mjs'],
	},
	{
		name: 'global-includes',
		files: ['**/*.{js,mjs,cjs,ts}'],
	},
	{
		name: 'global-globals',
		languageOptions: {
			globals: {
				...globals.browser,
			},
		},
	},
	{
		name: 'jest-globals',
		files: ['**/*.test.{js.mjs.cjs.ts}'],
		languageOptions: {
			globals: {
				...global.jest,
			},
		},
	},
	{
		name: 'e2e-globals',
		files: ['e2e/**/*.{js,mjs,cjs,ts}'],
		languageOptions: {
			globals: {
				__ENV: 'readonly',
			},
		},
	},
	{
		name: 'plugins',
		plugins: {
			'@stylistic': stylistic,
			'@typescript-eslint': tseslint.plugin,
		},
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				project: true,
			},
		},
	},
	stylistic.configs.customize({
		indent: 4,
		quotes: 'single',
		semi: true,
		jsx: false,
		quoteProps: 'consistent-as-needed',
		commaDangle: 'always-multiline',
		blockSpacing: false,
		braceStyle: '1tbs',
	}),
	{
		name: 'custom-rule-overrides',
		rules: {
			'prefer-const': ['error', { destructuring: 'all' }],
			'@stylistic/array-bracket-spacing': ['error', 'always'],
			'@stylistic/block-spacing': ['error', 'always'],
		},
	},
]
