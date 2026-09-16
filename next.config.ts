import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	serverExternalPackages: [
		'@growth-engine/sdk-server',
		'@libsql/client',
		'libsql',
		'drizzle-orm',
	],
	async redirects() {
		return [
			{
				source: '/menu-soft-opening',
				destination: '/menu',
				statusCode: 301,
			},
			{
				source: '/party-reservation',
				destination: '/party#party-inquiry',
				permanent: true,
			},
			{
				source: '/:locale/party-reservation',
				destination: '/:locale/party#party-inquiry',
				permanent: true,
			},
			// Legacy URLs from the previous site still reported as 404 in Search Console
			...[
				['/home', '/'],
				['/memberships', '/play'],
				['/catering', '/party'],
				['/catering-reservation', '/party'],
				['/champs-elysee', '/party'],
				['/vendomeprivate', '/party'],
				['/appointments-3', '/reservations'],
				[`/${encodeURIComponent('聖加布里埃爾')}`, '/zh'],
			].map(([source, destination]) => ({ source, destination, statusCode: 301 as const })),
		]
	},
}

export default nextConfig
