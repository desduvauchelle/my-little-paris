import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const headerSource = readFileSync(join(process.cwd(), 'src/components/layout/Header.tsx'), 'utf8')

describe('Header responsive layout', () => {
	it('keeps the logo proportional and waits for a wide desktop before showing the full navigation', () => {
		expect(headerSource).toContain('className="h-7 w-auto max-w-none shrink-0 sm:h-9"')
		expect(headerSource).toContain('className="hidden xl:flex items-center gap-5"')
		expect(headerSource).toContain('className="flex items-center gap-2 xl:hidden"')
	})
})
