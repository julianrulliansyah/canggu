'use client'

import type * as Component from '@/hooks/keyboard/types'

import { useEffect, useRef } from 'react'

export function useKeyboard({ key, hold, onAction }: Component.HooksKeyboard): void {
	const ref = { action : useRef(onAction) }

	useEffect(() => {
		ref.action.current = onAction
	})

	useEffect(() => {
		const perform = {
			down : (event: KeyboardEvent): void => {
				if (!(event.key === key) || !(hold === 'meta' || (hold === 'command' && /Mac|iPhone|iPad/.test(navigator.userAgent)) ? event.metaKey : event.ctrlKey))
					return

				event.preventDefault()

				ref.action.current()
			},
		}

		window.addEventListener('keydown', perform.down)

		return (): void => {
			window.removeEventListener('keydown', perform.down)
		}
	}, [ key, hold, ref.action ])
}
