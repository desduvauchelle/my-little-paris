'use client'

import {
	cloneElement,
	isValidElement,
	useEffect,
	useRef,
	type MouseEvent as ReactMouseEvent,
	type ReactElement,
} from 'react'
import type Confetti from 'canvas-confetti'

const BALLOON_PATH = [
	'M50 2',
	'C24 2 8 22 8 49',
	'C8 75 28 92 44 96',
	'L38 107 50 102 62 107 56 96',
	'C72 92 92 75 92 49',
	'C92 22 76 2 50 2Z',
	'M49 104',
	'C45 120 56 128 51 142',
	'C46 156 55 165 51 180',
	'L54 181',
	'C59 165 50 155 55 143',
	'C60 129 49 119 53 105Z',
].join(' ')

const BALLOON_COLORS = [
	'#f9f7f2', // pearl
	'#d4d6d8', // silver
	'#b5964d', // champagne gold
	'#e08aad', // brand blush
	'#001d61', // brand navy
]

type TriggerElementProps = {
	onClick?: (event: ReactMouseEvent<HTMLElement>) => void
}

type LaunchMode = 'page' | 'click'
type CancelAnimation = () => void

let balloonShape: Confetti.Shape | null = null

async function launchBalloons(
	origin: Confetti.Origin,
	mode: LaunchMode,
): Promise<CancelAnimation> {
	const { default: confetti } = await import('canvas-confetti')
	balloonShape ??= confetti.shapeFromPath({ path: BALLOON_PATH })

	const timers: ReturnType<typeof setTimeout>[] = []
	const layers = mode === 'page'
		? [
			{ delay: 0, particleCount: 5, scalar: 3.4, spread: 105, startVelocity: 6 },
			{ delay: 110, particleCount: 5, scalar: 4.4, spread: 80, startVelocity: 5.5 },
			{ delay: 220, particleCount: 4, scalar: 5.4, spread: 54, startVelocity: 5 },
		]
		: [
			{ delay: 0, particleCount: 5, scalar: 3.2, spread: 72, startVelocity: 7 },
			{ delay: 100, particleCount: 4, scalar: 4.3, spread: 48, startVelocity: 6 },
		]

	for (const layer of layers) {
		timers.push(
			setTimeout(() => {
				void confetti({
					...layer,
					angle: 90,
					origin,
					colors: BALLOON_COLORS,
					shapes: [balloonShape!],
					decay: 0.995,
					gravity: -0.003,
					drift: 0,
					flat: true,
					ticks: 420,
					zIndex: 100,
					disableForReducedMotion: true,
				})
			},
			layer.delay,
		),
		)
	}

	return () => {
		timers.forEach(clearTimeout)
		confetti.reset()
	}
}

/** Releases a layered balloon flight once when the component mounts. */
export function BalloonCelebrationOnLoad({ delay = 250 }: { delay?: number }) {
	useEffect(() => {
		let disposed = false
		let cancel: CancelAnimation | undefined
		const launchTimer = setTimeout(() => {
			void launchBalloons({ x: 0.5, y: 1.08 }, 'page').then((cancelAnimation) => {
				if (disposed) cancelAnimation()
				else cancel = cancelAnimation
			})
		}, delay)

		return () => {
			disposed = true
			clearTimeout(launchTimer)
			cancel?.()
		}
	}, [delay])

	return null
}

/**
 * Adds a canvas-rendered balloon release to any clickable child without
 * changing the child's normal click behavior.
 */
export function BalloonCelebration({
	children,
}: {
	children: ReactElement<TriggerElementProps>
}) {
	const cancelRef = useRef<CancelAnimation | undefined>(undefined)

	useEffect(() => () => cancelRef.current?.(), [])

	if (!isValidElement(children)) return children

	const originalOnClick = children.props.onClick
	return cloneElement(children, {
		onClick: (event: ReactMouseEvent<HTMLElement>) => {
			originalOnClick?.(event)
			if (event.defaultPrevented) return

			const rect = event.currentTarget.getBoundingClientRect()
			void launchBalloons(
				{
					x: (rect.left + rect.width / 2) / window.innerWidth,
					y: (rect.top + rect.height / 2) / window.innerHeight,
				},
				'click',
			).then((cancel) => {
				cancelRef.current = cancel
			})
		},
	})
}
