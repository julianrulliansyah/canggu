import type { Switch }        from '@base-ui/react'
import type { VariantProps }  from 'class-variance-authority'
import type { FormSwitchCVA } from '@/components/form/switch'

export type FormSwitch = Readonly<Switch.Root.Props> & VariantProps<typeof FormSwitchCVA>
