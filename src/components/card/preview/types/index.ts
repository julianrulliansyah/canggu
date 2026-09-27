import type { PreviewCard } from '@base-ui/react'

export type CardPreview        = Readonly<PreviewCard.Root.Props>
export type CardPreviewTrigger = Readonly<PreviewCard.Trigger.Props>
export type CardPreviewPopup   = Readonly<PreviewCard.Popup.Props> & Readonly<Pick<PreviewCard.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'>>
