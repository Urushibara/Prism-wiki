Prism.languages.wiki = {
	"block-comment": {
		pattern: /(^|[^\\])\/\*[\s\S]*?\*\//,
		lookbehind: true,
		alias: "comment",
	},
	heading: {
		pattern: /^(=+)[^=\r\n].*?\1/m,
		inside: {
			punctuation: /^=+|=+$/,
			important: /.+/,
		},
	},
	hr: {
		pattern: /^-{4,}/m,
		alias: "punctuation",
	},
	//url: [
	//	/ISBN +(?:97[89][ -]?)?(?:\d[ -]?){9}[\dx]\b|(?:PMID|RFC) +\d+/i,
	//	/\[\[.+?\]\]|\[.+?\]/,
	//],
	"internal-link": {
		pattern: /\[{2}[^\[\]]+?\]{2}/m,
		inside: {
			"page-name": {
				pattern: /(?<=\[\[)([^\[\]\|=]+)?/,
				alias: "keyword",
			},
			braket: {
				pattern: /(^\[\[|\]\]$)/,
				alias: "variable",
			},
			size: {
				pattern: /x?\d+?x?\d+([a-z]{2}|%)/,
				alias: "property",
			},
			layout: {
				pattern: /\b(?:center|left|right|none|thumb|frame)\b/,
				alias: "property",
			},
			punctuation: /\|/,
			// rest: see below
		}
	},
	"external-link": {
		pattern: /\[[^\[\]]+\]/m,
		inside: {
			url: {
				pattern: /(?<=\[)([^\s\[\]]+)?/,
				alias: "keyword",
			},
			title: {
				pattern: /([^\s\[\]]+)/,
				alias: "string",
			},
			braket: {
				pattern: /(^\[|\]$)/,
				alias: "variable",
			},
			punctuation: /\s/,
			// rest: see below
		}
	},
	argument: {
		pattern: /\{{3}[\s\r\n]*[^{}]+?\}{3}/m,
		inside: {
			"argument-name": {
				pattern: /(?<=\{\s*)[^{}|]+/,
				alias: "property",
			},
			braket: {
				pattern: /(^\{{3}|\}{3}$)/,
				alias: "variable",
			},
			punctuation: /\|/,
			// rest: see below
		},
	},
	template: {
		pattern: /\{{2}[^|:\r\n]+(?=[:|}])?/m,
		inside: {
			"parser-function": {
				pattern: /(?<={{)#([^0-9{}:|=]+)?/,
				alias: "keyword",
			},
			"template-name": {
				pattern: /(?<={{)([^{}:|=]+)?/,
				alias: "property",
			},
			punctuation: /^\{\{|[:|]|\}\}/,
			// rest: see below
		}
	},
	"parser-function": {
		pattern: /#([^{}:|=][^{}:|=]*[^{}:|=])?/,
		alias: "keyword",
	},
	"template-param-eq": {
		pattern: /\b([^{}:|=][^{}:|=]*[^{}:|=])?=/,
		inside: {
			"param-name" :{
				pattern: /\b([^{}:|=][^{}:|=]*[^{}:|=])?/,
				alias: "string",
			},
			punctuation: /=/,
		}
	},
	emphasis: {
		// TODO Multi-line
		pattern: /('{2,5}).+?\1/,
		inside: {
			"bold-italic": {
				pattern: /(''''').+?(?=\1)/,
				alias: ["bold", "italic"],
				lookbehind: true,
			},
			bold: {
				pattern: /(''')[^'](?:.*?[^'])?(?=\1)/,
				lookbehind: true,
			},
			italic: {
				pattern: /('')[^'](?:.*?[^'])?(?=\1)/,
				lookbehind: true,
			},
			punctuation: /^''+|''+$/,
		},
	},
	variable: [
		/__[A-Z]+__/,
	],
	symbol: [/^#redirect/im, /~{3,5}/],
	// Handle table attrs:
	// {|
	// ! style="text-align:left;"| Item
	// |}
	"table-tag": {
		pattern: /((?:^|[|!])[|!])[^|\r\n]+\|(?!\|)/m,
		lookbehind: true,
		inside: {
			"table-bar": {
				pattern: /\|$/,
				alias: "punctuation",
			},
			//rest: Prism.languages.markup["tag"].inside,
		},
	},
	punctuation: /^(?:\{\||\|\}|\}\}|\|-|[*#:;!|])|\|\||!!|\}\}/m,
};

Prism.languages.wiki.argument.inside.rest = Prism.languages.wiki;
Prism.languages.wiki["internal-link"].inside.rest = Prism.languages.wiki;
Prism.languages.wiki.template.inside.rest = Prism.languages.wiki;

Prism.languages.wiki = Prism.languages.extend("markup", Prism.languages.wiki);


Prism.languages.insertBefore("wiki", "tag", {
	// Prevent highlighting inside <nowiki>, <source> and <pre> tags
	nowiki: {
		pattern: /<(nowiki|pre|source)\b[^>]*>[\s\S]*?<\/\1>/i,
		inside: {
			tag: {
				pattern: /<(?:nowiki|pre|source)\b[^>]*>|<\/(?:nowiki|pre|source)>/i,
				inside: Prism.languages.markup["tag"].inside,
			},
		},
	},
});
