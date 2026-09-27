import type { useRender }                         from '@base-ui/react'
import type { EmblaOptionsType, EmblaPluginType } from 'embla-carousel'
import type { UseEmblaCarouselType }              from 'embla-carousel-react'
import type { Button }                            from '@/components/button/types'

export type Carousel         = Readonly<useRender.ComponentProps<'div'>> & Readonly<{ options? : CarouselOptions, orientation? : 'horizontal' | 'vertical', plugins? : CarouselPlugin, onAPI? : (API : CarouselAPI) => void }>
export type CarouselValue    = Readonly<{ API : CarouselAPI, next : boolean, options? : CarouselOptions, orientation : 'horizontal' | 'vertical', previous : boolean, ref : UseEmblaCarouselType[0], scroll : CarouselScroll }>
export type CarouselScroll   = Readonly<{ next : () => void, previous : () => void }>
export type CarouselContent  = Readonly<useRender.ComponentProps<'div'>>
export type CarouselItem     = Readonly<useRender.ComponentProps<'div'>>
export type CarouselAPI      = UseEmblaCarouselType[1]
export type CarouselPlugin   = EmblaPluginType[]
export type CarouselOptions  = EmblaOptionsType
export type CarouselNext     = Button
export type CarouselPrevious = Button
