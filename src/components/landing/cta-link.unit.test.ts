import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import en from '@/i18n/dictionaries/en'
import { CTA } from './CTA'

describe('homepage final CTA', () => {
	it('sends visitors to the localized reservations page', () => {
		const markup = renderToStaticMarkup(createElement(CTA, { dict: en, locale: 'fr' }))

		expect(markup).toContain('href="/fr/reservations"')
		expect(markup).not.toContain('href="/fr/contact"')
	})
})
