import type { Metadata } from 'next'
import Link from 'next/link'
import { getDictionary } from '@/i18n'
import { localizedPath } from '@/lib/i18n-utils'
import { buildPageMetadata } from '@/lib/seo'
import { BUSINESS, LINKS } from '@/data/site'
import { GroupSizeSelector } from '@/components/reservations/GroupSizeSelector'

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const dict = await getDictionary(locale)
	return buildPageMetadata({
		path: '/reservations',
		locale,
		title: dict['reservations.heading'],
		description: dict['reservations.p1'],
	})
}

export default async function ReservationsPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const dict = await getDictionary(locale)

	// Panel: up to 6 → book online right away (the common case, shown by default)
	const smallPanel = (
		<div>
			<h2 className="font-display text-3xl text-primary text-center mb-2">{dict['reservations.book.heading']}</h2>
			<p className="text-center text-sm text-base-content/60 mb-6">{dict['reservations.small.note']}</p>
			<div className="rounded-box overflow-hidden border border-base-300 bg-white">
				<iframe
					src={LINKS.acuityEmbed}
					title={dict['reservations.book.heading']}
					width="100%"
					height="800"
					loading="lazy"
				/>
			</div>
			<p className="text-center text-sm text-base-content/60 mt-4">
				{dict['reservations.book.fallback']}{' '}
				<a href={LINKS.reservations} target="_blank" rel="noopener noreferrer" className="link link-primary">
					{dict['reservations.book.cta']}
				</a>
			</p>
		</div>
	)

	// Panel: 7–12 → group booking by email, credit card required
	const mediumPanel = (
		<div className="card bg-base-200 shadow-sm">
			<div className="card-body">
				<h2 className="card-title text-primary">{dict['reservations.groups.heading']}</h2>
				<p>
					{dict['reservations.groups.intro'].split('{email}')[0]}
					<a href={`mailto:${BUSINESS.email}`} className="link link-primary">{BUSINESS.email}</a>
					{dict['reservations.groups.intro'].split('{email}')[1]}
				</p>
				<ul className="list-disc pl-5 space-y-1">
					<li>{dict['reservations.groups.item1']}</li>
					<li>{dict['reservations.groups.item2']}</li>
					<li>{dict['reservations.groups.item3']}</li>
				</ul>
				<p className="text-sm text-base-content/70">{dict['reservations.groups.note']}</p>
				<p className="text-sm text-base-content/70">{dict['reservations.groups.limit']}</p>
				<div className="card-actions mt-2">
					<a href={`mailto:${BUSINESS.email}`} className="btn btn-primary">
						{BUSINESS.email}
					</a>
				</div>
			</div>
		</div>
	)

	// Panel: 13+ → private room, i.e. a party
	const largePanel = (
		<div className="card bg-secondary/10 border border-secondary/30 shadow-sm">
			<div className="card-body">
				<h2 className="card-title text-primary">🎉 {dict['reservations.large.heading']}</h2>
				<p>{dict['reservations.large.body']}</p>
				<p className="text-sm text-base-content/70">
					{dict['reservations.large.contact'].split('{email}')[0]}
					<a href={`mailto:${BUSINESS.email}`} className="link link-primary">{BUSINESS.email}</a>
					{dict['reservations.large.contact'].split('{email}')[1]}
				</p>
				<div className="card-actions mt-2">
					<Link href={localizedPath('/party', locale)} className="btn btn-primary">
						{dict['reservations.party.cta']}
					</Link>
				</div>
			</div>
		</div>
	)

	return (
		<>
			<section className="navy-section py-16 text-center">
				<div className="container mx-auto px-4">
					<h1 className="font-display text-5xl text-white mb-4">{dict['reservations.heading']}</h1>
					<p className="text-white/80 max-w-xl mx-auto">{dict['reservations.sub']}</p>
				</div>
			</section>

			<section className="py-12 bg-base-100">
				<div className="container mx-auto px-4 max-w-3xl">
					<GroupSizeSelector
						prompt={dict['reservations.size.prompt']}
						options={[
							{
								key: 'small',
								icon: '☕',
								title: dict['reservations.size.small.title'],
								body: dict['reservations.size.small.body'],
							},
							{
								key: 'medium',
								icon: '👨‍👩‍👧‍👦',
								title: dict['reservations.size.medium.title'],
								body: dict['reservations.size.medium.body'],
							},
							{
								key: 'large',
								icon: '🎉',
								title: dict['reservations.size.large.title'],
								body: dict['reservations.size.large.body'],
							},
						]}
						panels={{ small: smallPanel, medium: mediumPanel, large: largePanel }}
					/>

					{/* The fine print, tucked away until someone wants it */}
					<details className="collapse collapse-arrow bg-base-200 mt-10">
						<summary className="collapse-title font-medium">{dict['reservations.policy.summary']}</summary>
						<div className="collapse-content text-sm text-base-content/75 space-y-2">
							<p>{dict['reservations.p1']}</p>
							<p>{dict['reservations.p2']}</p>
						</div>
					</details>

					<p className="text-center text-sm text-base-content/60 mt-8">{dict['reservations.thanks']}</p>
				</div>
			</section>
		</>
	)
}
