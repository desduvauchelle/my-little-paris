import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getDictionary } from '@/i18n'
import { localizedPath } from '@/lib/i18n-utils'
import { buildPageMetadata } from '@/lib/seo'
import { LINKS } from '@/data/site'
import { PLAY_PASS, MEMBERSHIP, PLAYGROUND_POLICY } from '@/data/play'
import { ScrollReveal } from '@/components/landing/ScrollReveal'

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const dict = await getDictionary(locale)
	return buildPageMetadata({
		path: '/play',
		locale,
		title: `${dict['play.title']}: Indoor Playground, Open Play, Memberships & Play Passes`,
		description: dict['play.intro1'],
	})
}

function Accordion({ title, items, name }: { title: string; items: readonly string[]; name: string }) {
	return (
		<div className="collapse collapse-arrow bg-base-100 border border-base-300">
			<input type="radio" name={name} />
			<div className="collapse-title font-semibold">{title}</div>
			<div className="collapse-content">
				<ul className="list-disc pl-5 space-y-1 text-sm text-base-content/75">
					{items.map((item) => (
						<li key={item}>{item}</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default async function PlayPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const dict = await getDictionary(locale)

	return (
		<>
			{/* Hero */}
			<section className="navy-section py-20 text-center relative overflow-hidden">
				<div className="container mx-auto px-4 max-w-3xl">
					<h1 className="font-display text-5xl text-white mb-6">{dict['play.title']}</h1>
					<p className="font-display italic text-2xl text-white/90">{dict['play.quote']}</p>
					<p className="text-white/60 mt-2 text-sm tracking-widest uppercase">{dict['play.quote.author']}</p>
				</div>
			</section>

			{/* Intro */}
			<section className="py-16 bg-base-100">
				<div className="container mx-auto px-4 max-w-5xl">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
						<ScrollReveal y={30}>
							<h2 className="font-display text-4xl text-primary mb-4">{dict['play.heading']}</h2>
							<p className="text-base-content/75 mb-4">{dict['play.intro1']}</p>
							<p className="text-base-content/75">{dict['play.intro2']}</p>
						</ScrollReveal>
						<ScrollReveal y={30} delay={0.1}>
							<Image
								src="/images/playspace.webp"
								alt="The My Little Paris indoor play space"
								width={640}
								height={480}
								className="rounded-box shadow-md w-full object-cover"
							/>
						</ScrollReveal>
					</div>
				</div>
			</section>

			{/* Open Play */}
			<section className="py-16 bg-base-200">
				<div className="container mx-auto px-4 max-w-3xl">
					<ScrollReveal y={30}>
						<h2 className="font-display text-3xl text-primary text-center mb-3">{dict['play.openplay.heading']}</h2>
						<p className="text-center text-base-content/70 mb-8">{dict['play.openplay.body']}</p>

						<div className="card bg-base-100 shadow-sm">
							<div className="card-body">
								<h3 className="card-title text-primary">{dict['play.rates.heading']}</h3>
								<ul className="space-y-2">
									<li className="flex justify-between gap-4">
										<span>{dict['play.rates.babies']}</span>
										<span className="font-semibold text-primary">{dict['play.rates.babies.price']}</span>
									</li>
									<li className="flex justify-between gap-4">
										<span>{dict['play.rates.children']}</span>
										<span className="font-semibold text-primary">{dict['play.rates.children.price']}</span>
									</li>
								</ul>
								<p className="text-sm text-base-content/60 italic">{dict['play.rates.adults']}</p>
								<div className="alert bg-secondary/15 border-secondary/30 mt-2">
									<div>
										<h4 className="font-semibold">☀️ {dict['play.happyhour.heading']}</h4>
										<p className="text-sm">{dict['play.happyhour.body']}</p>
									</div>
								</div>
								<p className="text-sm text-base-content/60 mt-2">{dict['play.reservation.note']}</p>
								<div className="card-actions mt-3">
									<Link href={localizedPath('/reservations', locale)} className="btn btn-primary">
										{dict['hero.cta.reserve']}
									</Link>
								</div>
							</div>
						</div>
					</ScrollReveal>
				</div>
			</section>

			{/* Play Pass */}
			<section className="py-16 bg-base-100">
				<div className="container mx-auto px-4 max-w-3xl">
					<ScrollReveal y={30}>
						<h2 className="font-display text-3xl text-primary text-center mb-3">{dict['play.pass.heading']}</h2>
						<p className="text-base-content/70 mb-2">{dict['play.pass.body']}</p>
						<p className="font-medium mb-6">{dict['play.pass.tagline']}</p>
						<div className="space-y-3">
							<Accordion name="playpass" title={dict['play.pass.how']} items={PLAY_PASS.perks} />
							<Accordion name="playpass" title={dict['play.pass.know']} items={PLAY_PASS.thingsToKnow} />
						</div>
					</ScrollReveal>
				</div>
			</section>

			{/* Membership */}
			<section className="py-16 bg-base-200">
				<div className="container mx-auto px-4 max-w-3xl">
					<ScrollReveal y={30}>
						<h2 className="font-display text-3xl text-primary text-center mb-3">{dict['play.membership.heading']}</h2>
						<p className="text-base-content/70 mb-2">{dict['play.membership.body1']}</p>
						<p className="text-base-content/70 mb-6">{dict['play.membership.body2']}</p>

						<div className="card bg-primary text-primary-content shadow-md mb-6">
							<div className="card-body">
								<h3 className="card-title">{dict['play.membership.pricing']}</h3>
								<ul className="space-y-1">
									{MEMBERSHIP.pricing.map((tier) => (
										<li key={tier.label} className="flex justify-between gap-4">
											<span>{tier.label}</span>
											<span className="font-semibold">{tier.price}</span>
										</li>
									))}
								</ul>
							</div>
						</div>

						<div className="space-y-3">
							<Accordion name="membership" title={dict['play.membership.includes']} items={MEMBERSHIP.includes} />
							<Accordion name="membership" title={dict['play.membership.food']} items={MEMBERSHIP.foodPolicy} />
							<Accordion name="membership" title={dict['play.membership.mind']} items={MEMBERSHIP.finePrint} />
						</div>

						<div className="text-center mt-8">
							<a href={LINKS.reservations} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
								{dict['play.membership.cta']}
							</a>
						</div>
					</ScrollReveal>
				</div>
			</section>

			{/* Why families love us */}
			<section className="py-16 bg-base-100">
				<div className="container mx-auto px-4 max-w-3xl text-center">
					<ScrollReveal y={30}>
						<h2 className="font-display text-3xl text-primary mb-6">{dict['play.why.heading']}</h2>
						<ul className="space-y-2 text-base-content/80 mb-10">
							<li>✔️ {dict['play.why.1']}</li>
							<li>✔️ {dict['play.why.2']}</li>
							<li>✔️ {dict['play.why.3']}</li>
							<li>✔️ {dict['play.why.4']}</li>
						</ul>
						<h3 className="font-display text-2xl text-primary mb-3">{dict['play.cta.heading']}</h3>
						<p className="text-base-content/70">{dict['play.cta.body']}</p>
					</ScrollReveal>
				</div>
			</section>

			{/* Playground policy */}
			<section className="py-16 bg-base-200">
				<div className="container mx-auto px-4 max-w-3xl">
					<ScrollReveal y={30}>
						<h2 className="font-display text-3xl text-primary text-center mb-6">{dict['play.policy.heading']}</h2>
						<ul className="list-disc pl-6 space-y-2 text-base-content/75 mb-8">
							{PLAYGROUND_POLICY.map((rule) => (
								<li key={rule}>{rule}</li>
							))}
						</ul>
						<div className="text-center">
							<p className="font-medium mb-3">{dict['play.policy.waiver']}</p>
							<a href={LINKS.waiver} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
								{dict['play.policy.waiver.cta']}
							</a>
						</div>
					</ScrollReveal>
				</div>
			</section>
		</>
	)
}
