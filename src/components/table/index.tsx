'use client'

import type { JSX }        from 'react'
import type * as Component from '@/components/table/types'

import { mergeProps, useRender } from '@base-ui/react'

import { cn } from '@/utilities/class'

export function Table({ className, render, ...property }: Component.Table): JSX.Element {
	const table = useRender({ defaultTagName : 'table', props : mergeProps<'table'>({ className : cn('w-full caption-bottom text-sm', className) }, property), render : render, state : { slot : 'table' } })

	return useRender({ defaultTagName : 'div', props : { children : table, className : 'relative w-full overflow-x-auto' }, state : { slot : 'table-frame' } })
}

export function TableHeader({ className, render, ...property }: Component.TableHeader): JSX.Element {
	return useRender({ defaultTagName : 'thead', props : mergeProps<'thead'>({ className : cn('[&_tr]:border-b', className) }, property), render : render, state : { slot : 'table-header' } })
}

export function TableBody({ className, render, ...property }: Component.TableBody): JSX.Element {
	return useRender({ defaultTagName : 'tbody', props : mergeProps<'tbody'>({ className : cn('[&_tr:last-child]:border-0', className) }, property), render : render, state : { slot : 'table-body' } })
}

export function TableFooter({ className, render, ...property }: Component.TableFooter): JSX.Element {
	return useRender({ defaultTagName : 'tfoot', props : mergeProps<'tfoot'>({ className : cn('border-t bg-mute/65 font-medium dark:bg-neutral-950/50 [&>tr]:last:border-b-0', className) }, property), render : render, state : { slot : 'table-footer' } })
}

export function TableRow({ className, render, ...property }: Component.TableRow): JSX.Element {
	return useRender({ defaultTagName : 'tr', props : mergeProps<'tr'>({ className : cn('border-b transition-none duration-250 hover:bg-mute/50 hover:transition-colors has-aria-expanded:bg-mute/50 data-[state=selected]:bg-mute', className) }, property), render : render, state : { slot : 'table-row' } })
}

export function TableHead({ className, render, ...property }: Component.TableHead): JSX.Element {
	return useRender({ defaultTagName : 'th', props : mergeProps<'th'>({ className : cn('h-10 px-2 text-start align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pe-0', className) }, property), render : render, state : { slot : 'table-head' } })
}

export function TableCell({ className, render, ...property }: Component.TableCell): JSX.Element {
	return useRender({ defaultTagName : 'td', props : mergeProps<'td'>({ className : cn('p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pe-0', className) }, property), render : render, state : { slot : 'table-cell' } })
}

export function TableCaption({ className, render, ...property }: Component.TableCaption): JSX.Element {
	return useRender({ defaultTagName : 'caption', props : mergeProps<'caption'>({ className : cn('mt-4 text-sm text-mute-foreground', className) }, property), render : render, state : { slot : 'table-caption' } })
}
