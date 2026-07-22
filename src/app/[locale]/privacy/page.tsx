import type { Metadata } from 'next'
import { getDictionary } from '@/i18n'
import { buildPageMetadata } from '@/lib/seo'
import { getLegalDoc } from '@/content/legal'
import { LegalDocument } from '@/components/legal/LegalDocument'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params
	const dict = await getDictionary(locale)
	return buildPageMetadata({
		path: '/privacy',
		locale,
		title: dict['page.privacy.policy'],
		description: getLegalDoc(locale, 'privacy').summary,
	})
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	const dict = await getDictionary(locale)

	return <LegalDocument locale={locale} doc="privacy" title={dict['page.privacy.policy']} />
}
