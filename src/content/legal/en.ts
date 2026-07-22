import type { LegalContent } from './types'

/**
 * English is the authoritative version of these documents (see
 * `translationNote` in the other locales).
 *
 * ⚠️ Drafted as a starting point, not as legal advice. A California attorney
 * should review before launch — in particular the liability, waiver and
 * children's-information sections, which are the ones that actually matter for
 * a business that supervises other people's kids and serves food.
 */
const en: LegalContent = {
	lastUpdatedLabel: 'Last updated',

	// ─── Legal Notice / Terms of Service ──────────────────────────────────
	terms: {
		summary:
			'The terms that apply when you use the My Little Paris Café & Play website, book a session, or visit our play space in San Gabriel, CA.',
		intro: [
			'This website is operated by {entity} (“we”, “us”, “our”), whose place of business is {address}. You can reach us at {email} or {phone}.',
			'These terms apply when you browse this website, submit a form, book a session or a party, or visit our café and play space. By doing any of those things you agree to them. If you do not agree, please do not use the site or our services.',
		],
		sections: [
			{
				heading: 'Reservations and admission',
				paragraphs: [
					'Eat & Play sessions run for two hours and are booked through our scheduling provider. Booking a session reserves a table and admission for the number of guests stated in your reservation.',
					'Session prices, admission rates and any minimum food order are shown on the Play page and at the café, and may change. The price that applies is the one displayed at the time you book or order.',
				],
				bullets: [
					'Each online reservation slot seats up to six people, adults and children included.',
					'Groups of seven or more are arranged by email; groups of thirteen or more require our private room.',
					'We may hold a credit card on file for larger reservations. Because no-shows keep other families out, we ask you to honour your booking time or let us know in advance.',
					'Sessions start at the booked time. We cannot always extend a session that starts late.',
				],
			},
			{
				heading: 'Parties and private events',
				paragraphs: [
					'A party inquiry is a request, not a confirmed booking. Your date is held only once we confirm it with you and any required deposit has been paid.',
					'Package contents, service fees, cancellation terms and deposit requirements are set out on the Party page and in the confirmation we send you. Those terms form part of your agreement with us.',
				],
			},
			{
				heading: 'Using the play space',
				paragraphs: [
					'The play space is designed for children roughly aged 0–7. A parent or responsible adult must remain on the premises and supervise their children at all times. Our staff maintain and clean the space; they do not provide childcare or supervision.',
					'Everyone who uses the play space must have a signed waiver on file. You are responsible for the waiver covering each child in your party.',
				],
				bullets: [
					'Socks are required in the play area.',
					'Please keep children who are unwell at home, out of consideration for other families.',
					'We may ask anyone to leave if their behaviour is unsafe or spoils the experience for other guests.',
					'Outside food and drink are not permitted except under a venue-rental package that expressly allows it.',
				],
			},
			{
				heading: 'Food, drink and allergens',
				paragraphs: [
					'Our kitchen handles gluten, dairy, eggs, nuts, soy and other common allergens, and we cannot guarantee that any dish is free from cross-contact. If you or your child has a food allergy or intolerance, please tell a member of staff before ordering so we can help you choose.',
					'Menu descriptions and prices on this website are provided in good faith but may not always reflect the current menu at the café.',
				],
			},
			{
				heading: 'Using this website',
				paragraphs: [
					'You may use this website for lawful purposes only. You agree not to interfere with the site, attempt to gain unauthorised access to it, use it to send unsolicited messages, or scrape or copy it in bulk.',
					'The information you submit through our forms must be accurate and must be yours to provide.',
				],
			},
			{
				heading: 'Intellectual property',
				paragraphs: [
					'The content of this website — including text, photographs, logos, menus and page designs — belongs to us or our licensors and is protected by copyright and trade mark law. You may view and print pages for your own personal, non-commercial use.',
					'You may not reproduce, republish or use our content commercially without our written permission. Our name and logo may not be used without our consent.',
				],
			},
			{
				heading: 'Third-party services and links',
				paragraphs: [
					'Some parts of our service are provided by third parties — online booking, waiver signing, maps and analytics among them. Using those services means accepting the provider’s own terms, and we are not responsible for how they operate.',
					'Links to other websites, including our social media profiles and review pages, are provided for convenience. We do not control and are not responsible for their content.',
				],
			},
			{
				heading: 'Disclaimers and limitation of liability',
				paragraphs: [
					'This website is provided “as is”. We do not warrant that it will be uninterrupted, error-free, or that the information on it is complete or current at all times.',
					'Nothing in these terms limits any liability that cannot be limited under California law, including liability for death or personal injury caused by negligence, or for fraud. Subject to that, we are not liable for indirect or consequential losses arising from your use of this website.',
					'Your use of the play space is additionally governed by the waiver you sign, which sets out the risks involved in physical play.',
				],
			},
			{
				heading: 'Changes to these terms',
				paragraphs: [
					'We may update these terms from time to time. The version published on this page is the one that applies, and the date it was last revised is shown at the top. Continuing to use the site after a change means you accept the updated terms.',
				],
			},
			{
				heading: 'Governing law',
				paragraphs: [
					'These terms are governed by the laws of the State of California, without regard to its conflict-of-laws rules. Any dispute will be handled by the state or federal courts located in Los Angeles County, California.',
				],
			},
			{
				heading: 'Contact',
				paragraphs: ['Questions about these terms are welcome at {email}, or by phone or text at {phone}.'],
			},
		],
	},

	// ─── Privacy Policy ───────────────────────────────────────────────────
	privacy: {
		summary:
			'What personal information My Little Paris Café & Play collects through this website, why we collect it, who we share it with, and the choices you have.',
		intro: [
			'This policy explains how {entity} handles personal information collected through this website. Our address is {address} and you can reach us at {email} or {phone}.',
			'We are a café and indoor play space in San Gabriel, California. We collect the information we need to take your booking, answer your message and run the business — nothing more, and we do not sell it.',
		],
		sections: [
			{
				heading: 'Information you give us',
				paragraphs: ['You provide personal information when you contact us or make a booking. Depending on the form, that can include:'],
				bullets: [
					'Contact form: your name, email address and the content of your message.',
					'Party inquiry form: the host’s name, email address, phone number and postal address; your contact preference; the requested date, time, package and estimated guest count; and the first name and date of birth of the child the party is for.',
					'Newsletter signup: your email address.',
					'Bookings and waivers: information you enter with our scheduling and waiver providers, which may include payment card details held by them — we do not receive or store full card numbers.',
					'Anything else you choose to tell us by email, phone or text.',
				],
			},
			{
				heading: 'Children’s information',
				paragraphs: [
					'This website is directed to parents and carers, not to children. We do not knowingly allow children to submit information to us through the site.',
					'Our party inquiry form asks for a child’s first name and date of birth. That information is provided by the booking adult, is used only to plan and personalise the party, and is not used for advertising or shared with anyone other than the service providers described below.',
					'If you believe a child has given us personal information without a parent’s involvement, contact us at {email} and we will delete it.',
				],
			},
			{
				heading: 'Information collected automatically',
				paragraphs: [
					'When you visit the site, our hosting and analytics providers automatically record technical information such as your IP address, browser and device type, the pages you view, and the site you arrived from. This is used to keep the site working and to understand which pages are useful.',
					'We use Google Analytics for this. See our Cookie Policy for what it stores and how to opt out.',
				],
			},
			{
				heading: 'How we use your information',
				paragraphs: ['We use personal information to:'],
				bullets: [
					'take, confirm and manage your reservations, parties and events;',
					'reply to your questions and provide customer service;',
					'send the newsletter, if you asked for it;',
					'keep records required for running the business, including accounting and safety;',
					'understand how the website is used so we can improve it;',
					'protect the site and our guests against fraud, abuse and safety risks.',
				],
			},
			{
				heading: 'Who we share it with',
				paragraphs: [
					'We do not sell your personal information and we do not share it for anyone else’s advertising. We do share it with service providers who process it on our behalf, under contract, only for the purposes above:',
				],
				bullets: [
					'our online scheduling provider, which handles reservations and party bookings;',
					'our waiver provider, which stores signed play-space waivers;',
					'Google, for website analytics and the map embedded on our pages;',
					'our website hosting and database providers;',
					'our email provider, for confirmations and newsletters.',
				],
			},
			{
				heading: 'When the law requires it',
				paragraphs: [
					'We may disclose personal information if we are required to by law, court order or a valid request from a public authority, or where we reasonably need to in order to protect the rights, property or safety of our guests, our staff or the public.',
					'If the business is ever sold or transferred, customer information may be part of what transfers, subject to this policy.',
				],
			},
			{
				heading: 'How long we keep it',
				paragraphs: [
					'We keep personal information only as long as we need it for the purpose it was collected, or as long as the law requires. Booking and party records are kept for our accounting and insurance obligations; newsletter subscriptions are kept until you unsubscribe; analytics data is retained according to Google’s retention settings.',
				],
			},
			{
				heading: 'Security',
				paragraphs: [
					'This site is served over an encrypted connection, and we limit access to personal information to the people who need it to do their job. No method of transmission or storage is completely secure, so we cannot guarantee absolute security, but we take reasonable steps to protect what you give us.',
				],
			},
			{
				heading: 'Your choices and your rights',
				paragraphs: [
					'You can ask us what personal information we hold about you, ask us to correct it, or ask us to delete it. Email {email} and we will respond within a reasonable time. We may need to verify your identity before acting on a request.',
					'California residents may have additional rights, including the right to know what categories of personal information we collect and how we use them, the right to request deletion, and the right not to be discriminated against for exercising those rights. We do not sell personal information as that term is used in California law.',
					'You can unsubscribe from the newsletter at any time using the link in any newsletter email, or by emailing us.',
				],
			},
			{
				heading: 'Do Not Track',
				paragraphs: [
					'Some browsers send a “Do Not Track” signal. There is no common industry standard for how to respond to it, and this site does not currently respond to those signals. The opt-out routes described in our Cookie Policy remain available.',
				],
			},
			{
				heading: 'Other websites',
				paragraphs: [
					'This policy covers only this website. Our booking provider, waiver provider and social media profiles have their own privacy policies, and we encourage you to read them.',
				],
			},
			{
				heading: 'Changes to this policy',
				paragraphs: [
					'We may update this policy. The current version is always published on this page with the date it was last revised at the top. If we make a significant change we will make that clear on the site.',
				],
			},
			{
				heading: 'Contact',
				paragraphs: [
					'For any privacy question or request, write to {email}, call or text {phone}, or visit us at {address}.',
				],
			},
		],
	},

	// ─── Cookie Policy ────────────────────────────────────────────────────
	cookies: {
		summary:
			'The cookies this website uses — one for your language preference, Google Analytics for traffic measurement, and Google Maps — and how to turn them off.',
		intro: [
			'This policy explains how {entity} uses cookies and similar technologies on this website. It sits alongside our Privacy Policy.',
			'Cookies are small text files a website stores on your device. They let a site remember things between pages and visits — such as which language you chose — and let us count visitors.',
		],
		sections: [
			{
				heading: 'Cookies we use',
				paragraphs: ['We keep this short. There are three kinds on this site:'],
				bullets: [
					'Essential — a language cookie (“ge-locale”) that remembers whether you are reading the site in English, French or Chinese, so you are not sent back to the default language on every page. The site cannot work properly without it.',
					'Analytics — Google Analytics cookies (names beginning “_ga”) that count visits and show us which pages get used. They tell us how many people read a page, not who those people are.',
					'Embedded map — the Google Map on our pages is loaded from Google and may set its own cookies when it appears. That is Google’s technology, governed by Google’s privacy policy.',
				],
			},
			{
				heading: 'What we do with analytics',
				paragraphs: [
					'We use Google Analytics to understand which pages families actually read, how people arrive at the site, and whether the booking flow is working. We look at it in aggregate — totals and trends, not individuals.',
					'We do not use analytics for advertising, and we do not run advertising or retargeting cookies on this site.',
				],
			},
			{
				heading: 'How to turn cookies off',
				paragraphs: ['You are in control, and nothing here is required for you to browse the site:'],
				bullets: [
					'Every major browser lets you block or delete cookies in its settings, either for all sites or just for this one.',
					'To opt out of Google Analytics specifically, install Google’s official opt-out browser add-on, which works across every site that uses it.',
					'Using private or incognito browsing clears cookies when you close the window.',
				],
			},
			{
				heading: 'If you block cookies',
				paragraphs: [
					'Blocking analytics cookies changes nothing about how the site works for you. Blocking the language cookie means the site may not remember your language choice between pages.',
				],
			},
			{
				heading: 'Do Not Track',
				paragraphs: [
					'This site does not currently respond to browser “Do Not Track” signals, as there is no agreed standard for what responding should mean. The opt-out options above are available regardless.',
				],
			},
			{
				heading: 'Changes to this policy',
				paragraphs: [
					'If we add or remove cookies we will update this page, and the revision date at the top will change with it.',
				],
			},
			{
				heading: 'Contact',
				paragraphs: ['Questions about cookies can go to {email}, or call or text {phone}.'],
			},
		],
	},
}

export default en
