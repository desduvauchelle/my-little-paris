import { describe, expect, it } from 'vitest'
import { PACKAGE_GROUPS, PARTY_POLICIES, PARTY_PROCESS } from './party'

describe('party pricing data', () => {
	it('uses the current deposit for every Private Room package', () => {
		const privateRoom = PACKAGE_GROUPS.find((group) => group.id === 'private-room')
		const packages = [
			...(privateRoom?.catered.packages ?? []),
			...(privateRoom?.rentalOnly.packages ?? []),
		]

		expect(packages).not.toHaveLength(0)
		expect(packages.every((partyPackage) => partyPackage.deposit === '$200')).toBe(true)
	})

	it('uses the package-specific Full Space deposits', () => {
		const fullSpace = PACKAGE_GROUPS.find((group) => group.id === 'full-space')
		const deposits = Object.fromEntries(
			(fullSpace?.catered.packages ?? []).map((partyPackage) => [partyPackage.id, partyPackage.deposit]),
		)

		expect(deposits).toEqual({
			vendome: '$400',
			'champs-elysee': '$400',
			versailles: '$1,000',
		})
	})

	it('uses the current weekday and weekend Full Space extra-time fees', () => {
		const fullSpace = PACKAGE_GROUPS.find((group) => group.id === 'full-space')

		expect(fullSpace?.catered.extraTime).toBe(
			'Extra time: 30 minutes $160 weekday / $220 weekend · 1 hour $300 weekday / $400 weekend',
		)
		expect(PARTY_POLICIES.flatMap((policy) => policy.items)).toContain(
			'Full Space extra time: 30 minutes $160 weekday / $220 weekend; 1 hour $300 weekday / $400 weekend.',
		)
	})

	it('keeps general booking copy accurate for packages with different deposits', () => {
		const processCopy = PARTY_PROCESS.flatMap((step) => [step.title, step.body]).join(' ')
		const policyCopy = PARTY_POLICIES.flatMap((policy) => [policy.title, ...policy.items]).join(' ')

		expect(processCopy).not.toContain('$200 deposit')
		expect(policyCopy).not.toContain('$200 deposit')
	})
})
