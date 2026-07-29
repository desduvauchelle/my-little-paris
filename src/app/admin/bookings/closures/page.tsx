import { AdminShell } from '@/components/booking-wireframe/AdminShell'
import { PauseIcon, PlusIcon } from '@/components/booking-wireframe/Icons'
import styles from '@/components/booking-wireframe/booking-wireframe.module.css'

export default function ClosuresPage() {
	return (
		<AdminShell active="Closures & events">
			<main className={styles.adminPage}>
				<header className={styles.pageHead}><div><h1>Closures & private events</h1><p>Pause a full day or reserve selected hours for a birthday or private party.</p></div><div className={styles.headActions}><button className={styles.primaryButton} type="button"><PlusIcon /> Block time</button></div></header>
				<div className={styles.demoNote}>Wireframe preview — closure dates and event names below are illustrative.</div>
				<div className={styles.settingsLayout}>
					<section className={styles.settingsPanel}>
						<div className={styles.panelTitle}><h2>Upcoming unavailable times</h2><p>These times are removed from the customer booking page.</p></div>
						<div className={`${styles.subsection} ${styles.closureList}`}>
							<div className={styles.closureRow}><div className={styles.dateTile}><span>AUG</span><strong>29</strong></div><div><h3>Emma&apos;s 5th birthday</h3><p>Private event · 11:00 AM–3:00 PM · Entire venue</p></div><span className={styles.status}>PRIVATE EVENT</span></div>
							<div className={styles.closureRow}><div className={styles.dateTile}><span>SEP</span><strong>07</strong></div><div><h3>Labor Day</h3><p>Closed all day · No customer bookings</p></div><span className={`${styles.status} ${styles.statusNavy}`}>DAY PAUSED</span></div>
							<div className={styles.closureRow}><div className={styles.dateTile}><span>SEP</span><strong>19</strong></div><div><h3>Baby shower</h3><p>Private event · 1:00–5:00 PM · Party room only</p></div><span className={styles.status}>PRIVATE EVENT</span></div>
						</div>
					</section>
					<aside className={styles.settingsPanel}>
						<div className={styles.panelTitle}><h2>Block time</h2><p>Create a temporary exception.</p></div>
						<div className={styles.subsection}>
							<div className={styles.formGrid}>
								<label className={`${styles.fieldLabel} ${styles.span2}`}>Reason<input defaultValue="Private birthday party" /></label>
								<label className={styles.fieldLabel}>Date<input type="date" defaultValue="2026-09-26" /></label>
								<label className={styles.fieldLabel}>Affects<select defaultValue="venue"><option value="venue">Entire venue</option><option value="party">Party room</option></select></label>
								<label className={styles.fieldLabel}>From<input type="time" defaultValue="11:00" /></label>
								<label className={styles.fieldLabel}>Until<input type="time" defaultValue="15:00" /></label>
								<label className={`${styles.fieldLabel} ${styles.span2}`}>Internal note<textarea defaultValue="Setup begins 30 minutes before the event." /></label>
							</div>
							<button className={styles.primaryButton} type="button" style={{width:'100%', marginTop:16}}><PauseIcon /> Block this time</button>
						</div>
					</aside>
				</div>
			</main>
		</AdminShell>
	)
}
