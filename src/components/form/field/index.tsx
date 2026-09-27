'use client'

import type { JSX }        from 'react'
import type * as Component from '@/components/form/field/types'

import { Field, mergeProps, useRender } from '@base-ui/react'
import { cva }                          from 'class-variance-authority'

import { cn } from '@/utilities/class'

export const FormFieldCVA = cva('group/field flex w-full gap-2 data-invalid:text-destructive', {
	variants : {
		orientation : {
			horizontal : 'flex-row items-center',
			vertical   : 'flex-col',
		},
	},
	defaultVariants : {
		orientation : 'vertical',
	},
})

export function FormField({ className, orientation = 'vertical', ...property }: Component.FormField): JSX.Element {
	return <Field.Root data-slot={'field'} className={cn(FormFieldCVA({ className, orientation }))} {...property} />
}

export function FormFieldItem(property: Component.FormFieldItem): JSX.Element {
	return <Field.Item data-slot={'field-item'} {...property} />
}

export function FormFieldLabel({ className, render, ...property }: Component.FormFieldLabel): JSX.Element {
	return useRender({ defaultTagName : 'label', props : mergeProps<'label'>({ className : cn('flex items-center gap-2 text-sm leading-none font-medium select-none group-data-disabled/field:pointer-events-none group-data-disabled/field:opacity-50', className) }, property), render : render, state : { slot : 'field-label' } })
}

export function FormFieldDescription({ className, ...property }: Component.FormFieldDescription): JSX.Element {
	return <Field.Description data-slot={'field-description'} className={cn('text-xs text-mute-foreground', className)} {...property} />
}

export function FormFieldError({ className, ...property }: Component.FormFieldError): JSX.Element {
	return <Field.Error data-slot={'field-error'} className={cn('text-sm font-normal text-destructive', className)} {...property} />
}
