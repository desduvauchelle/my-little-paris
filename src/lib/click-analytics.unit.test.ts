import { describe, expect, it } from 'vitest'
import { BUSINESS, LINKS } from '@/data/site'
import { classifyClick } from './click-analytics'

describe('classifyClick', () => {
	it('tracks the Acuity links as bookings, split by type', () => {
		expect(classifyClick(LINKS.reservations)).toEqual({
			name: 'click_booking',
			params: { link_url: LINKS.reservations, booking_type: 'reservation' },
		})
		expect(classifyClick(LINKS.memberships)?.params.booking_type).toBe('membership')
		expect(classifyClick(LINKS.events)?.params.booking_type).toBe('event')
	})

	it('tracks email, phone and text links', () => {
		expect(classifyClick(`mailto:${BUSINESS.email}?subject=Hi`)).toEqual({
			name: 'click_email',
			params: { link_url: `mailto:${BUSINESS.email}` },
		})
		expect(classifyClick(BUSINESS.phoneHref)?.name).toBe('click_phone')
		expect(classifyClick(BUSINESS.smsHref)?.name).toBe('click_text')
	})

	it('tracks directions, waiver and social links', () => {
		expect(classifyClick(LINKS.directions)?.name).toBe('click_directions')
		expect(classifyClick(LINKS.hoursGoogle)?.name).toBe('click_directions')
		expect(classifyClick(LINKS.waiver)?.name).toBe('click_waiver')
		expect(classifyClick(LINKS.instagram)).toEqual({
			name: 'click_social',
			params: { link_url: LINKS.instagram, platform: 'instagram' },
		})
		expect(classifyClick(LINKS.facebook)?.params.platform).toBe('facebook')
		expect(classifyClick(LINKS.yelp)?.params.platform).toBe('yelp')
	})

	it('leaves review links to ReviewFunnel and ignores ordinary links', () => {
		expect(classifyClick(LINKS.googleReview)).toBeNull()
		expect(classifyClick(LINKS.yelpReview)).toBeNull()
		expect(classifyClick('/reservations')).toBeNull()
		expect(classifyClick('#top')).toBeNull()
		expect(classifyClick('https://example.com')).toBeNull()
	})
})
