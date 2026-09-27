import type { GroupProps, PanelProps, SeparatorProps } from 'react-resizable-panels'

export type ResizeGroup = Readonly<GroupProps>
export type ResizePanel = Readonly<PanelProps>
export type ResizeGrip  = Readonly<SeparatorProps> & Readonly<{ grip ? : boolean }>
