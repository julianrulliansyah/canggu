import type { useRender } from '@base-ui/react'

export type ImageRatio = Readonly<useRender.ComponentProps<'div'>> & Readonly<{ ratio : number }>
