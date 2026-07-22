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
		path: '/menu',
		locale,
		title: dict['menu.heading'],
		description: dict['menu.tagline'],
	})
}

export default async function MenuPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const dict = await getDictionary(locale)

	const TILES = [
		{ href: '/eat', label: dict['menu.eat'], image: '/images/eat-menu-tile.webp' },
		{ href: '/drink', label: dict['menu.drink'], image: '/images/drink-menu-tile.webp' },
		{ href: '/kidsmenu', label: dict['menu.kids'], image: '/images/pesto-sandwich.webp' },
	]

	return (
		<>
			<section className="navy-section py-16 text-center">
				<h1 className="font-display text-5xl text-white mb-3">{dict['menu.heading']}</h1>
				<p className="text-white/75">{dict['menu.sub']}</p>
			</section>

			<section className="py-20 bg-base-100">
				<div className="container mx-auto px-4">
					<ScrollReveal y={40} stagger={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
						{TILES.map((tile) => (
							<Link
								key={tile.href}
								href={localizedPath(tile.href, locale)}
								className="card bg-base-200 shadow-sm hover:shadow-xl transition-shadow overflow-hidden group"
							>
								<figure className="relative h-64">
									<Image
										src={tile.image}
										alt={tile.label}
										fill
										sizes="(max-width: 768px) 100vw, 33vw"
										className="object-cover group-hover:scale-105 transition-transform duration-300"
									/>
								</figure>
								<div className="card-body items-center py-5">
									<h2 className="card-title font-display text-2xl text-primary">{tile.label}</h2>
								</div>
							</Link>
						))}
					</ScrollReveal>
					<p className="text-center font-display italic text-2xl text-base-content/60 mt-14">
						{dict['menu.tagline']}
					</p>
				</div>
			</section>
		</>
	)
}
