import type { PackageDetailCategory, PackageDetailCell } from './private-room-package-details'

export type FullSpacePackageId = 'vendome' | 'champs-elysee' | 'versailles'

type FullSpaceDetailCategory =
	| PackageDetailCategory
	| 'event-time'
	| 'kids-entrees'
	| 'alcoholic-drinks'
	| 'celebration-extras'

export interface FullSpacePackageDetail {
	id: FullSpacePackageId
	name: string
	level: string
	summary: string
	details: Record<FullSpaceDetailCategory, PackageDetailCell>
}

export const FULL_SPACE_DETAIL_ROWS: Array<{ id: FullSpaceDetailCategory; label: string }> = [
	{ id: 'guest-pricing', label: 'Guest pricing' },
	{ id: 'event-time', label: 'Event time' },
	{ id: 'appetizers', label: 'Appetizers' },
	{ id: 'entrees', label: 'Adult entrées' },
	{ id: 'kids-entrees', label: "Kids' entrées" },
	{ id: 'sides', label: 'Sides' },
	{ id: 'desserts', label: 'Desserts' },
	{ id: 'drinks', label: 'Drinks' },
	{ id: 'alcoholic-drinks', label: 'Alcoholic drinks' },
	{ id: 'included', label: 'Always included' },
	{ id: 'celebration-extras', label: 'Celebration extras' },
	{ id: 'add-ons', label: 'Add-ons' },
]

const FULL_SPACE_ADD_ONS = ['Chinese food option', 'Dietary restrictions menu', 'Party rentals']

const VENDOME_APPETIZERS = ['Bruschetta', 'Caprese skewers', 'Mini quiches']
const CHAMPS_ELYSEE_APPETIZERS = [
	'Bruschetta',
	'Hummus crostini',
	'Caprese skewers',
	'Chicken skewers',
	'Mini quiches',
	'Smoked salmon crostini (+$1/adult)',
]
const VERSAILLES_APPETIZERS = [
	'Bruschetta',
	'Tapenade crostini',
	'Hummus crostini',
	'Caprese skewers',
	'Chicken skewers',
	'Mini quiches',
	'Smoked salmon crostini (+$1/adult)',
]

const VENDOME_ENTREES = [
	'Avocado toast',
	'Club sandwich',
	'Pesto sandwich',
	'Croque monsieur',
	'Pasta',
	'Pizza',
]
const PREMIUM_ENTREES = [
	'Italian toast',
	'Californian toast',
	'Avocado toast',
	'Club sandwich',
	'Pesto sandwich',
	'Pasta',
	'Pizza',
	'Croque monsieur',
	'Mini burger (+$1/adult)',
]

const KIDS_ENTREES = ['Pasta', 'Pizza', 'Chicken nuggets', 'Mozzarella sticks']
const VERSAILLES_KIDS_ENTREES = [...KIDS_ENTREES, 'Little sandwich — French ham & Swiss cheese']

const VENDOME_SIDES = ['French fries', 'Veggie salad', 'Caprese salad', 'Caesar salad']
const PREMIUM_SIDES = [...VENDOME_SIDES, 'Cobb salad']
const FULL_SPACE_DESSERTS = [
	'Fruit platter',
	'Mini baked pastries assortment',
	'Macarons assortment',
	'Mini cakes assortment',
]
const VENDOME_DRINKS = ['Lemonade jar', 'Iced tea jar', 'Hot coffee station', 'Hot tea station']
const PREMIUM_DRINKS = [
	'Lemonade jar',
	'Iced tea jar',
	'Flavored sparkling water',
	'Soda — Coke or Sprite',
	'Hot coffee station',
	'Hot tea station',
]
const ALCOHOLIC_DRINKS = [
	'Sparkling wine',
	'Mimosa',
	'Assorted beers',
	'Assorted hard seltzers',
	'Wine — red, white or rosé',
]

export const FULL_SPACE_PACKAGE_DETAILS: FullSpacePackageDetail[] = [
	{
		id: 'vendome',
		name: 'Vendôme Privé',
		level: 'Entry',
		summary: '1 appetizer · 2 entrées · 1 side · 1 dessert · 1 drink',
		details: {
			'guest-pricing': {
				selection: 'Up to 30 people',
				items: ['20 adults + 10 kids', '$28 per additional adult', '$25 per additional child', 'Maximum 88 guests', 'Babies under 1 are free'],
			},
			'event-time': { selection: '2 hours', items: ['Entire venue private and closed to the public'] },
			appetizers: { selection: 'Pick 1', items: VENDOME_APPETIZERS },
			entrees: { selection: 'Pick 2', items: VENDOME_ENTREES },
			'kids-entrees': { selection: 'Not included', items: [] },
			sides: { selection: 'Pick 1', items: VENDOME_SIDES },
			desserts: { selection: 'Pick 1', items: FULL_SPACE_DESSERTS },
			drinks: { selection: 'Pick 1', items: VENDOME_DRINKS },
			'alcoholic-drinks': { selection: 'Not included', items: [] },
			included: { selection: 'Included', items: ['Water fountain', 'Juice pouches for kids', 'Setup and cleanup'] },
			'celebration-extras': { selection: 'Not included', items: [] },
			'add-ons': { selection: 'Optional', items: FULL_SPACE_ADD_ONS },
		},
	},
	{
		id: 'champs-elysee',
		name: 'Champs-Élysée',
		level: 'Most popular',
		summary: "2 appetizers · 2 entrées · 1 kids' entrée · 2 sides · 2 desserts · 2 drinks",
		details: {
			'guest-pricing': {
				selection: 'Up to 40 people',
				items: ['25 adults + 15 kids', '$35 per additional adult', '$25 per additional child', 'Maximum 88 guests', 'Babies under 1 are free'],
			},
			'event-time': { selection: '2 hours', items: ['Entire venue private and closed to the public'] },
			appetizers: { selection: 'Pick 2', items: CHAMPS_ELYSEE_APPETIZERS },
			entrees: { selection: 'Pick 2', items: PREMIUM_ENTREES },
			'kids-entrees': { selection: 'Pick 1', items: KIDS_ENTREES },
			sides: { selection: 'Pick 2', items: PREMIUM_SIDES },
			desserts: { selection: 'Pick 2', items: FULL_SPACE_DESSERTS },
			drinks: { selection: 'Pick 2', items: PREMIUM_DRINKS },
			'alcoholic-drinks': { selection: 'Not included', items: [] },
			included: { selection: 'Included', items: ['Water fountain', 'Juice pouches for kids', 'Setup and cleanup'] },
			'celebration-extras': { selection: 'Not included', items: [] },
			'add-ons': { selection: 'Optional', items: FULL_SPACE_ADD_ONS },
		},
	},
	{
		id: 'versailles',
		name: 'Versailles',
		level: 'All-inclusive',
		summary: "3 appetizers · 2 entrées · 2 kids' entrées · 2 sides · 2 desserts · 2 drinks",
		details: {
			'guest-pricing': {
				selection: 'Up to 50 people',
				items: ['30 adults + 20 kids', '$45 per additional adult', '$30 per additional child', 'Maximum 88 guests', 'Babies under 1 are free'],
			},
			'event-time': { selection: '3 hours', items: ['Entire venue private and closed to the public'] },
			appetizers: { selection: 'Pick 3', items: VERSAILLES_APPETIZERS },
			entrees: { selection: 'Pick 2', items: PREMIUM_ENTREES },
			'kids-entrees': { selection: 'Pick 2', items: VERSAILLES_KIDS_ENTREES },
			sides: { selection: 'Pick 2', items: PREMIUM_SIDES },
			desserts: { selection: 'Pick 2', items: FULL_SPACE_DESSERTS },
			drinks: { selection: 'Pick 2', items: PREMIUM_DRINKS },
			'alcoholic-drinks': { selection: 'Pick 1', items: ALCOHOLIC_DRINKS },
			included: { selection: 'Included', items: ['Water fountain', 'Juice pouches for kids', 'Setup and cleanup'] },
			'celebration-extras': { selection: 'Included', items: ['Decoration', 'Cake', 'Party favors'] },
			'add-ons': { selection: 'Optional', items: FULL_SPACE_ADD_ONS },
		},
	},
]
