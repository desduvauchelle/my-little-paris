import { describe, expect, it } from 'vitest'
import { generateMetadata as menuMetadata } from './[locale]/menu/page'
import { generateMetadata as partyMetadata } from './[locale]/party/page'
import { generateMetadata as reservationsMetadata } from './[locale]/reservations/page'
import { generateMetadata as playMetadata } from './[locale]/play/page'
import { generateMetadata as storyMetadata } from './[locale]/our-story/page'

const pages = [
	{
		path: '/menu',
		generateMetadata: menuMetadata,
		title: 'Café Menu & Kids Menu | My Little Paris San Gabriel',
		description:
			'French café menu with croques, salads, pastries, coffee, beer and wine, plus a kids menu. Every adult orders one entrée during Eat & Play sessions.',
	},
	{
		path: '/party',
		generateMetadata: partyMetadata,
		title: 'Kids Birthday Parties | My Little Paris San Gabriel',
		description:
			'Plan a kids birthday party with indoor play, private room or full venue options, catering, setup and cleanup at My Little Paris in San Gabriel.',
	},
	{
		path: '/reservations',
		generateMetadata: reservationsMetadata,
		title: 'Eat & Play Reservations | My Little Paris San Gabriel',
		description:
			'Reserve a 2-hour Eat & Play session at My Little Paris in San Gabriel. Book online for up to 6 guests; contact us for groups of 7 or more.',
	},
	{
		path: '/play',
		generateMetadata: playMetadata,
		title: 'Indoor Playground & Open Play | My Little Paris San Gabriel',
		description:
			'Explore 2-hour Eat & Play sessions, indoor playground admission, play passes and memberships for ages 0–7 at My Little Paris in San Gabriel.',
	},
	{
		path: '/our-story',
		generateMetadata: storyMetadata,
		title: 'About My Little Paris | Family-Owned Café in San Gabriel',
		description:
			'Meet the French family behind My Little Paris, inspired by a Taiwan café and now serving French food, pastries and family playtime in San Gabriel.',
	},
] as const

describe('commercial page search metadata', () => {
	for (const page of pages) {
		it(`uses intent-led metadata for ${page.path}`, async () => {
			const metadata = await page.generateMetadata({
				params: Promise.resolve({ locale: 'en' }),
			})

			expect(metadata.title).toEqual({ absolute: page.title })
			expect(metadata.description).toBe(page.description)
			expect(page.title.length).toBeLessThanOrEqual(60)
			expect(page.description.length).toBeGreaterThanOrEqual(120)
			expect(page.description.length).toBeLessThanOrEqual(160)
			expect(metadata.openGraph).toMatchObject({
				title: page.title,
				description: page.description,
			})
			expect(metadata.twitter).toMatchObject({
				title: page.title,
				description: page.description,
			})
		})
	}
})
