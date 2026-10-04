'use client'

import type * as Component     from '@/hooks/theme/types'
import type { UtilitiesTheme } from '@/utilities/theme'

import { useSyncExternalStore } from 'react'

function read(): UtilitiesTheme {
	return document.documentElement.dataset['theme'] === 'echo' ? 'echo' : 'berawa'
}

export function useTheme(): Component.HooksTheme {
	const theme = useSyncExternalStore((notify: () => void): () => void => {
		const observer = new MutationObserver(notify)

		observer.observe(document.documentElement, { attributeFilter : [ 'data-theme' ] })

		return (): void => {
			observer.disconnect()
		}
	}, read, (): UtilitiesTheme => 'berawa')

	return {
		theme : theme,
		apply : (value: UtilitiesTheme): void => {
			document.documentElement.dataset['theme'] = value
		},
	}
}
