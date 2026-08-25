import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { getDictionary } from '@/i18n'
import { PackageTabs } from './PackageTabs'

describe('PackageTabs', () => {
	it('shows the package-specific deposit on the default Private Room cards', async () => {
		const dict = await getDictionary('en')
		const markup = renderToStaticMarkup(createElement(PackageTabs, { dict }))

		expect(markup.match(/Deposit: \$200/g)).toHaveLength(3)
		expect(markup).not.toContain('$200 deposit required to reserve any package')
	})

	it('localizes the deposit label', async () => {
		const dict = await getDictionary('fr')
		const markup = renderToStaticMarkup(createElement(PackageTabs, { dict }))

		expect(markup.match(/Acompte: \$200/g)).toHaveLength(3)
	})
})
