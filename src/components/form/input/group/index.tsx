'use client'

import type { JSX, MouseEvent } from 'react'
import type * as Component      from '@/components/form/input/group/types'

import { mergeProps, useRender } from '@base-ui/react'
import { cva }                   from 'class-variance-authority'

import { Button }       from '@/components/button'
import { FormInput }    from '@/components/form/input'
import { FormTextarea } from '@/components/form/textarea'
import { cn }           from '@/utilities/class'

export const FormInputGroupAddonCVA = cva('flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-mute-foreground select-none group-has-[[data-slot=input-group-control]:disabled]/input-group:cursor-not-allowed [&>kbd]:rounded-[calc(var(--canggu-radius)-0.3125rem)] [&>svg:not([class*="size-"])]:size-4', {
	variants : {
		axis : {
			block  : 'w-full justify-start px-2.5',
			inline : '',
		},
		side : {
			end   : '',
			start : '',
		},
	},
	defaultVariants : {
		axis : 'inline',
		side : 'start',
	},
	compoundVariants : [
		{
			axis  : 'inline',
			side  : 'start',
			class : 'order-first ps-2 has-[>button]:ms-[-0.3rem] has-[>kbd]:ms-[-0.15rem]',
		},
		{
			axis  : 'inline',
			side  : 'end',
			class : 'order-last pe-2 has-[>button]:me-[-0.3rem] has-[>kbd]:me-[-0.15rem]',
		},
		{
			axis  : 'block',
			side  : 'start',
			class : 'order-first pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2',
		},
		{
			axis  : 'block',
			side  : 'end',
			class : 'order-last pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2',
		},
	],
})

export const FormInputGroupButtonCVA = cva('flex items-center gap-2 text-sm shadow-none', {
	variants : {
		icon : {
			false : '',
			true  : '',
		},
		size : {
			sm : '',
			xs : '',
		},
	},
	defaultVariants : {
		icon : false,
		size : 'xs',
	},
	compoundVariants : [
		{
			icon  : false,
			size  : 'xs',
			class : 'gap-1 rounded-[calc(var(--canggu-radius)-0.1875rem)] px-1.5 [&>svg:not([class*="size-"])]:size-3.5',
		},
		{
			icon  : true,
			size  : 'xs',
			class : 'rounded-[calc(var(--canggu-radius)-0.1875rem)] p-0 has-[>svg]:p-0',
		},
		{
			icon  : true,
			size  : 'sm',
			class : 'p-0 has-[>svg]:p-0',
		},
	],
})

export function FormInputGroup({ className, render, ...property }: Component.FormInputGroup): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('group/input-group relative flex h-control-md w-full min-w-0 items-center rounded-lg border border-haze transition-none duration-250 outline-none has-[[data-slot=input-group-control]:disabled]:cursor-not-allowed has-[[data-slot=input-group-control]:disabled]:bg-haze/50 has-[[data-slot=input-group-control]:disabled]:opacity-50 has-[[data-slot=input-group-control]:focus-visible]:border-haze has-[[data-slot=input-group-control]:focus-visible]:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-halo/50 has-[[data-slot=input-group-control]:focus-visible]:transition-colors has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-3 has-[[data-slot][aria-invalid=true]]:ring-destructive/15 has-[[data-slot][aria-invalid=true]]:transition-colors has-[>[data-axis=block]]:h-auto has-[>[data-axis=block]]:flex-col has-[>textarea]:h-auto dark:bg-haze/30 dark:has-[[data-slot=input-group-control]:disabled]:bg-haze/80 dark:has-[[data-slot][aria-invalid=true]]:border-destructive/50 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 has-[>[data-axis=block][data-side=end]]:[&>input]:pt-3 has-[>[data-axis=block][data-side=start]]:[&>input]:pb-3 has-[>[data-axis=inline][data-side=end]]:[&>input]:pr-1.5 has-[>[data-axis=inline][data-side=start]]:[&>input]:pl-1.5', className), role : 'group' }, property), render : render, state : { slot : 'input-group' } })
}

export function FormInputGroupAddon({ axis = 'inline', className, render, side = 'start', ...property }: Component.FormInputGroupAddon): JSX.Element {
	const perform = {
		click : (event: MouseEvent<HTMLDivElement>): void => {
			if (event.target instanceof Element && !(event.target.closest('button') === null))
				return

			const control = event.currentTarget.parentElement?.querySelector('[data-slot=input-group-control]')

			if (control instanceof HTMLElement)
				control.focus()
		},
	}

	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn(FormInputGroupAddonCVA({ axis, side }), className), onClick : perform.click, role : 'group' }, property), render : render, state : { axis : axis, side : side, slot : 'input-group-addon' } })
}

export function FormInputGroupButton({ className, icon = false, size = 'xs', type = 'button', variant = 'ghost', ...property }: Component.FormInputGroupButton): JSX.Element {
	return <Button type={type} variant={variant} icon={icon} size={size} className={cn(FormInputGroupButtonCVA({ className, icon, size }))} {...property} />
}

export function FormInputGroupText({ className, render, ...property }: Component.FormInputGroupText): JSX.Element {
	return useRender({ defaultTagName : 'span', props : mergeProps<'span'>({ className : cn('flex items-center gap-2 text-sm text-mute-foreground [&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4', className) }, property), render : render, state : { slot : 'input-group-text' } })
}

export function FormInputGroupControl({ className, ...property }: Component.FormInputGroupControl): JSX.Element {
	return <FormInput data-slot={'input-group-control'} className={cn('flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent', className)} {...property} />
}

export function FormInputGroupTextarea({ className, ...property }: Component.FormInputGroupTextarea): JSX.Element {
	return <FormTextarea data-slot={'input-group-control'} className={cn('flex-1 resize-none rounded-none border-0 bg-transparent py-2 shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent', className)} {...property} />
}
