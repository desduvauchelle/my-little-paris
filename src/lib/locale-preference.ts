export const LOCALE_PREFERENCE_COOKIE = 'ge-locale'
export const LOCALE_PREFERENCE_MAX_AGE = 60 * 60 * 24 * 365

export function buildLocalePreferenceCookie(locale: string, secure: boolean): string {
	return [
		`${LOCALE_PREFERENCE_COOKIE}=${encodeURIComponent(locale)}`,
		'Path=/',
		`Max-Age=${LOCALE_PREFERENCE_MAX_AGE}`,
		'SameSite=Lax',
		...(secure ? ['Secure'] : []),
	].join('; ')
}
