import { describe, expect, it } from 'vitest'
import { generateMetadata as homeMetadata } from './[locale]/page'
import { generateMetadata as blogMetadata } from './[locale]/blog/page'
import { generateMetadata as contactMetadata } from './[locale]/contact/page'
import { generateMetadata as drinkMetadata } from './[locale]/drink/page'
import { generateMetadata as eventsMetadata } from './[locale]/events/page'
import { generateMetadata as kidsMenuMetadata } from './[locale]/kidsmenu/page'
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
		title: 'Indoor Playground San Gabriel | My Little Paris Café & Play',
		description:
			'Montessori-inspired indoor playground in San Gabriel, CA for kids 0-7. Two-hour Eat & Play sessions, 10-visit passes and monthly memberships.',
	},
	{
		path: '/events',
		generateMetadata: eventsMetadata,
		title: 'Family Events in San Gabriel | My Little Paris Café & Play',
		description:
			"Character meet and greets, tea parties and seasonal celebrations for kids in San Gabriel, CA. See what's coming up and reserve your family's spot.",
	},
	{
		path: '/our-story',
		generateMetadata: storyMetadata,
		title: 'About My Little Paris | Family-Owned Café in San Gabriel',
		description:
			'Meet the French family behind My Little Paris, inspired by a Taiwan café and now serving French food, pastries and family playtime in San Gabriel.',
	},
	{
		path: '/',
		generateMetadata: homeMetadata,
		title: 'My Little Paris Café & Play',
		description:
			'French café and indoor playground in San Gabriel, CA. Two-hour Eat & Play sessions, all-inclusive birthday parties, and real food for grown-ups.',
	},
	{
		path: '/blog',
		generateMetadata: blogMetadata,
		title: 'Blog | My Little Paris Café & Play',
		description:
			'News, events and little stories from My Little Paris Café & Play in San Gabriel, CA — new dishes, upcoming family events and play space tips.',
	},
	{
		path: '/contact',
		generateMetadata: contactMetadata,
		title: 'Contact Us | My Little Paris Café & Play',
		description:
			'Questions about play sessions, birthday parties or the menu? Call, email or visit My Little Paris Café & Play at 416 E. Las Tunas Dr, San Gabriel.',
	},
	{
		path: '/kidsmenu',
		generateMetadata: kidsMenuMetadata,
		title: "Kid's Menu | My Little Paris Café & Play",
		description:
			'Menu for children 10 and under: nuggets, mac & cheese, mini burgers, macarons, and the My Little Combo with a 2-hour play pass in San Gabriel, CA.',
	},
	{
		path: '/drink',
		generateMetadata: drinkMetadata,
		title: 'Drink | My Little Paris Café & Play',
		description:
			'Coffee, Mighty Leaf tea, French wine by the glass, beer, mimosas and Kir Royal — the full drinks list at My Little Paris Café & Play, San Gabriel.',
	},
] as const

describe('page search metadata', () => {
	for (const page of pages) {
		it(`uses intent-led metadata for ${page.path}`, async () => {
			const metadata = await page.generateMetadata({
				params: Promise.resolve({ locale: 'en' }),
			})

			expect(metadata.title).toEqual({ absolute: page.title })
			expect(metadata.description).toBe(page.description)
			// Length limits are absolute — no per-page opt-out. Titles past ~65
			// chars and descriptions outside 120-160 get truncated or rewritten
			// by Google, which is what the site crawler flags as title_length /
			// meta_description_length.
			expect(page.title.length).toBeLessThanOrEqual(65)
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
