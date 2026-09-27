import { describe, expect, test } from 'bun:test'

import { present, sequence, symbol } from '@/composites/step/utilities'

describe('present()', (): void => {
	test('returns false when the value supplied is either undefined or null as neither value bears content', (): void => {
		expect(present(undefined)).toBe(false)
		expect(present(null)).toBe(false)
	})

	test('returns false when the value supplied is empty text or text consisting of whitespace alone', (): void => {
		expect(present('')).toBe(false)
		expect(present('   ')).toBe(false)
	})

	test('returns true for arrays only where at least one member bears content', (): void => {
		expect(present([])).toBe(false)
		expect(present([ '', ' ' ])).toBe(false)
		expect(present([ '', 'a' ])).toBe(true)
	})

	test('returns true when the value supplied is any number whatsoever inclusive of zero', (): void => {
		expect(present(0)).toBe(true)
	})

	test('returns true when the value supplied is text bearing at least one character other than whitespace', (): void => {
		expect(present('a')).toBe(true)
		expect(present(' a ')).toBe(true)
	})
})

describe('sequence()', (): void => {
	test('yields no shortcut whatsoever when no mode is supplied', (): void => {
		expect(sequence(null)).toEqual([])
	})

	test('yields the nine digits from 1 through 9 without the digit 0 for the mode number', (): void => {
		expect(sequence('number')).toEqual([ '1', '2', '3', '4', '5', '6', '7', '8', '9' ])
	})

	test('yields the twenty-six letters of the Latin alphabet from A through Z in upper case for the mode letter', (): void => {
		expect(sequence('letter')).toEqual('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''))
	})
})

describe('symbol()', (): void => {
	test('maps every digit from 1 through 9 to that same digit for the mode number', (): void => {
		expect(symbol('1', 'number')).toBe('1')
		expect(symbol('9', 'number')).toBe('9')
	})

	test('maps every letter pressed in either case to the upper case form for the mode letter', (): void => {
		expect(symbol('a', 'letter')).toBe('A')
		expect(symbol('Z', 'letter')).toBe('Z')
	})

	test('returns null for every key that forms no part of the sequence of the mode supplied', (): void => {
		expect(symbol('0', 'number')).toBe(null)
		expect(symbol('a', 'number')).toBe(null)
		expect(symbol('1', 'letter')).toBe(null)
		expect(symbol('Enter', 'letter')).toBe(null)
	})
})
