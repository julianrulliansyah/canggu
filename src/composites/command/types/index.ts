import type { Combobox, Dialog, useRender } from '@base-ui/react'
import type { ReactNode }                   from 'react'

export type Command           = Omit<Readonly<Combobox.Root.Props<unknown, boolean | undefined>>, 'children'> & Readonly<{ children ? : ReactNode, className ? : string }>
export type CommandDialog     = Omit<Readonly<Dialog.Root.Props>, 'children'> & Readonly<{ children ? : ReactNode, className ? : string, close ? : boolean, description ? : string, title ? : string }>
export type CommandInput      = Readonly<Combobox.Input.Props>
export type CommandList       = Readonly<Combobox.List.Props>
export type CommandEmpty      = Readonly<Combobox.Empty.Props>
export type CommandGroup      = Readonly<Combobox.Group.Props>
export type CommandGroupLabel = Readonly<Combobox.GroupLabel.Props>
export type CommandCollection = Readonly<Combobox.Collection.Props>
export type CommandItem       = Readonly<Combobox.Item.Props>
export type CommandSeparator  = Readonly<Combobox.Separator.Props>
export type CommandShortcut   = Readonly<useRender.ComponentProps<'span'>>
