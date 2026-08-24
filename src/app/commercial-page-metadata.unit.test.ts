import { describe, expect, it } from 'vitest'
import { generateMetadata as eventsMetadata } from './[locale]/events/page'
import { generateMetadata as menuMetadata } from './[locale]/menu/page'
import { generateMetadata as partyMetadata } from './[locale]/party/page'
import { generateMetadata as reservationsMetadata } from './[locale]/reservations/page'
import { generateMetadata as playMetadata } from './[locale]/play/page'
import { generateMetadata as storyMetadata } from './[locale]/our-story/page'

const pages = [
	{
		path: '/menu',
		generateMetadata: menuMetadata,
		title: 'French Café Menu in San Gabriel | Croques, Salads & Wine',
		description:
			'Our San Gabriel café menu: croque monsieur, quiche Lorraine, fresh salads, pastries, espresso, beer and wine. Real food while your kids play. See the full menu.',
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
		title: 'Indoor Playground San Gabriel | Eat & Play Sessions & Memberships',
		description:
			'Montessori-inspired indoor playground in San Gabriel, CA for kids 0-7. Two-hour Eat & Play sessions, 10-visit passes, and monthly memberships. Reserve online.',
	},
	{
		path: '/events',
		generateMetadata: eventsMetadata,
		title: 'Kids Events & Parties in San Gabriel | My Little Paris Café & Play',
		description:
			'Upcoming family events, holiday celebrations, and special activities at My Little Paris Café & Play in San Gabriel, CA. Check the calendar and reserve your spot.',
		maxTitleLength: 70,
		maxDescriptionLength: 165,
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
			const maxTitleLength = 'maxTitleLength' in page ? page.maxTitleLength : 65
			const maxDescriptionLength = 'maxDescriptionLength' in page ? page.maxDescriptionLength : 160

			expect(page.title.length).toBeLessThanOrEqual(maxTitleLength)
			expect(page.description.length).toBeGreaterThanOrEqual(120)
			expect(page.description.length).toBeLessThanOrEqual(maxDescriptionLength)
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
