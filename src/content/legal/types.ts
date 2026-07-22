/**
 * Long-form legal copy lives here rather than in the i18n dictionaries.
 *
 * Dictionaries are `Record<key, string>` — one flat string per key. That suits
 * UI labels but not a policy with a dozen headings, multi-paragraph bodies and
 * bulleted lists; expressing that as flat keys would mean ~150 entries per
 * locale with the document's structure encoded in the key names. These
 * documents are structured data, so they are typed as structured data.
 *
 * Placeholders `{entity}`, `{address}`, `{email}`, `{phone}` and `{updated}`
 * are substituted at render time from BUSINESS in `@/data/site`, so the legal
 * pages cannot drift from the contact details shown everywhere else.
 */

export interface LegalSection {
	heading: string
	/** Rendered as <p> in order. */
	paragraphs: string[]
	/** Optional <ul> rendered after the paragraphs. */
	bullets?: string[]
}

export interface LegalDoc {
	/** One sentence, used as the page's meta description. */
	summary: string
	/** Lead paragraphs, rendered before the first heading. */
	intro: string[]
	sections: LegalSection[]
}

export interface LegalContent {
	/** e.g. "Last updated" — the date itself is formatted per locale. */
	lastUpdatedLabel: string
	/** Shown on non-English locales: the English version is authoritative. */
	translationNote?: string
	/** Standing note that this is not legal advice, shown on every document. */
	terms: LegalDoc
	privacy: LegalDoc
	cookies: LegalDoc
}
