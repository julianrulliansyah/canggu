'use client'

import type { JSX }        from 'react'
import type * as Component from '@/components/message/types'

import { mergeProps, useRender } from '@base-ui/react'

import { cn } from '@/utilities/class'

export function Message({ align = 'start', className, render, ...property }: Component.Message): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('group/message relative flex w-full min-w-0 gap-2 text-sm data-[align=end]:flex-row-reverse', className) }, property), render : render, state : { align : align, slot : 'message' } })
}

export function MessageGroup({ className, render, ...property }: Component.MessageGroup): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('flex min-w-0 flex-col gap-2', className) }, property), render : render, state : { slot : 'message-group' } })
}

export function MessageAvatar({ className, render, ...property }: Component.MessageAvatar): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('flex w-fit min-w-8 shrink-0 items-center justify-center self-end overflow-hidden rounded-full bg-mute group-has-data-[slot=message-footer]/message:-translate-y-6.25', className) }, property), render : render, state : { slot : 'message-avatar' } })
}

export function MessageHeader({ className, render, ...property }: Component.MessageHeader): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('flex max-w-full min-w-0 items-center px-3 text-xs font-medium text-mute-foreground group-has-data-[variant=ghost]/message:px-0', className) }, property), render : render, state : { slot : 'message-header' } })
}

export function MessageContent({ className, render, ...property }: Component.MessageContent): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('flex w-full min-w-0 flex-col gap-2 wrap-break-word group-data-[align=end]/message:*:data-slot:self-end', className) }, property), render : render, state : { slot : 'message-content' } })
}

export function MessageFooter({ className, render, ...property }: Component.MessageFooter): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('flex max-w-full min-w-0 items-center text-xs font-medium text-mute-foreground group-has-data-[variant=ghost]/message:px-0 group-data-[align=end]/message:justify-end', className) }, property), render : render, state : { slot : 'message-footer' } })
}
