import { describe, expect, it } from 'vitest'
import {
	buildLocalePreferenceCookie,
	LOCALE_PREFERENCE_MAX_AGE,
} from './locale-preference'

describe('buildLocalePreferenceCookie', () => {
	it('persists an explicit English choice on local development', () => {
		expect(buildLocalePreferenceCookie('en', false)).toBe(
			`ge-locale=en; Path=/; Max-Age=${LOCALE_PREFERENCE_MAX_AGE}; SameSite=Lax`,
		)
	})

	it('marks the preference cookie secure in production', () => {
		expect(buildLocalePreferenceCookie('fr', true)).toBe(
			`ge-locale=fr; Path=/; Max-Age=${LOCALE_PREFERENCE_MAX_AGE}; SameSite=Lax; Secure`,
		)
	})
})
