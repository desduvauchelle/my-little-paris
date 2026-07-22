import { getClientDb } from '@growth-engine/sdk-server'

export function getDb() {
	const url = process.env.TURSO_DATABASE_URL
	const token = process.env.TURSO_AUTH_TOKEN
	if (!url || !token) {
		throw new Error('Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN')
	}
	return getClientDb(url, token)
}

/**
 * Run a content read, returning `fallback` when the database is missing or
 * unreachable instead of crashing the page. A marketing site must keep
 * rendering (with empty content) through CMS/database hiccups — the error is
 * logged loudly for operators, never shown as a 500 to visitors.
 *
 * Call `getDb()` INSIDE the closure so missing env vars are caught too:
 *   const posts = await safeQuery([], () => getBlogPosts(getDb(), { locale }))
 */
const PLACEHOLDER_RE = /PLACEHOLDER/
const credentialsConfigured =
	!!process.env.TURSO_DATABASE_URL &&
	!!process.env.TURSO_AUTH_TOKEN &&
	!PLACEHOLDER_RE.test(process.env.TURSO_DATABASE_URL) &&
	!PLACEHOLDER_RE.test(process.env.TURSO_AUTH_TOKEN)

let warnedPlaceholders = false

export async function safeQuery<T>(fallback: T, query: () => Promise<T>): Promise<T> {
	// Until onboarding delivers real Turso credentials, every query is doomed —
	// skip the network round-trip (seconds per render) and the per-query error
	// spam. Automatically resumes querying once real values are in .env.local.
	if (!credentialsConfigured) {
		if (!warnedPlaceholders) {
			warnedPlaceholders = true
			console.warn(
				'[GrowthEngine] Turso credentials are placeholders — content queries skipped, rendering fallbacks. Fill .env.local to enable blog/forms/config.',
			)
		}
		return fallback
	}
	try {
		return await query()
	} catch (err) {
		console.error('[GrowthEngine] content query failed — rendering fallback:', err)
		return fallback
	}
}
