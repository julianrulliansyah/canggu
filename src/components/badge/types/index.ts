import type { useRender }    from '@base-ui/react'
import type { VariantProps } from 'class-variance-authority'
import type { BadgeCVA }     from '@/components/badge'

export type Badge = Readonly<useRender.ComponentProps<'span'>> & VariantProps<typeof BadgeCVA>
