import type { JSX }        from 'react'
import type * as Component from '@/components/card/preview/types'

import { PreviewCard } from '@base-ui/react'

import { cn } from '@/utilities/class'

export function CardPreview(property: Component.CardPreview): JSX.Element {
	return <PreviewCard.Root {...property} />
}

export function CardPreviewTrigger(property: Component.CardPreviewTrigger): JSX.Element {
	return <PreviewCard.Trigger data-slot={'card-preview-trigger'} {...property} />
}

export function CardPreviewPopup({ align, alignOffset = 4, className, side, sideOffset = 4, ...property }: Component.CardPreviewPopup): JSX.Element {
	return (
		<PreviewCard.Portal data-slot={'card-preview-portal'}>
			<PreviewCard.Positioner align={align} alignOffset={alignOffset} side={side} sideOffset={sideOffset} className={'isolate z-50'}>
				<PreviewCard.Popup data-slot={'card-preview-popup'} className={cn('z-50 w-64 origin-(--transform-origin) rounded-lg bg-popover p-2.5 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95', className)} {...property} />
			</PreviewCard.Positioner>
		</PreviewCard.Portal>
	)
}
