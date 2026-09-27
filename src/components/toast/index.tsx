'use client'

import type { JSX }        from 'react'
import type * as Component from '@/components/toast/types'

import { mergeProps, Toast as ToastPrimitive, useRender }            from '@base-ui/react'
import { Info, Loader2, CircleX, CircleCheck, TriangleAlert, XIcon } from 'lucide-react'

import { Button } from '@/components/button'
import { cn }     from '@/utilities/class'

export const toast = ToastPrimitive.createToastManager()

export function useToast(): Component.ToastState {
	return ToastPrimitive.useToastManager()
}

export function createToast(): Component.ToastManager {
	return ToastPrimitive.createToastManager()
}

export function Toast({ className, ...property }: Component.Toast): JSX.Element {
	return <ToastPrimitive.Root data-slot={'toast'} className={cn('group/toast pointer-events-auto absolute inset-e-0 bottom-0 z-[calc(1000-var(--toast-index))] h-(--height) w-full origin-bottom transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))] rounded-2xl border bg-popover text-popover-foreground shadow-lg will-change-transform outline-none select-none [--gap:0.75rem] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))] [transition:transform_500ms_cubic-bezier(0.22,1,0.36,1),opacity_500ms,height_150ms] after:absolute after:inset-s-0 after:top-full after:h-[calc(var(--gap)+0.0625rem)] after:w-full after:content-[""] focus-visible:ring-2 focus-visible:ring-halo/50 data-expanded:h-(--toast-height) data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))] data-limited:opacity-0 data-starting-style:transform-[translateY(150%)] data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))] data-expanded:data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))] data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))] data-expanded:data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))] data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))] data-expanded:data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))] data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))] data-expanded:data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))] [&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:transform-[translateY(150%)]', className)} {...property} />
}

export function ToastProvider(property: Component.ToastProvider): JSX.Element {
	return <ToastPrimitive.Provider {...property} />
}

export function ToastPortal(property: Component.ToastPortal): JSX.Element {
	return <ToastPrimitive.Portal data-slot={'toast-portal'} {...property} />
}

export function ToastViewport({ className, ...property }: Component.ToastViewport): JSX.Element {
	return <ToastPrimitive.Viewport data-slot={'toast-viewport'} className={cn('pointer-events-none fixed inset-x-4 bottom-4 z-50 mx-auto w-auto max-w-sm outline-none', 'sm:inset-s-auto sm:inset-e-4 sm:mx-0 sm:w-full', className)} {...property} />
}

export function ToastContent({ className, ...property }: Component.ToastContent): JSX.Element {
	return <ToastPrimitive.Content data-slot={'toast-content'} className={cn('group/toast-content flex h-full items-center gap-2.5 overflow-hidden p-4 transition-opacity duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] has-data-[slot=toast-description]:items-start data-behind:opacity-0 data-expanded:opacity-100', className)} {...property} />
}

export function ToastTitle({ className, ...property }: Component.ToastTitle): JSX.Element {
	return <ToastPrimitive.Title data-slot={'toast-title'} className={cn('font-heading text-sm leading-snug font-medium', className)} {...property} />
}

export function ToastDescription({ className, ...property }: Component.ToastDescription): JSX.Element {
	return <ToastPrimitive.Description data-slot={'toast-description'} className={cn('text-xs text-mute-foreground', className)} {...property} />
}

export function ToastAction({ className, render = <Button variant={'outline'} size={'sm'} />, ...property }: Component.ToastAction): JSX.Element {
	return <ToastPrimitive.Action data-slot={'toast-action'} render={render} className={cn('shrink-0', className)} {...property} />
}

export function ToastClose({ children, className, render = <Button variant={'ghost'} icon size={'sm'} />, ...property }: Component.ToastClose): JSX.Element {
	return <ToastPrimitive.Close data-slot={'toast-close'} aria-label={'Close toast'} render={render} className={cn('relative shrink-0 text-mute-foreground after:absolute after:-inset-2 after:content-[""] hover:text-foreground', className)} {...property}>{children ?? <XIcon aria-hidden={'true'} />}</ToastPrimitive.Close>
}

export function ToastIcon({ type }: Component.ToastIcon): JSX.Element | null {
	const glyph = Object.entries({ 
		error   : <CircleX className={'text-destructive'} aria-hidden={'true'} />, 
		info    : <Info aria-hidden={'true'} />, 
		loading : <Loader2 className={'animate-spin'} aria-hidden={'true'} />, 
		success : <CircleCheck aria-hidden={'true'} />, 
		warning : <TriangleAlert aria-hidden={'true'} />,
	}).find(([ key ]) => key === type)?.[1]

	return glyph === undefined ? null : useRender({ defaultTagName : 'span', props : { children : glyph, className : 'relative shrink-0 group-has-data-[slot=toast-description]/toast-content:top-0.5 [&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4' }, state : { slot : 'toast-icon' } })
}

export function ToastText({ className, render, ...property }: Component.ToastText): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('flex min-w-0 flex-1 flex-col gap-0.5', className) }, property), render : render })
}

function ToastList(): JSX.Element {
	const hub = useToast()

	return (
		<>
			{
				hub.toasts.map((toast) => (
					<Toast key={toast.id} toast={toast}>
						<ToastContent>
							<ToastIcon type={toast.type} />

							<ToastText>
								<ToastTitle />
								<ToastDescription />
							</ToastText>

							<ToastAction />
							<ToastClose />
						</ToastContent>
					</Toast>
				))
			}
		</>
	)
}

export function ToastStack({ children, toastManager = toast, ...property }: Component.ToastStack): JSX.Element {
	return (
		<ToastProvider toastManager={toastManager} {...property}>
			{children}
			
			<ToastPortal>
				<ToastViewport>
					<ToastList />
				</ToastViewport>
			</ToastPortal>
		</ToastProvider>
	)
}
