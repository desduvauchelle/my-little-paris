import type { Metadata } from 'next'
import { getDictionary } from '@/i18n'
import { localizedPath } from '@/lib/i18n-utils'
import { buildPageMetadata } from '@/lib/seo'
import { EAT_MENU } from '@/data/menu'
import { MenuJumpNav, MenuSections } from '@/components/menu/MenuSections'

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const dict = await getDictionary(locale)
	return buildPageMetadata({
		path: '/eat',
		locale,
		title: dict['eat.heading'],
		description: dict['eat.sub'],
	})
}

export default async function EatPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const dict = await getDictionary(locale)

	return (
		<>
			<section className="navy-section py-16 text-center">
				<h1 className="font-display text-5xl text-white mb-3">{dict['eat.heading']}</h1>
				<p className="text-white/75 max-w-xl mx-auto px-4">{dict['eat.sub']}</p>
			</section>

			<section className="py-16 bg-base-100">
				<div className="container mx-auto px-4">
					<MenuJumpNav
						label={dict['eat.jump']}
						sections={EAT_MENU}
						extraLinks={[
							{ href: localizedPath('/kidsmenu', locale), label: dict['eat.kids.link'] },
							{ href: localizedPath('/drink', locale), label: dict['eat.drinks.link'] },
						]}
					/>
					<MenuSections sections={EAT_MENU} dict={dict} />
				</div>
			</section>
		</>
	)
}
