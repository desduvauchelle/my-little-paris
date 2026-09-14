// Dry run: node scripts/fix-chinese-blog-address.mjs
// Apply the reviewed correction: node scripts/fix-chinese-blog-address.mjs --apply
import { createRequire } from 'node:module'
import { mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

process.loadEnvFile('.env.local')
const sdkRequire = createRequire(import.meta.resolve('@growth-engine/sdk-server'))
const { createClient } = sdkRequire('@libsql/client')
const client = createClient({
	url: process.env.TURSO_DATABASE_URL,
	authToken: process.env.TURSO_AUTH_TOKEN,
})
const id = 'VJWt3V2cYtvV_HP-DWL0B'
const slug = 'shen-me-shi-qin-zi-ka-fei-guan-sheng-gai-bo-gu-jia-zhang-cong-kuai-can-zhuan-xiang-you-le-ka-fei-guan-de-5-da-li-you'
const before = '就在Mission Drive附近'
const after = '地址为416 E. Las Tunas Drive, Unit C, San Gabriel, CA 91776'

try {
	const { rows } = await client.execute({
		sql: 'SELECT * FROM blog_posts WHERE id = ? AND slug = ? AND language = ?',
		args: [id, slug, 'zh'],
	})
	if (rows.length !== 1) throw new Error('Expected exactly the reported Chinese post')
	const row = rows[0]
	if (row.content.includes(after) && !row.content.includes(before)) {
		console.log('The address correction is already present.')
	} else {
		if (row.content.split(before).length !== 2) throw new Error('Expected the original phrase exactly once; review current content')
		const content = row.content.replace(before, after)
		console.log(JSON.stringify({ id, before, after, apply: process.argv.includes('--apply') }, null, 2))
		if (process.argv.includes('--apply')) {
			const backupDir = join(tmpdir(), 'my-little-paris-content-backups')
			mkdirSync(backupDir, { recursive: true, mode: 0o700 })
			const backup = join(backupDir, `${id}-${Date.now()}.json`)
			writeFileSync(backup, JSON.stringify(row, null, 2), { mode: 0o600, flag: 'wx' })
			const result = await client.execute({
				sql: 'UPDATE blog_posts SET content = ?, updated_at = ? WHERE id = ? AND slug = ? AND language = ? AND content = ? AND updated_at = ?',
				args: [content, Math.floor(Date.now() / 1000), id, slug, 'zh', row.content, row.updated_at],
			})
			if (result.rowsAffected !== 1) throw new Error('Post changed concurrently; no correction applied')
			const check = await client.execute({ sql: 'SELECT content FROM blog_posts WHERE id = ?', args: [id] })
			if (check.rows[0]?.content !== content) throw new Error('Content verification failed')
			console.log(`Updated and verified one post. Backup: ${backup}`)
		}
	}
} finally {
	client.close()
}
