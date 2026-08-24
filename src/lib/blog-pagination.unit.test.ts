import { describe, expect, it } from 'vitest'
import { parseBlogPage } from './blog-pagination'

describe('parseBlogPage', () => {
	it('accepts positive page numbers and rejects invalid values', () => {
		expect(parseBlogPage('3')).toBe(3)
		expect(parseBlogPage(['2', '4'])).toBe(2)
		expect(parseBlogPage('0')).toBe(1)
		expect(parseBlogPage('-1')).toBe(1)
		expect(parseBlogPage('2extra')).toBe(1)
		expect(parseBlogPage('not-a-number')).toBe(1)
	})
})
