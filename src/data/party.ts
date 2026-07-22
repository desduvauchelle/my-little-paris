/** Party packages, process and policies (scraped 2026-07-20). */

export interface PartyPackage {
	id: string
	name: string
	tier: string
	weekday: string
	weekend: string
	capacity: string
	includes: string[]
	deposit: string[]
	badge?: 'popular' | 'all-inclusive'
}

/** One catering mode of a space: full catering, or venue-only (bring your own food). */
export interface PackageGroupVariant {
	description: string
	serviceFee: string
	extraTime?: string
	packages: PartyPackage[]
	addOns?: string[]
}

export interface PackageGroup {
	id: 'private-room' | 'full-space'
	emoji: string
	label: string
	catered: PackageGroupVariant
	rentalOnly: PackageGroupVariant
}

export const TIME_SLOTS = ['10:00 am – 12:00 pm', '1:00 pm – 3:00 pm', '4:00 pm – 6:00 pm'] as const

export const PACKAGE_GROUPS: PackageGroup[] = [
	{
		id: 'private-room',
		emoji: '🚪',
		label: 'Private Room',
		catered: {
			description: 'Your own party room next to the shared play space. Up to 30 guests max capacity.',
			serviceFee: '18% mandatory service fee added to all packages — covers gratuity for all staff. 3% credit card fee.',
			extraTime: 'Extra hour: $180 weekday / $280 weekend',
			addOns: ['Chinese Food option', 'Dietary Restrictions menu'],
			packages: [
			{
				id: 'opera',
				name: 'Opéra',
				tier: 'Private Room · Entry',
				weekday: '$460',
				weekend: '$590',
				capacity: 'Up to 20 guests (adults + kids) · +$20/extra guest · Max 30',
				includes: [
					'2-hour private party',
					'1 Entrée + 1 Side',
					'1 Drink + 1 Water Jar',
					'Juice pouches for kids',
					'Babies under 1 are free',
				],
				deposit: ['$200 deposit to book', '$350 deposit if booking less than 2 weeks before'],
			},
			{
				id: 'concorde',
				name: 'Concorde',
				tier: 'Private Room · Mid',
				weekday: '$560',
				weekend: '$690',
				capacity: 'Up to 20 guests (adults + kids) · +$25/extra guest · Max 30',
				includes: [
					'2-hour private party',
					'1 Appetizer + 1 Entrée + 1 Side',
					'1 Dessert + 1 Drink + 1 Water Jar',
					'Juice pouches for kids',
					'Babies under 1 are free',
				],
				deposit: ['$200 deposit to book', 'Second deposit: 50% due 10 days before'],
				badge: 'popular',
			},
			{
				id: 'saint-germain',
				name: 'Saint-Germain',
				tier: 'Private Room · Deluxe',
				weekday: '$860',
				weekend: '$990',
				capacity: 'Up to 20 guests (adults + kids) · +$30/extra guest · Max 30',
				includes: [
					'2-hour private party',
					'2 Appetizers + 2 Entrées + 2 Sides',
					'1 Dessert + 2 Drinks + 1 Water Jar',
					'Juice pouches for kids',
					'Babies under 1 are free',
				],
				deposit: ['$250 deposit to book', 'Second deposit: 50% due 10 days before'],
			},
			],
		},
		rentalOnly: {
			description: 'Your own party room, our tables and essentials — you bring the food, drinks and cake.',
			serviceFee: '12% mandatory service fee added — covers gratuity for all staff. No sales tax. 3% credit card fee.',
			packages: [
				{
					id: 'rental-private-room',
					name: 'Private Room',
					tier: 'Venue Rental · Private Room',
					weekday: '$350',
					weekend: '$450',
					capacity: 'Up to 20 guests · +$10/extra guest',
					includes: [
						'2-hour private room rental',
						'Adults table & kids table',
						'Table covers',
						'Cake cutting service',
						'Access to indoor play space',
						'🍽️ Food and drinks not included — bring your own food, drinks, dinnerware, napkins, cake, and decorations',
					],
					deposit: ['$150 deposit to book'],
				},
			],
		},
	},
	{
		id: 'full-space',
		emoji: '🏰',
		label: 'Full Space',
		catered: {
			description: 'The entire venue is exclusively yours, closed to the public. Ideal for 30+ guests or anyone wanting total privacy.',
			serviceFee: '15% mandatory service fee added to all packages — covers gratuity for all staff. 3% credit card fee.',
			extraTime: 'Extra hour: $300 weekday / $390 weekend',
			addOns: ['Chinese Food option', 'Dietary Restrictions menu', 'Party Rentals'],
			packages: [
			{
				id: 'vendome',
				name: 'Vendôme Privé',
				tier: 'Full Space · Entry',
				weekday: '$1,150',
				weekend: '$1,400',
				capacity: 'Up to 30 people (20 adults + 10 kids) · +$28/adult, $25/child · Max 88',
				includes: [
					'2-hour party · Entire venue private',
					'1 Appetizer + 2 Entrées + 1 Side',
					'1 Dessert + 1 Drink + 1 Water Fountain',
					'Juice pouches for kids',
					'Babies under 1 are free',
				],
				deposit: ['$350 deposit to book', 'Second deposit: 50% due 10 days before'],
			},
			{
				id: 'champs-elysee',
				name: 'Champs-Élysée',
				tier: 'Full Space · Mid',
				weekday: '$1,850',
				weekend: '$2,200',
				capacity: 'Up to 40 people (25 adults + 15 kids) · +$35/adult, $25/child · Max 88',
				includes: [
					'2-hour party · Entire venue private',
					"2 Appetizers + 2 Entrées + 1 Kids' Entrée",
					'2 Sides + 2 Desserts + 2 Drinks',
					'1 Water Fountain + juice pouches for kids',
					'Babies under 1 are free',
				],
				deposit: ['$550 deposit to book', 'Second deposit: 50% due 10 days before'],
				badge: 'popular',
			},
			{
				id: 'versailles',
				name: 'Versailles',
				tier: 'Full Space · All-Inclusive',
				weekday: '$4,500',
				weekend: '$5,000',
				capacity: 'Up to 50 people (30 adults + 20 kids) · +$45/adult, $30/child · Max 88',
				includes: [
					'3-hour party · Entire venue private',
					"3 Appetizers + 2 Entrées + 2 Kids' Entrées",
					'2 Sides + 2 Desserts + 2 Drinks + 1 Alcohol Drink',
					'1 Water Fountain + juice pouches for kids',
					'🎂 Decoration, cake & party favors included',
					'Babies under 1 are free',
				],
				deposit: ['$1,250 deposit to book', 'Second deposit: 50% due 10 days before'],
				badge: 'all-inclusive',
			},
			],
		},
		rentalOnly: {
			description: 'The entire venue exclusively yours, closed to the public — bring your own food, drinks and cake.',
			serviceFee: '12% mandatory service fee added — covers gratuity for all staff. No sales tax. 3% credit card fee.',
			packages: [
				{
					id: 'rental-entire-venue',
					name: 'Entire Venue',
					tier: 'Venue Rental · Full Space',
					weekday: '$850',
					weekend: '$1,000',
					capacity: 'Up to 40 guests · +$10/extra guest',
					includes: [
						'2-hour exclusive venue rental',
						'Entire venue closed to the public',
						'Adults table & kids table',
						'Table covers',
						'Cake cutting service',
						'Access to indoor play space',
						'🍽️ Food and drinks not included — bring your own food, drinks, dinnerware, napkins, cake, and decorations',
					],
					deposit: ['$300 deposit to book'],
				},
			],
		},
	},
]

export const PARTY_PROCESS = [
	{
		title: 'Submit Your Request',
		body: 'Fill out our inquiry form with your preferred date, time, and package. Takes 2 minutes.',
	},
	{
		title: 'We Confirm & Customize',
		body: "We'll follow up by text or email to confirm availability and discuss any special requests.",
	},
	{
		title: 'Pay Deposit to Lock In',
		body: 'A deposit secures your date and time. The remaining balance is due closer to the event.',
	},
	{
		title: 'Show Up & Celebrate',
		body: 'We handle setup and cleanup. You bring the birthday kid and enjoy every moment.',
	},
] as const

export const PARTY_POLICIES = [
	{
		title: 'Deposits & Cancellation Policy',
		items: [
			'A non-refundable deposit is required to secure your date and time.',
			'A second deposit of 50% of the party total is due 10 days before your event.',
			'The remaining balance can be paid on the day of the party.',
			"Deposits are not refundable if you cancel. You may postpone with at least 30 days' notice at no extra charge. Less than 30 days' notice requires a new deposit.",
		],
	},
	{
		title: 'Timing & Extra Time',
		items: [
			'You may arrive 30 minutes before your party time to decorate.',
			'Cleanup begins 15–20 minutes before the party ends.',
			'Private Room extra time: $150/30 min or $280/hr.',
			'Full Space extra time: $200/30 min or $390/hr.',
			'Holidays and Mondays are billed at the weekend rate.',
		],
	},
	{
		title: 'Rules & Restrictions',
		items: [
			'No confetti (including confetti balloons, poppers, cannons, table confetti), glitter, or piñatas.',
			'Socks are required in the play space and private room.',
			'Food and drinks are not allowed in the play space.',
			'A waiver must be signed by all families — sign yours online to save time on the day.',
			'Babies under 12 months are free.',
		],
	},
	{
		title: 'Fees & Payment',
		items: [
			'Private Room packages: 18% mandatory service fee + sales tax (covers gratuity for all staff).',
			'Full Space packages: 15% mandatory service fee + sales tax.',
			'Venue Rental Only: 12% mandatory service fee.',
			'A 3% convenience fee is added for payments by credit card.',
		],
	},
] as const

/** Options for the party-inquiry form's package select. */
export const PACKAGE_FORM_OPTIONS = [
	'Opéra Private Room Package ($460 weekday / $590 weekend)',
	'Concorde Private Room Package ($560 weekday / $690 weekend)',
	'Saint-Germain Private Room Package ($860 weekday / $990 weekend)',
	'Vendôme Privé Full Space Package ($1,150 weekday / $1,400 weekend)',
	'Champs-Élysée Full Space Package ($1,850 weekday / $2,200 weekend)',
	'Versailles Full Space All-Inclusive Package ($4,500 weekday / $5,000 weekend)',
	'Venue Rental — Private Room ($350 weekday / $450 weekend)',
	'Venue Rental — Entire Venue ($850 weekday / $1,000 weekend)',
	'Other',
	'Not decided yet',
] as const
