import type { Input, useRender }                                from '@base-ui/react'
import type { VariantProps }                                    from 'class-variance-authority'
import type { Button }                                          from '@/components/button/types'
import type { FormInputGroupAddonCVA, FormInputGroupButtonCVA } from '@/components/form/input/group'

export type FormInputGroup         = Readonly<useRender.ComponentProps<'div'>>
export type FormInputGroupAddon    = Readonly<useRender.ComponentProps<'div'>> & VariantProps<typeof FormInputGroupAddonCVA>
export type FormInputGroupText     = Readonly<useRender.ComponentProps<'span'>>
export type FormInputGroupTextarea = Readonly<useRender.ComponentProps<'textarea'>>
export type FormInputGroupButton   = Omit<Button, 'icon' | 'size'> & VariantProps<typeof FormInputGroupButtonCVA>
export type FormInputGroupControl  = Readonly<Input.Props>
