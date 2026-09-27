import type { CSSProperties } from 'react'
import type * as Component    from '@/components/chart/types'

export function text(source: unknown, key: string): string | undefined {
	return typeof source === 'object' && !(source === null) && typeof Reflect.get(source, key) === 'string' ? String(Reflect.get(source, key)) : undefined
}

export function locate(config: Component.ChartConfig, payload: unknown, key: string): Component.ChartSeries | undefined {
	return config[text(payload, key) ?? text(typeof payload === 'object' && !(payload === null) ? Reflect.get(payload, 'payload') : undefined, key) ?? key] ?? config[key]
}

export function palette(config: Component.ChartConfig): CSSProperties {
	return Object.fromEntries(Object.entries(config).flatMap(([ key, series ]: [ string, Component.ChartSeries ]): [ string, string ][] => series.theme === undefined ? (series.color === undefined ? [] : [ [ '--color' + '-' + key, series.color ] ]) : [ [ '--' + 'color' + '-' + key, 'light-dark' + '(' + series.theme.light + ',' + ' ' + series.theme.dark + ')' ] ]))
}
