import type { LegalContent } from './types'

/**
 * Courtesy translation. The English version in `en.ts` governs — see
 * `translationNote`, which is rendered at the top of each document.
 */
const fr: LegalContent = {
	lastUpdatedLabel: 'Dernière mise à jour',
	translationNote:
		'Cette traduction est fournie par courtoisie. En cas de divergence, la version anglaise de ce document fait foi.',

	// ─── Mentions légales / Conditions d’utilisation ──────────────────────
	terms: {
		summary:
			'Les conditions applicables à l’utilisation du site My Little Paris Café & Play, à la réservation d’une session et à la visite de notre espace de jeux à San Gabriel, Californie.',
		intro: [
			'Ce site est exploité par {entity} (« nous »), dont l’établissement est situé au {address}. Vous pouvez nous joindre à {email} ou au {phone}.',
			'Ces conditions s’appliquent lorsque vous consultez ce site, envoyez un formulaire, réservez une session ou une fête, ou vous rendez dans notre café et notre espace de jeux. En faisant l’une de ces choses, vous les acceptez. Si vous ne les acceptez pas, merci de ne pas utiliser le site ni nos services.',
		],
		sections: [
			{
				heading: 'Réservations et entrée',
				paragraphs: [
					'Les sessions Eat & Play durent deux heures et se réservent via notre prestataire de réservation en ligne. Réserver une session vous garantit une table et l’entrée pour le nombre de personnes indiqué dans votre réservation.',
					'Les tarifs des sessions, les droits d’entrée et tout minimum de commande sont indiqués sur la page Jeux et au café, et peuvent évoluer. Le tarif applicable est celui affiché au moment de votre réservation ou de votre commande.',
				],
				bullets: [
					'Chaque créneau réservé en ligne accueille jusqu’à six personnes, adultes et enfants compris.',
					'Les groupes de sept personnes ou plus s’organisent par e-mail ; à partir de treize personnes, notre salon privé est nécessaire.',
					'Une empreinte de carte bancaire peut être demandée pour les réservations importantes. Les absences non signalées privent d’autres familles d’une place : merci d’honorer votre créneau ou de nous prévenir à l’avance.',
					'Les sessions commencent à l’heure réservée. Un démarrage tardif ne peut pas toujours être rattrapé.',
				],
			},
			{
				heading: 'Fêtes et événements privés',
				paragraphs: [
					'Une demande de fête est une demande, pas une réservation confirmée. Votre date n’est retenue qu’une fois notre confirmation envoyée et l’acompte éventuel réglé.',
					'Le contenu des formules, les frais de service, les conditions d’annulation et les acomptes sont détaillés sur la page Fêtes et dans la confirmation que nous vous adressons. Ces conditions font partie de notre accord.',
				],
			},
			{
				heading: 'Utilisation de l’espace de jeux',
				paragraphs: [
					'L’espace de jeux est conçu pour les enfants d’environ 0 à 7 ans. Un parent ou un adulte responsable doit rester sur place et surveiller ses enfants à tout moment. Notre équipe entretient et nettoie l’espace ; elle n’assure ni garde ni surveillance d’enfants.',
					'Toute personne utilisant l’espace de jeux doit avoir signé une décharge. Il vous appartient de vous assurer qu’une décharge couvre chaque enfant de votre groupe.',
				],
				bullets: [
					'Les chaussettes sont obligatoires dans l’espace de jeux.',
					'Par égard pour les autres familles, merci de garder à la maison les enfants souffrants.',
					'Nous pouvons demander à toute personne de quitter les lieux si son comportement est dangereux ou gâche l’expérience des autres.',
					'La nourriture et les boissons extérieures ne sont pas autorisées, sauf dans le cadre d’une location de salle le permettant expressément.',
				],
			},
			{
				heading: 'Restauration et allergènes',
				paragraphs: [
					'Notre cuisine manipule du gluten, des produits laitiers, des œufs, des fruits à coque, du soja et d’autres allergènes courants ; nous ne pouvons garantir l’absence de contact croisé pour aucun plat. En cas d’allergie ou d’intolérance, prévenez un membre de l’équipe avant de commander afin que nous puissions vous aider à choisir.',
					'Les descriptions et les prix des plats figurant sur ce site sont donnés de bonne foi mais peuvent ne pas correspondre exactement à la carte en vigueur au café.',
				],
			},
			{
				heading: 'Utilisation de ce site',
				paragraphs: [
					'Vous ne pouvez utiliser ce site qu’à des fins licites. Vous vous engagez à ne pas perturber son fonctionnement, à ne pas tenter d’y accéder sans autorisation, à ne pas l’utiliser pour envoyer des messages non sollicités, ni à en extraire ou copier le contenu de manière massive.',
					'Les informations que vous transmettez via nos formulaires doivent être exactes et vous appartenir.',
				],
			},
			{
				heading: 'Propriété intellectuelle',
				paragraphs: [
					'Le contenu de ce site — textes, photographies, logos, cartes et mises en page — nous appartient ou appartient à nos concédants et est protégé par le droit d’auteur et le droit des marques. Vous pouvez consulter et imprimer les pages pour votre usage personnel et non commercial.',
					'Toute reproduction, republication ou exploitation commerciale de notre contenu nécessite notre autorisation écrite. Notre nom et notre logo ne peuvent être utilisés sans notre accord.',
				],
			},
			{
				heading: 'Services et liens de tiers',
				paragraphs: [
					'Certaines parties de notre service sont assurées par des tiers : réservation en ligne, signature des décharges, cartographie et mesure d’audience notamment. Leur utilisation implique l’acceptation des conditions de ces prestataires, dont nous ne maîtrisons pas le fonctionnement.',
					'Les liens vers d’autres sites, y compris nos réseaux sociaux et pages d’avis, sont fournis pour votre commodité. Nous ne contrôlons pas leur contenu et n’en sommes pas responsables.',
				],
			},
			{
				heading: 'Garanties et limitation de responsabilité',
				paragraphs: [
					'Ce site est fourni « en l’état ». Nous ne garantissons ni un fonctionnement ininterrompu ou sans erreur, ni que les informations qu’il contient soient complètes et à jour en permanence.',
					'Rien dans ces conditions ne limite une responsabilité qui ne peut l’être en droit californien, notamment en cas de décès ou de dommage corporel causé par une négligence, ou en cas de fraude. Sous cette réserve, nous ne sommes pas responsables des dommages indirects résultant de l’utilisation de ce site.',
					'L’utilisation de l’espace de jeux est en outre régie par la décharge que vous signez, laquelle détaille les risques liés au jeu physique.',
				],
			},
			{
				heading: 'Modification des conditions',
				paragraphs: [
					'Nous pouvons mettre à jour ces conditions. La version publiée sur cette page est celle qui s’applique, et la date de dernière révision figure en haut. Continuer à utiliser le site après une modification vaut acceptation.',
				],
			},
			{
				heading: 'Droit applicable',
				paragraphs: [
					'Ces conditions sont régies par le droit de l’État de Californie, à l’exclusion de ses règles de conflit de lois. Tout litige relèvera des tribunaux étatiques ou fédéraux du comté de Los Angeles, Californie.',
				],
			},
			{
				heading: 'Contact',
				paragraphs: ['Vos questions sur ces conditions sont les bienvenues à {email}, ou par téléphone et SMS au {phone}.'],
			},
		],
	},

	// ─── Politique de confidentialité ─────────────────────────────────────
	privacy: {
		summary:
			'Quelles données personnelles My Little Paris Café & Play collecte via ce site, pourquoi, avec qui elles sont partagées, et quels choix s’offrent à vous.',
		intro: [
			'Cette politique explique comment {entity} traite les données personnelles collectées via ce site. Notre adresse est {address} et vous pouvez nous joindre à {email} ou au {phone}.',
			'Nous sommes un café et un espace de jeux couvert à San Gabriel, Californie. Nous collectons les informations nécessaires pour prendre votre réservation, répondre à votre message et faire tourner l’établissement — rien de plus, et nous ne les vendons pas.',
		],
		sections: [
			{
				heading: 'Les informations que vous nous donnez',
				paragraphs: ['Vous nous transmettez des données personnelles lorsque vous nous contactez ou réservez. Selon le formulaire, cela peut inclure :'],
				bullets: [
					'Formulaire de contact : votre nom, votre adresse e-mail et le contenu de votre message.',
					'Formulaire de demande de fête : le nom, l’e-mail, le téléphone et l’adresse postale de l’organisateur ; votre préférence de contact ; la date, l’heure, la formule et le nombre d’invités souhaités ; ainsi que le prénom et la date de naissance de l’enfant fêté.',
					'Inscription à la newsletter : votre adresse e-mail.',
					'Réservations et décharges : les informations saisies chez nos prestataires de réservation et de décharge, y compris d’éventuelles données de carte bancaire conservées par eux — nous ne recevons ni ne stockons de numéro de carte complet.',
					'Tout ce que vous choisissez de nous dire par e-mail, téléphone ou SMS.',
				],
			},
			{
				heading: 'Informations concernant les enfants',
				paragraphs: [
					'Ce site s’adresse aux parents et aux accompagnants, pas aux enfants. Nous ne permettons pas sciemment à des enfants de nous transmettre des informations via le site.',
					'Notre formulaire de demande de fête demande le prénom et la date de naissance d’un enfant. Ces informations sont fournies par l’adulte qui réserve, servent uniquement à organiser et personnaliser la fête, et ne sont utilisées ni à des fins publicitaires ni partagées en dehors des prestataires décrits plus bas.',
					'Si vous pensez qu’un enfant nous a transmis des données sans l’intervention d’un parent, écrivez-nous à {email} et nous les supprimerons.',
				],
			},
			{
				heading: 'Informations collectées automatiquement',
				paragraphs: [
					'Lors de votre visite, nos prestataires d’hébergement et de mesure d’audience enregistrent automatiquement des informations techniques : adresse IP, type de navigateur et d’appareil, pages consultées et site d’origine. Elles servent à faire fonctionner le site et à comprendre quelles pages sont utiles.',
					'Nous utilisons Google Analytics pour cela. Notre politique relative aux cookies détaille ce qui est stocké et comment vous y opposer.',
				],
			},
			{
				heading: 'Comment nous utilisons vos données',
				paragraphs: ['Nous utilisons les données personnelles pour :'],
				bullets: [
					'prendre, confirmer et gérer vos réservations, fêtes et événements ;',
					'répondre à vos questions et assurer le service client ;',
					'envoyer la newsletter, si vous l’avez demandée ;',
					'tenir les registres nécessaires à l’activité, notamment comptables et de sécurité ;',
					'comprendre l’usage du site afin de l’améliorer ;',
					'protéger le site et nos clients contre la fraude, les abus et les risques de sécurité.',
				],
			},
			{
				heading: 'Avec qui nous les partageons',
				paragraphs: [
					'Nous ne vendons pas vos données personnelles et ne les partageons pas à des fins publicitaires pour le compte de tiers. Nous les transmettons à des prestataires qui les traitent pour nous, sous contrat, uniquement aux fins ci-dessus :',
				],
				bullets: [
					'notre prestataire de réservation en ligne, pour les réservations et les fêtes ;',
					'notre prestataire de décharges, qui conserve les décharges signées ;',
					'Google, pour la mesure d’audience et la carte intégrée à nos pages ;',
					'nos prestataires d’hébergement et de base de données ;',
					'notre prestataire e-mail, pour les confirmations et la newsletter.',
				],
			},
			{
				heading: 'Lorsque la loi l’exige',
				paragraphs: [
					'Nous pouvons divulguer des données personnelles si la loi, une décision de justice ou une demande valable d’une autorité publique nous y oblige, ou lorsque cela est raisonnablement nécessaire pour protéger les droits, les biens ou la sécurité de nos clients, de notre équipe ou du public.',
					'En cas de cession de l’entreprise, les données clients pourraient faire partie des éléments transférés, sous réserve de la présente politique.',
				],
			},
			{
				heading: 'Durée de conservation',
				paragraphs: [
					'Nous conservons les données personnelles le temps nécessaire à la finalité poursuivie ou aussi longtemps que la loi l’exige. Les dossiers de réservation et de fête sont conservés au titre de nos obligations comptables et d’assurance ; les inscriptions à la newsletter jusqu’à votre désinscription ; les données de mesure d’audience selon les paramètres de conservation de Google.',
				],
			},
			{
				heading: 'Sécurité',
				paragraphs: [
					'Ce site est servi via une connexion chiffrée et l’accès aux données personnelles est limité aux personnes qui en ont besoin. Aucune méthode de transmission ou de stockage n’est totalement sûre : nous ne pouvons donc pas garantir une sécurité absolue, mais nous prenons des mesures raisonnables pour protéger ce que vous nous confiez.',
				],
			},
			{
				heading: 'Vos choix et vos droits',
				paragraphs: [
					'Vous pouvez nous demander quelles données nous détenons à votre sujet, en demander la correction ou la suppression. Écrivez à {email} et nous répondrons dans un délai raisonnable. Nous pourrons avoir à vérifier votre identité avant d’y donner suite.',
					'Les résidents de Californie peuvent disposer de droits supplémentaires, notamment celui de connaître les catégories de données collectées et leur usage, d’en demander la suppression, et de ne subir aucune discrimination pour avoir exercé ces droits. Nous ne vendons pas de données personnelles au sens du droit californien.',
					'Vous pouvez vous désinscrire de la newsletter à tout moment via le lien présent dans chaque envoi, ou en nous écrivant.',
				],
			},
			{
				heading: '« Do Not Track »',
				paragraphs: [
					'Certains navigateurs émettent un signal « Do Not Track ». Il n’existe pas de standard commun quant à la réponse à y apporter et ce site n’y répond pas actuellement. Les possibilités d’opposition décrites dans notre politique relative aux cookies restent disponibles.',
				],
			},
			{
				heading: 'Autres sites',
				paragraphs: [
					'Cette politique ne couvre que ce site. Nos prestataires de réservation et de décharge ainsi que nos réseaux sociaux ont leurs propres politiques de confidentialité, que nous vous invitons à consulter.',
				],
			},
			{
				heading: 'Modification de cette politique',
				paragraphs: [
					'Nous pouvons mettre à jour cette politique. La version en vigueur est toujours publiée sur cette page, avec sa date de dernière révision en haut. En cas de changement important, nous le signalerons sur le site.',
				],
			},
			{
				heading: 'Contact',
				paragraphs: [
					'Pour toute question ou demande relative à la confidentialité, écrivez à {email}, appelez ou envoyez un SMS au {phone}, ou passez nous voir au {address}.',
				],
			},
		],
	},

	// ─── Politique relative aux cookies ───────────────────────────────────
	cookies: {
		summary:
			'Les cookies utilisés sur ce site — préférence de langue, mesure d’audience Google Analytics et Google Maps — et comment les désactiver.',
		intro: [
			'Cette politique explique comment {entity} utilise les cookies et technologies similaires sur ce site. Elle complète notre politique de confidentialité.',
			'Les cookies sont de petits fichiers texte qu’un site enregistre sur votre appareil. Ils permettent de mémoriser certaines choses d’une page à l’autre — la langue choisie, par exemple — et de compter les visites.',
		],
		sections: [
			{
				heading: 'Les cookies que nous utilisons',
				paragraphs: ['Restons simples. Il y en a trois catégories sur ce site :'],
				bullets: [
					'Essentiels — un cookie de langue (« ge-locale ») qui retient si vous lisez le site en français, en anglais ou en chinois, pour ne pas vous renvoyer à la langue par défaut à chaque page. Le site ne peut pas fonctionner correctement sans lui.',
					'Mesure d’audience — les cookies Google Analytics (noms commençant par « _ga ») qui comptent les visites et indiquent quelles pages sont consultées. Ils nous disent combien de personnes lisent une page, pas qui elles sont.',
					'Carte intégrée — la carte Google présente sur nos pages est chargée depuis Google et peut déposer ses propres cookies à son affichage. Il s’agit d’une technologie Google, régie par la politique de confidentialité de Google.',
				],
			},
			{
				heading: 'Ce que nous faisons de la mesure d’audience',
				paragraphs: [
					'Google Analytics nous permet de savoir quelles pages les familles lisent réellement, comment elles arrivent sur le site et si le parcours de réservation fonctionne. Nous regardons des totaux et des tendances, pas des individus.',
					'Nous n’utilisons pas la mesure d’audience à des fins publicitaires et ne déposons aucun cookie publicitaire ou de reciblage sur ce site.',
				],
			},
			{
				heading: 'Comment désactiver les cookies',
				paragraphs: ['Vous gardez la main, et rien de tout cela n’est nécessaire pour consulter le site :'],
				bullets: [
					'Tous les navigateurs courants permettent de bloquer ou de supprimer les cookies dans leurs paramètres, pour tous les sites ou pour celui-ci uniquement.',
					'Pour vous opposer spécifiquement à Google Analytics, installez le module complémentaire officiel de désactivation proposé par Google, valable sur tous les sites qui l’utilisent.',
					'La navigation privée efface les cookies à la fermeture de la fenêtre.',
				],
			},
			{
				heading: 'Si vous bloquez les cookies',
				paragraphs: [
					'Bloquer les cookies de mesure d’audience ne change rien au fonctionnement du site pour vous. Bloquer le cookie de langue peut empêcher le site de mémoriser votre choix de langue d’une page à l’autre.',
				],
			},
			{
				heading: '« Do Not Track »',
				paragraphs: [
					'Ce site ne répond pas actuellement aux signaux « Do Not Track » des navigateurs, faute de standard commun sur ce que cette réponse devrait être. Les options d’opposition ci-dessus restent disponibles.',
				],
			},
			{
				heading: 'Modification de cette politique',
				paragraphs: [
					'Si nous ajoutons ou retirons des cookies, nous mettrons cette page à jour et la date de révision indiquée en haut changera en conséquence.',
				],
			},
			{
				heading: 'Contact',
				paragraphs: ['Vos questions sur les cookies peuvent être adressées à {email}, ou par téléphone et SMS au {phone}.'],
			},
		],
	},
}

export default fr
