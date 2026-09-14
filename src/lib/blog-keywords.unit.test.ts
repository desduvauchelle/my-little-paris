import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { BlogContent, type BlogContentProps } from '@growth-engine/sdk-client/components'
import { normalizeBlogKeywords } from './blog-keywords'

describe('blog keyword adaptation', () => {
	it('renders stored JSON keywords without crashing or dropping article structured data', () => {
		const post = {
			title: 'Family play', slug: 'family-play', content: 'A family day out.',
			language: 'en', createdAt: '2026-09-14T00:00:00.000Z',
			keywords: normalizeBlogKeywords('["play cafe","San Gabriel"]'),
		} as NonNullable<BlogContentProps['post']>
		const html = renderToStaticMarkup(createElement(BlogContent, {
			html: post.content, post, canonicalUrl: 'https://www.my-little-paris.com/blog/family-play',
		}))
		expect(html).toContain('A family day out.')
		expect(html).toContain('"keywords":"play cafe, San Gabriel"')
		expect(html).toContain('"@id":"https://www.my-little-paris.com/blog/family-play"')
	})

	it.each([
		[null, null], [undefined, null], ['', null], ['bad JSON', null],
		['null', null], ['{}', null], ['42', null],
		[['play cafe'], ['play cafe']], ['["play cafe",42,null]', ['play cafe']],
	])('handles keyword value %j', (input, expected) => {
		expect(normalizeBlogKeywords(input)).toEqual(expected)
	})
})
