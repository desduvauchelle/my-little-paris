import type { Metadata } from 'next'
import { getDictionary } from '@/i18n'
import { buildPageMetadata } from '@/lib/seo'
import { getLegalDoc } from '@/content/legal'
import { LegalDocument } from '@/components/legal/LegalDocument'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params
	const dict = await getDictionary(locale)
	return buildPageMetadata({
		path: '/cookies',
		locale,
		title: dict['page.cookie.policy'],
		description: getLegalDoc(locale, 'cookies').summary,
	})
}

export default async function CookiesPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	const dict = await getDictionary(locale)

	return <LegalDocument locale={locale} doc="cookies" title={dict['page.cookie.policy']} />
}
