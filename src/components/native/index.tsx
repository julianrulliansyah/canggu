import type * as Component from '@/components/native/types'

const element = {
	HTML                : 'html',
	Portal              : 'div',
	Layout              : 'div',
	Page                : 'div',
	Panel               : 'div',
	Card                : 'div',
	Content             : 'div',
	SVG                 : 'svg',
	Paragraph           : 'p',
	Anchor              : 'a',
	DD                  : 'dd',
	DL                  : 'dl',
	DT                  : 'dt',
	HR                  : 'hr',
	Separator           : 'hr',
	BDI                 : 'bdi',
	BDO                 : 'bdo',
	RP                  : 'rp',
	RT                  : 'rt',
	WBR                 : 'wbr',
	TD                  : 'td',
	TH                  : 'th',
	TR                  : 'tr',
	UnorderedList       : 'ul',
	OrderedList         : 'ol',
	List                : 'li',
	Image               : 'img',
	Break               : 'br',
	IFrame              : 'iframe',
	NoScript            : 'noscript',
	ColGroup            : 'colgroup',
	TBody               : 'tbody',
	TFoot               : 'tfoot',
	THead               : 'thead',
	DataList            : 'datalist',
	MPath               : 'mpath',
	TSpan               : 'tspan',
	BlockQuote          : 'blockquote',
	FigCaption          : 'figcaption',
	FieldSet            : 'fieldset',
	OptGroup            : 'optgroup',
	FEBlend             : 'feBlend',
	FEColorMatrix       : 'feColorMatrix',
	FEComponentTransfer : 'feComponentTransfer',
	FEComposite         : 'feComposite',
	FEConvolveMatrix    : 'feConvolveMatrix',
	FEDiffuseLighting   : 'feDiffuseLighting',
	FEDisplacementMap   : 'feDisplacementMap',
	FEDistantLight      : 'feDistantLight',
	FEDropShadow        : 'feDropShadow',
	FEFlood             : 'feFlood',
	FEFuncA             : 'feFuncA',
	FEFuncB             : 'feFuncB',
	FEFuncG             : 'feFuncG',
	FEFuncR             : 'feFuncR',
	FEGaussianBlur      : 'feGaussianBlur',
	FEImage             : 'feImage',
	FEMerge             : 'feMerge',
	FEMergeNode         : 'feMergeNode',
	FEMorphology        : 'feMorphology',
	FEOffset            : 'feOffset',
	FEPointLight        : 'fePointLight',
	FESpecularLighting  : 'feSpecularLighting',
	FESpotLight         : 'feSpotLight',
	FETile              : 'feTile',
	FETurbulence        : 'feTurbulence',
} as const

const cache = new Map<string, string>(Object.entries(element))

function rectify(key: string): string {
	const memory = cache.get(key)

	if (!(memory === undefined))
		return memory

	cache.set(key, key.charAt(0).toLowerCase() + key.slice(1))

	return cache.get(key) ?? key
}

export const Native = new Proxy<Record<string, string>>({}, { get : (_: Record<string, string>, key: string | symbol): string => rectify(String(key)) }) as Component.NativeElement<typeof element>
