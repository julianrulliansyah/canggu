'use client'

import type { JSX }        from 'react'
import type { DateRange }  from 'react-day-picker'
import type * as Component from '@/components/form/input/date/types'

import { useState } from 'react'

import { useRender }    from '@base-ui/react'
import { format }       from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { Calendar }                              from '@/components/calendar'
import { Popover, PopoverPopup, PopoverTrigger } from '@/components/popover'
import { cn }                                    from '@/utilities/class'

export function FormInputDate({ className, defaultValue, locale, onValueChange, pattern = 'PPP', placeholder = 'Pick a date', value, ...property }: Component.FormInputDate): JSX.Element {
	const state = {
		open  : useState(false),
		value : useState<Date | undefined>(defaultValue),
	}

	const perform = {
		select : (date: Date | undefined): void => {
			state.value[1](date)
			state.open[1](false)

			onValueChange?.(date)
		},
	}

	return (
		<Popover open={state.open[0]} onOpenChange={state.open[1]}>
			<PopoverTrigger data-slot={'input-date'} data-placeholder={(value ?? state.value[0]) === undefined ? '' : undefined} className={cn('flex h-control-md w-full min-w-0 items-center justify-between gap-2 rounded-lg border border-haze bg-transparent px-2.5 py-1 text-start text-base transition-none duration-250 outline-none focus-visible:border-haze focus-visible:ring-2 focus-visible:ring-halo/50 focus-visible:transition-colors disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-haze/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/15 aria-invalid:transition-colors data-placeholder:text-mute-foreground dark:bg-haze/30 dark:disabled:bg-haze/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-mute-foreground', 'md:text-sm', className)} {...property}>
				{useRender({ defaultTagName : 'span', props : { children : [ value ?? state.value[0] ].filter((date: Date | undefined): date is Date => !(date === undefined)).map((date: Date): string => format(date, pattern, { locale : locale }))[0] ?? placeholder, className : 'truncate' } })} <CalendarIcon aria-hidden />
			</PopoverTrigger>

			<PopoverPopup align={'start'} className={'w-auto p-0'}>
				<Calendar mode={'single'} locale={locale} selected={value ?? state.value[0]} defaultMonth={value ?? state.value[0]} onSelect={perform.select} />
			</PopoverPopup>
		</Popover>
	)
}

export function FormInputDateRange({ className, defaultValue, locale, month = 2, onValueChange, pattern = 'PPP', placeholder = 'Pick a range', value, ...property }: Component.FormInputDateRange): JSX.Element {
	const state = {
		open  : useState(false),
		value : useState<DateRange | undefined>(defaultValue),
	}

	const perform = {
		select : (range: DateRange | undefined): void => {
			state.value[1](range)
			
			onValueChange?.(range)
		},
	}

	return (
		<Popover open={state.open[0]} onOpenChange={state.open[1]}>
			<PopoverTrigger data-slot={'input-date-range'} data-placeholder={(value ?? state.value[0])?.from === undefined ? '' : undefined} className={cn('flex h-control-md w-full min-w-0 items-center justify-between gap-2 rounded-lg border border-haze bg-transparent px-2.5 py-1 text-start text-base transition-none duration-250 outline-none focus-visible:border-haze focus-visible:ring-2 focus-visible:ring-halo/50 focus-visible:transition-colors disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-haze/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/15 aria-invalid:transition-colors data-placeholder:text-mute-foreground dark:bg-haze/30 dark:disabled:bg-haze/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-mute-foreground', 'md:text-sm', className)} {...property}>
				{useRender({ defaultTagName : 'span', props : { children : [ (value ?? state.value[0])?.from, (value ?? state.value[0])?.to ].filter((date: Date | undefined): date is Date => !(date === undefined)).map((date: Date): string => format(date, pattern, { locale : locale })).join(' ' + '–' + ' ') || placeholder, className : 'truncate' } })} <CalendarIcon aria-hidden />
			</PopoverTrigger>

			<PopoverPopup align={'start'} className={'w-auto p-0'}>
				<Calendar mode={'range'} locale={locale} numberOfMonths={month} selected={value ?? state.value[0]} defaultMonth={(value ?? state.value[0])?.from} onSelect={perform.select} />
			</PopoverPopup>
		</Popover>
	)
}
