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
		expect(versailles?.details['alcoholic-drinks'].selection).toBe('Pick 1')
		expect(versailles?.details['alcoholic-drinks'].items).toContain('Mimosa')
		expect(versailles?.details['celebration-extras'].items).toEqual(['Decoration', 'Cake', 'Party favors'])
	})

	it('lists the available choices for every included food and drink selection', () => {
		const menuRowIds = [
			'appetizers',
			'entrees',
			'kids-entrees',
			'sides',
			'desserts',
			'drinks',
			'alcoholic-drinks',
		] as const

		for (const partyPackage of FULL_SPACE_PACKAGE_DETAILS) {
			for (const rowId of menuRowIds) {
				const cell = partyPackage.details[rowId]
				if (cell.selection.startsWith('Pick')) {
					expect(cell.items.length, `${partyPackage.id} ${rowId}`).toBeGreaterThan(0)
				}
			}
		}
	})
})
