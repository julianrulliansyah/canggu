'use client'

import type { JSX }        from 'react'
import type * as Component from '@/components/calendar/types'

import { useEffect, useRef } from 'react'

import { mergeProps, useRender }                         from '@base-ui/react'
import { ChevronDown, ChevronLeft, ChevronRight }        from 'lucide-react'
import { getDefaultClassNames, useDayPicker, DayPicker } from 'react-day-picker'

import { Button, ButtonCVA } from '@/components/button'
import { cn }                from '@/utilities/class'

export function Calendar({ button = 'ghost', captionLayout = 'label', className, classNames, components, formatters, locale, mark, modifiers, showOutsideDays = true, ...property }: Component.Calendar): JSX.Element {
	const theme = getDefaultClassNames()

	return <DayPicker showOutsideDays={showOutsideDays} modifiers={mark === undefined ? modifiers : { mark : mark, ...modifiers }} className={cn('group/calendar bg-background p-2 [--cell-radius:var(--radius-md)] [--cell-size:--spacing(7)] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-popup]:bg-transparent', 'rtl:**:[.rdp-button\\_next>svg]:rotate-180', 'rtl:**:[.rdp-button\\_previous>svg]:rotate-180', className)} captionLayout={captionLayout} locale={locale} formatters={{ formatMonthDropdown : (date) => date.toLocaleString(locale?.code, { month : 'short' }), ...formatters }} classNames={{ root : cn('w-fit', theme.root), months : cn('relative flex flex-col gap-4 md:flex-row', theme.months), month : cn('flex w-full flex-col gap-4', theme.month), nav : cn('absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1', theme.nav), button_previous : cn(ButtonCVA({ variant : button }), 'size-(--cell-size) p-0 select-none aria-disabled:opacity-50 md:size-(--cell-size)', theme.button_previous), button_next : cn(ButtonCVA({ variant : button }), 'size-(--cell-size) p-0 select-none aria-disabled:opacity-50 md:size-(--cell-size)', theme.button_next), month_caption : cn('flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)', theme.month_caption), dropdowns : cn('flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium', theme.dropdowns), dropdown_root : cn('relative rounded-(--cell-radius)', theme.dropdown_root), dropdown : cn('absolute inset-0 bg-popover opacity-0', theme.dropdown), caption_label : cn('font-medium select-none', captionLayout === 'label' ? 'text-sm' : 'flex items-center gap-1 rounded-(--cell-radius) text-sm [&>svg]:size-3.5 [&>svg]:text-mute-foreground', theme.caption_label), month_grid : cn('w-full border-collapse', theme.month_grid), weekdays : cn('flex', theme.weekdays), weekday : cn('flex-1 rounded-(--cell-radius) text-[calc(var(--canggu-typeface-size)*0.8)] font-normal text-mute-foreground select-none', theme.weekday), week : cn('mt-2 flex w-full', theme.week), week_number_header : cn('w-(--cell-size) select-none', theme.week_number_header), week_number : cn('text-[calc(var(--canggu-typeface-size)*0.8)] text-mute-foreground select-none', theme.week_number), day : cn('group/day relative aspect-square h-full w-full rounded-(--cell-radius) p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-e-(--cell-radius)', property.showWeekNumber ? '[&:nth-child(2)[data-selected=true]_button]:rounded-s-(--cell-radius)' : '[&:first-child[data-selected=true]_button]:rounded-s-(--cell-radius)', theme.day), range_start : cn('relative isolate z-0 rounded-s-(--cell-radius) bg-mute after:absolute after:inset-y-0 after:inset-e-0 after:w-4 after:bg-mute', theme.range_start), range_middle : cn('rounded-none', theme.range_middle), range_end : cn('relative isolate z-0 rounded-e-(--cell-radius) bg-mute after:absolute after:inset-y-0 after:inset-s-0 after:w-4 after:bg-mute', theme.range_end), today : cn('rounded-(--cell-radius) bg-mute text-foreground data-[selected=true]:rounded-none', theme.today), outside : cn('text-mute-foreground aria-selected:text-mute-foreground', theme.outside), disabled : cn('text-mute-foreground opacity-50', theme.disabled), hidden : cn('invisible', theme.hidden), ...classNames }} components={{ Chevron : CalendarChevron, DayButton : CalendarDay, Root : CalendarRoot, WeekNumber : CalendarWeek, ...components }} {...property} />
}

export function CalendarRoot({ rootRef, ...property }: Component.CalendarRoot): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ ref : rootRef }, property), state : { slot : 'calendar' } })
}

export function CalendarChevron({ className, orientation, ...property }: Component.CalendarChevron): JSX.Element {
	return orientation === 'left' ? <ChevronLeft {...property} className={cn('size-4', className)} /> : orientation === 'right' ? <ChevronRight {...property} className={cn('size-4', className)} /> : <ChevronDown {...property} className={cn('size-4', className)} />
}

export function CalendarWeek({ children, ...property }: Component.CalendarWeek): JSX.Element {
	const cell = useRender({ defaultTagName : 'div', props : { children : children, className : 'flex size-(--cell-size) items-center justify-center text-center' } })

	return useRender({ defaultTagName : 'td', props : mergeProps<'td'>({ children : cell }, property) })
}

export function CalendarDay({ className, day, modifiers, ...property }: Component.CalendarDay): JSX.Element {
	const ref    = { button : useRef<HTMLButtonElement>(null) }
	const picker = useDayPicker()
	
	const theme = getDefaultClassNames()

	useEffect(() => { if (modifiers.focused) ref.button.current?.focus() }, [ modifiers.focused ])

	return <Button ref={ref.button} variant={'ghost'} icon size={'md'} data-day={day.date.toLocaleDateString(picker.dayPickerProps.locale?.code)} data-selected-single={modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle} data-range-start={modifiers.range_start} data-range-end={modifiers.range_end} data-range-middle={modifiers.range_middle} data-mark={modifiers.mark} className={cn('relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 border-0 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-3 group-data-[focused=true]/day:ring-halo/50 after:pointer-events-none after:absolute after:bottom-1 after:left-1/2 after:hidden after:size-1 after:-translate-x-1/2 after:rounded-full after:bg-primary data-[mark=true]:after:block data-[range-end=true]:rounded-(--cell-radius) data-[range-end=true]:rounded-e-(--cell-radius) data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-end=true]:after:bg-primary-foreground data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-mute data-[range-middle=true]:text-foreground data-[range-start=true]:rounded-(--cell-radius) data-[range-start=true]:rounded-s-(--cell-radius) data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-start=true]:after:bg-primary-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[selected-single=true]:after:bg-primary-foreground md:size-auto dark:hover:text-foreground [&>span]:text-xs [&>span]:opacity-70', theme.day, className)} {...property} />
}
