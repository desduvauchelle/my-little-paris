export type BlogCtaKind = 'party' | 'reservations'

interface BlogCtaPost {
	title: string
	slug: string
	seoTitle?: string | null
	urlPath?: string | null
}

const PARTY_INTENT_PATTERN =
	/\b(?:birthday|birthdays|party|parties|celebration|celebrations|event venue|baby shower|baby showers)\b/i

const SUPPLEMENTAL_SECTION_PATTERN =
	/^#{2,3}\s+(?:(?:frequently asked questions|faqs?)\b[^\n]*|(?:sources?|references?)\b[^\n]*|related (?:reading|articles|posts)\b[^\n]*|more resources\b[^\n]*)\s*$/gim

/**
 * Classify from search-intent fields only. Article bodies often mention both
 * play sessions and parties, so using body copy would send general visitors
 * to the wrong next step.
 */
export function getBlogCtaKind(post: BlogCtaPost): BlogCtaKind {
	const searchIntent = [post.title, post.slug, post.seoTitle, post.urlPath]
		.filter(Boolean)
		.join(' ')
		.replaceAll(/[-_/]+/g, ' ')

	return PARTY_INTENT_PATTERN.test(searchIntent) ? 'party' : 'reservations'
}

/**
 * Keep FAQs and source lists as supporting material after the conversion
 * prompt. If a post has no supplemental section, the prompt closes the article
 * while related-post navigation still follows it on the page.
 */
export function insertBlogCta(content: string, cta: string): string {
	const normalizedContent = content.trimEnd()
	const normalizedCta = cta.trim()

	if (!normalizedCta || normalizedContent.includes(normalizedCta)) {
		return normalizedContent
	}

	SUPPLEMENTAL_SECTION_PATTERN.lastIndex = 0
	const supplementalSection = SUPPLEMENTAL_SECTION_PATTERN.exec(normalizedContent)

	if (supplementalSection?.index === undefined) {
		return `${normalizedContent}\n\n${normalizedCta}`
	}

	const resolvedContent = normalizedContent.slice(0, supplementalSection.index).trimEnd()
	const supplementalContent = normalizedContent.slice(supplementalSection.index).trimStart()

	return `${resolvedContent}\n\n${normalizedCta}\n\n${supplementalContent}`
}
