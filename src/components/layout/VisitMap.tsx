import type { Dictionary } from '@/i18n'
import { BUSINESS, LINKS } from '@/data/site'
import { MapPinIcon, PhoneIcon } from './ContactIcons'

/**
 * "Visit Us" strip: address, phone and a Google map, sitting directly above
 * the footer.
 *
 * Lives inside the Footer (not a homepage section) so it renders on every
 * page — the header's address and phone shortcuts link to `#visit`, and an
 * anchor that only exists on one route would be a dead link everywhere else.
 *
 * The map is queried by name + street address rather than a short link, so
 * the pin follows BUSINESS.address if that is ever corrected. Both of the
 * client's Google links (LINKS.directions, LINKS.hoursGoogle) resolve to this
 * same place at 34.102975, -118.0948152.
 *
 * `scroll-mt-24` clears the sticky header when the anchor is jumped to.
 */
export function VisitMap({ dict }: { dict: Dictionary }) {
	const mapQuery = `${BUSINESS.name}, ${BUSINESS.address.street}, ${BUSINESS.address.city}, ${BUSINESS.address.state} ${BUSINESS.address.zip}`
	const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`

	return (
		<section id="visit" className="scroll-mt-24 bg-base-200 py-14">
			<div className="container mx-auto px-4">
				<div className="mx-auto grid max-w-6xl items-stretch gap-8 lg:grid-cols-[0.85fr_1.15fr]">
					{/* Address / phone / hours */}
					<div className="flex flex-col justify-center">
						<h2 className="font-display text-4xl text-primary">{dict['footer.visit.heading']}</h2>

						<a
							href={LINKS.directions}
							target="_blank"
							rel="noopener noreferrer"
							className="group mt-6 flex items-start gap-3 text-base-content/80 hover:text-primary"
						>
							<MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
							<span className="not-italic">
								{BUSINESS.address.street}
								<br />
								{BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.zip}
							</span>
						</a>

						<a href={BUSINESS.phoneHref} className="mt-4 flex items-center gap-3 text-base-content/80 hover:text-primary">
							<PhoneIcon className="h-5 w-5 shrink-0 text-secondary" />
							<span>{dict['footer.contact.calltext'].replace('{phone}', BUSINESS.phoneDisplay)}</span>
						</a>

						<p className="mt-5 text-sm text-base-content/60">{dict['footer.hours.body']}</p>

						<div className="mt-6 flex flex-wrap gap-3">
							<a href={LINKS.directions} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
								{dict['home.about.directions']}
							</a>
							<a href={BUSINESS.phoneHref} className="btn btn-outline btn-primary">
								{BUSINESS.phoneDisplay}
							</a>
						</div>
					</div>

					{/* Map. Fixed aspect on purpose: a map pane pans rather than
					    scrolls, so a set height here does not create the
					    scrollbar-inside-a-scrollbar problem a document iframe would. */}
					<div className="overflow-hidden rounded-box border border-base-300 shadow-sm">
						<iframe
							src={mapSrc}
							title={dict['footer.map.title']}
							loading="lazy"
							allowFullScreen
							referrerPolicy="no-referrer-when-downgrade"
							className="block h-full min-h-[20rem] w-full border-0"
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
