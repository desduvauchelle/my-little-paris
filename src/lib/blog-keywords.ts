/** Adapt the SDK server's text column to the client renderer's keyword array. */
export function normalizeBlogKeywords(value: unknown): string[] | null {
	let parsed: unknown = value
	if (typeof value === 'string') {
		try {
			parsed = JSON.parse(value)
		} catch {
			return null
		}
	}
	return Array.isArray(parsed)
		? parsed.filter((keyword): keyword is string => typeof keyword === 'string' && keyword.trim().length > 0)
		: null
}
