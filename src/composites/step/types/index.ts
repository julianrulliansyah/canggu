import type { useRender }                     from '@base-ui/react'
import type { ChangeEventHandler, RefObject } from 'react'
import type { Button }                        from '@/components/button/types'

export type Step                  = Readonly<useRender.ComponentProps<'form'>> & Readonly<{ defaultContent? : string, content? : string, onContentChange? : (content : string) => void, shortcut? : StepShortcut }>
export type StepShortcut          = 'letter' | 'number'
export type StepStatus            = 'open' | 'answer' | 'skip'
export type StepAnchor            = Readonly<{ element : Element }>
export type StepDirection         = 'next' | 'previous'
export type StepField             = Readonly<{ lock : boolean, element : HTMLInputElement, id : string, type : 'choice' | 'input', value : string }>
export type StepControl           = Readonly<{ focus : StepFocus, find : (target : Element) => StepField | null, move : (target : Element, direction : StepDirection) => boolean, press : (key : string) => StepField | null, lock : boolean, mandatory : boolean, reset : () => void, skip : () => void, status : StepStatus, validate : () => boolean }>
export type StepFocus             = Readonly<{ invalid : () => void, item : () => void }>
export type StepEntry             = Readonly<{ element : HTMLFieldSetElement, control : RefObject<StepControl | null>, name : string }>
export type StepIntent            = Readonly<{ name : string, target : 'item' | 'invalid' }>
export type StepValue             = Readonly<{ current : number, first : boolean, go : StepMotion, control : StepControl | null, content : string | null, last : boolean, native : boolean, refresh : () => void, register : (entry : StepEntry) => () => void, shortcut : StepShortcut | null, total : number }>
export type StepMotion            = Readonly<{ next : () => void, previous : () => void, skip : () => void }>
export type StepProgress          = Readonly<useRender.ComponentProps<'div'>>
export type StepContent           = Omit<Readonly<useRender.ComponentProps<'fieldset'>>, 'name' | 'disabled'> & Readonly<{ invalid? : boolean, lock? : boolean, mandatory? : boolean, multiple? : boolean, name : string, onStatusChange? : (status : StepStatus) => void }>
export type StepContentValue      = Readonly<{ fault : boolean, id : string, input : boolean, lock : boolean, mandatory : boolean, multiple : boolean, name : string, register : (field : StepField, preset : boolean) => () => void, select : (id : string, check : boolean) => void, selection : string[], shortcut : Map<string, string>, status : StepStatus, sync : (id : string, check : boolean) => void, version : number }>
export type StepTitle             = Readonly<useRender.ComponentProps<'legend'>>
export type StepDescription       = Readonly<useRender.ComponentProps<'p'>>
export type StepChoiceGroup       = Readonly<useRender.ComponentProps<'div'>>
export type StepChoice            = Omit<Readonly<useRender.ComponentProps<'label'>>, 'onChange'> & Readonly<{ check? : boolean, defaultCheck? : boolean, lock? : boolean, onChange? : ChangeEventHandler<HTMLInputElement>, value : string }>
export type StepChoiceDescription = Readonly<useRender.ComponentProps<'span'>>
export type StepInput             = Omit<Readonly<useRender.ComponentProps<'input'>>, 'disabled'> & Readonly<{ lock? : boolean }>
export type StepError             = Readonly<useRender.ComponentProps<'p'>>
export type StepNavigation        = Readonly<useRender.ComponentProps<'div'>>
export type StepNext              = Omit<Button, 'disabled'> & Readonly<{ lock? : boolean }>
export type StepPrevious          = Omit<Button, 'disabled'> & Readonly<{ lock? : boolean }>
export type StepSkip              = Omit<Button, 'disabled'> & Readonly<{ lock? : boolean }>
export type StepSubmit            = Omit<Button, 'disabled'> & Readonly<{ lock? : boolean }>
