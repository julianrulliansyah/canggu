'use client'

import type * as Component from '@/utilities/keyboard/types'

import { useEffect, useRef } from 'react'

export function useKeyboard({ key, hold, onAction }: Component.UtilitiesKeyboard): void {
	const ref = { action : useRef(onAction) }

	useEffect(() => {
		ref.action.current = onAction
	})

	useEffect(() => {
		const perform = {
			down : (event: KeyboardEvent): void => {
				if (!(event.key === key) || !(hold === 'meta' ? event.metaKey : event.ctrlKey))
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
