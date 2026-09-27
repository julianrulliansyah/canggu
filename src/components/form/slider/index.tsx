import type { JSX }        from 'react'
import type * as Component from '@/components/form/slider/types'

import { Slider } from '@base-ui/react'

import { cn } from '@/utilities/class'

export function FormSlider({ children, className, defaultValue, value, ...property }: Component.FormSlider): JSX.Element {
	const count = Array.isArray(value) ? value.length : Array.isArray(defaultValue) ? defaultValue.length : 2

	return (
		<Slider.Root data-slot={'slider'} defaultValue={defaultValue} value={value} thumbAlignment={'edge'} className={cn('group/slider flex flex-col gap-2 data-horizontal:w-full data-vertical:h-full', className)} {...property}>
			{children}
			
			<Slider.Control className={'relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col'}>
				<Slider.Track data-slot={'slider-track'} className={'relative grow overflow-hidden rounded-full bg-mute select-none data-horizontal:h-1 data-horizontal:w-full data-vertical:h-full data-vertical:w-1'}>
					<Slider.Indicator data-slot={'slider-indicator'} className={'bg-primary select-none data-horizontal:h-full data-vertical:w-full'} />
				</Slider.Track>
				
				{[ ...Array(count).keys() ].map((index) => <Slider.Thumb key={index} index={index} data-slot={'slider-thumb'} className={cn('relative block size-thumb shrink-0 rounded-full border border-halo/25 bg-white shadow-md ring-halo/50 transition-none duration-250 outline-none select-none after:absolute after:-inset-2 hover:ring-3 hover:transition-colors active:ring-3 active:transition-colors disabled:pointer-events-none disabled:opacity-50 has-focus-visible:ring-3 has-focus-visible:transition-colors dark:border-halo')} />)}
			</Slider.Control>
		</Slider.Root>
	)
}

export function FormSliderLabel({ className, ...property }: Component.FormSliderLabel): JSX.Element {
	return <Slider.Label data-slot={'slider-label'} className={cn('flex items-center gap-2 text-sm leading-none font-medium select-none group-data-disabled/slider:pointer-events-none group-data-disabled/slider:opacity-50', className)} {...property} />
}
