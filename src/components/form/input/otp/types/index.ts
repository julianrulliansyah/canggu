import type { OTPField, useRender } from '@base-ui/react'

export type FormInputOTP          = Readonly<OTPField.Root.Props>
export type FormInputOTPSlot      = Readonly<OTPField.Input.Props>
export type FormInputOTPSeparator = Readonly<OTPField.Separator.Props>
export type FormInputOTPGroup     = Readonly<useRender.ComponentProps<'div'>>
