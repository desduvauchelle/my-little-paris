import Image from 'next/image'
import Link from 'next/link'
import { CalendarIcon, ClockIcon, PauseIcon, SettingsIcon } from './Icons'
import styles from './booking-wireframe.module.css'

const links = [
	{ href: '/admin/bookings', label: 'Bookings', icon: CalendarIcon },
	{ href: '/admin/bookings/availability', label: 'Availability', icon: ClockIcon },
	{ href: '/admin/bookings/closures', label: 'Closures & events', icon: PauseIcon },
	{ href: '/admin/bookings/settings', label: 'Settings', icon: SettingsIcon },
]

export function AdminShell({ active, children }: { active: string; children: React.ReactNode }) {
	return (
		<div className={styles.adminApp}>
			<aside className={styles.sidebar}>
				<div className={styles.adminLogo}>
					<Image src="/images/logo-white.webp" alt="My Little Paris" width={156} height={36} priority />
					<span>Reservations</span>
				</div>
				<nav aria-label="Booking administration" className={styles.adminNav}>
					{links.map(({ href, label, icon: NavIcon }) => (
						<Link key={href} href={href} className={active === label ? styles.navActive : undefined}>
							<NavIcon />
							<span>{label}</span>
						</Link>
					))}
				</nav>
				<div className={styles.sidebarFooter}>
					<div className={styles.avatar}>ML</div>
					<div><strong>My Little Paris</strong><span>San Gabriel</span></div>
				</div>
			</aside>
			<div className={styles.adminMain}>
				<div className={styles.mobileAdminBar}>
					<div className={styles.mobileBrand}><Image src="/images/logo-blue.webp" alt="My Little Paris" width={120} height={28} /><span>Reservations</span></div>
					<nav className={styles.mobileAdminNav} aria-label="Booking administration">
						{links.map(({ href, label }) => <Link key={href} href={href} className={active === label ? styles.mobileNavActive : undefined}>{label === 'Closures & events' ? 'Closures' : label}</Link>)}
					</nav>
				</div>
				{children}
			</div>
		</div>
	)
}
