import type { Metadata } from 'next'
import Link from 'next/link'
import { getDictionary } from '@/i18n'
import { localizedPath } from '@/lib/i18n-utils'
import { buildPageMetadata } from '@/lib/seo'
import { BUSINESS, LINKS } from '@/data/site'
import { GroupSizeSelector } from '@/components/reservations/GroupSizeSelector'
import { MailIcon, MessageIcon, PhoneIcon } from '@/components/layout/ContactIcons'
import { BalloonCelebration } from '@/components/ui/BalloonCelebration'
import { SpaceGallery } from '@/components/gallery/SpaceGallery'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

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
		title: dict['reservations.meta.title'],
		description: dict['reservations.meta.description'],
		brand: false,
	})
}

export default async function ReservationsPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const dict = await getDictionary(locale)

	// Panel: up to 6 → straight out to Acuity.
	//
	// This used to be an inline iframe. Acuity never posts the `sizing` message
	// its own embed.js listens for, so the frame can't auto-fit, and its content
	// runs ~1900px tall on desktop and ~3000px on mobile for the first step
	// alone. Any fixed height meant either a scrollbar inside a scrollbar or a
	// vast empty box on the shorter steps. Sending people to Acuity's own
	// responsive page is the honest fix.
	const smallPanel = (
		<div className="space-y-12">
			<section className="overflow-hidden rounded-box bg-primary text-primary-content shadow-[0_16px_36px_-18px_rgba(0,29,97,0.8)]">
				<div className="flex flex-col items-center px-6 py-10 text-center sm:px-10 sm:py-12">
					<h2 className="max-w-xl font-display text-3xl text-white sm:text-4xl">{dict['reservations.book.heading']}</h2>
					<p className="mt-3 max-w-md text-sm leading-relaxed text-white/80 sm:text-base">{dict['reservations.small.note']}</p>
					<div className="mt-7 flex w-full justify-center">
						<BalloonCelebration>
							<a
								href={LINKS.reservations}
								target="_blank"
								rel="noopener noreferrer"
								className="btn btn-secondary btn-lg min-h-16 w-full max-w-sm text-lg font-bold shadow-[0_8px_0_#fdfbf8] transition-transform hover:-translate-y-1 hover:shadow-[0_10px_0_#fdfbf8] active:translate-y-1 active:shadow-[0_3px_0_#fdfbf8]"
							>
								{dict['reservations.book.cta']}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth={2}
									strokeLinecap="round"
									strokeLinejoin="round"
									className="w-4 h-4"
									aria-hidden="true"
								>
									<path d="M7 17 17 7M9 7h8v8" />
								</svg>
							</a>
						</BalloonCelebration>
					</div>
					<p className="mt-5 text-xs text-white/70">{dict['reservations.book.newtab']}</p>
					<p className="mt-7 border-t border-white/20 pt-6 text-sm text-white/80">
						{dict['reservations.book.callnote'].split('{phone}')[0]}
						<a href={BUSINESS.phoneHref} className="font-semibold text-white underline underline-offset-4">{BUSINESS.phoneDisplay}</a>
						{dict['reservations.book.callnote'].split('{phone}')[1]}
					</p>
				</div>
			</section>

			<div className="w-full text-left">
				<h3 className="font-display text-2xl text-primary">{dict['reservations.space.heading']}</h3>
				<p className="mb-4 mt-2 text-sm text-base-content/65">{dict['reservations.space.sub']}</p>
				<SpaceGallery variant="compact" ariaLabel={dict['home.gallery.aria']} />
			</div>
		</div>
	)

	// Panel: 7–12 → group booking by email, text, or phone; credit card required
	const mediumPanel = (
		<div className="card bg-base-200 shadow-sm">
			<div className="card-body">
				<h2 className="card-title text-primary">{dict['reservations.groups.heading']}</h2>
				<p>{dict['reservations.groups.intro']}</p>
				<ul className="list-disc pl-5 space-y-1">
					<li>{dict['reservations.groups.item1']}</li>
					<li>{dict['reservations.groups.item2']}</li>
					<li>{dict['reservations.groups.item3']}</li>
				</ul>
				<p className="text-sm text-base-content/70">{dict['reservations.groups.note']}</p>
				<p className="text-sm text-base-content/70">{dict['reservations.groups.limit']}</p>
				<p className="font-medium text-primary">{dict['reservations.groups.languages']}</p>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
					<a href={BUSINESS.phoneHref} className="btn btn-outline btn-primary h-auto min-h-14 justify-start gap-3 bg-base-100 px-4 py-3">
						<PhoneIcon className="h-5 w-5 shrink-0" />
						<span className="flex min-w-0 flex-col items-start leading-tight">
							<span>{dict['partyform.contact.call']}</span>
							<span className="text-xs font-normal opacity-75">{BUSINESS.phoneDisplay}</span>
						</span>
					</a>
					<a href={BUSINESS.smsHref} className="btn btn-outline btn-primary h-auto min-h-14 justify-start gap-3 bg-base-100 px-4 py-3">
						<MessageIcon className="h-5 w-5 shrink-0" />
						<span className="flex min-w-0 flex-col items-start leading-tight">
							<span>{dict['partyform.contact.text']}</span>
							<span className="text-xs font-normal opacity-75">{BUSINESS.phoneDisplay}</span>
						</span>
					</a>
					<a href={`mailto:${BUSINESS.email}`} className="btn btn-outline btn-primary h-auto min-h-14 justify-start gap-3 bg-base-100 px-4 py-3">
						<MailIcon className="h-5 w-5 shrink-0" />
						<span className="flex min-w-0 flex-col items-start leading-tight">
							<span>{dict['partyform.contact.email']}</span>
							<span className="max-w-full truncate text-xs font-normal opacity-75">{BUSINESS.email}</span>
						</span>
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
			<BreadcrumbJsonLd path="/reservations" locale={locale} homeName={dict['nav.home']} name={dict['nav.reservations']} />
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

					<p className="text-center text-sm text-base-content/70 mt-8">{dict['reservations.thanks']}</p>
				</div>
			</section>
		</>
	)
}
