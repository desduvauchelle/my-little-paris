import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { PACKAGE_GROUPS, TIME_SLOTS, VERSAILLES_TIME_SLOTS } from '@/data/party'
import dict from '@/i18n/dictionaries/en'
import { PartyInquiryForm } from './PartyInquiryForm'

vi.mock('@/components/analytics/GoogleAnalytics', () => ({ trackEvent: vi.fn() }))

const packages = PACKAGE_GROUPS.flatMap((group) => [...group.catered.packages, ...group.rentalOnly.packages])
const propsFor = (id: string) => ({
	dict,
	selectedPackage: { package: packages.find((item) => item.id === id)!, formValue: id },
	onChoosePackage: vi.fn(),
})

afterEach(() => vi.unstubAllGlobals())

describe('party inquiry', () => {
	it('offers all eleven three-hour Versailles slots and retains the other-time option', () => {
		const markup = renderToStaticMarkup(createElement(PartyInquiryForm, propsFor('versailles')))
		expect(VERSAILLES_TIME_SLOTS).toHaveLength(11)
		for (const slot of VERSAILLES_TIME_SLOTS) expect(markup).toContain(`>${slot}</option>`)
		for (const slot of TIME_SLOTS) expect(markup).not.toContain(`>${slot}</option>`)
		expect(markup).toContain(dict['partyform.time.other'])
	})

	it('preserves standard times for every other package', () => {
		for (const item of packages.filter((item) => item.id !== 'versailles')) {
			const markup = renderToStaticMarkup(createElement(PartyInquiryForm, propsFor(item.id)))
			for (const slot of TIME_SLOTS) expect(markup).toContain(`>${slot}</option>`)
			expect(markup).not.toContain('>5:00 pm – 8:00 pm</option>')
		}
	})

	it('resets the time field when switching between Versailles and standard packages', () => {
		const timeSelect = (id: string) => {
			const form = PartyInquiryForm(propsFor(id))
			const visit = (node: unknown): string | null => {
				if (!node || typeof node !== 'object') return null
				const element = node as { type?: string; key?: string; props?: { name?: string; children?: unknown } }
				if (element.type === 'select' && element.props?.name === 'partyTime') return element.key ?? null
				const children = element.props?.children
				for (const child of Array.isArray(children) ? children : [children]) {
					const found = visit(child)
					if (found) return found
				}
				return null
			}
			return visit(form)
		}
		expect(timeSelect('versailles')).toBe('versailles')
		expect(timeSelect('opera')).toBe('standard')
	})

	it('renders the discovery textbox as optional', () => {
		const markup = renderToStaticMarkup(createElement(PartyInquiryForm, propsFor('versailles')))
		expect(markup).toContain(dict['partyform.discovery'])
		const input = markup.match(/<input[^>]*name="discovery"[^>]*>/)?.[0]
		expect(input).toBeDefined()
		expect(input).not.toContain('required')
	})

	it.each(['A friend recommended you', ''])('includes a discovery answer only when provided: %s', (discovery) => {
		const location = { href: '' }
		vi.stubGlobal('window', { location })
		vi.stubGlobal('FormData', class {
			entries() {
				return Object.entries({ discovery, partyPackage: 'versailles', partyTime: VERSAILLES_TIME_SLOTS[10] })
			}
		})
		const form = PartyInquiryForm(propsFor('versailles'))
		form.props.onSubmit({ preventDefault: vi.fn(), currentTarget: {} })
		const body = new URL(location.href).searchParams.get('body')!
		expect(body).toContain(VERSAILLES_TIME_SLOTS[10])
		if (discovery) expect(body).toContain(`${dict['partyform.discovery']}: ${discovery}`)
		else expect(body).not.toContain(dict['partyform.discovery'])
	})
})
