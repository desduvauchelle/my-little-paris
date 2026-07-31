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
import { Hero } from '@/components/landing/Hero'
import { Pillars } from '@/components/landing/Pillars'
import { Newsletter } from '@/components/landing/Newsletter'
import { CTA } from '@/components/landing/CTA'
import { ScrollReveal } from '@/components/landing/ScrollReveal'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { PhotoGallery } from '@/components/gallery/PhotoGallery'
import { InstagramPostEmbed } from '@/components/social/InstagramPostEmbed'
import { getInstagramPost } from '@/lib/instagram'

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

export default async function HomePage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const dict = await getDictionary(locale)
	const posts = await safeQuery([], () => getBlogPosts(getDb(), { locale, limit: 3 }))
	const gallerySeed = new Date().getUTCDate() + locale.length * 31
	const instagramPost = getInstagramPost(process.env.INSTAGRAM_POST_URL)

	return (
		<>
			<Hero dict={dict} locale={locale} />

			{/* Eat / Drink / Play / Party pillars */}
			<Pillars dict={dict} locale={locale} />

			{/* The space — real venue photography, surfaced early for first-time visitors */}
			<section className="overflow-hidden bg-base-200 py-20">
				<div className="container mx-auto px-4">
					<div className="mx-auto mb-10 max-w-6xl">
						<div className="max-w-2xl">
							<p className="mb-3 text-sm font-semibold text-accent">{dict['home.gallery.kicker']}</p>
							<h2 className="font-display text-4xl text-primary md:text-5xl">{dict['home.gallery.heading']}</h2>
							<p className="mt-4 text-base-content/70">{dict['home.gallery.sub']}</p>
						</div>
					</div>

					<ScrollReveal y={36} className="mx-auto max-w-6xl">
						<PhotoGallery
							dict={dict}
							seed={gallerySeed}
							filteredLimit={8}
							shuffleFiltered
							variant="compact"
						/>
					</ScrollReveal>

					{instagramPost && (
						<InstagramPostEmbed
							embedUrl={instagramPost.embedUrl}
							title={dict['home.gallery.follow']}
						/>
					)}

					<div className={`${instagramPost ? 'mt-5' : 'mt-8'} flex flex-wrap justify-center gap-3`}>
						<Link href={localizedPath('/gallery', locale)} className="btn btn-primary">
							{dict['home.gallery.view']}
						</Link>
						<a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm text-primary">
							{dict['home.gallery.follow']} →
						</a>
					</div>
				</div>
			</section>

			{/* How it works (Acuity booking) */}
			<HowItWorks dict={dict} locale={locale} />

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
							<p className="font-display italic text-lg text-base-content/70 border-l-4 border-secondary pl-4 mb-5">
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

			{/* Cleaning & sanitizing */}
			<section className="py-20 bg-base-100">
				<div className="container mx-auto px-4">
					<ScrollReveal
						y={30}
						className="grid max-w-6xl mx-auto overflow-hidden rounded-box bg-primary text-primary-content shadow-lg lg:grid-cols-[1.08fr_0.92fr]"
					>
						<div className="relative min-h-72 sm:min-h-96 lg:min-h-[30rem]">
							<Image
								src="/images/sparkling-clean-playground.webp"
								alt={dict['home.cleaning.image.alt']}
								fill
								sizes="(max-width: 1024px) 100vw, 55vw"
								className="object-cover"
							/>
						</div>
						<div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14">
							<p className="mb-4 text-sm font-semibold text-primary-content/75">
								<span aria-hidden>✦</span> {dict['home.cleaning.eyebrow']}
							</p>
							<h2 className="font-display text-4xl text-balance sm:text-5xl">
								{dict['home.cleaning.heading']}
							</h2>
							<p className="mt-7 font-display text-3xl text-secondary sm:text-4xl">
								{dict['home.cleaning.frequency']}
							</p>
							<p className="mt-4 max-w-xl text-primary-content/85">
								{dict['home.cleaning.p1']}
							</p>
							<div className="mt-8 border-t border-primary-content/25 pt-6">
								<p className="font-semibold text-primary-content">
									{dict['home.cleaning.pause']}
								</p>
								<p className="mt-2 max-w-xl text-sm leading-relaxed text-primary-content/75">
									{dict['home.cleaning.p2']}
								</p>
							</div>
						</div>
					</ScrollReveal>
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
