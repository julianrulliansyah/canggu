'use client'

import type { JSX, ReactNode }      from 'react'
import type { TooltipPayloadEntry } from 'recharts'
import type * as Component          from '@/components/chart/types'

import { createContext, use } from 'react'

import { mergeProps, useRender }                from '@base-ui/react'
import { cva }                                  from 'class-variance-authority'
import { Legend, ResponsiveContainer, Tooltip } from 'recharts'

import { locate, palette } from '@/components/chart/utilities'
import { cn }              from '@/utilities/class'

export const ChartCVA = cva('flex justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-mute-foreground [&_.recharts-cartesian-grid_line[stroke="#ccc"]]:stroke-edge/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-edge [&_.recharts-dot[stroke="#fff"]]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-polar-grid_[stroke="#ccc"]]:stroke-edge [&_.recharts-radial-bar-background-sector]:fill-mute [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-mute [&_.recharts-reference-line_[stroke="#ccc"]]:stroke-edge [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke="#fff"]]:stroke-transparent [&_.recharts-surface]:outline-hidden', {
	variants : {
		ratio : {
			'auto' : 'size-full',
			'1:1'  : 'aspect-square',
			'16:9' : 'aspect-video',
		},
	},
	defaultVariants : {
		ratio : '16:9',
	},
})

const ChartContext = createContext<Component.ChartValue | null>(null)

export function useChart(): Component.ChartValue {
	const context = use(ChartContext)

	if (context === null)
		throw new Error('useChart must be invoked within <Chart />')

	return context
}

export function Chart({ children, className, config, dimension = { height : 200, width : 320 }, ratio = '16:9', render, style, ...property }: Component.Chart): JSX.Element {
	return (
		<ChartContext value={{ config : config }}>
			{useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ children : <ResponsiveContainer initialDimension={dimension}>{children}</ResponsiveContainer>, className : cn(ChartCVA({ className, ratio })), style : { ...palette(config), ...style } }, property), render : render, state : { ratio : ratio ?? '16:9', slot : 'chart' } })}
		</ChartContext>
	)
}

export function ChartLegend(property: Component.ChartLegend): JSX.Element {
	return <Legend {...property} />
}

export function ChartLegendContent({ className, field, icon = true, payload, verticalAlign = 'bottom' }: Component.ChartLegendContent): JSX.Element {
	const root = useRender({ defaultTagName : 'div', props : { children : (payload ?? []).filter((item): boolean => !(item.type === 'none')).map((item, index: number): JSX.Element => <ChartLegendItem key={String(item.dataKey ?? index)} field={field} icon={icon} item={item} />), className : cn('flex items-center justify-center gap-4', verticalAlign === 'top' ? 'pb-3' : 'pt-3', className) }, state : { slot : 'chart-legend-content' } })

	return (payload?.length ?? 0) > 0 ? root : <></>
}

export function ChartTooltipItem({ color, field, formatter, title, index, mark, item, nest }: Component.ChartTooltipItem): JSX.Element {
	const { config } = useChart()

	const series = locate(config, item, String(field?.name ?? item.name ?? item.dataKey ?? 'value'))

	const part = {
		mark : useRender({ defaultTagName : 'div', props : { className : cn('shrink-0 rounded-[0.125rem] border-(--color-border) bg-(--color-bg)', mark === 'dot' && 'size-2.5', mark === 'line' && 'w-1', mark === 'dash' && 'w-0 border-[0.09375rem] border-dashed bg-transparent', nest && mark === 'dash' && 'my-0.5'), style : { '--color-bg' : color ?? item.payload?.fill ?? item.color, '--color-border' : color ?? item.payload?.fill ?? item.color } }, state : { slot : 'chart-tooltip-mark' } }),
		body : useRender({ defaultTagName : 'div', props : { children : <>{useRender({ defaultTagName : 'div', props : { children : <>{nest ? title : null}{useRender({ defaultTagName : 'span', props : { children : series?.label ?? item.name, className : 'text-mute-foreground' }, state : { slot : 'chart-tooltip-name' } })}</>, className : 'grid gap-1.5' } })}{useRender({ defaultTagName : 'span', props : { hidden : item.value === undefined || item.value === null, children : typeof item.value === 'number' ? item.value.toLocaleString() : String(item.value), className : 'font-mono font-medium text-foreground tabular-nums' }, state : { slot : 'chart-tooltip-value' } })}</>, className : cn('flex flex-1 justify-between leading-none', nest ? 'items-end' : 'items-center') } }),
	}

	return useRender({ defaultTagName : 'div', props : { children : formatter && !(item.value === undefined) && item.name ? formatter(item.value, item.name, item, index, item.payload) : <>{series?.icon ? <series.icon /> : mark === 'none' ? null : part.mark}{part.body}</>, className : cn('flex w-full flex-wrap items-stretch gap-2 [&>svg]:size-2.5 [&>svg]:text-mute-foreground', mark === 'dot' && 'items-center') }, state : { slot : 'chart-tooltip-item' } })
}

export function ChartLegendItem({ field, icon, item }: Component.ChartLegendItem): JSX.Element {
	const { config } = useChart()

	const series = locate(config, item, String(field?.name ?? item.dataKey ?? 'value'))

	return useRender({ defaultTagName : 'div', props : { children : <>{useRender({ defaultTagName : 'div', props : series?.icon && icon ? {} : { className : 'size-2 shrink-0 rounded-[0.125rem]', style : { backgroundColor : item.color } }, render : series?.icon && icon ? <series.icon /> : undefined, state : { slot : 'chart-legend-swatch' } })}{series?.label}</>, className : 'flex items-center gap-1.5 [&>svg]:size-3 [&>svg]:text-mute-foreground' }, state : { slot : 'chart-legend-item' } })
}

export function ChartTooltip(property: Component.ChartTooltip): JSX.Element {
	return <Tooltip {...property} />
}

export function ChartTooltipContent({ active, caption = true, className, color, field, formatter, mark = 'dot', label, labelClassName, labelFormatter, payload }: Component.ChartTooltipContent): JSX.Element {
	const { config } = useChart()

	const detail = {
		entry : (): TooltipPayloadEntry[] => (payload ?? []).filter((item: TooltipPayloadEntry): boolean => !(item.type === 'none')),
		topic : (): ReactNode => field?.label === undefined && typeof label === 'string' ? (config[label]?.label ?? label) : locate(config, payload?.[0], String(field?.label ?? payload?.[0]?.dataKey ?? payload?.[0]?.name ?? 'value'))?.label,
		nest  : (): boolean => payload?.length === 1 && !(mark === 'dot') && !(mark === 'none'),
		shown : (): boolean => caption && (payload?.length ?? 0) > 0 && (!(labelFormatter === undefined) || Boolean(detail.topic())),
	}

	const title   = useRender({ defaultTagName : 'div', props : { children : labelFormatter ? labelFormatter(detail.topic(), payload ?? []) : detail.topic(), className : cn('font-medium', labelClassName) }, state : { slot : 'chart-tooltip-label' } })
	const tooltip = useRender({ defaultTagName : 'div', props : { children : <>{!detail.nest() && detail.shown() ? title : null} { useRender({ defaultTagName : 'div', props : { children : detail.entry().map((item: TooltipPayloadEntry, index: number): JSX.Element => <ChartTooltipItem key={String(item.dataKey ?? index)} color={color} field={field} formatter={formatter} title={detail.shown() ? title : null} index={index} mark={mark} item={item} nest={detail.nest()} />), className : 'grid gap-1.5' } }) }</>, className : cn('grid min-w-32 items-start gap-1.5 rounded-lg border border-edge/50 bg-background px-2.5 py-1.5 text-xs shadow-xl', className) }, state : { slot : 'chart-tooltip-content' } })

	return active && (payload?.length ?? 0) > 0 ? tooltip : <></>
}
