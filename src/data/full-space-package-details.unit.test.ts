import { describe, expect, it } from 'vitest'
import {
	FULL_SPACE_DETAIL_ROWS,
	FULL_SPACE_PACKAGE_DETAILS,
} from './full-space-package-details'

describe('full-space package comparison data', () => {
	it('covers all three catered full-space packages', () => {
		expect(FULL_SPACE_PACKAGE_DETAILS.map((partyPackage) => partyPackage.id)).toEqual([
			'vendome',
			'champs-elysee',
			'versailles',
		])
	})

	it('provides every comparison row for every package', () => {
		const rowIds = FULL_SPACE_DETAIL_ROWS.map((row) => row.id)

		for (const partyPackage of FULL_SPACE_PACKAGE_DETAILS) {
			expect(Object.keys(partyPackage.details)).toEqual(expect.arrayContaining(rowIds))
			expect(Object.keys(partyPackage.details)).toHaveLength(rowIds.length)
		}
	})

	it('captures the all-inclusive differences for Versailles', () => {
		const versailles = FULL_SPACE_PACKAGE_DETAILS.find((partyPackage) => partyPackage.id === 'versailles')

		expect(versailles?.details['event-time'].selection).toBe('3 hours')
		expect(versailles?.details.drinks.items).toContain('1 alcoholic drink included')
		expect(versailles?.details['celebration-extras'].items).toEqual(['Decoration', 'Cake', 'Party favors'])
	})
})
