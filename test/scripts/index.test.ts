import { existsSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir }                                               from 'node:os'
import { join }                                                 from 'node:path'

import { describe, expect, test } from 'bun:test'

const command  = join(process.cwd(), 'src', 'scripts', 'index.ts')
const manifest = JSON.parse(readFileSync('package.json', 'utf8'))

function stage(config: unknown): string {
	const directory = mkdtempSync(join(tmpdir(), 'canggu' + '-'))

	writeFileSync(join(directory, 'package.json'), JSON.stringify({ dependencies : { ...manifest.dependencies, ...manifest.peerDependencies }, name : 'consumer' }))

	if (!(config === undefined))
		writeFileSync(join(directory, 'canggu.json'), JSON.stringify(config))

	return directory
}

function run(directory: string, argument: string[]): Bun.SyncSubprocess<'pipe', 'pipe'> {
	return Bun.spawnSync([ 'bun', command, ...argument ], { cwd : directory, stderr : 'pipe', stdout : 'pipe' })
}

describe('add()', (): void => {
	test('copies every module requested together with every module imported beneath the directories configured', (): void => {
		const directory = stage({ alias : { components : '@/kit/components', composites : '@/kit/composites', utilities : '@/kit/utilities' }, directory : { components : 'kit/components', composites : 'kit/composites', style : 'kit/styles', utilities : 'kit/utilities' } })

		expect(run(directory, [ 'add', 'step' ]).exitCode).toBe(0)
		expect([ 'kit/composites/step/index.tsx', 'kit/composites/step/types/index.ts', 'kit/composites/step/utilities/index.ts', 'kit/components/button/index.tsx' ].every((path: string): boolean => existsSync(join(directory, path)))).toBe(true)
	})

	test('exits with failure when the name requested matches no module of any classification', (): void => {
		expect(run(stage({}), [ 'add', 'nothing' ]).exitCode).toBe(1)
	})

	test('keeps every file already present unless the flag overwrite is supplied', (): void => {
		const directory = stage({})

		run(directory, [ 'add', 'button' ])
		writeFileSync(join(directory, 'src/canggu/components/button/index.tsx'), 'kept')
		run(directory, [ 'add', 'button' ])

		expect(readFileSync(join(directory, 'src/canggu/components/button/index.tsx'), 'utf8')).toBe('kept')

		run(directory, [ 'add', 'button', '--overwrite' ])

		expect(readFileSync(join(directory, 'src/canggu/components/button/index.tsx'), 'utf8')).not.toBe('kept')
	})

	test('refuses to copy anything when canggu.json is missing from the project', (): void => {
		expect(run(stage(undefined), [ 'add', 'button' ]).exitCode).toBe(1)
	})

	test('rewrites every alias of the repository into the alias configured by the consumer', (): void => {
		const directory = stage({ alias : { components : '@/kit/components', composites : '@/kit/composites', utilities : '@/kit/utilities' } })

		run(directory, [ 'add', 'step' ])

		expect(readFileSync(join(directory, 'src/canggu/composites/step/index.tsx'), 'utf8')).toContain('from \'@/kit/components/button\'')
		expect(readFileSync(join(directory, 'src/canggu/composites/step/index.tsx'), 'utf8')).not.toContain('\'@/components/')
	})

	test('takes the default of every key absent from canggu.json written before composites existed', (): void => {
		const directory = stage({ alias : { components : '@/components', utilities : '@/utilities' }, directory : { components : 'src/components', style : 'src/styles', utilities : 'src/utilities' } })

		run(directory, [ 'add', 'step' ])

		expect(existsSync(join(directory, 'src/canggu/composites/step/index.tsx'))).toBe(true)
		expect(existsSync(join(directory, 'src/components/button/index.tsx'))).toBe(true)
	})
})

describe('list()', (): void => {
	test('names every module of every classification upon one line for each classification', (): void => {
		expect(run(stage(undefined), [ 'list' ]).stdout.toString().split('\n').filter((line: string): boolean => line.length > 0).map((line: string): string => line.slice(0, line.indexOf(':')))).toEqual([ 'Components', 'Composites', 'Hooks', 'Utilities' ])
		expect(run(stage(undefined), [ 'list' ]).stdout.toString()).toContain('Composites: command, message/scroll, sidebar, step')
	})
})
