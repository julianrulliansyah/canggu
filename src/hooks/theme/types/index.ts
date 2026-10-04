import type { UtilitiesTheme } from '@/utilities/theme'

export type HooksTheme = Readonly<{ theme : UtilitiesTheme, apply : (theme: UtilitiesTheme) => void }>
