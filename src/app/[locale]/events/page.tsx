import type { Metadata } from 'next'
import { AcuityEventsEmbed } from '@/components/events/AcuityEventsEmbed'
import { LINKS } from '@/data/site'
import { getDictionary } from '@/i18n'
import { buildPageMetadata } from '@/lib/seo'
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

	return (
		<>
			<BreadcrumbJsonLd path="/events" locale={locale} homeName={dict['nav.home']} name={dict['nav.events']} />
			<section className="navy-section py-16 text-center">
				<h1 className="mb-3 font-display text-5xl text-white">{dict['events.heading']}</h1>
				<p className="mx-auto max-w-xl px-4 text-white/75">{dict['events.sub']}</p>
			</section>

			<section className="bg-base-100 py-10 sm:py-14">
				<div className="container mx-auto max-w-5xl px-4">
					<div className="overflow-hidden rounded-box border border-base-200 bg-white shadow-sm">
						<AcuityEventsEmbed src={LINKS.events} title={dict['events.heading']} />
					</div>
				</div>
			</section>
		</>
	)
}
