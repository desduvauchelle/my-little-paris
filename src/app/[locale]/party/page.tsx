import type { Metadata } from 'next'
import Link from 'next/link'
import { getDictionary } from '@/i18n'
import { buildPageMetadata } from '@/lib/seo'
import { BUSINESS, LINKS, SERVICE_AREA } from '@/data/site'
import { PARTY_PROCESS, PARTY_POLICIES } from '@/data/party'
import { PackageTabs } from '@/components/party/PackageTabs'
import { ScrollReveal } from '@/components/landing/ScrollReveal'
import { BalloonCelebrationOnLoad } from '@/components/ui/BalloonCelebration'
import { PhotoGallery } from '@/components/gallery/PhotoGallery'
import { localizedPath } from '@/lib/i18n-utils'

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const dict = await getDictionary(locale)
	return buildPageMetadata({
		path: '/party',
		locale,
		title: dict['party.hero.title'],
		description: dict['party.hero.sub'],
	})
}

export default async function PartyPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const dict = await getDictionary(locale)
	const gallerySeed = new Date().getUTCDate() + locale.length * 47

	const badges = [
		dict['party.hero.badge1'],
		dict['party.hero.badge2'],
		dict['party.hero.badge3'],
		dict['party.hero.badge4'],
	]

	return (
		<>
			<BalloonCelebrationOnLoad />
			{/* Hero */}
			<section className="navy-section py-20 relative overflow-hidden">
				<div className="container mx-auto px-4 max-w-4xl text-center relative">
					<p className="text-xs tracking-[0.25em] uppercase text-white/60 mb-4">{dict['party.eyebrow']}</p>
					<h1 className="font-display text-4xl md:text-6xl text-white mb-5">{dict['party.hero.title']}</h1>
					<p className="text-lg text-white/80 max-w-2xl mx-auto mb-7">{dict['party.hero.sub']}</p>
					<div className="flex flex-wrap justify-center gap-2 mb-8">
						{badges.map((badge) => (
							<span key={badge} className="badge badge-lg bg-white/10 border-white/20 text-white">
								{badge}
							</span>
						))}
					</div>
				</div>
			</section>

			{/* Packages */}
			<section className="py-20 bg-base-200">
				<div className="container mx-auto px-4">
					<div className="text-center mb-10">
						<p className="text-xs tracking-[0.25em] uppercase text-base-content/50 mb-2">{dict['party.packages.eyebrow']}</p>
						<h2 className="font-display text-4xl text-primary mb-3">{dict['party.packages.heading']}</h2>
						<p className="text-base-content/70 max-w-2xl mx-auto">{dict['party.packages.sub']}</p>
					</div>
					<PackageTabs dict={dict} />
				</div>
			</section>

			{/* Party moments */}
			<section className="overflow-hidden bg-base-100 py-20">
				<div className="container mx-auto px-4">
					<div className="mx-auto mb-9 flex max-w-6xl flex-col gap-5 md:flex-row md:items-end md:justify-between">
						<div className="max-w-2xl">
							<p className="mb-3 text-sm font-semibold text-accent">{dict['party.gallery.kicker']}</p>
							<h2 className="font-display text-4xl text-primary md:text-5xl">{dict['party.gallery.heading']}</h2>
							<p className="mt-4 text-base-content/70">{dict['party.gallery.sub']}</p>
						</div>
						<Link href={`${localizedPath('/gallery', locale)}?category=events`} className="btn btn-outline btn-primary shrink-0 self-start md:self-auto">
							{dict['party.gallery.view']}
						</Link>
					</div>
					<ScrollReveal y={30} className="mx-auto max-w-6xl">
						<PhotoGallery
							dict={dict}
							initialCategory="events"
							seed={gallerySeed}
							filteredLimit={8}
							shuffleFiltered
							showFilters={false}
							showSummary={false}
							variant="compact"
						/>
					</ScrollReveal>
				</div>
			</section>

			{/* How it works */}
			<section className="py-20 bg-base-200">
				<div className="container mx-auto px-4 max-w-4xl">
					<div className="text-center mb-10">
						<p className="text-xs tracking-[0.25em] uppercase text-base-content/50 mb-2">{dict['party.process.eyebrow']}</p>
						<h2 className="font-display text-4xl text-primary">{dict['party.process.heading']}</h2>
					</div>
					<ScrollReveal y={30} stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{PARTY_PROCESS.map((step, i) => (
							<div key={step.title} className="card bg-base-100 shadow-sm">
								<div className="card-body">
									<span className="font-display text-4xl text-secondary">{i + 1}</span>
									<h3 className="font-semibold">{step.title}</h3>
									<p className="text-sm text-base-content/70">{step.body}</p>
								</div>
							</div>
						))}
					</ScrollReveal>
				</div>
			</section>

			{/* Policies */}
			<section className="py-20 bg-base-100">
				<div className="container mx-auto px-4 max-w-3xl">
					<div className="text-center mb-10">
						<p className="text-xs tracking-[0.25em] uppercase text-base-content/50 mb-2">{dict['party.policies.eyebrow']}</p>
						<h2 className="font-display text-4xl text-primary">{dict['party.policies.heading']}</h2>
					</div>
					<div className="space-y-3">
						{PARTY_POLICIES.map((policy) => (
							<div key={policy.title} className="collapse collapse-arrow bg-base-200 border border-base-300">
								<input type="radio" name="party-policies" />
								<div className="collapse-title font-semibold">{policy.title}</div>
								<div className="collapse-content">
									<ul className="list-disc pl-5 space-y-1 text-sm text-base-content/75">
										{policy.items.map((item) => (
											<li key={item}>
												{item.includes('waiver') ? (
													<>
														{item}{' '}
														<a href={LINKS.waiver} target="_blank" rel="noopener noreferrer" className="link link-primary">
															{dict['footer.waiver']}
														</a>
													</>
												) : (
													item
												)}
											</li>
										))}
									</ul>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* SEO blurb */}
			<section className="py-12 bg-base-200">
				<div className="container mx-auto px-4 max-w-3xl text-center text-sm text-base-content/60 space-y-3">
					<p>{dict['party.seo.blurb']}</p>
					<p>{dict['party.seo.area'].replace('{cities}', SERVICE_AREA.join(', '))}</p>
					<p className="font-medium text-base-content/80">
						📍 {BUSINESS.address.street}, {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.zip} · 📞{' '}
						<a href={BUSINESS.phoneHref} className="link">(626) 657-8811</a>
					</p>
				</div>
			</section>
		</>
	)
}
