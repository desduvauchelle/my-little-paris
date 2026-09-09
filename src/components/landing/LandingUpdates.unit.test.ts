import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useUpdates } from '@growth-engine/sdk-client'
import { LandingUpdates } from './LandingUpdates'

vi.mock('@growth-engine/sdk-client', () => ({ useUpdates: vi.fn() }))

const item = {
	id: 'one', title: 'A little celebration', body: '**Come along** for [details](/party).',
	imageUrl: '/images/example.jpg', eventDate: '2026-09-20T00:00:00Z', publishedAt: '2026-09-09T00:00:00Z',
}
const render = () => renderToStaticMarkup(createElement(LandingUpdates, { locale: 'en', heading: 'Latest news' }))

describe('LandingUpdates', () => {
	beforeEach(() => vi.mocked(useUpdates).mockReturnValue({ items: [], list: null, loading: false, error: null }))

	it.each([
		{ loading: true, error: null },
		{ loading: false, error: null },
		{ loading: false, error: 'Unknown list' },
	])('renders nothing for loading, empty, or unavailable feeds: %j', (state) => {
		vi.mocked(useUpdates).mockReturnValue({ items: [], list: null, ...state })
		expect(render()).toBe('')
	})

	it('uses the exact portal slug and shows at most three items with rendered markdown', () => {
		vi.mocked(useUpdates).mockReturnValue({ items: [item, { ...item, id: 'two' }, { ...item, id: 'three' }, { ...item, id: 'four', title: 'Not displayed' }], list: null, loading: false, error: null })
		const html = render()
		expect(useUpdates).toHaveBeenCalledWith('landing-page', { limit: 3 })
		expect(html).toContain('Latest news')
		expect(html).toContain('<strong>Come along</strong>')
		expect(html).toContain('href="/party"')
		expect(html).toContain('dateTime="2026-09-20T00:00:00.000Z"')
		expect(html).not.toContain('Not displayed')
	})

	it('supports text-only updates and falls back to the publication date', () => {
		vi.mocked(useUpdates).mockReturnValue({ items: [{ ...item, imageUrl: null, eventDate: null }], list: null, loading: false, error: null })
		const html = render()
		expect(html).not.toContain('<img')
		expect(html).toContain('dateTime="2026-09-09T00:00:00.000Z"')
	})
})
