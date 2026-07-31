const INSTAGRAM_HOSTS = new Set(['instagram.com', 'www.instagram.com'])
const POST_TYPES = new Set(['p', 'reel', 'tv'])
const SHORTCODE_PATTERN = /^[A-Za-z0-9_-]+$/

export type InstagramPost = {
	postUrl: string
	embedUrl: string
}

export function getInstagramPost(value: string | undefined): InstagramPost | null {
	if (!value) return null

	try {
		const url = new URL(value.trim())
		const [type, shortcode] = url.pathname.split('/').filter(Boolean)

		if (
			url.protocol !== 'https:' ||
			!INSTAGRAM_HOSTS.has(url.hostname.toLowerCase()) ||
			!POST_TYPES.has(type) ||
			!shortcode ||
			!SHORTCODE_PATTERN.test(shortcode)
		) {
			return null
		}

		const postUrl = `https://www.instagram.com/${type}/${shortcode}/`
		return {
			postUrl,
			embedUrl: `${postUrl}embed/captioned/`,
		}
	} catch {
		return null
	}
}
