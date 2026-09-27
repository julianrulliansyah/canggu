import type { useRender }            from '@base-ui/react'
import type { VariantProps }         from 'class-variance-authority'
import type { Button }               from '@/components/button/types'
import type { FormInput }            from '@/components/form/input/types'
import type { Separator }            from '@/components/separator/types'
import type { TooltipPopup }         from '@/components/tooltip/types'
import type { SidebarMenuButtonCVA } from '@/composites/sidebar'

export type Sidebar              = Readonly<useRender.ComponentProps<'div'>> & Readonly<{ collapse? : 'offcanvas' | 'icon' | 'none', side? : 'left' | 'right', variant? : 'sidebar' | 'float' | 'inset' }>
export type SidebarValue         = Readonly<{ mobile : SidebarMobile, open : boolean, set : (open : boolean) => void, toggle : () => void, touch : boolean }>
export type SidebarMobile        = Readonly<{ open : boolean, set : (open : boolean) => void }>
export type SidebarProvider      = Readonly<useRender.ComponentProps<'div'>> & Readonly<{ defaultOpen? : boolean, onOpenChange? : (open : boolean) => void, open? : boolean }>
export type SidebarTrigger       = Button
export type SidebarRail          = Readonly<useRender.ComponentProps<'button'>>
export type SidebarInset         = Readonly<useRender.ComponentProps<'main'>>
export type SidebarInput         = FormInput
export type SidebarHeader        = Readonly<useRender.ComponentProps<'div'>>
export type SidebarFooter        = Readonly<useRender.ComponentProps<'div'>>
export type SidebarSeparator     = Separator
export type SidebarContent       = Readonly<useRender.ComponentProps<'div'>>
export type SidebarGroup         = Readonly<useRender.ComponentProps<'div'>>
export type SidebarGroupLabel    = Readonly<useRender.ComponentProps<'div'>>
export type SidebarGroupAction   = Readonly<useRender.ComponentProps<'button'>>
export type SidebarGroupContent  = Readonly<useRender.ComponentProps<'div'>>
export type SidebarMenu          = Readonly<useRender.ComponentProps<'ul'>>
export type SidebarMenuItem      = Readonly<useRender.ComponentProps<'li'>>
export type SidebarMenuButton    = Readonly<useRender.ComponentProps<'button'>> & VariantProps<typeof SidebarMenuButtonCVA> & Readonly<{ active? : boolean, tooltip? : string | TooltipPopup }>
export type SidebarMenuAction    = Readonly<useRender.ComponentProps<'button'>> & Readonly<{ hover? : boolean }>
export type SidebarMenuBadge     = Readonly<useRender.ComponentProps<'div'>>
export type SidebarMenuSkeleton  = Readonly<useRender.ComponentProps<'div'>> & Readonly<{ icon? : boolean }>
export type SidebarMenuSub       = Readonly<useRender.ComponentProps<'ul'>>
export type SidebarMenuSubItem   = Readonly<useRender.ComponentProps<'li'>>
export type SidebarMenuSubButton = Readonly<useRender.ComponentProps<'a'>> & Readonly<{ active? : boolean, size? : 'md' | 'sm' }>
