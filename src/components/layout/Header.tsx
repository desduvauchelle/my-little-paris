import Link from 'next/link'
import Image from 'next/image'
import type { Dictionary } from '@/i18n'
import { supportedLocales } from '@/i18n/config'
import { localizedPath } from '@/lib/i18n-utils'
import { LINKS } from '@/data/site'
import { SocialIcon } from './SocialIcon'
import { LanguageSwitcher } from './LanguageSwitcher'
import { MobileMenu } from './MobileMenu'

export function Header({ dict, locale }: { dict: Dictionary; locale: string }) {
	// Reservations is promoted out of this list into the booking button below;
	// Our Story lives in the footer only.
	const NAV_LINKS = [
		{ href: localizedPath('/menu', locale), label: dict['nav.menu'] },
		{ href: localizedPath('/play', locale), label: dict['nav.play'] },
		{ href: localizedPath('/party', locale), label: dict['nav.party'] },
		{ href: localizedPath('/events', locale), label: dict['nav.events'] },
	]

	// Same element on desktop and mobile — on mobile it sits beside the
	// hamburger so booking never costs a tap to find.
	const bookButton = (
		<Link
			href={localizedPath('/reservations', locale)}
			className="btn btn-sm bg-white text-[#001d61] border-0 font-semibold hover:bg-white/90"
		>
			{dict['nav.book']}
		</Link>
	)

	return (
		<header className="navy-section sticky top-0 z-50 shadow-md">
			<div className="navbar container mx-auto px-4">
				<div className="flex-1">
					<Link href={localizedPath('/', locale)} className="inline-flex items-center" aria-label="My Little Paris Café & Play Home">
						<Image
							src="/images/logo-white.webp"
							alt="My Little Paris Café & Play"
							width={180}
							height={41}
							priority
							className="h-9 w-auto"
						/>
					</Link>
				</div>

				{/* Desktop nav */}
				<nav className="hidden lg:flex items-center gap-5">
					{NAV_LINKS.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="text-sm text-white/85 hover:text-white transition-colors"
						>
							{link.label}
						</Link>
					))}
					<span className="flex items-center gap-2 pl-2 border-l border-white/20">
						<SocialIcon platform="facebook" href={LINKS.facebook} className="text-white/70 hover:text-white" />
						<SocialIcon platform="instagram" href={LINKS.instagram} className="text-white/70 hover:text-white" />
						<SocialIcon platform="yelp" href={LINKS.yelp} className="text-white/70 hover:text-white" />
					</span>
					<LanguageSwitcher locale={locale} locales={supportedLocales} variant="onDark" />
					{bookButton}
				</nav>

				{/* Mobile nav — client component handles toggle state */}
				<div className="flex items-center gap-2 lg:hidden">
					{bookButton}
					<MobileMenu links={NAV_LINKS} locale={locale} locales={supportedLocales} />
				</div>
			</div>
		</header>
	)
}
