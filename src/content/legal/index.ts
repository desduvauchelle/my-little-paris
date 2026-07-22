import { defaultLocale } from '@/i18n/config'
import type { LegalContent, LegalDoc } from './types'
import en from './en'
import fr from './fr'
import zh from './zh'

export type { LegalContent, LegalDoc, LegalSection } from './types'

/** Which document a page is rendering. */
export type LegalDocKey = 'terms' | 'privacy' | 'cookies'

/**
 * Mirrors `getDictionary()` in `@/i18n` — unknown locales fall back to the
 * default rather than throwing, so a bogus segment can never 500 a legal page.
 */
export function getLegalContent(locale: string): LegalContent {
	switch (locale) {
		case 'fr':
			return fr
		case 'zh':
			return zh
		case 'en':
			return en
		default:
			return getLegalContent(defaultLocale)
	}
}

export function getLegalDoc(locale: string, doc: LegalDocKey): LegalDoc {
	return getLegalContent(locale)[doc]
}
