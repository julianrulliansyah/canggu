import { describe, expect, test } from 'bun:test'

import { Native } from '@/components/native'

describe('rectify()', (): void => {
	test('lowers the first letter of every name absent from the table of aliases', (): void => {
		expect(Native.Div).toBe('div')
		expect(Native.Section).toBe('section')
		expect(Native.H1).toBe('h1')
	})

	test('yields the same tag upon every later reach of one name', (): void => {
		expect([ Native.Span, Native.Span ]).toEqual([ 'span', 'span' ])
	})

	test('yields the tag recorded in the table of aliases for every name bearing one', (): void => {
		expect(Native.Paragraph).toBe('p')
		expect(Native.UnorderedList).toBe('ul')
		expect(Native.FEGaussianBlur).toBe('feGaussianBlur')
		expect(Native.Card).toBe('div')
	})
})
