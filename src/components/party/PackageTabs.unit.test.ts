import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { getDictionary } from '@/i18n'
import { PackageTabs } from './PackageTabs'

describe('PackageTabs', () => {
	it('shows the package-specific deposit on the default Private Room cards', async () => {
		const dict = await getDictionary('en')
		const markup = renderToStaticMarkup(createElement(PackageTabs, { dict, locale: 'en' }))

		expect(markup.match(/Deposit: \$200/g)).toHaveLength(3)
		expect(markup).not.toContain('$200 deposit required to reserve any package')
	})

	it('localizes the deposit label', async () => {
		const dict = await getDictionary('fr')
		const markup = renderToStaticMarkup(createElement(PackageTabs, { dict, locale: 'fr' }))

		expect(markup.match(/Acompte: \$200/g)).toHaveLength(3)
		expect(markup).toContain('Salle privée')
		expect(markup).toContain('Jusqu’à 20 personnes')
		expect(markup).not.toContain('Private Room · Entry')
	})

	it('localizes the package cards in Chinese', async () => {
		const dict = await getDictionary('zh')
		const markup = renderToStaticMarkup(createElement(PackageTabs, { dict, locale: 'zh' }))

		expect(markup).toContain('独立派对房')
		expect(markup).toContain('最多 20 人')
		expect(markup).not.toContain('Private Room · Entry')
	})
})
