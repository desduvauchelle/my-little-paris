import {
	buildBreadcrumbJsonLd,
	buildSiteEntityJsonLd,
	serializeJsonLd,
	type BreadcrumbParent,
	type JsonLdValue,
} from '@/lib/structured-data'

function JsonLd({ id, data }: { id: string; data: JsonLdValue }) {
	return (
		<script
			id={id}
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
		/>
	)
}

export function SiteJsonLd() {
	return <JsonLd id="site-entity-json-ld" data={buildSiteEntityJsonLd()} />
}

export function BreadcrumbJsonLd({
	path,
	locale,
	homeName,
	name,
	parent,
}: {
	path: string
	locale: string
	homeName: string
	name: string
	parent?: BreadcrumbParent
}) {
	return (
		<JsonLd
			id="breadcrumb-json-ld"
			data={buildBreadcrumbJsonLd({ path, locale, homeName, name, parent })}
		/>
	)
}
