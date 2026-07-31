import { describe, expect, it } from 'vitest'
import { getInstagramPost } from './instagram'

describe('getInstagramPost', () => {
	it('builds a captioned embed URL from a post URL', () => {
		expect(getInstagramPost('https://www.instagram.com/p/ABC_123-x/?igsh=example')).toEqual({
			postUrl: 'https://www.instagram.com/p/ABC_123-x/',
			embedUrl: 'https://www.instagram.com/p/ABC_123-x/embed/captioned/',
		})
	})

	it('supports Instagram reel URLs', () => {
		expect(getInstagramPost('https://instagram.com/reel/Example123/')).toEqual({
			postUrl: 'https://www.instagram.com/reel/Example123/',
			embedUrl: 'https://www.instagram.com/reel/Example123/embed/captioned/',
		})
	})

	it.each([
		undefined,
		'',
		'https://example.com/p/ABC123/',
		'http://www.instagram.com/p/ABC123/',
		'https://www.instagram.com/mylittlepariscafeplay/',
	])('rejects missing or unsupported URLs: %s', (value) => {
		expect(getInstagramPost(value)).toBeNull()
	})
})
