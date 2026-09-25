import { BOOKING_HOSTS, LINKS } from '@/data/site'

/**
 * Turns a clicked link into the GA4 event it should report, or null for an
 * ordinary link. Pure so it can be unit-tested against the real hrefs in
 * site.ts; ClickTracker does the DOM listening.
 *
 * Booking, phone and email clicks mirror what the Growth SDK already records
 * for Lucy (classifyContactAnchor), so both dashboards count the same things.
 * The rest (text, directions, waiver, social) are GA-only: the SDK has no
 * click kind for them.
 */

export type ClickEvent = {
	name: string
	params: Record<string, string>
}

const SOCIAL_HOSTS: Record<string, string> = {
	'facebook.com': 'facebook',
	'instagram.com': 'instagram',
	'yelp.com': 'yelp',
}

const MAP_HOSTS = ['maps.app.goo.gl', 'goo.gl', 'maps.google.com', 'google.com']

function hostMatches(host: string, pattern: string) {
	return host === pattern || host.endsWith(`.${pattern}`)
}

/** Which Acuity page the booking link opens, so GA can split reservations from memberships. */
function bookingType(href: string) {
	if (href === LINKS.reservations) return 'reservation'
	if (href === LINKS.memberships) return 'membership'
	if (href === LINKS.events) return 'event'
	return 'other'
}

export function classifyClick(rawHref: string): ClickEvent | null {
	const href = rawHref.trim()
	if (/^mailto:/i.test(href)) return { name: 'click_email', params: { link_url: href.split('?')[0] } }
	if (/^tel:/i.test(href)) return { name: 'click_phone', params: { link_url: href } }
	if (/^sms:/i.test(href)) return { name: 'click_text', params: { link_url: href } }
	if (!/^https?:\/\//i.test(href)) return null

	let url: URL
	try {
		url = new URL(href)
	} catch {
		return null
	}
	const host = url.hostname.toLowerCase()

	if (BOOKING_HOSTS.some((p) => hostMatches(host, p))) {
		return { name: 'click_booking', params: { link_url: href, booking_type: bookingType(href) } }
	}
	if (href === LINKS.waiver) return { name: 'click_waiver', params: { link_url: href } }
	if (href === LINKS.googleReview || href === LINKS.yelpReview) return null // ReviewFunnel tracks these itself
	if (href === LINKS.directions || href === LINKS.hoursGoogle || (MAP_HOSTS.some((p) => hostMatches(host, p)) && /maps|goo\.gl/.test(href))) {
		return { name: 'click_directions', params: { link_url: href } }
	}
	for (const [pattern, platform] of Object.entries(SOCIAL_HOSTS)) {
		if (hostMatches(host, pattern)) return { name: 'click_social', params: { link_url: href, platform } }
	}
	return null
}
