export type PrivateRoomPackageId = 'opera' | 'concorde' | 'saint-germain'

export type PackageDetailCategory =
	| 'guest-pricing'
	| 'appetizers'
	| 'entrees'
	| 'sides'
	| 'desserts'
	| 'drinks'
	| 'included'
	| 'add-ons'

export interface PackageDetailCell {
	selection: string
	items: string[]
}

export interface PrivateRoomPackageDetail {
	id: PrivateRoomPackageId
	name: string
	level: string
	summary: string
	details: Record<PackageDetailCategory, PackageDetailCell>
}

export const PRIVATE_ROOM_DETAIL_ROWS: Array<{ id: PackageDetailCategory; label: string }> = [
	{ id: 'guest-pricing', label: 'Guest pricing' },
	{ id: 'appetizers', label: 'Appetizers' },
	{ id: 'entrees', label: 'Entrées' },
	{ id: 'sides', label: 'Sides' },
	{ id: 'desserts', label: 'Desserts' },
	{ id: 'drinks', label: 'Drinks' },
	{ id: 'included', label: 'Always included' },
	{ id: 'add-ons', label: 'Add-ons' },
]

export const PRIVATE_ROOM_PACKAGE_DETAILS: PrivateRoomPackageDetail[] = [
	{
		id: 'opera',
		name: 'Opéra',
		level: 'Basic',
		summary: '1 entrée · 1 side · 1 drink',
		details: {
			'guest-pricing': {
				selection: 'Up to 20 guests',
				items: ['$20 per additional guest', 'Babies under 1 are free'],
			},
			appetizers: { selection: 'Not included', items: [] },
			entrees: {
				selection: 'Pick 1',
				items: ['Pasta - butter, marinara, pesto or cream', 'Pizza - five 12-inch cheese or pepperoni pizzas'],
			},
			sides: {
				selection: 'Pick 1',
				items: ['French fries', 'Veggie salad', 'Caesar salad'],
			},
			desserts: { selection: 'Not included', items: [] },
			drinks: {
				selection: 'Pick 1',
				items: ['Lemonade jar', 'Iced tea jar'],
			},
			included: {
				selection: 'Included',
				items: ['2-hour private room', 'Tableware and table cover', 'Water jar', 'Juice pouches for kids'],
			},
			'add-ons': {
				selection: 'Optional',
				items: ['Coffee station +$50', 'Tea station +$50'],
			},
		},
	},
	{
		id: 'concorde',
		name: 'Concorde',
		level: 'Deluxe',
		summary: '1 appetizer · 1 entrée · 1 side · 1 dessert · 1 drink',
		details: {
			'guest-pricing': {
				selection: 'Up to 20 guests',
				items: ['$25 per additional guest', 'Babies under 1 are free'],
			},
			appetizers: {
				selection: 'Pick 1',
				items: ['Bruschetta', 'Caprese skewers', 'Chicken skewers', 'Mini quiches'],
			},
			entrees: {
				selection: 'Pick 1',
				items: ['Avocado toast', 'Pesto sandwich', 'Croque monsieur', 'Pasta', 'Pizza', 'Chicken nuggets'],
			},
			sides: {
				selection: 'Pick 1',
				items: ['French fries', 'Veggie salad', 'Caprese salad', 'Caesar salad'],
			},
			desserts: {
				selection: 'Pick 1',
				items: ['Mini baked pastries', 'Macarons'],
			},
			drinks: {
				selection: 'Pick 1',
				items: ['Lemonade jar', 'Iced tea jar'],
			},
			included: {
				selection: 'Included',
				items: ['2-hour private room', 'Tableware and table cover', 'Water jar', 'Juice pouches for kids'],
			},
			'add-ons': {
				selection: 'Optional',
				items: ['Coffee station +$50', 'Tea station +$50'],
			},
		},
	},
	{
		id: 'saint-germain',
		name: 'Saint-Germain',
		level: 'Premium',
		summary: '2 appetizers · 2 entrées · 2 sides · 1 dessert · 2 drinks',
		details: {
			'guest-pricing': {
				selection: 'Up to 20 guests',
				items: ['$30 per additional guest', 'Babies under 1 are free'],
			},
			appetizers: {
				selection: 'Pick 2',
				items: ['Bruschetta', 'Hummus crostini', 'Smoked salmon crostini', 'Caprese skewers', 'Chicken skewers', 'Mini quiches'],
			},
			entrees: {
				selection: 'Pick 2',
				items: [
					'Club sandwich',
					'Pesto sandwich',
					'Italian toast',
					'Avocado toast',
					'Californian toast',
					'Croque monsieur',
					'Mini burger',
					'Pasta',
					'Pizza',
					'Chicken nuggets',
				],
			},
			sides: {
				selection: 'Pick 2',
				items: ['French fries', 'Veggie salad', 'Caprese salad', 'Caesar salad', 'Cobb salad'],
			},
			desserts: {
				selection: 'Pick 1',
				items: ['Macarons assortment', 'Mini baked pastries assortment', 'Mini cakes assortment'],
			},
			drinks: {
				selection: 'Pick 2',
				items: ['Lemonade jar', 'Iced tea jar', 'Flavored sparkling water', 'Soda cans', 'Hot coffee station', 'Hot tea station'],
			},
			included: {
				selection: 'Included',
				items: ['2-hour private room', 'Tableware and table cover', 'Water jar', 'Juice pouches for kids'],
			},
			'add-ons': { selection: 'No separate add-ons', items: [] },
		},
	},
]
