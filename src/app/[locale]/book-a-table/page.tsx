import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeftIcon, CalendarIcon, ClockIcon, UsersIcon } from '@/components/booking-wireframe/Icons'
import styles from '@/components/booking-wireframe/booking-wireframe.module.css'
import { localizedPath } from '@/lib/i18n-utils'

export const metadata: Metadata = {
	title: 'Reserve a Table — Wireframe',
	robots: { index: false, follow: false },
}

const copy = {
	en: { days:['MON','TUE','WED','THU','FRI','SAT'], times:['9:00 AM','11:00 AM','1:00 PM','3:00 PM','5:00 PM'], back:'Back to reservations', title:'Plan your visit', intro:'Choose a two-hour Eat & Play session. Several families may reserve the same time while seats are available.', sizeTitle:'How many guests are coming?', guests:'guests', dateTitle:'Choose a date', month:'August 2026', closed:'Private event', timeTitle:'Select an arrival time', seats:'seats left', full:'Full', details:'Your details', name:'Name', contact:'Email or phone number', contactPlaceholder:'you@example.com or (626) 555-0123', visit:'YOUR VISIT', session:'Eat & Play session', date:'Date', arrival:'Arrival', party:'Party', dateValue:'Tuesday, August 25', timeValue:'11:00 AM · 2 hours', review:'Review reservation', note:'Wireframe only — this button does not submit a reservation.' },
	fr: { days:['LUN','MAR','MER','JEU','VEN','SAM'], times:['9 h 00','11 h 00','13 h 00','15 h 00','17 h 00'], back:'Retour aux réservations', title:'Planifiez votre visite', intro:'Choisissez une séance Café & Jeux de deux heures. Plusieurs familles peuvent réserver le même créneau selon les places disponibles.', sizeTitle:'Combien de personnes viennent ?', guests:'personnes', dateTitle:'Choisissez une date', month:'Août 2026', closed:'Événement privé', timeTitle:'Choisissez une heure d’arrivée', seats:'places restantes', full:'Complet', details:'Vos coordonnées', name:'Nom', contact:'E-mail ou numéro de téléphone', contactPlaceholder:'vous@exemple.com ou 06 12 34 56 78', visit:'VOTRE VISITE', session:'Séance Café & Jeux', date:'Date', arrival:'Arrivée', party:'Groupe', dateValue:'Mardi 25 août', timeValue:'11 h 00 · 2 heures', review:'Vérifier la réservation', note:'Maquette uniquement — ce bouton ne confirme aucune réservation.' },
	zh: { days:['周一','周二','周三','周四','周五','周六'], times:['上午9:00','上午11:00','下午1:00','下午3:00','下午5:00'], back:'返回预订页面', title:'安排您的到访', intro:'选择两小时的用餐与游玩时段。只要仍有空位，同一时段可由多个家庭预订。', sizeTitle:'共有多少位客人？', guests:'位客人', dateTitle:'选择日期', month:'2026年8月', closed:'私人活动', timeTitle:'选择到店时间', seats:'个余位', full:'已满', details:'您的信息', name:'姓名', contact:'电子邮箱或电话号码', contactPlaceholder:'you@example.com 或 (626) 555-0123', visit:'您的到访', session:'用餐与游玩时段', date:'日期', arrival:'到店', party:'人数', dateValue:'8月25日，星期二', timeValue:'上午11:00 · 2小时', review:'检查预订', note:'仅为页面示意 — 此按钮不会提交预订。' },
} as const

export default async function BookATablePage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	const c = copy[locale as keyof typeof copy] ?? copy.en
	const dates = c.days.map((day, index) => [day, String(24 + index)])
	const slots = [[c.times[0],`12 ${c.seats}`],[c.times[1],`5 ${c.seats}`],[c.times[2],`18 ${c.seats}`],[c.times[3],`8 ${c.seats}`],[c.times[4],c.full]]
	return (
		<div className={styles.customerPage}>
			<div className={styles.customerWrap}>
				<Link href={localizedPath('/reservations', locale)} className={styles.backLink}><ArrowLeftIcon /> {c.back}</Link>
				<div className={styles.customerGrid}>
					<section aria-labelledby="booking-heading">
						<header className={styles.customerIntro}><h1 id="booking-heading">{c.title}</h1><p>{c.intro}</p></header>
						<div className={styles.step}><span className={styles.stepNumber}>1</span><div className={styles.stepBody}><h2>{c.sizeTitle}</h2><div className={styles.partySize}><select aria-label={c.sizeTitle} defaultValue="4">{[2,3,4,5,6].map(size => <option value={size} key={size}>{size} {c.guests}</option>)}</select></div></div></div>
						<div className={styles.step}><span className={styles.stepNumber}>2</span><div className={styles.stepBody}><div className={styles.stepHeading}><h2>{c.dateTitle}</h2><span className={styles.monthLabel}>{c.month}</span></div><div className={styles.dateChoices}>{dates.map(([day,date],index) => <div key={day}><input className={styles.choiceInput} type="radio" name="date" id={`date-${date}`} defaultChecked={index === 1} disabled={index === 5} /><label className={`${styles.dateChoice} ${index === 5 ? styles.dateClosed : ''}`} htmlFor={`date-${date}`}>{day}<strong>{date}</strong>{index === 5 && <span>{c.closed}</span>}</label></div>)}</div></div></div>
						<div className={styles.step}><span className={styles.stepNumber}>3</span><div className={styles.stepBody}><h2>{c.timeTitle}</h2><div className={styles.slotChoices}>{slots.map(([time,available],index) => <div key={time}><input className={styles.choiceInput} type="radio" name="time" id={`time-${index}`} defaultChecked={index === 1} disabled={available === c.full} /><label className={`${styles.slotChoice} ${available === c.full ? styles.slotFull : ''}`} htmlFor={`time-${index}`}><strong>{time}</strong><span>{available}</span></label></div>)}</div></div></div>
						<div className={styles.step}><span className={styles.stepNumber}>4</span><div className={styles.stepBody}><h2>{c.details}</h2><div className={styles.detailGrid}><label>{c.name}<input name="name" autoComplete="name" placeholder={c.name} /></label><label>{c.contact}<input name="contact" placeholder={c.contactPlaceholder} /></label></div></div></div>
					</section>
					<aside className={styles.bookingSummary}>
						<div className={styles.summaryImage} role="img" aria-label="Café tables beside the indoor play space" />
						<div className={styles.summaryBody}><span>{c.visit}</span><h2>{c.session}</h2>
							<div className={styles.summaryItem}><CalendarIcon /><div><span>{c.date}</span><strong>{c.dateValue}</strong></div></div>
							<div className={styles.summaryItem}><ClockIcon /><div><span>{c.arrival}</span><strong>{c.timeValue}</strong></div></div>
							<div className={styles.summaryItem}><UsersIcon /><div><span>{c.party}</span><strong>4 {c.guests}</strong></div></div>
							<button type="button" className={styles.primaryButton}>{c.review}</button>
							<p className={styles.finePrint}>{c.note}</p>
						</div>
					</aside>
				</div>
			</div>
		</div>
	)
}
