import { describe, expect, test } from 'bun:test'

import { locate, palette, text } from '@/components/chart/utilities'

describe('locate()', (): void => {
	test('falls back upon the key itself when the payload names no series of the configuration', (): void => {
		expect(locate({ desktop : { label : 'Desktop' } }, { name : 'tablet' }, 'desktop')).toEqual({ label : 'Desktop' })
	})

	test('prefers the series named by the payload over the series named by the key', (): void => {
		expect(locate({ desktop : { label : 'Desktop' }, mobile : { label : 'Mobile' } }, { name : 'mobile' }, 'name')).toEqual({ label : 'Mobile' })
	})

	test('reads the nested payload when the outer payload bears no text under the key', (): void => {
		expect(locate({ mobile : { label : 'Mobile' } }, { payload : { name : 'mobile' } }, 'name')).toEqual({ label : 'Mobile' })
	})

	test('returns undefined when neither the payload nor the key names any series', (): void => {
		expect(locate({ desktop : { label : 'Desktop' } }, null, 'tablet')).toBe(undefined)
	})
})

describe('palette()', (): void => {
	test('omits every series bearing neither colour nor theme', (): void => {
		expect(palette({ desktop : { label : 'Desktop' } })).toEqual({})
	})

	test('yields light-dark() joining both values for every series bearing theme', (): void => {
		expect(Object.entries(palette({ desktop : { theme : { dark : '#ffffff', light : '#000000' } } }))).toEqual([ [ '--color-desktop', 'light-dark(#000000, #ffffff)' ] ])
	})

	test('yields one custom property of colour for every series bearing colour', (): void => {
		expect(Object.entries(palette({ desktop : { color : 'var(--chart-primary)' }, mobile : { color : '#000000' } }))).toEqual([ [ '--color-desktop', 'var(--chart-primary)' ], [ '--color-mobile', '#000000' ] ])
	})
})

describe('text()', (): void => {
	test('returns the string held under the key of the object supplied', (): void => {
		expect(text({ name : 'desktop' }, 'name')).toBe('desktop')
	})

	test('returns undefined when the source supplied is no object or null', (): void => {
		expect(text('desktop', 'name')).toBe(undefined)
		expect(text(null, 'name')).toBe(undefined)
	})

	test('returns undefined when the value held under the key is no string', (): void => {
		expect(text({ name : 1 }, 'name')).toBe(undefined)
		expect(text({}, 'name')).toBe(undefined)
	})
})
