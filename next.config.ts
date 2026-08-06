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
		]
	},
}

export default nextConfig
