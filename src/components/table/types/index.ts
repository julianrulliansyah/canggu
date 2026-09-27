import type { useRender } from '@base-ui/react'

export type Table        = Readonly<useRender.ComponentProps<'table'>>
export type TableHeader  = Readonly<useRender.ComponentProps<'thead'>>
export type TableBody    = Readonly<useRender.ComponentProps<'tbody'>>
export type TableFooter  = Readonly<useRender.ComponentProps<'tfoot'>>
export type TableRow     = Readonly<useRender.ComponentProps<'tr'>>
export type TableHead    = Readonly<useRender.ComponentProps<'th'>>
export type TableCell    = Readonly<useRender.ComponentProps<'td'>>
export type TableCaption = Readonly<useRender.ComponentProps<'caption'>>
