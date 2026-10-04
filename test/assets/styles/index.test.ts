import { readFileSync } from 'node:fs'

import { describe, expect, test } from 'bun:test'

const contract = new Set([ 'src/assets/styles/index.css', 'src/composites/sidebar/index.tsx' ].flatMap((path: string): string[] => readFileSync(path, 'utf8').match(/--canggu-[a-z0-9-]+/g) ?? []))

function declare(theme: string): Set<string> {
	return new Set([ ...readFileSync('src/assets/styles/theme' + '/' + theme + '/' + 'index.css', 'utf8').matchAll(/(--canggu-[a-z0-9-]+)\s*:/g) ].map((each: RegExpExecArray): string => each[1] ?? ''))
}

describe('berawa()', (): void => {
	test('declares every token the contract reads', (): void => {
		const berawa = declare('berawa')

		expect([ ...contract ].filter((token: string): boolean => !berawa.has(token))).toEqual([])
	})
})

describe('echo()', (): void => {
	test('declares no token the contract never reads', (): void => {
		expect([ ...declare('echo') ].filter((token: string): boolean => !contract.has(token))).toEqual([])
	})
})
