import type { CnFunction } from 'cn'

import { createCn } from 'cn/config'

export const cn: CnFunction = createCn({ extend : { theme : { spacing : [ 'control-lg', 'control-md', 'control-sm', 'control-xs', 'check', 'thumb', 'switch-height-md', 'switch-width-md', 'switch-height-sm', 'switch-width-sm', 'textarea' ] } } })
