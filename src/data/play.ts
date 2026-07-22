/** Play page pricing & policies (scraped 2026-07-20). */

export const ADMISSION = {
	child: '$12.99',
	sibling: '$10.99',
	babies: 'Free under 1 year old',
	adultRule: 'Each adult orders a minimum of one entrée from our restaurant',
	happyHour: {
		when: 'Weekdays, arrive between 2:00 pm – 3:30 pm',
		deal: '$10 minimum order per adult instead',
	},
	sessionLength: '2-hour Eat & Play sessions',
} as const

export const PLAY_PASS = {
	price: '$110',
	visits: 10,
	perks: [
		'One punch per paid visit per day',
		'Shareable with family members (punch card holder must be present)',
		'Valid for 2-hour Eat & Play sessions',
		'10% off food on your 10th visit, up to $30 off',
		'Valid for 1 year from the date of purchase',
	],
	thingsToKnow: [
		'Punch card must be presented at time of visit',
		'Minimum food order required per adult',
		'Lost or stolen cards will not be replaced',
		'Card is non-refundable, non-replaceable, and not redeemable for cash',
		'Expires 1 year after purchase',
	],
} as const

export const MEMBERSHIP = {
	pricing: [
		{ label: '1 Child', price: '$50/month' },
		{ label: '2 Children', price: '$80/month' },
		{ label: '3 Children', price: '$100/month' },
		{ label: 'Each extra child', price: '+$20/month' },
	],
	includes: [
		'Unlimited visits during regular business hours',
		'10% off food for the member child and the caretaker or parent',
		'No food purchase required on weekdays before 4PM for the member and the caretaker',
		'Free party add-on when you book a birthday party',
		'Exclusive pricing on select special events',
	],
	foodPolicy: [
		'Weekdays before 4PM: no food purchase required for member and one accompanying adult',
		'Weekdays after 4PM & weekends: minimum purchase of one entrée per adult required',
		'10% off food for the member child and the caretaker or parent',
	],
	finePrint: [
		"Memberships are billed monthly and may be canceled with 10 days' notice before your next billing cycle",
		'Membership is non-transferable and valid only for the registered child(ren)',
		'Members may stay for up to 2 hours per visit; extended playtime of up to 3 hours may be allowed on weekdays if space and scheduling permit (please ask our staff)',
		'Children must be supervised by a parent or guardian at all times',
		'Discounts do not apply to specials, catering, or events',
		'Free party add-on is available after 2 active months of membership and must take place while the membership is still active',
	],
} as const

export const PLAYGROUND_POLICY = [
	'Socks are mandatory in the play space (except for babies under 16 months). Non-slip socks are recommended for children.',
	"Kids must be under parent/caregiver's supervision at all times.",
	'Eating and drinking are not allowed in the play space.',
	'Do not feed your child over the low walls. Children should eat at the dining table.',
	'No running in the play space.',
	'No throwing toys in the play space.',
	'Do not change your baby in the playground. There are baby changing stations in the restrooms.',
	'A waiver must be signed before entering the play space.',
] as const
