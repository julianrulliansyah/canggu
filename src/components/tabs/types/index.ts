import type { Tabs as TabsPrimitive } from '@base-ui/react'
import type { VariantProps }          from 'class-variance-authority'
import type { TabsListCVA }           from '@/components/tabs'

export type Tabs        = Readonly<TabsPrimitive.Root.Props>
export type TabsList    = Readonly<TabsPrimitive.List.Props> & VariantProps<typeof TabsListCVA>
export type TabsTrigger = Readonly<TabsPrimitive.Tab.Props>
export type TabsPanel   = Readonly<TabsPrimitive.Panel.Props>
