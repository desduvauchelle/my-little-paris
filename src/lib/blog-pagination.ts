export function parseBlogPage(value: string | string[] | undefined): number {
	const raw = Array.isArray(value) ? value[0] : value
	const page = Number(raw)
	return Number.isSafeInteger(page) && page > 0 ? page : 1
}
