import { describe, expect, test } from 'bun:test'

import { cn } from '@/utilities/class'

describe('cn()', (): void => {
	test('keeps every utility of the theme when no later class conflicts', (): void => {
		expect(cn('h-control-md', 'w-full')).toBe('h-control-md w-full')
	})

	test('merges every utility of Tailwind exactly as tailwind-merge does', (): void => {
		expect(cn('px-2 py-1', 'p-3')).toBe('p-3')
		expect(cn('text-sm', 'text-base')).toBe('text-base')
	})

	test('replaces every utility of the theme with the later class of the same property', (): void => {
		expect(cn('h-control-md', 'h-8')).toBe('h-8')
		expect(cn('size-control-md', 'size-auto')).toBe('size-auto')
		expect(cn('min-h-textarea', 'min-h-4')).toBe('min-h-4')
		expect(cn('size-check', 'size-6')).toBe('size-6')
	})
})
