import type { JSX } from 'react'

export type NativeIntrinsic                                 = { [K in keyof JSX.IntrinsicElements as Capitalize<string & K>] : K }
export type NativeElement<T extends Record<string, string>> = Omit<NativeIntrinsic, keyof T> & T
