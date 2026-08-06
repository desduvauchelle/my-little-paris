import { describe, expect, it } from 'vitest'
import { getBlogCtaKind, insertBlogCta } from './blog-cta'

describe('getBlogCtaKind', () => {
	it('routes birthday and party-intent posts to the party page', () => {
		expect(
			getBlogCtaKind({
				title: 'San Marino Birthday Venue Booking Guide',
				slug: 'san-marino-birthday-venue-booking-guide',
				seoTitle: null,
			}),
		).toBe('party')
	})

	it('routes play-session posts to reservations even when the body mentions parties', () => {
		expect(
			getBlogCtaKind({
				title: 'Indoor Playground First Time Tips San Gabriel',
				slug: 'indoor-playground-first-time-tips-san-gabriel',
				seoTitle: null,
			}),
		).toBe('reservations')
	})
})

describe('insertBlogCta', () => {
	it('places the CTA before a trailing FAQ section', () => {
		const content = [
			'## What to expect',
			'',
			'Arrive a few minutes early and bring socks.',
			'',
			'## Frequently Asked Questions',
			'',
			'### Do I need a reservation?',
			'',
			'Reservations are recommended.',
		].join('\n')

		const result = insertBlogCta(
			content,
			'[Book your Eat & Play session online in under a minute →](/reservations)',
		)

		expect(result).toContain(
			'Arrive a few minutes early and bring socks.\n\n[Book your Eat & Play session online in under a minute →](/reservations)\n\n## Frequently Asked Questions',
		)
	})

	it('recognizes FAQ headings with post-specific wording', () => {
		const content =
			'## What to expect\n\nBring socks.\n\n## FAQs About San Gabriel Indoor Playgrounds\n\nReservations are recommended.'
		const cta = '[Book now →](/reservations)'

		expect(insertBlogCta(content, cta)).toContain(
			'Bring socks.\n\n[Book now →](/reservations)\n\n## FAQs About San Gabriel Indoor Playgrounds',
		)
	})

	it('appends the CTA once when there is no trailing supplemental section', () => {
		const content = '## Final thoughts\n\nYou now have everything you need.'
		const cta = 'Ready to book? [See our party packages and send an inquiry →](/party)'

		expect(insertBlogCta(content, cta)).toBe(`${content}\n\n${cta}`)
		expect(insertBlogCta(`${content}\n\n${cta}`, cta)).toBe(`${content}\n\n${cta}`)
	})
})
