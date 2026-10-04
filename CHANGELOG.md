## [1.1.7](https://github.com/julianrulliansyah/canggu/compare/v1.1.6...v1.1.7) (2026-10-04)

### Refinements

* **assets/styles/theme/berawa:** declare rail placement and express shadows in oklch ([b0317ab](https://github.com/julianrulliansyah/canggu/commit/b0317ab84a8c5e73581d94d85218cf1d5b8b5b9d))
* **assets/styles/theme/berawa:** values declaration reproducing present sidebar ([843f00d](https://github.com/julianrulliansyah/canggu/commit/843f00dbd0ca20b3eb6225652b9c01975e095da4))
* **assets/styles/theme/echo:** introduce theme with offset inset and submenu connectors ([7d783ec](https://github.com/julianrulliansyah/canggu/commit/7d783ecd34f466c7b3282147f774dfd0e265d8e2))
* **assets/styles/theme/echo:** place rail within seam and conform icon sizes to berawa theme ([6adce37](https://github.com/julianrulliansyah/canggu/commit/6adce37dff350d956250f942dab9f84e7d65dd94))
* **assets/styles:** express shape of sidebar as tokens declared by berawa and echo ([7217d00](https://github.com/julianrulliansyah/canggu/commit/7217d006dd4145212f7f2a49450ed5dcdbf284fc))
* **assets/styles:** map rail placement tokens and withdraw icon dimensions of sidebar ([8491848](https://github.com/julianrulliansyah/canggu/commit/84918489236574314111b80d266819d140fa4fa8))
* **assets/styles:** register sidebar length tokens and withdraw spacing maps of rail position ([7a4e1f0](https://github.com/julianrulliansyah/canggu/commit/7a4e1f05e7f15613ca2a2034297e36cc557b6eb6))
* **codebase:** emit every theme absent from stylesheet as separate export entry ([a243bab](https://github.com/julianrulliansyah/canggu/commit/a243bab1b702003a0ee6b8473bc29b2fbda30528))
* **components/separator:** draw line with border to preserve clarity on fractional pixel ratios ([8eef769](https://github.com/julianrulliansyah/canggu/commit/8eef7699d1c931a64d76543a2ca3700cfdf910f4))
* **composites/sidebar:** confine hover to inactive items and situate rail by tokens ([5208350](https://github.com/julianrulliansyah/canggu/commit/520835075430b24233c521bfbd88b5f4a0f752c8))
* **composites/sidebar:** honour reduced motion and read rail position tokens directly ([1f6bfc2](https://github.com/julianrulliansyah/canggu/commit/1f6bfc2f830c232d6b4fa405f1037fe53c16a6e0))
* **composites/sidebar:** read theme tokens for shape and hold active state above hover ([36ec992](https://github.com/julianrulliansyah/canggu/commit/36ec992eee189dcd01c8bda29d475cfaa4384d15))
* **hooks/theme:** furnish typed hook observing and applying document theme attribute ([ea94560](https://github.com/julianrulliansyah/canggu/commit/ea94560ec9163464b40b68b0c26cdbc6a0a4f8bd))
* **scripts:** replicate every theme upon installation and adopt module classification ([35a84f7](https://github.com/julianrulliansyah/canggu/commit/35a84f7ff10784c91358f08233741de321dd96ae))
* **utilities/theme:** expose union of theme names for typed data-theme attribute ([ef73c06](https://github.com/julianrulliansyah/canggu/commit/ef73c06bb4c3a5203d0dc2f874c20cc9389f7a17))

### Refactors

* **assets/styles/theme/berawa:** consign rail displacement values to position namespace ([b469c55](https://github.com/julianrulliansyah/canggu/commit/b469c55fb1673b81fe8a94b363a8a12e0126246f))
* **assets/styles/theme/echo:** relocate rail placement tokens into dedicated position namespace ([aeaf96f](https://github.com/julianrulliansyah/canggu/commit/aeaf96ff3792684326ec7b7c1fd75693b7e0311a))

## [1.1.6](https://github.com/julianrulliansyah/canggu/compare/v1.1.5...v1.1.6) (2026-09-27)

### Resolutions

* **components/button:** determine native button semantics from element given to render ([fc0a00d](https://github.com/julianrulliansyah/canggu/commit/fc0a00dc69d37d0493500ff1e181867e5a3539da))
* **components/form:** propagate generic value types of select and combobox to consumers ([043470a](https://github.com/julianrulliansyah/canggu/commit/043470aaf6063a57cb624430c6ec875e901099bf))
* **composites/step:** conform slot of input container to established naming convention ([7873d3e](https://github.com/julianrulliansyah/canggu/commit/7873d3ec5d4f267f69495cf443b68a4a786fdb3e))

### Refinements

* **components/calendar:** introduce mark property indicating designated days by dot ([2d3f36f](https://github.com/julianrulliansyah/canggu/commit/2d3f36ff3e4df1e1e69baf45dcf8229b7cfb9c89))
* **components/card:** align footer with bottom boundary of vertically extended card ([c3b155c](https://github.com/julianrulliansyah/canggu/commit/c3b155c96bcb9f0e5a7ce6fbc7960ac4e2ad1665))
* **components/chart:** introduce ratio variant governing proportion of chart container ([07a3fa5](https://github.com/julianrulliansyah/canggu/commit/07a3fa52aa6054dcc58eabe5a1f72ffed53b5ab8))
* **components/form:** align weight of input group addon text with adjacent control ([3c37ada](https://github.com/julianrulliansyah/canggu/commit/3c37adaaaf6a017b8ef586dc0b0326e8be2c78a2))
* **components/form:** extend select and native select to full width within form field ([99a32a1](https://github.com/julianrulliansyah/canggu/commit/99a32a11991cce7bdd731daa4c2a2d6bd28f6a5c))
* **composites/sidebar:** register toggle shortcut once through platform command modifier ([f617178](https://github.com/julianrulliansyah/canggu/commit/f617178ad45c41b42fd4e9e459cebaf42c29d5a9))
* **hooks/keyboard:** relocate keyboard hook and select command modifier per platform ([580acf7](https://github.com/julianrulliansyah/canggu/commit/580acf72d33ccac53cdfc67ccf2ce658e2ee5889))
* **scripts:** recognise hooks as fourth kind of module within command line interface ([e60faa9](https://github.com/julianrulliansyah/canggu/commit/e60faa9a6cb38141f9e3454ba58bc8699c8eeffb))

### Refactors

* **hooks/responsive:** relocate responsive hooks from utilities into directory of hooks ([9d6f3fe](https://github.com/julianrulliansyah/canggu/commit/9d6f3fee4e8509aaf5c7c14dbebf3c7a0463f78c))
