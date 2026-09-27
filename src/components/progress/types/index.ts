import type { Progress as ProgressPrimitive } from '@base-ui/react'

export type Progress          = Readonly<ProgressPrimitive.Root.Props>
export type ProgressTrack     = Readonly<ProgressPrimitive.Track.Props>
export type ProgressIndicator = Readonly<ProgressPrimitive.Indicator.Props>
export type ProgressLabel     = Readonly<ProgressPrimitive.Label.Props>
export type ProgressValue     = Readonly<ProgressPrimitive.Value.Props>
