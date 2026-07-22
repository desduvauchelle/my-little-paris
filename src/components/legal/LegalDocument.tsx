import { BUSINESS } from '@/data/site'
import { formatDate } from '@/lib/i18n-utils'
import { getLegalContent, type LegalDocKey } from '@/content/legal'

/**
 * Renders one legal document. All three legal pages are this component with a
 * different `doc` — the structure is identical, only the copy differs.
 *
 * Contact details are interpolated from BUSINESS rather than written into the
 * copy, so the legal pages can never quote a stale address or phone number.
 */
function interpolate(text: string) {
	return text
		.replace(/\{entity\}/g, BUSINESS.legalEntity)
		.replace(
			/\{address\}/g,
			`${BUSINESS.address.street}, ${BUSINESS.address.city}, ${BUSINESS.address.state} ${BUSINESS.address.zip}`,
		)
		.replace(/\{email\}/g, BUSINESS.email)
		.replace(/\{phone\}/g, BUSINESS.phoneDisplay)
}

/**
 * `new Date('2026-07-22')` is parsed as UTC midnight, which in Pacific time is
 * the evening of the 21st — so a date-only string renders a day early here.
 * Build the date from its parts so it is local from the start.
 */
function localDate(isoDay: string) {
	const [year, month, day] = isoDay.split('-').map(Number)
	return new Date(year, month - 1, day)
}

export function LegalDocument({ locale, doc, title }: { locale: string; doc: LegalDocKey; title: string }) {
	const content = getLegalContent(locale)
	const { intro, sections } = content[doc]

	return (
		<main className="container mx-auto max-w-3xl px-4 py-12">
			<h1 className="font-display text-4xl text-primary">{title}</h1>

			<p className="mt-3 text-sm text-base-content/55">
				{content.lastUpdatedLabel} {formatDate(localDate(BUSINESS.legalUpdated), locale)}
			</p>

			{content.translationNote && (
				<p className="mt-4 rounded-box border border-base-300 bg-base-200 px-4 py-3 text-sm text-base-content/70">
					{content.translationNote}
				</p>
			)}

			<div className="prose prose-lg mt-8 max-w-none">
				{intro.map((paragraph) => (
					<p key={paragraph}>{interpolate(paragraph)}</p>
				))}

				{sections.map((section) => (
					<section key={section.heading}>
						<h2>{section.heading}</h2>
						{section.paragraphs.map((paragraph) => (
							<p key={paragraph}>{interpolate(paragraph)}</p>
						))}
						{section.bullets && (
							<ul>
								{section.bullets.map((bullet) => (
									<li key={bullet}>{interpolate(bullet)}</li>
								))}
							</ul>
						)}
					</section>
				))}
			</div>
		</main>
	)
}
