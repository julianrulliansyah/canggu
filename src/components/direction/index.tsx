import type { JSX }        from 'react'
import type * as Component from '@/components/direction/types'

import { DirectionProvider } from '@base-ui/react'

export function Direction(property: Component.Direction): JSX.Element {
	return <DirectionProvider {...property} />
}

export { useDirection } from '@base-ui/react'
