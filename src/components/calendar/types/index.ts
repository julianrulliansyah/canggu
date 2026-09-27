import type { ChevronProps, DayButtonProps, DayPickerProps, RootProps, WeekNumberProps } from 'react-day-picker'
import type { Button }                                                                   from '@/components/button/types'

export type Calendar        = DayPickerProps & Readonly<{ button? : Button['variant'] }>
export type CalendarRoot    = RootProps
export type CalendarChevron = ChevronProps
export type CalendarWeek    = WeekNumberProps
export type CalendarDay     = DayButtonProps
