import type { JSX }        from 'react'
import type * as Component from '@/components/collapsible/types'

import { Collapsible as CollapsiblePrimitive } from '@base-ui/react'

export function Collapsible(property: Component.Collapsible): JSX.Element {
	return <CollapsiblePrimitive.Root data-slot={'collapsible'} {...property} />
}

export function CollapsibleTrigger(property: Component.CollapsibleTrigger): JSX.Element {
	return <CollapsiblePrimitive.Trigger data-slot={'collapsible-trigger'} {...property} />
}

export function CollapsiblePanel(property: Component.CollapsiblePanel): JSX.Element {
	return <CollapsiblePrimitive.Panel data-slot={'collapsible-panel'} {...property} />
}
