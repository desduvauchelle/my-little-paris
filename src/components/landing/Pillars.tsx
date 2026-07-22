import Image from 'next/image'
import Link from 'next/link'
import type { Dictionary } from '@/i18n'
import { localizedPath } from '@/lib/i18n-utils'
import { ScrollReveal } from './ScrollReveal'

const PILLARS = [
	{ key: 'play', href: '/play', image: '/images/playspace.webp' },
	{ key: 'party', href: '/party', image: '/images/party-photo-2.webp' },
	{ key: 'eat', href: '/eat', image: '/images/pesto-sandwich.webp' },
	{ key: 'drink', href: '/drink', image: '/images/drink-menu-tile.webp' },
] as const

export function Pillars({ dict, locale }: { dict: Dictionary; locale: string }) {
	return (
		<section className="py-20 bg-base-100">
			<div className="container mx-auto px-4">
				<ScrollReveal y={40} stagger={0.12} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{PILLARS.map((pillar) => (
						<div key={pillar.key} className="card bg-base-200 shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
							<figure className="relative h-44">
								<Image
									src={pillar.image}
									alt={dict[`home.pillar.${pillar.key}.title`]}
									fill
									sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
									className="object-cover"
								/>
							</figure>
							<div className="card-body">
								<h3 className="card-title font-display text-2xl text-primary">
									{dict[`home.pillar.${pillar.key}.title`]}
								</h3>
								<p className="font-semibold text-sm">{dict[`home.pillar.${pillar.key}.tagline`]}</p>
								<p className="text-sm text-base-content/70">{dict[`home.pillar.${pillar.key}.body`]}</p>
								<div className="card-actions mt-2">
									<Link href={localizedPath(pillar.href, locale)} className="link link-primary text-sm font-medium">
										{dict[`home.pillar.${pillar.key}.cta`]} →
									</Link>
								</div>
							</div>
						</div>
					))}
				</ScrollReveal>
			</div>
		</section>
	)
}
