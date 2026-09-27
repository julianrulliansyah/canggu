'use client'

import type { JSX }        from 'react'
import type * as Component from '@/components/form/input/otp/types'

import { mergeProps, OTPField, useRender } from '@base-ui/react'
import { MinusIcon }                       from 'lucide-react'

import { cn } from '@/utilities/class'

export function FormInputOTP({ className, ...property }: Component.FormInputOTP): JSX.Element {
	return <OTPField.Root data-slot={'input-otp'} className={cn('flex items-center has-disabled:opacity-50', className)} {...property} />
}

export function FormInputOTPSlot({ className, ...property }: Component.FormInputOTPSlot): JSX.Element {
	return <OTPField.Input data-slot={'input-otp-slot'} className={cn('relative flex size-control-md items-center justify-center border-y border-e border-haze bg-transparent text-center transition-none duration-250 outline-none first:rounded-s-lg first:border-s last:rounded-e-lg focus-visible:z-10 focus-visible:border-haze focus-visible:ring-2 focus-visible:ring-halo/50 focus-visible:transition-colors disabled:cursor-not-allowed aria-invalid:border-destructive aria-invalid:transition-colors focus-visible:aria-invalid:border-destructive focus-visible:aria-invalid:ring-3 focus-visible:aria-invalid:ring-destructive/15 dark:bg-haze/30 dark:focus-visible:aria-invalid:ring-destructive/40', 'md:text-sm', className)} {...property} />
}

export function FormInputOTPSeparator({ className, ...property }: Component.FormInputOTPSeparator): JSX.Element {
	return <OTPField.Separator data-slot={'input-otp-separator'} className={cn('flex items-center [&_svg:not([class*="size-"])]:size-4', className)} {...property}><MinusIcon /></OTPField.Separator>
}

export function FormInputOTPGroup({ className, render, ...property }: Component.FormInputOTPGroup): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('flex items-center rounded-lg has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/15 dark:has-aria-invalid:ring-destructive/40', className) }, property), render : render, state : { slot : 'input-otp-group' } })
}
