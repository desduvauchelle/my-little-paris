'use client'

import { useUpdates } from '@growth-engine/sdk-client'
import { UpdateCard } from './UpdateCard'

// Use the portal's Slug field; its display path adds a slash that is not part of the slug.
const LANDING_UPDATES_LIST = 'landing-page'

export function LandingUpdates({ locale, heading }: { locale: string; heading: string }) {
	const { items, loading, error } = useUpdates(LANDING_UPDATES_LIST, { limit: 3 })
	if (loading || error || items.length === 0) return null

	return (
		<section aria-labelledby="landing-updates-heading" className="bg-secondary/10 py-16 md:py-20">
			<div className="mx-auto max-w-6xl px-4">
				<h2 id="landing-updates-heading" className="mb-9 font-display text-3xl text-primary md:text-4xl">
					{heading}
				</h2>
				<ul className="grid list-none gap-6 p-0 md:grid-cols-3">
					{items.slice(0, 3).map((item) => (
						<li key={item.id} className="min-w-0">
							<UpdateCard item={item} locale={locale} />
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}
