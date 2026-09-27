import type { Avatar, useRender } from '@base-ui/react'
import type { VariantProps }      from 'class-variance-authority'
import type { ImageAvatarCVA }    from '@/components/image/avatar'

export type ImageAvatar           = Readonly<Avatar.Root.Props> & VariantProps<typeof ImageAvatarCVA>
export type ImageAvatarImage      = Readonly<Avatar.Image.Props>
export type ImageAvatarFallback   = Readonly<Avatar.Fallback.Props>
export type ImageAvatarBadge      = Readonly<useRender.ComponentProps<'span'>>
export type ImageAvatarGroup      = Readonly<useRender.ComponentProps<'div'>>
export type ImageAvatarGroupCount = Readonly<useRender.ComponentProps<'div'>>
