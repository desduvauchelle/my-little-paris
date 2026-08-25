import { describe, expect, it } from 'vitest'
import { PACKAGE_FORM_VALUES } from './party'
import { getLocalizedPartyContent, hasPartyTranslation } from './party-localized'

function collectTranslatableStrings(value: unknown, path = ''): Array<{ path: string; value: string }> {
	if (typeof value === 'string') {
		const structuralField = /\.(id|name|badge|emoji|weekday|weekend|deposit)$/.test(path)
		return !structuralField && /[A-Za-z]/.test(value) ? [{ path, value }] : []
	}
	if (Array.isArray(value)) {
		return value.flatMap((item, index) => collectTranslatableStrings(item, `${path}[${index}]`))
	}
	if (value && typeof value === 'object') {
		return Object.entries(value).flatMap(([key, item]) => collectTranslatableStrings(item, `${path}.${key}`))
	}
	return []
}

describe('localized party content', () => {
	it('keeps package identifiers and prices stable in every language', () => {
		const english = getLocalizedPartyContent('en')

		for (const locale of ['fr', 'zh']) {
			const localized = getLocalizedPartyContent(locale)
			expect(localized.packageGroups.map((group) => group.id)).toEqual(
				english.packageGroups.map((group) => group.id),
			)
			expect(localized.packageGroups.flatMap((group) => group.catered.packages.map((pkg) => [pkg.id, pkg.weekday, pkg.weekend, pkg.deposit]))).toEqual(
				english.packageGroups.flatMap((group) => group.catered.packages.map((pkg) => [pkg.id, pkg.weekday, pkg.weekend, pkg.deposit])),
			)
		}

		expect(PACKAGE_FORM_VALUES.opera).toBe('Opéra Private Room Package ($460 weekday / $590 weekend)')
	})

	it('translates every party-content surface into French', () => {
		const content = getLocalizedPartyContent('fr')
		const rendered = JSON.stringify(content)

		expect(rendered).toContain('Salle privée')
		expect(rendered).toContain('Espace entier')
		expect(rendered).toContain('Tarif selon le nombre d’invités')
		expect(rendered).toContain('Envoyez votre demande')
		expect(rendered).toContain('Acomptes et conditions d’annulation')
		expect(rendered).toContain('Location du lieu · Salle privée')
		expect(rendered).not.toContain('Guest pricing')
		expect(rendered).not.toContain('Send Your Inquiry')
		expect(rendered).not.toContain('Deposits & Cancellation Policy')
	})

	it('translates every party-content surface into Chinese', () => {
		const content = getLocalizedPartyContent('zh')
		const rendered = JSON.stringify(content)

		expect(rendered).toContain('独立派对房')
		expect(rendered).toContain('全场包场')
		expect(rendered).toContain('宾客计价')
		expect(rendered).toContain('发送咨询')
		expect(rendered).toContain('订金与取消政策')
		expect(rendered).toContain('场地租赁 · 独立派对房')
		expect(rendered).not.toContain('Guest pricing')
		expect(rendered).not.toContain('Send Your Inquiry')
		expect(rendered).not.toContain('Deposits & Cancellation Policy')
	})

	it('has an explicit French and Chinese translation for every visible source string', () => {
		const sourceStrings = collectTranslatableStrings(getLocalizedPartyContent('en'))
		const missing = ['fr', 'zh'].flatMap((locale) =>
			sourceStrings
				.filter(({ value }) => !hasPartyTranslation(locale, value))
				.map(({ path, value }) => `${locale} ${path}: ${value}`),
		)

		expect(missing).toEqual([])
	})
})
