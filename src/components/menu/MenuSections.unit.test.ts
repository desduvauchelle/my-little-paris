import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it, vi } from 'vitest'
import { EAT_MENU, KIDS_MENU, DRINK_MENU } from '@/data/menu'
import en from '@/i18n/dictionaries/en'
import { MenuSections } from './MenuSections'

vi.mock('@/components/landing/ScrollReveal', () => ({
	ScrollReveal: ({ children }: { children: React.ReactNode }) => children,
}))

const photos = [
	['House Special Bruschetta', '/gallery/processed/food/tomato-bruschetta-mixed-greens-cafe.jpg'],
	['California Salmon Salad', '/gallery/processed/food/smoked-salmon-avocado-salad.jpg'],
	['Steak Salad', '/gallery/processed/food/steak-avocado-feta-salad.jpg'],
	['Grilled Chicken Pesto Sandwich', '/images/pesto-sandwich.webp'],
	['Smoked Salmon Toast', '/gallery/processed/food/smoked-salmon-toast-caesar-salad.jpg'],
	['Croque Monsieur', '/gallery/processed/food/croque-monsieur-fries-cafe-plate.jpg'],
	['Cheeseburger', '/gallery/processed/food/cheeseburger-fries-beside-playground.jpg'],
]

describe('menu product photos', () => {
	it.each(photos)('renders the existing photo for %s', (name, src) => {
		const item = EAT_MENU.flatMap(section => section.items).find(item => item.name === name)!
		const html = renderToStaticMarkup(createElement(MenuSections, {
			sections: [{ id: 'food', title: 'Food', items: [item] }], dict: en,
		}))
		expect(html).toContain('<img')
		expect(html).toContain(`alt="${name}"`)
		expect(html).toContain(encodeURIComponent(src))
		expect(existsSync(join(process.cwd(), 'public', src))).toBe(true)
	})

	it.each([{ sections: EAT_MENU }, { sections: KIDS_MENU }, { sections: DRINK_MENU }])('preserves every menu item and its details', ({ sections }) => {
		const html = renderToStaticMarkup(createElement(MenuSections, { sections, dict: en }))
		for (const item of sections.flatMap(section => section.items)) {
			const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll("'", '&#x27;').replaceAll('"', '&quot;')
			expect(html).toContain(escape(item.name))
			expect(html).toContain(escape(item.price))
			if (item.description) expect(html).toContain(escape(item.description))
			if (item.note) expect(html).toContain(escape(item.note))
		}
	})
})
