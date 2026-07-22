import Link from 'next/link'
import Image from 'next/image'
import type { Dictionary } from '@/i18n'
import { localizedPath } from '@/lib/i18n-utils'
import { BUSINESS, LINKS } from '@/data/site'
import { SocialIcon } from './SocialIcon'
import { MessageIcon, PhoneIcon } from './ContactIcons'
import { VisitMap } from './VisitMap'

export function Footer({ dict, locale }: { dict: Dictionary; locale: string }) {
	const year = new Date().getFullYear()

	const EXPLORE = [
		{ href: localizedPath('/reservations', locale), label: dict['nav.reservations'] },
		{ href: localizedPath('/menu', locale), label: dict['nav.menu'] },
		{ href: localizedPath('/play', locale), label: dict['nav.play'] },
		{ href: localizedPath('/party', locale), label: dict['nav.party'] },
		{ href: localizedPath('/events', locale), label: dict['nav.events'] },
		{ href: localizedPath('/our-story', locale), label: dict['nav.story'] },
		{ href: localizedPath('/blog', locale), label: dict['nav.blog'] },
		{ href: localizedPath('/contact', locale), label: dict['nav.contact'] },
	]

	return (
		<footer className="navy-section">
			{/* Map strip sits above the footer proper — the header's address and
			    phone shortcuts scroll here, on every page. */}
			<VisitMap dict={dict} />

			<div className="container mx-auto px-4 py-14">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
					{/* Brand */}
					<div>
						<Image
							src="/images/logo-white.webp"
							alt="My Little Paris Café & Play"
							width={200}
							height={46}
							className="h-10 w-auto mb-4"
						/>
						<p className="text-white/60 text-sm mb-4">{dict['menu.tagline']}</p>
						<div className="flex items-center gap-3">
							<SocialIcon platform="facebook" href={LINKS.facebook} className="text-white/60 hover:text-white" />
							<SocialIcon platform="instagram" href={LINKS.instagram} className="text-white/60 hover:text-white" />
							<SocialIcon platform="yelp" href={LINKS.yelp} className="text-white/60 hover:text-white" />
						</div>
					</div>

					{/* Contact */}
					<div>
						<h4 className="font-semibold mb-3 text-white">{dict['footer.contact.heading']}</h4>
						<div className="flex flex-col gap-2 text-sm text-white/70">
							<a href={BUSINESS.phoneHref} className="flex items-center gap-2 hover:text-white">
								<PhoneIcon className="h-4 w-4 shrink-0" />
								{dict['footer.contact.call'].replace('{phone}', BUSINESS.phoneDisplay)}
							</a>
							<a href={BUSINESS.smsHref} className="flex items-center gap-2 hover:text-white">
								<MessageIcon className="h-4 w-4 shrink-0" />
								{dict['footer.contact.text'].replace('{phone}', BUSINESS.phoneDisplay)}
							</a>
							<a href={LINKS.directions} target="_blank" rel="noopener noreferrer" className="hover:text-white">
								{BUSINESS.address.street}
								<br />
								{BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.zip}
							</a>
							<a href={`mailto:${BUSINESS.email}`} className="hover:text-white">
								{BUSINESS.email}
							</a>
							<a href={LINKS.waiver} target="_blank" rel="noopener noreferrer" className="link link-hover text-white/70 hover:text-white underline">
								{dict['footer.waiver']}
							</a>
						</div>
					</div>

					{/* Hours */}
					<div>
						<h4 className="font-semibold mb-3 text-white">{dict['footer.hours.heading']}</h4>
						<div className="flex flex-col gap-2 text-sm text-white/70">
							<p>{dict['footer.hours.body']}</p>
							<a href={LINKS.hoursGoogle} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
								{dict['footer.hours.google']}
							</a>
							<a href={LINKS.yelp} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
								{dict['footer.hours.yelp']}
							</a>
							<a
								href={LINKS.reservations}
								target="_blank"
								rel="noopener noreferrer"
								className="btn btn-sm bg-white text-[#001d61] border-0 hover:bg-white/90 mt-2 w-fit"
							>
								{dict['footer.reserve']}
							</a>
						</div>
					</div>

					{/* Explore */}
					<div>
						<h4 className="font-semibold mb-3 text-white">{dict['footer.navigation']}</h4>
						<nav className="grid grid-cols-2 gap-1">
							{EXPLORE.map((link) => (
								<Link key={link.href} href={link.href} className="text-sm text-white/70 hover:text-white">
									{link.label}
								</Link>
							))}
						</nav>
						<h4 className="font-semibold mt-5 mb-2 text-white">{dict['footer.legal']}</h4>
						<nav className="flex flex-col gap-1">
							<Link href={localizedPath('/legal', locale)} className="text-sm text-white/70 hover:text-white">{dict['footer.legal.notice']}</Link>
							<Link href={localizedPath('/privacy', locale)} className="text-sm text-white/70 hover:text-white">{dict['footer.privacy.policy']}</Link>
							<Link href={localizedPath('/cookies', locale)} className="text-sm text-white/70 hover:text-white">{dict['footer.cookie.policy']}</Link>
						</nav>
					</div>
				</div>

				<div className="border-t border-white/15 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
					<p className="text-sm text-white/50">
						{dict['footer.copyright'].replace('{year}', String(year))}
					</p>
					<p className="text-xs text-white/35">{dict['footer.powered.by']}</p>
				</div>
			</div>
		</footer>
	)
}
