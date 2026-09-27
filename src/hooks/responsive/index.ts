'use client'

import { useSyncExternalStore } from 'react'

function useMedia(query: string): boolean {
	return useSyncExternalStore((notify: () => void): () => void => {
		const list = window.matchMedia(query)

		list.addEventListener('change', notify)

		return (): void => {
			list.removeEventListener('change', notify)
		}
	}, (): boolean => window.matchMedia(query).matches, (): boolean => false)
}

export function useSmall(): boolean {
	return useMedia('(width < 48rem)')
}

export function useMedium(): boolean {
	return useMedia('(48rem <= width < 64rem)')
}

export function useLarge(): boolean {
	return useMedia('(width >= 64rem)')
}
