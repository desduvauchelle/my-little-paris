import { describe, expect, it } from 'vitest'
import { PRIVATE_ROOM_PACKAGE_DETAILS } from './private-room-package-details'

describe('private-room package comparison data', () => {
	it('uses the current Opéra pizza description', () => {
		const opera = PRIVATE_ROOM_PACKAGE_DETAILS.find((partyPackage) => partyPackage.id === 'opera')

		expect(opera?.details.entrees.items).toContain('Pizza – cheese or pepperoni (12-inch)')
		expect(opera?.details.entrees.items.join(' ')).not.toContain('five 12-inch')
	})

	it('uses the current Saint-Germain appetizer choices', () => {
		const saintGermain = PRIVATE_ROOM_PACKAGE_DETAILS.find(
			(partyPackage) => partyPackage.id === 'saint-germain',
		)

		expect(saintGermain?.details.appetizers.items).toEqual([
			'Bruschetta',
			'Caprese skewers',
			'Chicken skewers',
			'Mini quiches',
		])
	})
})
