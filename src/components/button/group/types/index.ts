import type { Separator, useRender } from '@base-ui/react'
import type { VariantProps }         from 'class-variance-authority'
import type { ButtonGroupCVA }       from '@/components/button/group'

export type ButtonGroup          = Readonly<useRender.ComponentProps<'div'>> & VariantProps<typeof ButtonGroupCVA>
export type ButtonGroupText      = Readonly<useRender.ComponentProps<'div'>>
export type ButtonGroupSeparator = Readonly<Separator.Props>
