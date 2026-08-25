import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { getDictionary } from '@/i18n'
import { PartyFaq } from './PartyFaq'

describe('PartyFaq', () => {
	it('renders answer-first San Gabriel birthday party facts as visible content', async () => {
		const dict = await getDictionary('en')
		const markup = renderToStaticMarkup(createElement(PartyFaq, { dict, locale: 'en' }))

		expect(markup).toContain('Kids Birthday Parties in San Gabriel')
		expect(markup).toContain('How much does a kids birthday party cost in San Gabriel?')
		expect(markup).toContain('$460–$990')
		expect(markup).toContain('children ages 0–7')
		expect(markup).toContain('non-refundable deposit shown for your package')
		expect(markup).toContain('<dl')
		expect(markup).toContain('href="#party-packages"')
		expect(markup).toContain('href="/play"')
		expect(markup).toContain('href="#party-guidelines"')
		expect(markup).toContain('href="#party-inquiry"')
	})

	it('localizes the link to the play page', async () => {
		const dict = await getDictionary('fr')
		const markup = renderToStaticMarkup(createElement(PartyFaq, { dict, locale: 'fr' }))

		expect(markup).toContain('href="/fr/play"')
	})
})
