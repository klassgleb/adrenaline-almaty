import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, ChevronDown, CreditCard, Dumbbell, Instagram, MapPin, Menu, Minus, Plus, Smartphone, X } from 'lucide-react'
import { clubs, directions, trainers, type Club } from './data/adrenalineData'

type Duration = 1 | 3 | 6 | 12
type Payment = 'kaspi' | 'card' | 'installment'

const formatMoney = (n: number) => new Intl.NumberFormat('ru-KZ').format(n) + ' ₸'

function App() {
  const [clubId, setClubId] = useState(clubs[0].id)
  const [duration, setDuration] = useState<Duration>(12)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedTariff, setSelectedTariff] = useState<'daily' | 'unlimited' | 'vip'>('unlimited')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [guestOpen, setGuestOpen] = useState(false)
  const selectedClub = clubs.find(c => c.id === clubId) ?? clubs[0]

  const openBuy = (tariff: 'daily' | 'unlimited' | 'vip' = 'unlimited') => {
    setSelectedTariff(tariff)
    setDrawerOpen(true)
  }

  return (
    <>
      <header className="header">
        <a className="brand" href="#" aria-label="Adrenaline на главную">
          <span>ADRENALINE</span><small>FITNESS</small>
        </a>
        <nav className={mobileMenu ? 'nav nav-open' : 'nav'} aria-label="Основная навигация">
          <a href="#clubs" onClick={() => setMobileMenu(false)}>Клубы</a>
          <a href="#directions" onClick={() => setMobileMenu(false)}>Направления</a>
          <a href="#memberships" onClick={() => setMobileMenu(false)}>Абонементы</a>
          <a href="#trainers" onClick={() => setMobileMenu(false)}>Тренеры</a>
        </nav>
        <div className="header-actions">
          <a className="club-select" href="#clubs"><MapPin size={16}/>{selectedClub.name}</a>
          <button className="button button-dark header-buy" onClick={() => openBuy()}>Купить абонемент</button>
          <a className="icon-button" href="https://wa.me/message/JKHEZLYEZXADA1" aria-label="WhatsApp"><Smartphone size={19}/></a>
          <button className="icon-button menu-button" onClick={() => setMobileMenu(v => !v)} aria-label="Меню">{mobileMenu ? <X/> : <Menu/>}</button>
        </div>
      </header>

      <main>
        <section className="hero">
          <motion.div className="hero-media" initial={{scale:1.08, opacity:0}} animate={{scale:1, opacity:1}} transition={{duration:1.2,ease:'easeOut'}}>
            <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1800&q=90" alt="Современный тренажёрный зал Adrenaline" />
          </motion.div>
          <div className="hero-shade"/>
          <div className="hero-content">
            <motion.div initial={{y:18,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:.15}}>
              <div className="eyebrow"><span/> ADRENALINE ALMATY</div>
              <h1>Твой новый <em>уровень.</em></h1>
              <p>Премиальные клубы для тренировок, восстановления и роста. В центре Алматы.</p>
            </motion.div>
            <motion.div className="hero-buttons" initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:.3}}>
              <button className="button button-lime" onClick={() => openBuy()}>Выбрать абонемент <ArrowRight size={18}/></button>
              <button className="button button-glass" onClick={() => setGuestOpen(true)}>Бесплатная гостевая</button>
            </motion.div>
          </div>
          <motion.div className="hero-stats" initial={{y:30,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:.45}}>
            <div><strong>8</strong><span>клубов в Алматы</span></div>
            <div><strong>2000</strong><span>м² в флагманском зале</span></div>
            <div><strong>06:00</strong><span>начало тренировок</span></div>
          </motion.div>
        </section>

        <ClubSection selectedId={clubId} onSelect={setClubId}/>
        <DirectionsSection/>

        <MembershipSection club={selectedClub} duration={duration} setDuration={setDuration} clubId={clubId} setClubId={setClubId} onBuy={openBuy}/>
        <TrainersSection onBook={() => setGuestOpen(true)}/>
        <TrustSection/>
      </main>

      <footer id="contacts">
        <div className="footer-main">
          <div><div className="brand footer-brand"><span>ADRENALINE</span><small>FITNESS</small></div><p>Сеть фитнес-клубов премиум-класса в Алматы.</p></div>
          <div><h4>Связаться</h4><a href="tel:+77714473737">+7 771 447 3737</a><a href="https://wa.me/message/JKHEZLYEZXADA1">WhatsApp</a></div>
          <div><h4>Соцсети</h4><a href="https://www.instagram.com/adrenaline_kz" target="_blank" rel="noreferrer"><Instagram size={16}/> Instagram</a><a href="https://2gis.kz/almaty/search/Adrenaline" target="_blank" rel="noreferrer">Мы в 2GIS</a></div>
          <div><h4>Документы</h4><a href="https://adrenaline.kz/storage/app/media/documents/dogovor-oferty-ru.docx">Договор оферты</a><a href="https://adrenaline.kz/themes/demo/assets/images/footer/politic.docx">Политика конфиденциальности</a></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Adrenaline Fitness</span><span>Алматы, Казахстан</span></div>
      </footer>

      <AnimatePresence>
        {drawerOpen && <PurchaseDrawer club={selectedClub} duration={duration} tariff={selectedTariff} onClose={() => setDrawerOpen(false)}/>}
        {guestOpen && <GuestModal onClose={() => setGuestOpen(false)} club={selectedClub}/>}
      </AnimatePresence>
    </>
  )
}

function ClubSection({selectedId,onSelect}:{selectedId:string,onSelect:(id:string)=>void}) {
  const club = clubs.find(c => c.id === selectedId)!
  return <section className="section clubs-section" id="clubs">
    <div className="section-head"><div><div className="kicker">НАШИ КЛУБЫ</div><h2>Выбери свой зал</h2></div><p>Каждый клуб Adrenaline — это собственная атмосфера и полная подготовка к твоей цели.</p></div>
    <div className="club-tabs" role="tablist">
      {clubs.map(c => <button key={c.id} className={c.id === selectedId?'active':''} onClick={() => onSelect(c.id)}>{c.name.replace('На ','')}</button>)}
    </div>
    <motion.article key={club.id} className="club-feature" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}>
      <div className="club-image"><img src={club.image} alt={`Фитнес-клуб Adrenaline ${club.name}`} loading="lazy" decoding="async" width="1200" height="800"/><span className="status-pill"><i/> Клуб открыт</span></div>
      <div className="club-info">
        <div className="kicker">ADRENALINE · АЛМАТЫ</div><h3>{club.name}</h3><p className="club-description">{club.description}</p>
        <div className="club-meta"><div><MapPin size={19}/><span><small>Адрес</small>{club.address}</span></div><div><Dumbbell size={19}/><span><small>Площадь / оборудование</small>{club.area} · {club.equipment} тренажёров</span></div></div>
        <div className="feature-tags">{club.features.map(f => <span key={f}><Check size={14}/>{f}</span>)}</div>
        <div className="club-buttons"><a className="button button-dark" href={`https://2gis.kz/almaty/search/Adrenaline ${encodeURIComponent(club.address)}`} target="_blank" rel="noreferrer">Маршрут в 2GIS</a><a className="text-link" href="#memberships">Посмотреть тарифы <ArrowRight size={16}/></a></div>
      </div>
    </motion.article>
  </section>
}

function DirectionsSection() {
  return <section className="section directions-section" id="directions">
    <div className="section-head"><div><div className="kicker">ТВОЙ СПОРТ</div><h2>Всё для результата</h2></div><p>От силовых до восстановления — всё необходимое находится в одном клубе.</p></div>
    <div className="bento">
      {directions.map((d,i)=><motion.article className={`bento-card ${d.className}`} key={d.title} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{delay:i*.06}}>
        <img src={d.image} alt={d.title} loading="lazy" decoding="async" width="900" height="700"/><div className="bento-shade"/><div className="bento-copy"><span>0{i+1}</span><h3>{d.title}</h3><p>{d.text}</p></div>
      </motion.article>)}
    </div>
  </section>
}

function MembershipSection({club,duration,setDuration,clubId,setClubId,onBuy}:{club:Club,duration:Duration,setDuration:(d:Duration)=>void,clubId:string,setClubId:(id:string)=>void,onBuy:(t:'daily'|'unlimited'|'vip')=>void}) {
  const base = duration === 1 ? club.prices.month : duration === 3 ? club.prices.three : duration === 6 ? club.prices.six : club.prices.year
  const monthPrice = duration === 1 ? base : base/duration
  const visitPrice = Math.round(monthPrice/24)
  const savings = duration === 12 ? 45 : duration === 6 ? 28 : duration === 3 ? 18 : 0
  return <section className="section membership-section" id="memberships">
    <div className="membership-top">
      <div><div className="kicker">АБОНЕМЕНТЫ</div><h2>Спорт, который окупается</h2></div>
      <select value={clubId} onChange={e=>setClubId(e.target.value)} aria-label="Выберите клуб">{clubs.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select>
    </div>
    <div className="duration-pill" role="tablist" aria-label="Срок абонемента">
      {([1,3,6,12] as Duration[]).map(d=><button key={d} className={duration===d?'active':''} onClick={()=>setDuration(d)}>{d} мес<span>{d===12?'−45%':d===6?'−28%':d===3?'−18%':''}</span></button>)}
    </div>
    <div className="tariff-grid">
      <TariffCard title="Дневной" badge="Лёгкий старт" price={club.prices.daily || base*.7} duration={duration} visitPrice={visitPrice} features={['Доступ до 17:00','Тренажёрный зал','Кардио-зона','Заморозка 10 дней']} onBuy={()=>onBuy('daily')}/>
      <TariffCard title="Полный безлимит" badge="Популярный" price={base} duration={duration} visitPrice={visitPrice} features={['Все зоны клуба','Групповые занятия','Финская сауна','Вводный инструктаж','Заморозка по тарифу']} featured onBuy={()=>onBuy('unlimited')}/>
      <TariffCard title="VIP клуб" badge="Максимум" price={Math.round(base*1.55)} duration={duration} visitPrice={Math.round(visitPrice*1.55)} features={['Полный безлимит','Персональный тренер','Гостевые визиты','SPA-зона','Приоритетная запись']} onBuy={()=>onBuy('vip')}/>
    </div>
  </section>
}

function TariffCard({title,badge,price,duration,visitPrice,features,featured=false,onBuy}:{title:string,badge:string,price:number,duration:number,visitPrice:number,features:string[],featured?:boolean,onBuy:()=>void}) {
  return <motion.article className={`tariff-card ${featured?'tariff-featured':''}`} whileInView={{opacity:1,y:0}} initial={{opacity:0,y:20}} viewport={{once:true}}>
    <div className="tariff-head"><span>{badge}</span>{featured&&<div className="saving-badge">выгодно</div>}</div>
    <h3>{title}</h3><div className="tariff-price">{formatMoney(price)}<small>за {duration} {duration===1?'месяц':'мес.'}</small></div>
    <div className="per-visit">~{formatMoney(visitPrice)} <span>/ посещение</span></div>
    <ul>{features.map(f=><li key={f}><Check size={16}/>{f}</li>)}</ul>
    <button className={`button ${featured?'button-lime':'button-outline'}`} onClick={onBuy}>Оформить в 2 клика <ArrowRight size={17}/></button>
  </motion.article>
}

function TrainersSection({onBook}:{onBook:()=>void}) {
  return <section className="section trainers-section" id="trainers">
    <div className="section-head"><div><div className="kicker">КОМАНДА</div><h2>Рядом с сильными</h2></div><p>Квалифицированные тренеры помогут поставить технику и сделать прогресс стабильным.</p></div>
    <div className="trainer-grid">{trainers.map((t,i)=><motion.article key={t.name} initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.08}}>
      <img src={t.image} alt={t.name} loading="lazy" decoding="async" width="700" height="800"/><div className="trainer-copy"><h3>{t.name}</h3><p>{t.role}</p><button onClick={onBook}>Записаться <ArrowRight size={15}/></button></div>
    </motion.article>)}</div>
  </section>
}

function TrustSection() {
  const [open,setOpen]=useState(0)
  const faqs=[
    ['Можно ли заморозить абонемент?','Да. Условия заморозки зависят от срока тарифа: при необходимости срок продлевается на соответствующее количество дней.'],
    ['Что взять на первую тренировку?','Спортивную форму, сменную обувь, полотенце и воду. Замок на шкафчик можно взять свой или арендовать на ресепшн.'],
    ['Есть ли рассрочка?','В доступном сценарии оформления можно выбрать «Рассрочка 0-0-12». Финальное решение принимает платёжный партнёр.'],
    ['Можно ли перейти в другой клуб сети?','При полном безлимитном тарифе доступ может распространяться на выбранную сеть клубов. Уточните формат доступа у администратора.'],
  ]
  return <section className="section trust-section">
    <div className="faq"><div><div className="kicker">FAQ</div><h2>Всё, что нужно знать</h2></div><div className="faq-list">{faqs.map((q,i)=><div className={`faq-item ${open===i?'open':''}`} key={q[0]}><button onClick={()=>setOpen(open===i?-1:i)}><span>{q[0]}</span><ChevronDown size={20}/></button><AnimatePresence>{open===i&&<motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}><p>{q[1]}</p></motion.div>}</AnimatePresence></div>)}</div></div>
  </section>
}

function PurchaseDrawer({club,duration,tariff,onClose}:{club:Club,duration:Duration,tariff:'daily'|'unlimited'|'vip',onClose:()=>void}) {
  const [step,setStep]=useState<1|2|3>(1)
  const [payment,setPayment]=useState<Payment>('kaspi')
  const [promo,setPromo]=useState('')
  const [promoApplied,setPromoApplied]=useState(false)
  const [coach,setCoach]=useState(false)
  const [name,setName]=useState('')
  const [phone,setPhone]=useState('+7 ')
  const [processing,setProcessing]=useState(false)
  const [order,setOrder]=useState('')
  const base = duration===1?(tariff==='daily'?club.prices.daily:club.prices.month):(duration===3?club.prices.three:duration===6?club.prices.six:club.prices.year)
  const tariffTitle=tariff==='daily'?'Дневной':tariff==='vip'?'VIP клуб':'Полный безлимит'
  const tariffPrice=tariff==='vip'?Math.round(base*1.55):tariff==='daily'?(club.prices.daily||base*.7):base
  const total=Math.round((tariffPrice+(coach?25000:0))* (promoApplied?.9:1))
  const validName=name.trim().length>=2
  const validPhone=phone.replace(/\D/g,'').length===11

  const confirm=()=>{
    if(!validName||!validPhone||processing)return
    setProcessing(true)
    window.setTimeout(()=>{
      const id='AD-'+Math.random().toString(36).slice(2,8).toUpperCase()
      const orderData={id,club:club.name,tariff:tariffTitle,duration,total,name,phone,payment,createdAt:new Date().toISOString()}
      const old=JSON.parse(localStorage.getItem('adrenaline-orders')||'[]') as unknown[]
      localStorage.setItem('adrenaline-orders',JSON.stringify([orderData,...old].slice(0,10)))
      setOrder(id);setProcessing(false);setStep(3)
    },1400)
  }

  const download=()=>{
    const data=`ADRENALINE FITNESS\nЭлектронный абонемент\n№ ${order}\nКлуб: ${club.name}\nТариф: ${tariffTitle}\nСрок: ${duration} мес.\nСумма: ${formatMoney(total)}\nВладелец: ${name}\n`
    const blob=new Blob([data],{type:'text/plain;charset=utf-8'})
    const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`Adrenaline-${order}.txt`;a.click();URL.revokeObjectURL(url)
  }

  const phoneMask=(value:string)=>{
    const digits=value.replace(/\D/g,'').slice(0,11)
    let result='+7 '
    if(digits.length>1)result+='('+digits.slice(1,4)
    if(digits.length>=4)result+=') '
    if(digits.length>=5)result+=digits.slice(4,7)
    if(digits.length>=8)result+='-'+digits.slice(7,9)
    if(digits.length>=10)result+='-'+digits.slice(9,11)
    return result
  }

  return <><motion.div className="drawer-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}/><motion.aside className="drawer" initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'spring',damping:28,stiffness:260}} role="dialog" aria-modal="true" aria-label="Оформление абонемента">
    <div className="drawer-head"><div><span>Оформление</span><strong>{step===3?'Ваш абонемент':`Шаг ${step} из 2`}</strong></div><button className="icon-button" onClick={onClose} aria-label="Закрыть"><X size={20}/></button></div>
    {step<3&&<div className="progress"><span className={step>=1?'active':''}/><span className={step>=2?'active':''}/></div>}
    {step===1&&<div className="drawer-body">
      <div className="order-summary"><div><span>Клуб</span><strong>{club.name}</strong></div><div><span>Адрес</span><strong>{club.address}</strong></div><div><span>Тариф</span><strong>{tariffTitle} · {duration} мес.</strong></div></div>
      <div className="drawer-price"><span>Итого</span><strong>{formatMoney(total)}</strong></div>
      <label className="check-row"><input type="checkbox" checked={coach} onChange={e=>setCoach(e.target.checked)} /><span className="custom-check">{coach&&<Check size={14}/>}</span><span><strong>Стартовый пакет с тренером</strong><small>2 занятия + вводный план · 25 000 ₸</small></span></label>
      <div className="promo-row"><input value={promo} onChange={e=>setPromo(e.target.value)} placeholder="Промокод"/><button onClick={()=>promo.trim()&&setPromoApplied(true)}>{promoApplied?'Применён':'Применить'}</button></div>
      {promoApplied&&<div className="promo-success">Скидка 10% применена</div>}
      <button className="button button-lime drawer-next" onClick={()=>setStep(2)}>Продолжить <ArrowRight size={18}/></button>
    </div>}
    {step===2&&<div className="drawer-body">
      <div className="payment-total"><span>К оплате</span><strong>{formatMoney(total)}</strong></div>
      <label className="field">Имя<input value={name} onChange={e=>setName(e.target.value)} placeholder="Имя и фамилия" /></label>
      <label className="field">Номер телефона<input value={phone} onChange={e=>setPhone(phoneMask(e.target.value))} inputMode="tel" placeholder="+7 (7XX) XXX-XX-XX" /></label>
      <div className="payment-title">Способ оплаты</div>
      <div className="payment-options">
        <button className={payment==='kaspi'?'active':''} onClick={()=>setPayment('kaspi')}><span className="kaspi-mark">K</span><span><strong>Kaspi QR / Pay</strong><small>Оплата через приложение</small></span>{payment==='kaspi'&&<Check size={17}/>}</button>
        <button className={payment==='card'?'active':''} onClick={()=>setPayment('card')}><CreditCard size={22}/><span><strong>Банковская карта</strong><small>Visa / Mastercard</small></span>{payment==='card'&&<Check size={17}/>}</button>
        <button className={payment==='installment'?'active':''} onClick={()=>setPayment('installment')}><span className="term-mark">0</span><span><strong>Рассрочка 0-0-12</strong><small>Без переплаты</small></span>{payment==='installment'&&<Check size={17}/>}</button>
      </div>
      {payment==='kaspi'&&<div className="payment-preview"><div className="qr">■ □ ■ ■ □<br/>□ ■ □ ■ ■<br/>■ □ ■ ■ □</div><span>QR для Kaspi Pay</span></div>}
      {payment==='card'&&<div className="card-preview"><input aria-label="Номер карты" placeholder="0000 0000 0000 0000"/><div><input aria-label="Срок карты" placeholder="MM/YY"/><input aria-label="CVV" placeholder="CVV"/></div></div>}
      {!validName&&name.length>0&&<div className="form-error">Введите имя</div>}
      {!validPhone&&phone.length>3&&<div className="form-error">Введите 11 цифр номера</div>}
      <button className="button button-lime drawer-next" disabled={!validName||!validPhone||processing} onClick={confirm}>{processing?<span className="spinner"/>:<><Check size={18}/> Оплатить {formatMoney(total)}</>}</button>
    </div>}
    {step===3&&<div className="drawer-body pass-body">
      <div className="success-mark"><Check size={28}/></div><h3>Оплата прошла успешно</h3><p>Электронный абонемент готов</p>
      <div className="digital-pass"><div className="pass-brand">ADRENALINE <span>FITNESS</span></div><div className="pass-id">№ {order}</div><div className="pass-club">{club.name}</div><div className="pass-grid"><div><small>Владелец</small><strong>{name}</strong></div><div><small>Срок</small><strong>{duration} мес.</strong></div></div><div className="pass-qr"><div/><span>QR</span></div></div>
      <button className="button button-lime drawer-next" onClick={download}>Скачать абонемент <ArrowRight size={18}/></button>
    </div>}
  </motion.aside></>
}

function GuestModal({onClose,club}:{onClose:()=>void,club:Club}) {
  const [sent,setSent]=useState(false)
  return <><motion.div className="drawer-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}/><motion.div className="guest-modal" initial={{opacity:0,scale:.96,y:20}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:.96}} role="dialog" aria-modal="true">
    <button className="icon-button modal-close" onClick={onClose} aria-label="Закрыть"><X size={20}/></button>
    {sent?<div className="guest-success"><div className="success-mark"><Check size={28}/></div><h3>Заявка отправлена</h3><p>Администратор {club.name} скоро свяжется с вами.</p><button className="button button-dark" onClick={onClose}>Готово</button></div>:<><div className="kicker">ГОСТЕВАЯ ТРЕНИРОВКА</div><h2>Приходи попробовать</h2><p>Мы подготовим зал и подберём тренера для первого знакомства.</p><div className="guest-form"><input placeholder="Имя"/><input placeholder="+7 (7XX) XXX-XX-XX"/><select defaultValue={club.id}>{clubs.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select><button className="button button-lime" onClick={()=>setSent(true)}>Записаться бесплатно <ArrowRight size={18}/></button></div></>}
  </motion.div></>
}

export default App
