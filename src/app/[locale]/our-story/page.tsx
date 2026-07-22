import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getDictionary } from '@/i18n'
import { localizedPath } from '@/lib/i18n-utils'
import { buildPageMetadata } from '@/lib/seo'
import { ScrollReveal } from '@/components/landing/ScrollReveal'

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
		title: dict['story.heading'],
		description: dict['story.p1'].slice(0, 155),
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
						<Image
							src="/images/playspace.webp"
							alt="The My Little Paris indoor play space"
							width={800}
							height={600}
							className="rounded-box shadow-md w-full object-cover mb-12"
						/>
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
