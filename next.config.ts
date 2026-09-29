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
			// Duplicate blog posts merged into a canonical post (2026-09-29)
			...[
				[`/blog/what-is-a-kids-cafe-sgv-play-cafe-guide-2026`, `/blog/what-is-a-kids-cafe-sgv-parents-guide`],
				[`/fr/blog/quest-ce-quun-kids-cafe-5-raisons-parents-sgv`, `/fr/blog`],
				[`/zh/blog/shen-me-shi-qin-zi-ka-fei-guan-sheng-gai-bo-gu-jia-zhang-cong-kuai-can-zhuan-xiang-you-le-ka-fei-guan-de-5-da-li-you`, `/zh/blog`],
				[`/blog/kids-play-cafe-guide-sgv`, `/blog/what-is-a-kids-cafe-sgv-parents-guide`],
				[`/fr/blog/cafe-de-jeu-enfants-parents-sgv`, `/fr/blog`],
				[`/zh/blog/shenme-shi-ertong-youli-kafeiguan-sgv-jiazhang-weihe-fenfen-xuanze-ta`, `/zh/blog`],
				[`/blog/coffee-shops-with-play-areas-san-gabriel-parents`, `/blog/coffee-shops-play-areas-sgv-parents-guide`],
				[`/fr/blog/ou-les-parents-de-san-gabriel-trouvent-un-cafe-qui-reste-chaud`, `/fr/blog`],
				[`/zh/blog/sheng-gai-bo-jia-zhang-zhao-re-ka-fei-you-le-qu`, `/zh/blog`],
				[`/blog/coffee-and-play-sgv-parents-guide`, `/blog/coffee-shops-play-areas-sgv-parents-guide`],
				[`/fr/blog/cafe-et-jeu-guide-sgv-parents-cafes-aires-de-jeux-interieures`, `/fr/blog`],
				[`/zh/blog/kafei-yu-youle-sgv-jiazhang-zhinan`, `/zh/blog`],
				[`/blog/first-eat-and-play-san-gabriel-guide`, `/blog/first-eat-and-play-session-sgv-parent-guide`],
				[`/fr/blog/votre-premiere-eat-play-san-gabriel`, `/fr/blog/premiere-session-eat-play-guide-parent-local`],
				[`/zh/blog/san-gabriel-shouci-chiwan-kafei-zhinan`, `/zh/blog/shouci-eat-play-tiyan-bendi-jiazhang-zhinan`],
				[`/blog/indoor-playground-first-time-tips-san-gabriel`, `/blog/first-eat-and-play-session-sgv-parent-guide`],
				[`/fr/blog/conseils-premiere-visite-parc-jeux-interieur-san-gabriel-eat-and-play`, `/fr/blog/premiere-session-eat-play-guide-parent-local`],
				[`/zh/blog/sheng-gai-bo-shi-nei-you-le-chang-chu-ci-ti-yan-zhi-nan`, `/zh/blog/shouci-eat-play-tiyan-bendi-jiazhang-zhinan`],
				[`/blog/the-birthday-party-venue-san-gabriel-parents-keep-coming-back-to`, `/blog/birthday-party-packages-in-san-gabriel-pricing-menus-what-s-included`],
				[`/fr/blog/lieu-anniversaire-san-gabriel-parents-plebiscitent`, `/fr/blog/forfaits-anniversaire-san-gabriel-tarifs-menus-inclus`],
				[`/zh/blog/sheng-gai-bo-sheng-ri-pai-dui-chang-di-fu-mu-hui-fang`, `/zh/blog/sheng-gai-bo-sheng-ri-pai-dui-tao-can`],
				[`/blog/indoor-playground-birthday-party-sgv-guide`, `/blog/indoor-playground-birthday-party-san-gabriel-guide`],
				[`/fr/blog/fetes-anniversaire-aire-jeux-interieure-sgv-cout-commodite`, `/fr/blog/fetes-anniversaire-aires-de-jeux-interieures-san-gabriel-guide-parents`],
				[`/zh/blog/shineshi-youle-chang-shengri-pai-dui-sgv-chengben-bianli-zhi-nan`, `/zh/blog/san-gabriel-indoor-playground-birthday-parties-guide`],
				[`/blog/backyard-vs-venue-birthday-party-san-marino`, `/blog/all-inclusive-vs-diy-birthday-party-pasadena`],
				[`/fr/blog/parents-san-marino-abandonnent-fete-jardin`, `/fr/blog/fetes-anniversaire-tout-compris-vs-diy-pasadena-cout-reel-parents`],
				[`/zh/blog/wei-shen-me-sheng-ma-li-nuo-fu-mu-fang-qi-hou-yuan-sheng-ri-pai-dui`, `/zh/blog/pasadenna-quanbao-vs-zizhu-shengri-paihui-zhenshi-chengben`],
				[`/blog/rainy-day-rescue-7-indoor-play-spots-toddlers-san-gabriel-alhambra`, `/blog/rainy-day-sgv-7-indoor-spots-toddler`],
				[`/fr/blog/sauvetage-jours-de-pluie-7-aires-jeux-interieures-tout-petits-san-gabriel-alhambra`, `/fr/blog/jour-de-pluie-dans-la-sgv-7-endroits-interieurs-qui-fatiguent-vraiment-votre-tout-petit`],
				[`/zh/blog/yu-tian-jiu-xing-7-ge-you-er-shi-nei-you-le-chang-suo`, `/zh/blog/sgv-xiayutian-7-youer-shinei-quchu`],
				[`/blog/alhambra-parents-guide-toddler-baby-play`, `/blog/indoor-playground-alhambra-kids-activities-guide`],
				[`/fr/blog/guide-parents-alhambra-amuser-tout-petit-et-bebe-ensemble`, `/fr/blog/aires-de-jeux-interieures-alhambra-meilleures-activites-enfants`],
				[`/zh/blog/ahanbula-toddler-baby-play-guide`, `/zh/blog/alhambra-indoor-playgrounds-kids`],
				[`/blog/kid-friendly-restaurant-san-gabriel-parents-relax`, `/blog/restaurant-with-playground-san-gabriel`],
				[`/fr/blog/${encodeURIComponent('restaurant-adapté-enfants-san-gabriel-parents-se-detendre')}`, `/fr/blog/restaurant-avec-aire-de-jeux-san-gabriel-parents-mangent-bien`],
				[`/zh/blog/sheng-gai-bo-ke-er-tong-you-hao-can-ting-jia-zhang-fang-song`, `/zh/blog/san-gabriel-you-le-chang-can-ting`],
			].map(([source, destination]) => ({ source, destination, statusCode: 301 as const })),
		]
	},
}

export default nextConfig
