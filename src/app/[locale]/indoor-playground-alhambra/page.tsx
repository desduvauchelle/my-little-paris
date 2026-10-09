import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getDictionary } from '@/i18n'
import { localizedPath } from '@/lib/i18n-utils'
import { buildPageMetadata } from '@/lib/seo'
import { BUSINESS } from '@/data/site'
import { GALLERY_PHOTOS } from '@/data/gallery'
import { getGalleryPhotoAlt } from '@/lib/gallery-alt'
import { cn } from '@/lib/utils'
import { ALHAMBRA_COPY as copy, ALHAMBRA_META, ALHAMBRA_PATH } from '@/content/alhambra'
import { ScrollReveal } from '@/components/landing/ScrollReveal'
import { BreadcrumbJsonLd, FaqJsonLd } from '@/components/seo/JsonLd'

// Mostly the play space, with a few café plates mixed in (order = display order).
const FOOD_SLUGS = [
	'cafe-sandwich-beside-indoor-playground',
	'cheeseburger-fries-beside-playground',
	'croque-monsieur-fries-cafe-plate',
]
const SPACE_PHOTOS = GALLERY_PHOTOS['the-space'].filter((photo) => !photo.src.includes('party-room'))
const FOOD_PHOTOS = FOOD_SLUGS.flatMap((slug) => GALLERY_PHOTOS.food.filter((photo) => photo.src.includes(slug)))
const ALHAMBRA_GALLERY = [
	...SPACE_PHOTOS.slice(0, 4),
	FOOD_PHOTOS[0],
	...SPACE_PHOTOS.slice(4, 7),
	FOOD_PHOTOS[1],
	...SPACE_PHOTOS.slice(7, 9),
	FOOD_PHOTOS[2],
].filter((photo) => photo !== undefined)

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	return buildPageMetadata({
		path: ALHAMBRA_PATH,
		locale,
		title: ALHAMBRA_META.title,
		description: ALHAMBRA_META.description,
		brand: false,
	})
}

export default async function IndoorPlaygroundAlhambraPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const dict = await getDictionary(locale)
	const reservationsHref = localizedPath('/reservations', locale)
	const partyHref = localizedPath('/party', locale)
	const partyInquiryHref = `${partyHref}#party-inquiry`
	const playHref = localizedPath('/play', locale)

	return (
		<>
			<BreadcrumbJsonLd path={ALHAMBRA_PATH} locale={locale} homeName={dict['nav.home']} name={copy.breadcrumb} />
			<FaqJsonLd items={copy.faq} />

			{/* Hero */}
			<section className="navy-section relative overflow-hidden">
				<div className="container mx-auto px-4">
					<div className="mx-auto grid max-w-6xl items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
						<div className="text-center lg:text-left">
							<p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/60">{copy.eyebrow}</p>
							<h1 className="font-display text-4xl italic leading-[1.1] text-white md:text-6xl">{copy.h1}</h1>
							<p className="mx-auto mt-5 max-w-xl text-lg text-white/80 lg:mx-0">{copy.sub}</p>
							<div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
								<Link
									href={reservationsHref}
									data-ga-event="cta_click"
									data-ga-location="alhambra-hero-reserve"
									className="btn btn-secondary border-0 shadow-lg shadow-black/20 sm:btn-lg"
								>
									{copy.ctaSession}
								</Link>
								<Link
									href={partyInquiryHref}
									data-ga-event="cta_click"
									data-ga-location="alhambra-hero-party"
									className="btn btn-outline border-secondary text-secondary hover:border-secondary hover:bg-secondary hover:text-secondary-content sm:btn-lg"
								>
									{copy.ctaParty}
								</Link>
							</div>
							<p className="mt-6 text-sm text-white/55">
								{BUSINESS.address.street}, {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.zip}
							</p>
						</div>
						<div className="relative mx-auto w-full max-w-md lg:max-w-none">
							<div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border-[6px] border-base-100 shadow-2xl shadow-black/40">
								<Image
									src="/images/hero-cafe-play.webp"
									alt={copy.heroImageAlt}
									fill
									priority
									sizes="(max-width: 1024px) 100vw, 45vw"
									className="object-cover"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Intro */}
			<section className="bg-base-100 py-16">
				<div className="container mx-auto max-w-3xl px-4">
					<ScrollReveal y={30}>
						<h2 className="mb-4 font-display text-4xl text-primary">{copy.introHeading}</h2>
						{copy.intro.map((paragraph) => (
							<p key={paragraph} className="mb-4 text-base-content/75">
								{paragraph}
							</p>
						))}
					</ScrollReveal>
				</div>
			</section>

			{/* Is it worth the drive? */}
			<section className="bg-base-200 py-16">
				<div className="container mx-auto max-w-5xl px-4">
					<div className="mb-10 text-center">
						<h2 className="font-display text-4xl text-primary">{copy.driveHeading}</h2>
						<p className="mt-3 text-base-content/70">{copy.driveSub}</p>
					</div>
					<ScrollReveal y={30} stagger={0.1} className="grid grid-cols-1 gap-6 md:grid-cols-3">
						{copy.drive.map((item) => (
							<div key={item.title} className="card bg-base-100 shadow-sm">
								<div className="card-body">
									<h3 className="card-title text-primary">{item.title}</h3>
									<p className="text-sm text-base-content/75">{item.body}</p>
								</div>
							</div>
						))}
					</ScrollReveal>
				</div>
			</section>

			{/* Eat & Play session */}
			<section className="bg-base-100 py-16">
				<div className="container mx-auto max-w-5xl px-4">
					<div className="mb-10 text-center">
						<h2 className="font-display text-4xl text-primary">{copy.sessionHeading}</h2>
						<p className="mt-3 text-base-content/70">{copy.sessionSub}</p>
					</div>
					<ScrollReveal y={30} stagger={0.1} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
						{copy.steps.map((step, i) => (
							<div key={step.title} className="card bg-base-200 shadow-sm">
								<div className="card-body">
									<span className="font-display text-4xl text-secondary">{i + 1}</span>
									<h3 className="font-semibold">{step.title}</h3>
									<p className="text-sm text-base-content/75">{step.body}</p>
								</div>
							</div>
						))}
					</ScrollReveal>
					<p className="mt-8 text-center font-medium text-primary">{copy.pricing}</p>
					<div className="mt-6 text-center">
						<Link
							href={reservationsHref}
							data-ga-event="cta_click"
							data-ga-location="alhambra-session-reserve"
							className="btn btn-primary"
						>
							{copy.ctaSession}
						</Link>
					</div>
				</div>
			</section>

			{/* Photo gallery */}
			<section aria-labelledby="alhambra-gallery-heading" className="bg-base-200 py-16">
				<div className="container mx-auto max-w-6xl px-4">
					<div className="mb-10 text-center">
						<h2 id="alhambra-gallery-heading" className="font-display text-4xl text-primary">
							{copy.galleryHeading}
						</h2>
						<p className="mt-3 text-base-content/70">{copy.gallerySub}</p>
					</div>
					<div className="columns-2 gap-3 md:columns-3 md:gap-4">
						{ALHAMBRA_GALLERY.map((photo, index) => (
							<figure
								key={photo.src}
								className={cn(
									'relative mb-3 break-inside-avoid overflow-hidden rounded-box bg-base-300 md:mb-4',
									index % 5 === 0 || index % 7 === 0 ? 'aspect-[4/3]' : 'aspect-[4/5]',
								)}
							>
								<Image
									src={photo.src}
									alt={getGalleryPhotoAlt(dict, photo)}
									fill
									sizes="(max-width: 768px) 50vw, 33vw"
									className="object-cover"
								/>
							</figure>
						))}
					</div>
					<div className="mt-8 text-center">
						<Link
							href={`${localizedPath('/gallery', locale)}?category=the-space`}
							data-ga-event="cta_click"
							data-ga-location="alhambra-gallery"
							className="btn btn-outline btn-primary"
						>
							{copy.galleryCta}
						</Link>
					</div>
				</div>
			</section>

			{/* Why families choose us */}
			<section className="bg-base-100 py-16">
				<div className="container mx-auto max-w-5xl px-4">
					<div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
						<ScrollReveal y={30}>
							<h2 className="mb-6 font-display text-4xl text-primary">{copy.whyHeading}</h2>
							<ul className="space-y-3 text-base-content/80">
								{copy.why.map((item) => (
									<li key={item}>✔️ {item}</li>
								))}
							</ul>
						</ScrollReveal>
						<ScrollReveal y={30} delay={0.1}>
							<Image
								src="/images/playspace.webp"
								alt={copy.whyImageAlt}
								width={640}
								height={480}
								className="w-full rounded-box object-cover shadow-md"
							/>
						</ScrollReveal>
					</div>
				</div>
			</section>

			{/* Parties */}
			<section className="bg-base-200 py-16">
				<div className="container mx-auto max-w-3xl px-4">
					<ScrollReveal y={30}>
						<div className="card bg-primary text-primary-content shadow-md">
							<div className="card-body">
								<h2 className="font-display text-3xl">{copy.partyHeading}</h2>
								<p className="text-white/85">{copy.partyBody}</p>
								<ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/85">
									{copy.partyBullets.map((item) => (
										<li key={item}>{item}</li>
									))}
								</ul>
								<div className="card-actions mt-4">
									<Link
										href={partyHref}
										data-ga-event="cta_click"
										data-ga-location="alhambra-party"
										className="btn btn-secondary border-0"
									>
										{copy.partyCta}
									</Link>
								</div>
							</div>
						</div>
					</ScrollReveal>
				</div>
			</section>

			{/* Passes & memberships */}
			<section className="bg-base-100 py-16">
				<div className="container mx-auto max-w-4xl px-4">
					<h2 className="mb-8 text-center font-display text-4xl text-primary">{copy.regularsHeading}</h2>
					<ScrollReveal y={30} stagger={0.1} className="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div className="card bg-base-100 shadow-sm">
							<div className="card-body">
								<h3 className="card-title text-primary">{copy.passTitle}</h3>
								<p className="text-sm text-base-content/75">{copy.passBody}</p>
							</div>
						</div>
						<div className="card bg-base-100 shadow-sm">
							<div className="card-body">
								<h3 className="card-title text-primary">{copy.memberTitle}</h3>
								<p className="text-sm text-base-content/75">{copy.memberBody}</p>
							</div>
						</div>
					</ScrollReveal>
					<div className="mt-8 text-center">
						<Link
							href={playHref}
							data-ga-event="cta_click"
							data-ga-location="alhambra-regulars"
							className="btn btn-outline btn-primary"
						>
							{copy.regularsCta}
						</Link>
					</div>
				</div>
			</section>

			{/* FAQ */}
			<section aria-labelledby="alhambra-faq-heading" className="bg-base-100 py-16 sm:py-20">
				<div className="container mx-auto max-w-5xl px-4">
					<div className="mx-auto max-w-3xl text-center">
						<p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-base-content/65">{copy.faqEyebrow}</p>
						<h2 id="alhambra-faq-heading" className="font-display text-4xl text-primary md:text-5xl">
							{copy.faqHeading}
						</h2>
					</div>
					<dl className="mt-10 grid gap-4 md:grid-cols-2">
						{copy.faq.map((item) => (
							<div key={item.question} className="rounded-box border border-base-300 bg-base-200 p-6">
								<dt className="text-lg font-bold leading-snug text-primary">{item.question}</dt>
								<dd className="mt-3 leading-relaxed text-base-content/80">{item.answer}</dd>
							</div>
						))}
					</dl>
				</div>
			</section>

			{/* Final CTA */}
			<section className="navy-section py-16 text-center">
				<div className="container mx-auto max-w-2xl px-4">
					<h2 className="font-display text-4xl text-white">{copy.finalHeading}</h2>
					<p className="mt-4 text-white/80">{copy.finalBody}</p>
					<div className="mt-7 flex flex-wrap justify-center gap-3">
						<Link
							href={partyInquiryHref}
							data-ga-event="cta_click"
							data-ga-location="alhambra-final-party"
							className="btn btn-secondary btn-lg border-0"
						>
							{copy.finalPartyCta}
						</Link>
						<Link
							href={reservationsHref}
							data-ga-event="cta_click"
							data-ga-location="alhambra-final-reserve"
							className="btn btn-outline btn-lg border-white/60 text-white hover:bg-white hover:text-primary"
						>
							{copy.ctaSession}
						</Link>
						<a href={BUSINESS.phoneHref} className="btn btn-outline btn-lg border-white/60 text-white hover:bg-white hover:text-primary">
							{copy.callLabel} {BUSINESS.phoneDisplay}
						</a>
						<a href={`mailto:${BUSINESS.email}`} className="btn btn-outline btn-lg border-white/60 text-white hover:bg-white hover:text-primary">
							{copy.emailLabel}
						</a>
					</div>
					<p className="mt-8 text-sm text-white/65">
						{BUSINESS.name}, {BUSINESS.address.street}, {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.zip}
					</p>
					<p className="mt-2 text-sm text-white/55">{copy.servingLabel}</p>
				</div>
			</section>
		</>
	)
}
