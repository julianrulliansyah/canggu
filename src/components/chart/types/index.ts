import type { useRender }                                                                                                                               from '@base-ui/react'
import type { VariantProps }                                                                                                                            from 'class-variance-authority'
import type { ComponentType, ReactNode }                                                                                                                from 'react'
import type { DefaultLegendContentProps, LegendPayload, LegendProps, ResponsiveContainerProps, TooltipContentProps, TooltipPayloadEntry, TooltipProps } from 'recharts'
import type { ChartCVA }                                                                                                                                from '@/components/chart'

export type Chart               = Readonly<useRender.ComponentProps<'div'>> & VariantProps<typeof ChartCVA> & Readonly<{ children : ResponsiveContainerProps['children'], config : ChartConfig, dimension? : ChartDimension }>
export type ChartConfig         = Readonly<Record<string, ChartSeries>>
export type ChartSeries         = Readonly<{ icon? : ComponentType, label? : ReactNode } & ({ color? : string, theme? : never } | { color? : never, theme : ChartTheme })>
export type ChartTheme          = Readonly<{ dark : string, light : string }>
export type ChartDimension      = Readonly<{ height : number, width : number }>
export type ChartField          = Readonly<{ label? : string, name? : string }>
export type ChartMark           = 'dot' | 'line' | 'dash' | 'none'
export type ChartValue          = Readonly<{ config : ChartConfig }>
export type ChartLegend         = Readonly<LegendProps>
export type ChartLegendContent  = Readonly<Partial<DefaultLegendContentProps>> & Readonly<{ className? : string, field? : Pick<ChartField, 'name'>, icon? : boolean }>
export type ChartLegendItem     = Readonly<{ field? : Pick<ChartField, 'name'>, icon : boolean, item : LegendPayload }>
export type ChartTooltip        = Readonly<TooltipProps>
export type ChartTooltipContent = Readonly<Partial<TooltipContentProps>> & Readonly<{ caption? : boolean, className? : string, color? : string, field? : ChartField, mark? : ChartMark }>
export type ChartTooltipItem    = Readonly<{ color? : string, field? : ChartField, formatter? : TooltipContentProps['formatter'], title : ReactNode, index : number, mark : ChartMark, item : TooltipPayloadEntry, nest : boolean }>
