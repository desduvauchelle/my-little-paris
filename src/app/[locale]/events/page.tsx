import type { Metadata } from 'next'
import Link from 'next/link'
import { AcuityEventsEmbed } from '@/components/events/AcuityEventsEmbed'
import { BUSINESS, LINKS, SERVICE_AREA } from '@/data/site'
import { getDictionary } from '@/i18n'
import { localizedPath } from '@/lib/i18n-utils'
import { buildPageMetadata } from '@/lib/seo'
import { ScrollReveal } from '@/components/landing/ScrollReveal'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

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
		title: dict['events.meta.title'],
		description: dict['events.meta.description'],
	})
}

export default async function EventsPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const dict = await getDictionary(locale)

	const EVENT_TYPES = [
		{ title: dict['events.types.characters.title'], body: dict['events.types.characters.body'] },
		{ title: dict['events.types.tea.title'], body: dict['events.types.tea.body'] },
		{ title: dict['events.types.seasonal.title'], body: dict['events.types.seasonal.body'] },
	]

	const BOOKING_STEPS = [
		{ title: dict['events.booking.step1.title'], body: dict['events.booking.step1.body'] },
		{ title: dict['events.booking.step2.title'], body: dict['events.booking.step2.body'] },
		{ title: dict['events.booking.step3.title'], body: dict['events.booking.step3.body'] },
	]

	const BEFORE_YOU_COME = [
		{ title: dict['events.before.waiver.title'], body: dict['events.before.waiver.body'] },
		{ title: dict['events.before.arrive.title'], body: dict['events.before.arrive.body'] },
		{ title: dict['events.before.cafe.title'], body: dict['events.before.cafe.body'] },
	]

	const address = `${BUSINESS.address.street}, ${BUSINESS.address.city}, ${BUSINESS.address.state} ${BUSINESS.address.zip}`

	return (
		<>
			<BreadcrumbJsonLd path="/events" locale={locale} homeName={dict['nav.home']} name={dict['nav.events']} />
			<section className="navy-section py-16 text-center">
				<h1 className="mb-3 font-display text-5xl text-white">{dict['events.heading']}</h1>
				<p className="mx-auto max-w-xl px-4 text-white/75">{dict['events.sub']}</p>
			</section>

			<section className="bg-base-100 pt-16">
				<div className="container mx-auto px-4">
					<div className="mx-auto max-w-3xl space-y-4 text-center text-base-content/80">
						<p className="text-lg leading-relaxed">{dict['events.intro.p1']}</p>
						<p className="leading-relaxed">{dict['events.intro.p2']}</p>
					</div>
				</div>
			</section>

			{/* What we host */}
			<section className="bg-base-100 py-14">
				<div className="container mx-auto px-4">
					<h2 className="mb-9 text-center font-display text-4xl text-primary">{dict['events.types.heading']}</h2>
					<ScrollReveal y={30} stagger={0.1} className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
						{EVENT_TYPES.map((type) => (
							<div key={type.title} className="card bg-base-200 shadow-sm">
								<div className="card-body">
									<h3 className="font-display text-2xl text-primary">{type.title}</h3>
									<p className="text-sm leading-relaxed text-base-content/75">{type.body}</p>
								</div>
							</div>
						))}
					</ScrollReveal>
				</div>
			</section>

			{/* How booking works */}
			<section className="bg-base-200 py-16">
				<div className="container mx-auto px-4">
					<h2 className="mb-9 text-center font-display text-4xl text-primary">{dict['events.booking.heading']}</h2>
					<ScrollReveal y={30} stagger={0.1} className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
						{BOOKING_STEPS.map((step, i) => (
							<div key={step.title} className="card bg-base-100 shadow-sm">
								<div className="card-body">
									<span className="font-display text-4xl text-secondary">{i + 1}</span>
									<h3 className="font-semibold">{step.title}</h3>
									<p className="text-sm leading-relaxed text-base-content/75">{step.body}</p>
								</div>
							</div>
						))}
					</ScrollReveal>
				</div>
			</section>

			{/* Live Acuity calendar */}
			<section className="bg-base-100 py-14">
				<div className="container mx-auto max-w-5xl px-4">
					<div className="mx-auto mb-8 max-w-2xl text-center">
						<h2 className="font-display text-4xl text-primary">{dict['events.calendar.heading']}</h2>
						<p className="mt-3 text-base-content/70">{dict['events.calendar.sub']}</p>
					</div>
					<div className="overflow-hidden rounded-box border border-base-200 bg-white shadow-sm">
						<AcuityEventsEmbed src={LINKS.events} title={dict['events.heading']} />
					</div>
				</div>
			</section>

			{/* Before you arrive */}
			<section className="bg-base-200 py-16">
				<div className="container mx-auto px-4">
					<h2 className="mb-9 text-center font-display text-4xl text-primary">{dict['events.before.heading']}</h2>
					<ScrollReveal y={30} stagger={0.08} className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
						{BEFORE_YOU_COME.map((item) => (
							<div key={item.title} className="rounded-box border border-base-300 bg-base-100 p-6">
								<h3 className="mb-2 font-semibold text-primary">{item.title}</h3>
								<p className="text-sm leading-relaxed text-base-content/75">{item.body}</p>
							</div>
						))}
					</ScrollReveal>
					<div className="mt-8 flex flex-wrap justify-center gap-3">
						<a href={LINKS.waiver} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-primary">
							{dict['play.policy.waiver.cta']}
						</a>
						<Link href={localizedPath('/reservations', locale)} className="btn btn-ghost">
							{dict['events.reserve.cta']} →
						</Link>
					</div>
				</div>
			</section>

			{/* Private celebrations live on /party — send that intent there. */}
			<section className="bg-base-100 py-16">
				<div className="container mx-auto px-4">
					<ScrollReveal y={30} className="card mx-auto max-w-4xl border border-secondary/30 bg-secondary/15">
						<div className="card-body gap-6 lg:flex-row lg:items-center">
							<div className="flex-1">
								<h2 className="mb-2 font-display text-3xl text-primary">{dict['events.private.heading']}</h2>
								<p className="text-base-content/75">{dict['events.private.body']}</p>
							</div>
							<Link href={localizedPath('/party', locale)} className="btn btn-primary shrink-0">
								{dict['events.private.cta']}
							</Link>
						</div>
					</ScrollReveal>
				</div>
			</section>

			{/* Stay in the loop + where to find us */}
			<section className="bg-base-200 py-14">
				<div className="container mx-auto max-w-3xl px-4 text-center">
					<h2 className="font-display text-3xl text-primary">{dict['events.stay.heading']}</h2>
					<p className="mt-3 text-base-content/75">{dict['events.stay.body']}</p>
					<a
						href={LINKS.instagram}
						target="_blank"
						rel="noopener noreferrer"
						className="btn btn-outline btn-primary mt-6"
					>
						{dict['home.gallery.follow']} →
					</a>

					<h2 className="mt-14 font-display text-2xl text-primary">{dict['events.location.heading']}</h2>
					<p className="mt-3 text-sm leading-relaxed text-base-content/70">
						{dict['events.location.body']
							.replace('{address}', address)
							.replace('{cities}', SERVICE_AREA.join(', '))
							.replace('{phone}', BUSINESS.phoneDisplay)}
					</p>
				</div>
			</section>
		</>
	)
}
