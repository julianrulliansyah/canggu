import type { ChunkAddonFunction, UserConfig } from 'tsdown'

import { existsSync, readFileSync, writeFileSync } from 'node:fs'

export const config: UserConfig = {
	banner   : (context: Parameters<ChunkAddonFunction>[0]): string => context.fileName.startsWith('scripts' + '/') ? '#!/usr/bin/env node' : [ '.tsx', '.ts' ].map((extension: string): string => 'src' + '/' + context.fileName.replace(/\.js$/, extension)).some((path: string): boolean => existsSync(path) && readFileSync(path, 'utf8').startsWith('\'use client\'')) ? '"use client"' : '',
	checks   : { moduleLevelDirective : false },
	clean    : true,
	dts      : true,
	entry    : [ 'src/index.ts', 'src/components/**/index.tsx', 'src/composites/**/index.tsx', 'src/utilities/*/index.ts', 'src/scripts/index.ts' ],
	platform : 'neutral',
	unbundle : true,
	hooks    : {
		'build:done' : (): void => {
			writeFileSync('dist/styles.css', readFileSync('src/assets/styles/index.css', 'utf8').replace(/^@import '#\/assets\/styles\/font\/index\.css';\n\n/m, '').replace(/^@import 'tailwindcss';\n/m, '').replace(/^(@import 'tw-animate-css';)$/m, '$1\n\n@source \'../src\';').replace(/^@import '#\/(assets\/styles\/(?:libraries|theme)\/[a-z./]+)';$/gm, (_: string, path: string): string => readFileSync('src' + '/' + path, 'utf8').trim()))
			writeFileSync('dist/font.css', readFileSync('src/assets/styles/font/index.css', 'utf8'))
		},
	},
}

export default config
