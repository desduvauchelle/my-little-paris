/**
 * Business identity & contact facts for My Little Paris Café & Play.
 * Single source of truth for the static marketing pages.
 *
 * Sourced from the live site (scraped 2026-07-20). The Growth Engine
 * business config (useBusinessConfig) can override hours/contact at
 * runtime once the Brain backend is connected.
 */

export const BUSINESS = {
	name: 'My Little Paris Café & Play',
	shortName: 'My Little Paris',
	tagline: 'Café & Play',
	city: 'San Gabriel, CA',
	// ⚠️ The live site shows two addresses: the site-wide footer says
	// "416 E. Las Tunas Drive, Unit C" while the /party page footer says
	// "232 W. Valley Blvd Suite 108". Using the site-wide one until the
	// client confirms.
	address: {
		street: '416 E. Las Tunas Drive, Unit C',
		city: 'San Gabriel',
		state: 'CA',
		zip: '91776',
	},
	phoneDisplay: '626-657-8811',
	phoneHref: 'tel:+16266578811',
	smsHref: 'sms:+16266578811',
	email: 'hello@my-little-paris.com',
} as const

export const LINKS = {
	reservations: 'https://mylittleparis.as.me/',
	waiver: 'https://waiver.smartwaiver.com/v/mylittleparis/',
	directions: 'https://maps.app.goo.gl/Hx6W7bYgCP7UjneV9',
	hoursGoogle: 'https://goo.gl/maps/xs235PD7Z3v4p9M66',
	facebook: 'https://www.facebook.com/mylittlepariscafeplay',
	instagram: 'https://www.instagram.com/mylittlepariscafeplay/',
	yelp: 'https://www.yelp.com/biz/my-little-paris-cafe-and-play-san-gabriel',
	acuityEmbed:
		'https://app.acuityscheduling.com/schedule.php?owner=22945936&ref=embedded_csp',
} as const

/** Cities called out on the party page for local SEO. */
export const SERVICE_AREA = [
	'Alhambra',
	'Arcadia',
	'Pasadena',
	'Monterey Park',
	'San Marino',
	'Temple City',
	'Rosemead',
	'El Monte',
	'Baldwin Park',
] as const
