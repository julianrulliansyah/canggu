'use client'

import type { ChangeEvent, FormEvent, JSX, KeyboardEvent, MouseEvent, SubmitEvent } from 'react'
import type * as Component                                                          from '@/composites/step/types'

import { createContext, use, useCallback, useId, useLayoutEffect, useRef, useState } from 'react'

import { mergeProps, useRender } from '@base-ui/react'
import { CheckIcon }             from 'lucide-react'

import { Button }                                                           from '@/components/button'
import { answer, textual, order, present, radio, sequence, symbol, vacant } from '@/composites/step/utilities'
import { cn }                                                               from '@/utilities/class'

const StepContext        = createContext<Component.StepValue | null>(null)
const StepContentContext = createContext<Component.StepContentValue | null>(null)

function useStep(): Component.StepValue {
	const context = use(StepContext)

	if (context === null)
		throw new Error('useStep must be invoked within <Step />')

	return context
}

function useContent(): Component.StepContentValue {
	const context = use(StepContentContext)

	if (context === null)
		throw new Error('useContent must be invoked within <StepContent />')

	return context
}

export function Step({ className, defaultContent, content, noValidate = true, onContentChange, onKeyDown, onReset, onSubmit, render, shortcut, ...property }: Component.Step): JSX.Element {
	const state = {
		entry   : useState<Component.StepEntry[]>([]),
		content : useState<string | null>(defaultContent ?? null),
		version : useState(0),
	}
	
	const ref = {
		form   : useRef<HTMLFormElement | null>(null),
		intent : useRef<Component.StepIntent | null>(null),
	}

	const course = {
		list    : (): Component.StepEntry[] => state.entry[0].filter((entry: Component.StepEntry): boolean => !(entry.control.current?.lock ?? false)).sort(order),
		control : (): Component.StepControl | null => course.list()[course.index()]?.control.current ?? null,
		active  : (): string | null => content ?? state.content[0],
		index   : (): number => course.list().findIndex((entry: Component.StepEntry): boolean => entry.name === course.active()),
	}

	const perform = {
		go : (name: string, target: Component.StepIntent['target'] = 'item'): void => {
			if (name === course.active())
				return

			ref.intent.current = { name : name, target : target }

			if (content === undefined)
				state.content[1](name)

			onContentChange?.(name)
		},
		advance : (): void => {
			const control = course.control()

			if (control === null)
				return

			if (!control.validate()) {
				control.focus.invalid()

				return
			}

			if (course.index() === course.list().length - 1) {
				ref.form.current?.requestSubmit()

				return
			}

			perform.forward()
		},
		forward : (): void => {
			const entry = course.list()[course.index() + 1]

			if (!(entry === undefined))
				perform.go(entry.name)
		},
		next : (): void => {
			const control = course.control()

			if (control === null || course.index() >= course.list().length - 1)
				return

			if (!control.validate()) {
				control.focus.invalid()

				return
			}

			perform.forward()
		},
		previous : (): void => {
			const entry = course.list()[course.index() - 1]

			if (course.index() > 0 && !(entry === undefined))
				perform.go(entry.name)
		},
		skip : (): void => {
			const control = course.control()

			if (control === null || control.mandatory)
				return

			control.skip()

			if (course.index() < course.list().length - 1) {
				perform.forward()

				return
			}

			queueMicrotask((): void => {
				ref.form.current?.requestSubmit()
			})
		},
		key : {
			down : (event: KeyboardEvent<HTMLFormElement>): void => {
				onKeyDown?.(event)

				const control = course.control()

				if (event.defaultPrevented || event.nativeEvent.isComposing || event.keyCode === 229 || control === null || !(event.target instanceof Element))
					return

				if (event.key === 'Enter' && (event.metaKey || event.ctrlKey) && !event.altKey && !event.shiftKey) {
					event.preventDefault()

					if (!event.repeat)
						perform.advance()

					return
				}

				if (event.metaKey || event.ctrlKey || event.altKey)
					return

				if ((event.key === 'ArrowUp' || event.key === 'ArrowDown') && control.move(event.target, event.key === 'ArrowDown' ? 'next' : 'previous')) {
					event.preventDefault()

					return
				}

				if ((event.key === 'ArrowLeft' || event.key === 'ArrowRight') && !textual(event.target) && !radio(event.target)) {
					event.preventDefault()

					if (event.repeat)
						return

					if (event.key === 'ArrowLeft')
						perform.previous()
					else if (!(control.status === 'open'))
						perform.next()

					return
				}

				if (event.key === 'Enter') {
					const field = control.find(event.target)

					if (field === null)
						return

					event.preventDefault()

					if (!event.repeat && answer(field))
						perform.advance()

					return
				}

				if (shortcut === undefined || textual(event.target))
					return

				const field = control.press(symbol(event.key, shortcut) ?? '')

				if (field === null)
					return

				event.preventDefault()

				if (event.repeat)
					return

				field.element.focus()

				if (field.type === 'choice')
					field.element.click()
			},
		},
		reset : (event: FormEvent<HTMLFormElement>): void => {
			onReset?.(event)

			if (event.defaultPrevented)
				return

			for (const entry of state.entry[0])
				entry.control.current?.reset()

			const entry = course.list().find((each: Component.StepEntry): boolean => each.name === defaultContent) ?? course.list()[0]

			if (!(entry === undefined))
				perform.go(entry.name)
		},
		submit : (event: SubmitEvent<HTMLFormElement>): void => {
			const invalid = course.list().find((entry: Component.StepEntry): boolean => !(entry.control.current?.validate() ?? true))

			if (invalid === undefined) {
				onSubmit?.(event)

				return
			}

			event.preventDefault()

			perform.go(invalid.name, 'invalid')

			if (invalid.name === course.active()) {
				invalid.control.current?.focus.invalid()

				ref.intent.current = null
			}
		},
		refresh : useCallback((): void => {
			state.version[1]((version: number): number => version + 1)
		}, [ state.version[1] ]),
		register : useCallback((entry: Component.StepEntry): () => void => {
			state.entry[1]((current: Component.StepEntry[]): Component.StepEntry[] => [ ...current.filter((each: Component.StepEntry): boolean => !(each.element === entry.element) && !(each.name === entry.name)), entry ])

			return (): void => {
				state.entry[1]((current: Component.StepEntry[]): Component.StepEntry[] => current.filter((each: Component.StepEntry): boolean => !(each === entry)))
			}
		}, [ state.entry[1] ]),
	}

	useLayoutEffect(() => {
		const first = course.list()[0]

		if (first === undefined)
			return

		if (course.index() < 0) {
			if (content === undefined && state.content[0] === null) {
				state.content[1](first.name)

				return
			}

			perform.go(first.name)

			return
		}

		if (ref.intent.current === null || !(ref.intent.current.name === course.active()))
			return

		if (ref.intent.current.target === 'invalid')
			course.control()?.focus.invalid()
		else
			course.control()?.focus.item()

		ref.intent.current = null
	})

	return (
		<StepContext value={{ current : course.index() + 1, first : course.list().length > 0 && course.index() === 0, go : { next : perform.next, previous : perform.previous, skip : perform.skip }, control : course.control(), content : course.active(), last : course.list().length > 0 && course.index() === course.list().length - 1, native : noValidate === false, refresh : perform.refresh, register : perform.register, shortcut : shortcut ?? null, total : course.list().length }}>
			{useRender({ defaultTagName : 'form', props : mergeProps<'form'>({ className : cn('flex w-full min-w-0 flex-col gap-4', className), noValidate : noValidate, onKeyDown : perform.key.down, onReset : perform.reset, onSubmit : perform.submit, ref : ref.form }, property), render : render, state : { shortcut : shortcut, slot : 'step' } })}
		</StepContext>
	)
}

export function StepProgress({ children, className, render, ...property }: Component.StepProgress): JSX.Element {
	const { current, total } = useStep()

	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ 'aria-label' : 'Step progress', 'aria-live' : 'polite', 'aria-valuemax' : total > 0 ? total : undefined, 'aria-valuemin' : total > 0 ? 1 : undefined, 'aria-valuenow' : total > 0 ? current : undefined, 'aria-valuetext' : total > 0 ? 'Step ' + String(current) + ' ' + 'of' + ' ' + String(total) : undefined, children : children ?? (total > 0 ? 'Step ' + String(current) + ' ' + 'of' + ' ' + String(total) : undefined), className : cn('min-h-[1lh] w-fit min-w-[14ch] text-xs font-medium text-mute-foreground tabular-nums', className), role : 'progressbar' }, property), render : render, state : { slot : 'step-progress' } })
}

export function StepContent({ 'aria-describedby': describe, children, className, invalid = false, lock = false, mandatory = false, multiple = false, name, onStatusChange, render, ...property }: Component.StepContent): JSX.Element {
	const id   = useId()
	const step = useStep()

	const state = {
		attempt   : useState(false),
		field     : useState<Component.StepField[]>([]),
		selection : useState<string[]>([]),
		skip      : useState(false),
		version   : useState(0),
	}

	const ref = {
		element : useRef<HTMLFieldSetElement | null>(null),
		control : useRef<Component.StepControl | null>(null),
		preset  : useRef<string[]>([]),
		status  : useRef<Component.StepStatus | null>(null),
	}

	const stage = {
		live     : (): Component.StepField[] => [ ...state.field[0] ].sort(order).filter((field: Component.StepField): boolean => !field.lock),
		status   : (): Component.StepStatus => state.skip[0] ? 'skip' : stage.live().some((field: Component.StepField): boolean => state.selection[0].includes(field.id)) ? 'answer' : 'open',
		valid    : (): boolean => lock || (stage.status() === 'skip' && !mandatory) || (!invalid && stage.status() === 'answer'),
		fault    : (): boolean => !lock && !(stage.status() === 'skip' && !mandatory) && (invalid || (state.attempt[0] && !stage.valid())),
		shortcut : (): Map<string, string> => new Map(stage.live().filter((field: Component.StepField): boolean => field.type === 'choice').slice(0, sequence(step.shortcut).length).map((field: Component.StepField, index: number): [ string, string ] => [ field.id, String(sequence(step.shortcut)[index]) ])),
	}

	const perform = {
		select : useCallback((field: string, check: boolean): void => {
			state.skip[1](false)

			state.selection[1]((current: string[]): string[] => check ? (multiple ? (current.includes(field) ? current : [ ...current, field ]) : [ field ]) : current.filter((each: string): boolean => !(each === field)))
		}, [ multiple, state.selection[1], state.skip[1] ]),
		sync : useCallback((field: string, check: boolean): void => {
			if (check)
				state.skip[1](false)

			state.selection[1]((current: string[]): string[] => check ? (multiple ? (current.includes(field) ? current : [ ...current, field ]) : [ field ]) : current.filter((each: string): boolean => !(each === field)))
		}, [ multiple, state.selection[1], state.skip[1] ]),
		register : useCallback((field: Component.StepField, preset: boolean): () => void => {
			state.field[1]((current: Component.StepField[]): Component.StepField[] => [ ...current.filter((each: Component.StepField): boolean => !(each.element === field.element) && !(each.id === field.id)), field ])

			if (preset && !ref.preset.current.includes(field.id)) {
				ref.preset.current = [ ...ref.preset.current, field.id ]

				state.selection[1]((current: string[]): string[] => current.includes(field.id) ? current : [ ...current, field.id ])
			}

			return (): void => {
				state.field[1]((current: Component.StepField[]): Component.StepField[] => current.filter((each: Component.StepField): boolean => !(each === field)))
			}
		}, [ ref.preset, state.field[1], state.selection[1] ]),
	}

	useLayoutEffect(() => {
		ref.control.current = {
			find  : (target: Element): Component.StepField | null => stage.live().find((field: Component.StepField): boolean => field.element === target) ?? null,
			focus : {
				invalid : (): void => {
					(ref.element.current?.querySelector<HTMLElement>('input[data-answer][name]:not(:disabled)') ?? ref.element.current?.querySelector<HTMLElement>('input:not([type=hidden]):not(:disabled), textarea:not(:disabled)') ?? ref.element.current)?.focus()
				},
				item : (): void => {
					ref.element.current?.focus()
				},
			},
			move : (target: Element, direction: Component.StepDirection): boolean => {
				const index = stage.live().findIndex((field: Component.StepField): boolean => field.element === target)

				if (stage.live().length === 0 || (textual(target) && !vacant(stage.live()[index] ?? null)) || (index < 0 && !(target === ref.element.current)))
					return false

				const destination = index < 0 ? (stage.live().find(answer) ?? (direction === 'next' ? stage.live()[0] : stage.live()[stage.live().length - 1])) : stage.live()[(index + (direction === 'next' ? 1 : -1) + stage.live().length) % stage.live().length]

				if (destination === undefined || destination.element === target || (index >= 0 && radio(target) && radio(destination.element)))
					return false

				destination.element.focus()

				if (destination.type === 'choice' && radio(destination.element))
					destination.element.click()

				return true
			},
			press     : (key: string): Component.StepField | null => stage.live().find((field: Component.StepField): boolean => stage.shortcut().get(field.id) === key) ?? null,
			lock      : lock,
			mandatory : mandatory,
			reset     : (): void => {
				state.attempt[1](false)
				state.skip[1](false)
				state.selection[1](multiple ? [ ...ref.preset.current ] : ref.preset.current.slice(0, 1))
				state.version[1]((version: number): number => version + 1)
			},
			skip : (): void => {
				if (mandatory)
					return

				state.selection[1]([])
				state.skip[1](true)
			},
			status   : stage.status(),
			validate : (): boolean => {
				state.attempt[1](true)

				if (!stage.valid())
					return false

				if (!step.native)
					return true

				const field = stage.live().find((each: Component.StepField): boolean => answer(each) && each.element.willValidate && !each.element.validity.valid)

				if (field === undefined)
					return true

				field.element.focus()
				field.element.reportValidity()

				return false
			},
		}
	})

	useLayoutEffect(() => {
		if (ref.element.current === null)
			return

		return step.register({ element : ref.element.current, control : ref.control, name : name })
	}, [ name, ref.element, ref.control, step.register ])

	useLayoutEffect(() => {
		step.refresh()
	}, [ lock, mandatory, stage.status(), step.refresh ])

	useLayoutEffect(() => {
		if (ref.status.current === null) {
			ref.status.current = stage.status()

			return
		}

		if (ref.status.current === stage.status())
			return

		ref.status.current = stage.status()

		onStatusChange?.(stage.status())
	}, [ onStatusChange, stage.status() ])

	return (
		<StepContentContext value={{ fault : stage.fault(), id : id, input : stage.live().some((field: Component.StepField): boolean => field.type === 'input'), lock : lock, mandatory : mandatory, multiple : multiple, name : name, register : perform.register, select : perform.select, selection : state.selection[0], shortcut : stage.shortcut(), status : stage.status(), sync : perform.sync, version : state.version[0] }}>
			{useRender({ defaultTagName : 'fieldset', props : mergeProps<'fieldset'>({ 'aria-describedby' : [ id + '-' + 'description', stage.fault() ? id + '-' + 'error' : undefined, describe ].filter(Boolean).join(' '), 'aria-invalid' : stage.fault() || undefined, children : children, className : cn('flex min-w-0 flex-col gap-4 border-0 p-0 outline-none', className), disabled : lock, hidden : lock || !(step.content === name), inert : lock || !(step.content === name), ref : ref.element, tabIndex : -1 }, property), render : render, state : { active : !lock && step.content === name, fault : stage.fault(), lock : lock, mandatory : mandatory, multiple : multiple, slot : 'step-content', status : stage.status() }, stateAttributesMapping : { fault : (value: boolean): Record<string, string> | null => value ? { 'data-invalid' : '' } : null, lock : (value: boolean): Record<string, string> | null => value ? { 'data-disabled' : '' } : null, mandatory : (value: boolean): Record<string, string> | null => value ? { 'data-required' : '' } : null } })}
		</StepContentContext>
	)
}

export function StepTitle({ className, render, ...property }: Component.StepTitle): JSX.Element {
	return useRender({ defaultTagName : 'legend', props : mergeProps<'legend'>({ className : cn('font-heading text-base leading-snug font-medium text-pretty [&:not(:has(~[data-slot=step-description]))]:mb-4', className) }, property), render : render, state : { slot : 'step-title' } })
}

export function StepDescription({ className, render, ...property }: Component.StepDescription): JSX.Element {
	const { id } = useContent()

	return useRender({ defaultTagName : 'p', props : mergeProps<'p'>({ className : cn('text-xs text-pretty text-mute-foreground', className), id : id + '-' + 'description' }, property), render : render, state : { slot : 'step-description' } })
}

export function StepChoiceGroup({ className, render, ...property }: Component.StepChoiceGroup): JSX.Element {
	const { shortcut } = useStep()

	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('group/step-choice-group grid min-w-0 gap-2', className) }, property), render : render, state : { shortcut : shortcut ?? undefined, slot : 'step-choice-group' } })
}

export function StepChoice({ check, children, className, defaultCheck = false, lock = false, onChange, render, value, ...property }: Component.StepChoice): JSX.Element {
	const id      = useId()
	const content = useContent()

	const ref = {
		input  : useRef<HTMLInputElement | null>(null),
		preset : useRef(check ?? defaultCheck),
	}

	const perform = {
		change : (event: ChangeEvent<HTMLInputElement>): void => {
			onChange?.(event)

			if (event.defaultPrevented)
				return

			if (check === undefined) {
				content.select(id, event.target.checked)

				return
			}

			if (content.status === 'skip' && check === event.target.checked)
				content.select(id, check)
		},
	}

	useLayoutEffect(() => {
		if (ref.input.current === null)
			return

		return content.register({ lock : content.lock || lock, element : ref.input.current, id : id, type : 'choice', value : value }, ref.preset.current)
	}, [ id, content.lock, content.register, lock, ref.input, ref.preset, value ])

	useLayoutEffect(() => {
		if (!(check === undefined))
			content.sync(id, check)
	}, [ check, id, content.sync, content.version ])

	return useRender({
		defaultTagName : 'label',
		props          : mergeProps<'label'>({
			children : (
				<>
					{useRender({ defaultTagName : 'input', props : { 'aria-invalid' : content.fault || undefined, 'aria-keyshortcuts' : [ content.shortcut.get(id), !(content.lock || lock) && (check === undefined ? content.selection.includes(id) : content.status === 'skip' ? false : check) ? 'Enter' : undefined ].filter(Boolean).join(' ') || undefined, checked : check === undefined ? content.selection.includes(id) : content.status === 'skip' ? false : check, className : 'absolute inset-0 z-10 size-full cursor-pointer opacity-0', disabled : content.lock || lock, id : id, name : content.status === 'skip' ? undefined : content.name, onChange : perform.change, ref : ref.input, required : content.mandatory && !content.multiple && !content.input, type : content.multiple ? 'checkbox' : 'radio', value : value }, state : { slot : 'step-choice-input' } })}
					{useRender({ defaultTagName : 'span', props : { 'aria-hidden' : true, children : <>{useRender({ defaultTagName : 'span', props : { className : 'hidden size-2 rounded-full bg-primary-foreground group-data-[type=checkbox]/step-choice:hidden group-data-checked/step-choice:block' }, state : { slot : 'step-choice-indicator-dot' } })}<CheckIcon data-slot={'step-choice-indicator-check'} className={'hidden size-3.5 group-data-[type=radio]/step-choice:hidden group-data-checked/step-choice:block'} /></>, className : 'pointer-events-none relative flex size-4 shrink-0 translate-y-[--spacing(0.45)] items-center justify-center rounded-[0.25rem] border border-haze group-has-data-[slot=step-choice-description]/step-choice:translate-y-0.5 group-data-[type=radio]/step-choice:rounded-full group-data-checked/step-choice:border-primary group-data-checked/step-choice:bg-primary group-data-checked/step-choice:text-primary-foreground dark:bg-haze/30 dark:group-data-checked/step-choice:bg-primary' }, state : { slot : 'step-choice-indicator' } })}
					{useRender({ defaultTagName : 'span', props : { children : children, className : 'flex min-w-0 flex-1 flex-col gap-0.5 leading-snug' }, state : { slot : 'step-choice-label' } })}
					{useRender({ defaultTagName : 'span', props : { 'aria-hidden' : true, children : content.shortcut.get(id), className : 'pointer-events-none ms-auto hidden size-5 shrink-0 translate-y-[--spacing(0.45)] items-center justify-center rounded-md border border-haze bg-background font-mono text-[calc(var(--canggu-typeface-size)*0.625)] leading-none font-medium text-mute-foreground group-has-data-[slot=step-choice-description]/step-choice:translate-y-0.5 group-data-[shortcut]/step-choice:inline-flex', hidden : content.shortcut.get(id) === undefined }, state : { slot : 'step-choice-shortcut' } })}
				</>
			),
			className : cn('group/step-choice relative flex min-h-11 cursor-pointer items-start gap-2.5 rounded-lg border border-haze bg-transparent px-3 py-2.5 text-start text-sm transition-none duration-250 outline-none select-none hover:bg-mute/50 hover:transition-colors has-[>input:focus-visible]:ring-3 has-[>input:focus-visible]:ring-halo/50 has-[>input:focus-visible]:transition-colors data-invalid:border-destructive data-invalid:ring-3 data-invalid:ring-destructive/15 dark:bg-haze/20 dark:data-invalid:border-destructive/50 dark:data-invalid:ring-destructive/40 data-checked:border-primary/40 data-checked:bg-mute data-checked:transition-colors dark:data-checked:bg-mute data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50', className),
		}, property),
		render                 : render,
		state                  : { check : check === undefined ? content.selection.includes(id) : content.status === 'skip' ? false : check, fault : content.fault, lock : content.lock || lock, shortcut : content.shortcut.get(id), slot : 'step-choice', type : content.multiple ? 'checkbox' : 'radio' },
		stateAttributesMapping : { check : (value: boolean): Record<string, string> | null => value ? { 'data-checked' : '' } : { 'data-unchecked' : '' }, fault : (value: boolean): Record<string, string> | null => value ? { 'data-invalid' : '' } : null, lock : (value: boolean): Record<string, string> | null => value ? { 'data-disabled' : '' } : null },
	})
}

export function StepChoiceDescription({ className, render, ...property }: Component.StepChoiceDescription): JSX.Element {
	return useRender({ defaultTagName : 'span', props : mergeProps<'span'>({ className : cn('text-xs text-mute-foreground', className) }, property), render : render, state : { slot : 'step-choice-description' } })
}

export function StepInput({ className, defaultValue, lock = false, onChange, render, type = 'text', value, ...property }: Component.StepInput): JSX.Element {
	const content = useContent()
	const id      = useId()

	const state = { answer : useState(present(defaultValue)) }

	const ref = {
		input  : useRef<HTMLInputElement | null>(null),
		preset : useRef(present(value ?? defaultValue)),
	}

	const perform = {
		change : (event: ChangeEvent<HTMLInputElement>): void => {
			onChange?.(event)

			if (event.defaultPrevented || !(value === undefined))
				return

			state.answer[1](event.target.value.trim().length > 0)

			content.select(id, event.target.value.trim().length > 0)
		},
	}

	useLayoutEffect(() => {
		if (ref.input.current === null)
			return

		return content.register({ lock : content.lock || lock, element : ref.input.current, id : id, type : 'input', value : '' }, ref.preset.current)
	}, [ id, content.lock, content.register, lock, ref.input, ref.preset ])

	useLayoutEffect(() => {
		if (!(value === undefined)) {
			content.sync(id, present(value))

			return
		}

		if (content.version > 0)
			state.answer[1](present(defaultValue))
	}, [ defaultValue, id, content.sync, content.version, state.answer[1], value ])

	return useRender({ defaultTagName : 'div', props : { children : useRender({ defaultTagName : 'input', props : mergeProps<'input'>({ 'aria-invalid' : content.fault || undefined, 'aria-keyshortcuts' : !(content.lock || lock) && (value === undefined ? state.answer[0] : present(value)) && content.selection.includes(id) ? 'Enter' : undefined, className : cn('h-8 min-h-11 w-full min-w-0 rounded-lg border border-haze bg-transparent px-2.5 py-1 text-base transition-none duration-250 outline-none selection:bg-primary selection:text-primary-foreground placeholder:text-mute-foreground focus-visible:ring-2 focus-visible:ring-halo/50 focus-visible:transition-colors disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-haze/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/15 aria-invalid:transition-colors dark:bg-haze/30 dark:disabled:bg-haze/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40', 'sm:min-h-0', 'md:text-sm', className), defaultValue : value === undefined ? defaultValue : undefined, disabled : content.lock || lock, form : content.selection.includes(id) ? undefined : '', id : id, name : content.selection.includes(id) ? content.name : undefined, onChange : perform.change, ref : ref.input, type : type, value : value }, property), render : render, state : { answer : value === undefined ? state.answer[0] : present(value), slot : 'step-input' }, stateAttributesMapping : { answer : (value: boolean): Record<string, string> | null => value ? { 'data-answer' : '' } : { 'data-empty' : '' } } }), className : 'group/step-input relative w-full min-w-0' }, state : { slot : 'step-input-wrapper' } })
}

export function StepError({ children, className, render, ...property }: Component.StepError): JSX.Element {
	const { fault, id, mandatory } = useContent()

	return useRender({ defaultTagName : 'p', props : mergeProps<'p'>({ children : children ?? (mandatory ? 'Choose an answer to continue.' : 'Choose an answer or skip this step.'), className : cn('mt-2 text-sm text-destructive', className), hidden : !fault, id : id + '-' + 'error', role : fault ? 'alert' : undefined }, property), render : render, state : { fault : fault, slot : 'step-error' }, stateAttributesMapping : { fault : (value: boolean): Record<string, string> | null => value ? { 'data-invalid' : '' } : null } })
}

export function StepNavigation({ className, render, ...property }: Component.StepNavigation): JSX.Element {
	return useRender({ defaultTagName : 'div', props : mergeProps<'div'>({ className : cn('grid min-h-11 w-full grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2', 'sm:min-h-8', className) }, property), render : render, state : { slot : 'step-navigation' } })
}

export function StepNext({ children, className, lock = false, onClick, size = 'md', variant = 'primary', ...property }: Component.StepNext): JSX.Element {
	const step = useStep()

	const perform = {
		click : (event: MouseEvent<HTMLButtonElement>): void => {
			onClick?.(event as Parameters<NonNullable<Component.StepNext['onClick']>>[0])

			if (!event.defaultPrevented)
				step.go.next()
		},
	}

	return <Button data-slot={'step-next'} data-status={step.control?.status} data-visible={step.total > 1 && !step.last ? '' : undefined} data-hidden={step.total > 1 && !step.last ? undefined : ''} size={size} variant={variant} aria-hidden={!(step.total > 1 && !step.last) || undefined} aria-keyshortcuts={step.total > 1 && !step.last && !lock ? 'Enter' : undefined} disabled={lock} hidden={!(step.total > 1 && !step.last)} inert={!(step.total > 1 && !step.last)} tabIndex={step.total > 1 && !step.last ? undefined : -1} onClick={perform.click} className={cn('col-start-3 row-start-1 min-h-11 justify-self-end', 'sm:min-h-0', className)} {...property}>{children ?? 'Next'}</Button>
}

export function StepPrevious({ children, className, lock = false, onClick, size = 'md', variant = 'outline', ...property }: Component.StepPrevious): JSX.Element {
	const step = useStep()

	const perform = {
		click : (event: MouseEvent<HTMLButtonElement>): void => {
			onClick?.(event as Parameters<NonNullable<Component.StepPrevious['onClick']>>[0])

			if (!event.defaultPrevented)
				step.go.previous()
		},
	}

	return <Button data-slot={'step-previous'} data-status={step.control?.status} data-visible={step.total > 1 && !step.first ? '' : undefined} data-hidden={step.total > 1 && !step.first ? undefined : ''} size={size} variant={variant} aria-hidden={!(step.total > 1 && !step.first) || undefined} disabled={lock} hidden={!(step.total > 1 && !step.first)} inert={!(step.total > 1 && !step.first)} tabIndex={step.total > 1 && !step.first ? undefined : -1} onClick={perform.click} className={cn('col-start-1 row-start-1 min-h-11 justify-self-start', 'sm:min-h-0', className)} {...property}>{children ?? 'Previous'}</Button>
}

export function StepSkip({ children, className, lock = false, onClick, size = 'md', variant = 'outline', ...property }: Component.StepSkip): JSX.Element {
	const step = useStep()

	const perform = {
		click : (event: MouseEvent<HTMLButtonElement>): void => {
			onClick?.(event as Parameters<NonNullable<Component.StepSkip['onClick']>>[0])

			if (!event.defaultPrevented)
				step.go.skip()
		},
	}

	return <Button data-slot={'step-skip'} data-status={step.control?.status} data-visible={step.control?.mandatory === false ? '' : undefined} data-hidden={step.control?.mandatory === false ? undefined : ''} size={size} variant={variant} aria-hidden={!(step.control?.mandatory === false) || undefined} disabled={lock} hidden={!(step.control?.mandatory === false)} inert={!(step.control?.mandatory === false)} tabIndex={step.control?.mandatory === false ? undefined : -1} onClick={perform.click} className={cn('col-start-2 row-start-1 min-h-11 justify-self-end', 'sm:min-h-0', className)} {...property}>{children ?? 'Skip'}</Button>
}

export function StepSubmit({ children, className, lock = false, size = 'md', variant = 'primary', ...property }: Component.StepSubmit): JSX.Element {
	const step = useStep()

	return <Button type={'submit'} data-slot={'step-submit'} data-status={step.control?.status} data-visible={step.total > 0 && step.last ? '' : undefined} data-hidden={step.total > 0 && step.last ? undefined : ''} size={size} variant={variant} aria-hidden={!(step.total > 0 && step.last) || undefined} aria-keyshortcuts={step.total > 0 && step.last && !lock ? 'Enter' : undefined} disabled={lock} hidden={!(step.total > 0 && step.last)} inert={!(step.total > 0 && step.last)} tabIndex={step.total > 0 && step.last ? undefined : -1} className={cn('col-start-3 row-start-1 min-h-11 justify-self-end', 'sm:min-h-0', className)} {...property}>{children ?? 'Submit'}</Button>
}
