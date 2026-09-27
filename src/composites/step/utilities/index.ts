import type * as Component from '@/composites/step/types'

export function present(value: unknown): boolean {
	return Array.isArray(value) ? value.some((each: unknown): boolean => String(each).trim().length > 0) : !(value === undefined || value === null) && String(value).trim().length > 0
}

export function sequence(mode: Component.StepShortcut | null): string[] {
	return mode === 'letter' ? Array.from({ length : 26 }, (_: unknown, index: number): string => String.fromCharCode(65 + index)) : mode === 'number' ? Array.from({ length : 9 }, (_: unknown, index: number): string => String(index + 1)) : []
}

export function symbol(key: string, mode: Component.StepShortcut): string | null {
	return sequence(mode).includes(mode === 'letter' ? key.toUpperCase() : key) ? (mode === 'letter' ? key.toUpperCase() : key) : null
}

export function answer(field: Component.StepField): boolean {
	return field.type === 'choice' ? field.element.checked : field.element.hasAttribute('name') && present(field.element.value)
}

export function vacant(field: Component.StepField | null): boolean {
	return field?.type === 'input' && [ 'email', 'password', 'search', 'tel', 'text', 'url' ].includes(field.element.type) && !present(field.element.value)
}

export function textual(target: Element): boolean {
	return target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement ? true : target instanceof HTMLInputElement ? ![ 'button', 'checkbox', 'radio', 'reset', 'submit' ].includes(target.type) : target instanceof HTMLElement && target.isContentEditable
}

export function radio(target: Element): boolean {
	return target instanceof HTMLInputElement && target.type === 'radio'
}

export function order(left: Component.StepAnchor, right: Component.StepAnchor): number {
	return left.element === right.element ? 0 : left.element.compareDocumentPosition(right.element) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : left.element.compareDocumentPosition(right.element) & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0
}
