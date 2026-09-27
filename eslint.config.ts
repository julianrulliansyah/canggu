import type { Linter } from 'eslint'

import immersive from 'eslint-immersive'

const config: Linter.Config[] = [ { ignores : [ 'dist/**', 'node_modules/**' ] }, ...immersive, { settings : { tailwindcss : { cssConfigPath : 'src/assets/styles/index.css' } } } ]

export default config
