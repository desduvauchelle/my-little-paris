import { readFile } from 'node:fs/promises'
import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const alt = 'My Little Paris Cafe & Play — one room, two worlds'
export const size = {
	width: 1200,
	height: 630,
}
export const contentType = 'image/png'

const logoFile = new URL('../../public/images/og-logo.png', import.meta.url)
const venueFile = new URL('../../public/images/og-venue.jpg', import.meta.url)

export default async function OpenGraphImage() {
	const [logo, venue] = await Promise.all([readFile(logoFile), readFile(venueFile)])
	const logoData = logo.buffer.slice(logo.byteOffset, logo.byteOffset + logo.byteLength) as ArrayBuffer
	const venueData = venue.buffer.slice(venue.byteOffset, venue.byteOffset + venue.byteLength) as ArrayBuffer

	return new ImageResponse(
		(
			<div
				style={{
					display: 'flex',
					width: '100%',
					height: '100%',
					padding: 42,
					background: '#fdfbf8',
					color: '#001d61',
					fontFamily: 'sans-serif',
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						width: 650,
						padding: '24px 46px 26px 18px',
					}}
				>
					<img src={logoData as unknown as string} width={390} height={176} alt="" />

					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<div
							style={{
								display: 'flex',
								alignSelf: 'flex-start',
								marginBottom: 18,
								padding: '9px 18px',
								borderRadius: 999,
								background: '#e08aad',
								color: '#3d1424',
								fontSize: 20,
								fontWeight: 700,
								letterSpacing: '0.02em',
							}}
						>
							FRENCH CAFE + INDOOR PLAYGROUND
						</div>

						<div
							style={{
								display: 'flex',
								fontFamily: 'serif',
								fontSize: 60,
								fontStyle: 'italic',
								fontWeight: 700,
								lineHeight: 1.02,
								letterSpacing: '-0.035em',
							}}
						>
							One room, two worlds.
						</div>

						<div
							style={{
								display: 'flex',
								marginTop: 20,
								fontSize: 25,
								color: '#3d6b9e',
							}}
						>
							Kids play. Parents unwind.
						</div>
					</div>

					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							fontSize: 21,
							fontWeight: 700,
							letterSpacing: '0.02em',
						}}
					>
						<span style={{ color: '#e08aad', marginRight: 10 }}>●</span>
						San Gabriel, California
					</div>
				</div>

				<div
					style={{
						display: 'flex',
						position: 'relative',
						flex: 1,
						overflow: 'hidden',
						border: '9px solid #001d61',
						borderRadius: 42,
						boxShadow: '0 18px 40px rgba(0, 29, 97, 0.18)',
					}}
				>
					<img
						src={venueData as unknown as string}
						width={452}
						height={546}
						alt=""
						style={{ objectFit: 'cover', objectPosition: 'center 62%' }}
					/>
					<div
						style={{
							display: 'flex',
							position: 'absolute',
							right: 22,
							bottom: 22,
							padding: '10px 17px',
							borderRadius: 999,
							background: '#fdfbf8',
							color: '#001d61',
							fontSize: 19,
							fontWeight: 700,
							boxShadow: '0 6px 20px rgba(0, 29, 97, 0.22)',
						}}
					>
						Ages 0–6
					</div>
				</div>
			</div>
		),
		{ ...size },
	)
}
