import { Marked } from 'marked'

const markdown = new Marked({
	renderer: {
		heading({ tokens, depth }) {
			return `<p class="update-heading update-heading-${depth}">${this.parser.parseInline(tokens)}</p>`
		},
		// Keep embedded HTML from introducing headings or executable markup.
		html({ text }) {
			return text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
		},
	},
})

export function UpdateBody({ body }: { body: string }) {
	return <div className="prose max-w-none text-base text-base-content/80 [overflow-wrap:anywhere] [&_a]:text-primary [&_.update-heading]:font-display [&_.update-heading]:font-semibold [&_.update-heading]:text-primary [&_.update-heading]:text-lg [&_.update-heading-1]:text-2xl [&_.update-heading-2]:text-xl" dangerouslySetInnerHTML={{ __html: markdown.parse(body, { async: false }) }} />
}
