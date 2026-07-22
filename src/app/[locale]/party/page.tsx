import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getDictionary } from '@/i18n'
import { localizedPath } from '@/lib/i18n-utils'
import { buildPageMetadata } from '@/lib/seo'
import { BUSINESS, LINKS, SERVICE_AREA } from '@/data/site'
import { PARTY_PROCESS, PARTY_POLICIES } from '@/data/party'
import { PackageTabs } from '@/components/party/PackageTabs'
import { ScrollReveal } from '@/components/landing/ScrollReveal'
import { TrackedLink } from '@/components/landing/TrackedLink'

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

	const badges = [
		dict['party.hero.badge1'],
		dict['party.hero.badge2'],
		dict['party.hero.badge3'],
		dict['party.hero.badge4'],
	]

	return (
		<>
			{/* Announcement bar */}
			<div className="bg-secondary text-secondary-content text-center text-sm py-2 px-4">
				{dict['party.announcement']}
			</div>

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
					<a href="#book" className="btn btn-lg bg-white text-[#001d61] border-0 hover:bg-white/90">
						{dict['party.hero.cta']} →
					</a>
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
			<section className="py-16 bg-base-100">
				<div className="container mx-auto px-4">
					<ScrollReveal y={30} stagger={0.1} className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto">
						<Image src="/images/party-photo-2.webp" alt="Party room set up with long tables and balloon arch" width={400} height={400} className="rounded-box object-cover aspect-square" />
						<Image src="/images/party-photo-1.webp" alt="Kids playing in the indoor playground" width={400} height={400} className="rounded-box object-cover aspect-square" />
						<Image src="/images/superhero-kid.webp" alt="Little superhero at a themed party" width={400} height={400} className="rounded-box object-cover aspect-square" />
						<Image src="/images/party-balloon.webp" alt="Party balloons" width={400} height={400} className="rounded-box object-cover aspect-square" />
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

			{/* Book CTA */}
			<section id="book" className="navy-section py-20 scroll-mt-20">
				<div className="container mx-auto px-4 text-center max-w-2xl">
					<h2 className="font-display text-4xl text-white mb-3">{dict['party.cta.heading']}</h2>
					<p className="text-white/80 mb-8">{dict['party.cta.body']}</p>
					<div className="flex flex-wrap justify-center gap-4 mb-4">
						<TrackedLink
							href={localizedPath('/party-reservation', locale)}
							className="btn btn-lg bg-white text-[#001d61] border-0 hover:bg-white/90"
							eventName="cta_click"
						>
							{dict['party.cta.inquiry']}
						</TrackedLink>
						<a href={BUSINESS.smsHref} className="btn btn-lg btn-outline text-white border-white/50 hover:bg-white hover:text-[#001d61] hover:border-white">
							{dict['party.cta.text']}
						</a>
					</div>
					<a href={BUSINESS.phoneHref} className="text-white/80 hover:text-white underline">
						{dict['party.cta.call'].replace('{phone}', `(626) 657-8811`)}
					</a>
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
					<p>
						<Link href={localizedPath('/party-reservation', locale)} className="link link-primary">
							{dict['party.cta.inquiry']}
						</Link>
					</p>
				</div>
			</section>
		</>
	)
}
