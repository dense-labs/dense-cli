import {defineConfig} from 'tsup'

const config = {
	outDir: 'dist',
	clean: true,
	minify: true,
	sourcemap: false
}

export default defineConfig([
	{
		entry: ['src/main.ts'],
		treeshake: true,
		format: ['cjs'],
		...config
	},
	{
		entry: ['src/gitproxy.ts'],
		treeshake: true,
		format: ['cjs'],
		...config
	}
])
