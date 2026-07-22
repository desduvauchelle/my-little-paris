import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getDictionary } from '@/i18n'
import { localizedPath } from '@/lib/i18n-utils'
import { buildPageMetadata } from '@/lib/seo'
import { LINKS } from '@/data/site'
import { ScrollReveal } from '@/components/landing/ScrollReveal'

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const dict = await getDictionary(locale)
	return buildPageMetadata({
		path: '/events',
		locale,
		title: dict['events.heading'],
		description: dict['events.sub'],
	})
}

/*
 * Events are currently curated by hand, mirroring the live site's single
 * featured event. Once the Growth Engine backend is connected this page can
 * switch to SDK-driven content.
 */
const CURRENT_EVENT = {
	title: '🌺 Island Princess Tea Party 🌺',
	intro: 'Set sail for a magical island adventure at My Little Paris Café & Play!',
	body: 'Join us for an enchanting afternoon with our Island Princess featuring story time, singing, dancing, games, and memorable photo opportunities. Little ones are invited to dress in their favorite tropical or princess-inspired attire and enjoy an unforgettable experience filled with fun and imagination.',
	when: '📅 Sunday, July 19 | 🕓 4:00 PM – 6:00 PM | 👑 Island Princess appearance begins at 4:30 PM',
	admission: [
		'🌺 Meet & Greet with the Island Princess',
		'📖 Story Time, 🎶 Singing & Dancing, 🎉 Interactive Games',
		'🍽️ Delicious buffet featuring sweet & savory bites, fresh fruit, and salad',
		'📸 Photo opportunities, 🍍 Open Play',
	],
	pricing: [
		'🌴 Regular Admission: $25 per guest, including the character experience, picture opportunities, delicious tea party buffet, and a memorable afternoon of island fun.',
		'Adults and children attending the event each require a ticket. Babies under 1 are free.',
		'🥤 Beverages will be available for purchase from our café.',
	],
	policy: [
		'Free cancellation up to 3 days before the event',
		'Cancellations made within 3 days and up to 24 hours before the event are subject to a 50% cancellation fee',
		'Cancellations made within 24 hours of the event, as well as no-shows, will be charged 100% of the ticket price',
		'Final headcount is due 24 hours prior to the event',
	],
	outro: "Space is limited, so reserve your seats today. We can't wait to welcome your family for a magical island celebration!",
}

export default async function EventsPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const dict = await getDictionary(locale)

	return (
		<>
			<section className="navy-section py-16 text-center">
				<h1 className="font-display text-5xl text-white mb-3">{dict['events.heading']}</h1>
				<p className="text-white/75 max-w-xl mx-auto px-4">{dict['events.sub']}</p>
			</section>

			<section className="py-16 bg-base-100">
				<div className="container mx-auto px-4 max-w-4xl">
					<ScrollReveal y={30} className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 items-start">
						<div className="mx-auto">
							<Image
								src="/images/event-tea-party.svg"
								alt="Princess Tea Party event poster"
								width={280}
								height={350}
								className="rounded-box shadow-lg"
							/>
						</div>
						<article>
							<span className="badge badge-secondary mb-3">{dict['events.current.badge']}</span>
							<h2 className="font-display text-4xl text-primary mb-3">{CURRENT_EVENT.title}</h2>
							<p className="font-medium mb-2">{CURRENT_EVENT.intro}</p>
							<p className="text-base-content/75 mb-4">{CURRENT_EVENT.body}</p>
							<p className="font-semibold text-primary mb-6">{CURRENT_EVENT.when}</p>

							<h3 className="font-display text-2xl text-primary mb-2">{dict['events.admission']}</h3>
							<ul className="space-y-1 text-base-content/80 mb-6">
								{CURRENT_EVENT.admission.map((line) => (
									<li key={line}>{line}</li>
								))}
							</ul>

							<h3 className="font-display text-2xl text-primary mb-2">{dict['events.pricing']}</h3>
							<ul className="space-y-1 text-base-content/80 mb-6">
								{CURRENT_EVENT.pricing.map((line) => (
									<li key={line}>{line}</li>
								))}
							</ul>

							<h3 className="font-display text-2xl text-primary mb-2">{dict['events.policy']}</h3>
							<ul className="list-disc pl-5 space-y-1 text-sm text-base-content/70 mb-6">
								{CURRENT_EVENT.policy.map((line) => (
									<li key={line}>{line}</li>
								))}
							</ul>

							<p className="text-base-content/80 mb-6">{CURRENT_EVENT.outro}</p>
							<Link href={localizedPath('/reservations', locale)} className="btn btn-primary btn-lg">
								{dict['events.reserve.cta']}
							</Link>
						</article>
					</ScrollReveal>
				</div>
			</section>

			<section className="py-16 bg-base-200">
				<div className="container mx-auto px-4 max-w-3xl text-center">
					<ScrollReveal y={30}>
						<div className="flex justify-center gap-6 mb-6">
							<Image src="/images/event-superhero.svg" alt="Superhero Day event poster" width={160} height={200} className="rounded-box shadow-md w-36" />
							<Image src="/images/event-tea-party.svg" alt="Princess Tea Party event poster" width={160} height={200} className="rounded-box shadow-md w-36" />
						</div>
						<h2 className="font-display text-3xl text-primary mb-3">{dict['events.stay.heading']}</h2>
						<p className="text-base-content/70 mb-6">{dict['events.stay.body']}</p>
						<a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-primary">
							@mylittlepariscafeplay
						</a>
					</ScrollReveal>
				</div>
			</section>
		</>
	)
}
