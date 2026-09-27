import type { Popover as PopoverPrimitive } from '@base-ui/react'
import type { Locale }                      from 'date-fns'
import type { DateRange }                   from 'react-day-picker'

export type FormInputDate      = Readonly<Omit<PopoverPrimitive.Trigger.Props, 'defaultValue' | 'value'>> & Readonly<{ defaultValue? : Date, locale? : Locale, onValueChange? : (value : Date | undefined) => void, pattern? : string, placeholder? : string, value? : Date }>
export type FormInputDateRange = Readonly<Omit<PopoverPrimitive.Trigger.Props, 'defaultValue' | 'value'>> & Readonly<{ defaultValue? : DateRange, locale? : Locale, month? : number, onValueChange? : (value : DateRange | undefined) => void, pattern? : string, placeholder? : string, value? : DateRange }>
