import { describe, expect, it } from 'vitest'
import { classifyContactAnchor } from '@growth-engine/sdk-client'
import { BOOKING_HOSTS, BUSINESS, LINKS } from './site'

/**
 * Every booking on this site happens on somebody else's domain: the Eat & Play
 * calendar and the membership catalog are Acuity, so GA4 records a visitor who
 * booked as a bounce and can never see the booking itself. The one signal we do
 * get is the click that sent them there, which the Growth SDK records as a
 * `booking` conversion — but only for hosts listed in BOOKING_HOSTS.
 *
 * These tests run the SDK's real classifier over the real hrefs in site.ts, so
 * editing a link to a new host (or adding a booking destination and forgetting
 * BOOKING_HOSTS) fails here instead of silently going unmeasured for months.
 */
const hosts = [...BOOKING_HOSTS]

function anchor(href: string) {
	// The classifier only reads the href attribute and data-rs-booking.
	return {
		getAttribute: (name: string) => (name === 'href' ? href : null),
		hasAttribute: () => false,
		href,
	} as unknown as HTMLAnchorElement
}

describe('BOOKING_HOSTS covers every booking destination', () => {
	it('counts the Eat & Play reservation calendar as a booking', () => {
		expect(classifyContactAnchor(anchor(LINKS.reservations), hosts)).toBe('booking')
	})

	it('counts the membership catalog as a booking', () => {
		expect(classifyContactAnchor(anchor(LINKS.memberships), hosts)).toBe('booking')
	})

	it('counts the events calendar as a booking when opened as a link', () => {
		// It is embedded as an iframe today, which the click listener cannot see.
		// Listed so that linking to it directly is measured from day one.
		expect(classifyContactAnchor(anchor(LINKS.events), hosts)).toBe('booking')
	})

	it('matches Acuity subdomains, not just the bare host', () => {
		expect(classifyContactAnchor(anchor('https://app.acuityscheduling.com/catalog/x'), hosts)).toBe(
			'booking',
		)
	})
})

describe('phone and email clicks classify without configuration', () => {
	it('records the phone number as a phone click', () => {
		expect(classifyContactAnchor(anchor(BUSINESS.phoneHref), hosts)).toBe('phone')
	})

	it('records the contact address as an email click', () => {
		expect(classifyContactAnchor(anchor(`mailto:${BUSINESS.email}`), hosts)).toBe('email')
	})

	it('records the party form mailto, subject and body included', () => {
		const href = `mailto:${BUSINESS.email}?subject=Party%20inquiry&body=Hi`
		expect(classifyContactAnchor(anchor(href), hosts)).toBe('email')
	})
})

describe('what is deliberately not counted', () => {
	// Documented so a future reader knows these are gaps, not oversights: the
	// platform's click kinds are phone | email | booking, and mislabelling
	// either of these as a booking would inflate the booking metric.
	it('does not count the text-message links (no sms kind exists yet)', () => {
		expect(classifyContactAnchor(anchor(BUSINESS.smsHref), hosts)).toBeNull()
	})

	it('does not count directions links', () => {
		expect(classifyContactAnchor(anchor(LINKS.directions), hosts)).toBeNull()
	})

	it('does not count the waiver, which is a prerequisite and not a booking', () => {
		expect(classifyContactAnchor(anchor(LINKS.waiver), hosts)).toBeNull()
	})

	it('does not count ordinary internal or social links', () => {
		expect(classifyContactAnchor(anchor('/reservations'), hosts)).toBeNull()
		expect(classifyContactAnchor(anchor(LINKS.instagram), hosts)).toBeNull()
	})
})
