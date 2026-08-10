import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getDictionary } from '@/i18n'
import { localizedPath } from '@/lib/i18n-utils'
import { buildPageMetadata } from '@/lib/seo'
import { ScrollReveal } from '@/components/landing/ScrollReveal'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const dict = await getDictionary(locale)
	return buildPageMetadata({
		path: '/our-story',
		locale,
		title: dict['story.meta.title'],
		description: dict['story.meta.description'],
		brand: false,
	})
}

export default async function OurStoryPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const dict = await getDictionary(locale)

	return (
		<>
			<BreadcrumbJsonLd path="/our-story" locale={locale} homeName={dict['nav.home']} name={dict['nav.story']} />
			<section className="navy-section py-16 text-center">
				<h1 className="font-display text-5xl text-white">{dict['story.heading']}</h1>
			</section>

			<section className="py-16 bg-base-100">
				<div className="container mx-auto px-4 max-w-3xl">
					<ScrollReveal y={30}>
						<p className="text-base-content/80 mb-5 first-letter:font-display first-letter:text-5xl first-letter:text-primary first-letter:float-left first-letter:mr-2 first-letter:leading-none">
							{dict['story.p1']}
						</p>
						<p className="text-base-content/80 mb-5">{dict['story.p2']}</p>
						<p className="font-display italic text-2xl text-primary text-center my-10">{dict['story.p3']}</p>
					</ScrollReveal>

					<ScrollReveal y={30}>
						<div className="relative mx-auto mb-12 aspect-[4/5] w-full max-w-xl overflow-hidden rounded-box shadow-md">
							<Image
								src="/images/my-little-paris-family.jpg"
								alt="The My Little Paris family celebrating together beneath a pastel balloon arch"
								fill
								sizes="(max-width: 640px) 100vw, 576px"
								className="object-cover"
							/>
						</div>
					</ScrollReveal>

					<ScrollReveal y={30}>
						<h2 className="font-display text-4xl text-primary mb-5 text-center">{dict['story.name.heading']}</h2>
						<p className="text-base-content/80 mb-5">{dict['story.name.p1']}</p>
						<p className="text-base-content/80 mb-5">{dict['story.name.p2']}</p>
						<p className="font-display italic text-2xl text-primary text-center my-10">{dict['story.name.p3']}</p>
						<div className="text-center">
							<Link href={localizedPath('/reservations', locale)} className="btn btn-primary btn-lg">
								{dict['story.visit.cta']}
							</Link>
						</div>
					</ScrollReveal>
				</div>
			</section>
		</>
	)
}
