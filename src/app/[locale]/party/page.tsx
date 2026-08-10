import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getDictionary } from '@/i18n'
import { buildPageMetadata } from '@/lib/seo'
import { BUSINESS, LINKS, SERVICE_AREA } from '@/data/site'
import { PARTY_PROCESS, PARTY_POLICIES } from '@/data/party'
import { PackageTabs } from '@/components/party/PackageTabs'
import { EventPhotoMarquee } from '@/components/party/EventPhotoMarquee'
import { ScrollReveal } from '@/components/landing/ScrollReveal'
import { BalloonCelebrationOnLoad } from '@/components/ui/BalloonCelebration'
import { PhotoGallery } from '@/components/gallery/PhotoGallery'
import { localizedPath } from '@/lib/i18n-utils'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

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
		title: dict['party.meta.title'],
		description: dict['party.meta.description'],
		brand: false,
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

	const celebrationIdeas = [
		{ title: dict['party.occasions.baby.title'], detail: dict['party.occasions.baby.detail'] },
		{ title: dict['party.occasions.faith.title'], detail: dict['party.occasions.faith.detail'] },
		{ title: dict['party.occasions.first.title'], detail: dict['party.occasions.first.detail'] },
		{ title: dict['party.occasions.birthday.title'], detail: dict['party.occasions.birthday.detail'] },
		{ title: dict['party.occasions.graduation.title'], detail: dict['party.occasions.graduation.detail'] },
		{ title: dict['party.occasions.family.title'], detail: dict['party.occasions.family.detail'] },
		{ title: dict['party.occasions.play.title'], detail: dict['party.occasions.play.detail'] },
	]

	return (
		<>
			<BreadcrumbJsonLd path="/party" locale={locale} homeName={dict['nav.home']} name={dict['nav.party']} />
			<BalloonCelebrationOnLoad />
			{/* Hero */}
			<section className="navy-section relative overflow-hidden pb-12 pt-20 sm:pb-16">
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
				<EventPhotoMarquee dict={dict} />
			</section>

			{/* Celebration inspiration */}
			<section id="party-occasions" className="scroll-mt-20 overflow-hidden bg-secondary text-secondary-content">
				<div className="mx-auto grid max-w-7xl lg:grid-cols-[0.9fr_1.1fr]">
					<div className="relative min-h-[25rem] lg:min-h-full">
						<Image
							src="/gallery/processed/events/rainbow-balloon-first-birthday-backdrop.jpg"
							alt={dict['party.occasions.imageAlt']}
							fill
							sizes="(max-width: 1024px) 100vw, 45vw"
							className="object-cover"
						/>
						<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-secondary/90 to-transparent px-6 pb-6 pt-20 lg:hidden">
							<p className="max-w-md text-sm font-medium text-secondary-content">{dict['party.occasions.photoNote']}</p>
						</div>
					</div>

					<div className="px-6 py-14 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
						<p className="mb-3 text-sm font-bold text-secondary-content">{dict['party.occasions.kicker']}</p>
						<h2 className="font-display max-w-xl text-4xl leading-tight text-secondary-content md:text-5xl">
							{dict['party.occasions.heading']}
						</h2>
						<p className="mt-5 max-w-xl text-base leading-relaxed text-secondary-content">
							{dict['party.occasions.sub']}
						</p>

						<ul className="mt-10 border-t border-secondary-content/20">
							{celebrationIdeas.map((idea) => (
								<li key={idea.title} className="grid gap-1 border-b border-secondary-content/20 py-4 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6">
									<span className="text-lg font-bold">{idea.title}</span>
									<span className="text-sm text-secondary-content sm:text-right">{idea.detail}</span>
								</li>
							))}
						</ul>

						<a href="#party-packages" className="btn btn-primary mt-9">
							{dict['party.occasions.cta']}
						</a>
					</div>
				</div>
			</section>

			{/* Packages */}
			<section id="party-packages" className="scroll-mt-20 py-20 bg-base-200">
				<div className="container mx-auto px-4">
					<div className="text-center mb-10">
						<p className="text-xs tracking-[0.25em] uppercase text-base-content/65 mb-2">{dict['party.packages.eyebrow']}</p>
						<h2 id="party-packages-heading" tabIndex={-1} className="font-display text-4xl text-primary mb-3 focus:outline-none">{dict['party.packages.heading']}</h2>
						<p className="text-base-content/70 max-w-2xl mx-auto">{dict['party.packages.sub']}</p>
					</div>
					<PackageTabs dict={dict} />
				</div>
			</section>

			{/* Party moments */}
			<section id="party-gallery" className="scroll-mt-20 overflow-hidden bg-base-100 py-20">
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
							variant="compact"
						/>
					</ScrollReveal>
				</div>
			</section>

			{/* How it works */}
			<section className="py-20 bg-base-200">
				<div className="container mx-auto px-4 max-w-4xl">
					<div className="text-center mb-10">
						<p className="text-xs tracking-[0.25em] uppercase text-base-content/65 mb-2">{dict['party.process.eyebrow']}</p>
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
						<p className="text-xs tracking-[0.25em] uppercase text-base-content/65 mb-2">{dict['party.policies.eyebrow']}</p>
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
				<div className="container mx-auto px-4 max-w-3xl text-center text-sm text-base-content/70 space-y-3">
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
