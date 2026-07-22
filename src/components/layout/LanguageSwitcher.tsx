'use client'

import { usePathname, useRouter } from 'next/navigation'
import { localizedPath } from '@/lib/i18n-utils'
import { cn } from '@/lib/utils'

// Short pill labels — the switcher shows the locale code, not the full name.
const LOCALE_LABELS: Record<string, string> = {
	en: 'EN',
	fr: 'FR',
	es: 'ES',
	de: 'DE',
	it: 'IT',
	pt: 'PT',
	nl: 'NL',
	ja: '日本語',
	zh: '中文',
	ko: 'KO',
	ar: 'AR',
	ru: 'RU',
}

// `locales` MUST be passed from a server component: the list is derived from
// server-only env vars (DEFAULT_LANGUAGE / ADDITIONAL_LANGUAGES), which are
// undefined in the browser bundle. Reading them here made SSR render the
// control while the client rendered null — a hydration mismatch.
export function LanguageSwitcher({
	locale,
	locales,
	variant = 'onLight',
}: {
	locale: string
	locales: string[]
	variant?: 'onDark' | 'onLight'
}) {
	const pathname = usePathname()
	const router = useRouter()

	if (locales.length <= 1) {
		return null
	}

	function switchTo(newLocale: string) {
		if (newLocale === locale) return

		// Strip any existing locale prefix to recover the locale-agnostic path…
		const segments = pathname.split('/')
		const firstSegment = segments[1] ?? ''
		const barePath = locales.includes(firstSegment)
			? `/${segments.slice(2).join('/')}`
			: pathname

		// …then re-apply the prefix per the default-locale-is-bare rule. The
		// default language gets no prefix; every other language gets `/<locale>`.
		router.push(localizedPath(barePath, newLocale))
	}

	const onDark = variant === 'onDark'

	return (
		<div
			role="group"
			aria-label="Select language"
			className={cn(
				'inline-flex w-fit items-center gap-0.5 rounded-full p-0.5',
				onDark ? 'bg-white/10 ring-1 ring-white/20' : 'bg-base-200 ring-1 ring-base-300',
			)}
		>
			{locales.map((loc) => {
				const active = loc === locale
				return (
					<button
						key={loc}
						type="button"
						onClick={() => switchTo(loc)}
						aria-pressed={active}
						className={cn(
							'rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide transition-colors',
							active
								? onDark
									? 'bg-white text-primary shadow-sm'
									: 'bg-primary text-primary-content shadow-sm'
								: onDark
									? 'text-white/70 hover:text-white'
									: 'text-base-content/60 hover:text-base-content',
						)}
					>
						{LOCALE_LABELS[loc] ?? loc.toUpperCase()}
					</button>
				)
			})}
		</div>
	)
}
