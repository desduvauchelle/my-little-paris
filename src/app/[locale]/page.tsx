import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getBlogPosts } from '@growth-engine/sdk-server'
import { BlogCard } from '@growth-engine/sdk-client/components'
import { getDictionary } from '@/i18n'
import { getDb, safeQuery } from '@/lib/db'
import { localePrefix, localizedPath } from '@/lib/i18n-utils'
import { buildPageMetadata } from '@/lib/seo'
import { LINKS } from '@/data/site'
import { FEATURED_DISHES } from '@/data/menu'
import { Hero } from '@/components/landing/Hero'
import { Pillars } from '@/components/landing/Pillars'
import { Newsletter } from '@/components/landing/Newsletter'
import { CTA } from '@/components/landing/CTA'
import { ScrollReveal } from '@/components/landing/ScrollReveal'
import { SocialIcon } from '@/components/layout/SocialIcon'
import { cn } from '@/lib/utils'

export const revalidate = 60

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const dict = await getDictionary(locale)
	// Homepage canonical is the (locale-aware) site root; title is the brand itself.
	return buildPageMetadata({
		path: '',
		locale,
		title: dict['hero.title'],
		description: dict['hero.subtitle'],
		brand: false,
	})
}

const GALLERY = [
	{ src: '/images/party-photo-1.webp', alt: 'Kids playing in the My Little Paris play space' },
	{ src: '/images/gallery-3.webp', alt: 'Coffee and a French pastry at the café' },
	{ src: '/images/party-photo-2.webp', alt: 'Birthday party room set up with balloon arch' },
	{ src: '/images/superhero-kid.webp', alt: 'Little superhero at a themed event' },
	{ src: '/images/gallery-2.webp', alt: 'Party balloons and decorations' },
	{ src: '/images/gallery-1.webp', alt: 'Little hands playing with toy cars' },
] as const

export default async function HomePage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const dict = await getDictionary(locale)
	const posts = await safeQuery([], () => getBlogPosts(getDb(), { locale, limit: 3 }))

	const HOW_STEPS = [
		{ title: dict['home.how.step1.title'], body: dict['home.how.step1.body'], emoji: '📅' },
		{ title: dict['home.how.step2.title'], body: dict['home.how.step2.body'], emoji: '🛝' },
		{ title: dict['home.how.step3.title'], body: dict['home.how.step3.body'], emoji: '🥐' },
	]

	return (
		<>
			<Hero dict={dict} locale={locale} />

			{/* Summer promo */}
			<section className="py-16 bg-base-100">
				<div className="container mx-auto px-4">
					<ScrollReveal y={30} className="card lg:card-side bg-primary text-primary-content max-w-4xl mx-auto overflow-hidden shadow-lg">
						<div className="card-body lg:flex-row lg:items-center gap-8">
							<div className="flex-1">
								<div className="badge badge-secondary mb-3">☀️ {dict['home.promo.badge']}</div>
								<h2 className="font-display text-4xl mb-3">{dict['home.promo.title']}</h2>
								<p className="opacity-90 mb-2">{dict['home.promo.body']}</p>
								<p className="text-sm opacity-70 mb-4">{dict['home.promo.valid']}</p>
								<ul className="text-sm space-y-1 opacity-90">
									<li>✔ {dict['home.promo.point1']}</li>
									<li>✔ {dict['home.promo.point2']}</li>
									<li>✔ {dict['home.promo.point3']}</li>
									<li>✔ {dict['home.promo.point4']}</li>
								</ul>
							</div>
							<div className="shrink-0">
								<Link
									href={localizedPath('/reservations', locale)}
									className="btn btn-lg bg-white text-[#001d61] border-0 hover:bg-white/90"
								>
									{dict['home.promo.cta']}
								</Link>
							</div>
						</div>
					</ScrollReveal>
				</div>
			</section>

			{/* Play / Party / Eat / Drinks pillars */}
			<Pillars dict={dict} locale={locale} />

			{/* Food showcase */}
			<section className="py-20 bg-base-200">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="font-display text-4xl text-primary mb-3">{dict['home.food.heading']}</h2>
						<p className="text-base-content/70 max-w-2xl mx-auto">{dict['home.food.sub']}</p>
					</div>
					<ScrollReveal y={40} stagger={0.12} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
						{FEATURED_DISHES.map((dish) => (
							<div key={dish.name} className="card bg-base-100 shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
								<figure className="relative h-60">
									<Image
										src={dish.image}
										alt={dish.name}
										fill
										sizes="(max-width: 768px) 100vw, 33vw"
										className={cn('object-cover', dish.imagePosition)}
									/>
								</figure>
								<div className="card-body py-5">
									<div className="flex items-baseline justify-between gap-3">
										<h3 className="card-title font-display text-xl text-primary">{dish.name}</h3>
										<span className="font-semibold text-primary whitespace-nowrap text-sm">{dish.price}</span>
									</div>
									<p className="text-sm text-base-content/70">{dish.description}</p>
								</div>
							</div>
						))}
					</ScrollReveal>
					<div className="flex flex-wrap justify-center gap-3 mt-10">
						<Link href={localizedPath('/eat', locale)} className="btn btn-primary">
							{dict['home.food.cta']}
						</Link>
						<Link href={localizedPath('/kidsmenu', locale)} className="btn btn-outline btn-primary">
							{dict['menu.kids']}
						</Link>
					</div>
				</div>
			</section>

			{/* How it works (Acuity booking) */}
			<section className="py-20 bg-base-100">
				<div className="container mx-auto px-4 max-w-5xl">
					<div className="text-center mb-12">
						<h2 className="font-display text-4xl text-primary mb-3">{dict['home.how.heading']}</h2>
						<p className="text-base-content/70">{dict['home.how.sub']}</p>
					</div>
					<ScrollReveal y={30} stagger={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{HOW_STEPS.map((step, i) => (
							<div key={step.title} className="card bg-base-200 shadow-sm">
								<div className="card-body items-center text-center">
									<span className="text-4xl" aria-hidden>{step.emoji}</span>
									<span className="font-display text-3xl text-secondary">{i + 1}</span>
									<h3 className="font-semibold">{step.title}</h3>
									<p className="text-sm text-base-content/70">{step.body}</p>
								</div>
							</div>
						))}
					</ScrollReveal>
					<div className="text-center mt-10">
						<Link href={localizedPath('/reservations', locale)} className="btn btn-primary btn-lg">
							{dict['hero.cta.reserve']}
						</Link>
					</div>
				</div>
			</section>

			{/* About / story */}
			<section className="py-20 bg-base-200">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
						<ScrollReveal y={30}>
							<Image
								src="/images/party-photo-1.webp"
								alt="Children playing in the My Little Paris play space"
								width={640}
								height={480}
								className="rounded-box shadow-md w-full object-cover"
							/>
						</ScrollReveal>
						<ScrollReveal y={30} delay={0.1}>
							<h2 className="font-display text-4xl text-primary mb-4">{dict['home.about.heading']}</h2>
							<p className="font-display italic text-lg text-base-content/60 border-l-4 border-secondary pl-4 mb-5">
								{dict['home.about.quote']}
							</p>
							<p className="mb-4 text-base-content/80">{dict['home.about.p1']}</p>
							<p className="mb-6 text-base-content/80">{dict['home.about.p2']}</p>
							<div className="flex flex-wrap gap-3">
								<Link href={localizedPath('/reservations', locale)} className="btn btn-primary">
									{dict['hero.cta.reserve']}
								</Link>
								<a href={LINKS.directions} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-primary">
									{dict['home.about.directions']}
								</a>
								<Link href={localizedPath('/our-story', locale)} className="btn btn-ghost">
									{dict['nav.story']} →
								</Link>
							</div>
						</ScrollReveal>
					</div>
				</div>
			</section>

			{/* Membership teaser */}
			<section className="py-16 bg-base-100">
				<div className="container mx-auto px-4">
					<ScrollReveal y={30} className="card bg-secondary/15 border border-secondary/30 max-w-4xl mx-auto">
						<div className="card-body lg:flex-row lg:items-center gap-6">
							<div className="flex-1">
								<h2 className="font-display text-3xl text-primary mb-2">{dict['home.value.heading']}</h2>
								<p className="text-base-content/75">{dict['home.value.body']}</p>
							</div>
							<Link href={localizedPath('/play', locale)} className="btn btn-primary shrink-0">
								{dict['home.value.cta']}
							</Link>
						</div>
					</ScrollReveal>
				</div>
			</section>

			{/* Upcoming events strip */}
			<section className="py-16 bg-base-200">
				<div className="container mx-auto px-4">
					<ScrollReveal y={30} className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
						<Image
							src="/images/event-tea-party.svg"
							alt="Princess Tea Party event poster"
							width={220}
							height={275}
							className="rounded-box shadow-md w-48"
						/>
						<div className="text-center md:text-left">
							<h2 className="font-display text-4xl text-primary mb-3">{dict['home.events.heading']}</h2>
							<p className="text-base-content/70 mb-5">{dict['home.events.body']}</p>
							<Link href={localizedPath('/events', locale)} className="btn btn-primary">
								{dict['home.events.cta']}
							</Link>
						</div>
					</ScrollReveal>
				</div>
			</section>

			{/* Cleaning & sanitizing */}
			<section className="py-14 bg-base-100">
				<div className="container mx-auto px-4 max-w-3xl text-center">
					<ScrollReveal y={30}>
						<h2 className="font-display text-3xl text-primary mb-4">🧼 {dict['home.cleaning.heading']}</h2>
						<p className="text-base-content/70 mb-2">{dict['home.cleaning.p1']}</p>
						<p className="text-base-content/70">{dict['home.cleaning.p2']}</p>
					</ScrollReveal>
				</div>
			</section>

			{/* Instagram feed */}
			<section className="py-16 bg-base-200">
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-center gap-2 mb-2">
						<SocialIcon platform="instagram" href={LINKS.instagram} className="text-primary" />
						<h2 className="font-display text-4xl text-primary text-center">{dict['home.gallery.heading']}</h2>
					</div>
					<p className="text-center text-base-content/70 mb-10">{dict['home.gallery.sub']}</p>
					<ScrollReveal y={40} stagger={0.08} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 max-w-6xl mx-auto">
						{GALLERY.map((img) => (
							<a
								key={img.src}
								href={LINKS.instagram}
								target="_blank"
								rel="noopener noreferrer"
								className="relative aspect-square overflow-hidden rounded-box group"
							>
								<Image
									src={img.src}
									alt={img.alt}
									fill
									sizes="(max-width: 768px) 50vw, 16vw"
									className="object-cover group-hover:scale-105 transition-transform duration-300"
								/>
							</a>
						))}
					</ScrollReveal>
					<p className="text-center mt-8">
						<a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-primary">
							{dict['home.gallery.follow']}
						</a>
					</p>
				</div>
			</section>

			{/* Blog strip (Growth Engine powered — hidden gracefully when empty) */}
			{posts.length > 0 && (
				<section className="py-20 bg-base-100">
					<div className="container mx-auto px-4">
						<div className="flex items-center justify-between mb-10">
							<h2 className="font-display text-3xl text-primary">{dict['home.latest.blog']}</h2>
							<Link href={localizedPath('/blog', locale)} className="btn btn-ghost btn-sm">
								{dict['home.view.all']} →
							</Link>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{posts.map((post) => (
								<BlogCard
									key={post.id}
									slug={post.slug}
									title={post.title}
									content={post.content}
									heroImageUrl={post.heroImageUrl}
									seoDesc={post.seoDesc}
									createdAt={post.createdAt}
									locale={locale}
									localePrefix={localePrefix(locale)}
								/>
							))}
						</div>
					</div>
				</section>
			)}

			<Newsletter dict={dict} />
			<CTA dict={dict} locale={locale} />
		</>
	)
}
