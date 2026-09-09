import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { UpdateBody } from './UpdateBody'

describe('UpdateBody', () => {
	it('retains visual heading levels without changing the document outline', () => {
		const body = '# One\n\n## Two\n\n### Three\n\n#### Four\n\n##### Five\n\n###### Six\n\nSetext\n====\n\n<h1>HTML heading</h1>'
		const html = renderToStaticMarkup(createElement(UpdateBody, { body }))
		expect(html).not.toMatch(/<h[1-6][\s>]/)
		for (let depth = 1; depth <= 6; depth++) expect(html).toContain(`update-heading-${depth}`)
		expect(html).toContain('&lt;h1&gt;')
	})

	it('preserves ordinary markdown formatting', () => {
		const html = renderToStaticMarkup(createElement(UpdateBody, { body: '**Bold** and *italic*\n\n- First\n- Second\n\n[Details](/party)' }))
		expect(html).toContain('<strong>Bold</strong>')
		expect(html).toContain('<em>italic</em>')
		expect(html).toContain('<li>First</li>')
		expect(html).toContain('href="/party"')
	})
})
