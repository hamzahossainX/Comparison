import { Component, Suspense, lazy, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, MotionConfig, motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, AudioLines, BatteryFull, Check, ChevronRight, Globe2, Headphones, Leaf, Menu, Minus, MoveHorizontal, Plus, RotateCcw, Search, ShieldCheck, ShoppingBag, Truck, Waves, X } from 'lucide-react'
import ProductArt from './ProductArt'
import { finishes, loadCart, money, products } from './data'
import type { CartItem, Product } from './data'

const Scene = lazy(() => import('./Scene'))
type Modal = 'bag' | 'search' | 'product' | 'support' | 'shipping' | 'privacy' | 'checkout' | 'success' | null
type Filter = 'All products' | 'Headphones' | 'Earbuds' | 'Speakers'
const filters: Filter[] = ['All products', 'Headphones', 'Earbuds', 'Speakers']

class SceneBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? this.props.fallback : this.props.children }
}

function Dialog({ title, children, onClose, wide = false }: { title: string; children: ReactNode; onClose: () => void; wide?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    const dialog = ref.current
    dialog?.showModal()
    dialog?.querySelector<HTMLInputElement>('input')?.focus()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { dialog?.close(); document.body.style.overflow = previous; previouslyFocused?.focus() }
  }, [])
  return <dialog ref={ref} className={`shop-dialog ${wide ? 'wide' : ''}`} aria-labelledby="dialog-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose() }}>
    <div className="dialog-inner"><div className="dialog-heading"><h2 id="dialog-title">{title}</h2><button className="icon-button" onClick={onClose} aria-label="Close dialog"><X size={21}/></button></div>{children}</div>
  </dialog>
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion()
  return <motion.div className={className} initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}

function SoundStory() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const inView = useInView(ref)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.22])
  const rotate = useTransform(scrollYProgress, [0, 1], [-12, 12])
  const y = useTransform(scrollYProgress, [0, 1], [60, -30])
  return <section id="experience" ref={ref} className="sound-story">
    <div className="story-sticky">
      <div className="story-art"><div className="sound-ring ring-one"/><div className="sound-ring ring-two"/><div className="sound-ring ring-three"/><motion.div className="story-product" style={reduced ? {} : { scale, rotate, y }}><SceneBoundary fallback={<ProductArt color="#a9bba2"/>}><Suspense fallback={<ProductArt color="#a9bba2"/>}><Scene color="#a9bba2" dark="#4a5c49" progress={scrollYProgress} reducedMotion={!!reduced} rotation={0.4} active={inView}/></Suspense></SceneBoundary></motion.div><span className="story-art-label">ENGINEERED TO DISAPPEAR.<br/>DESIGNED TO BE FELT.</span></div>
      <div className="story-copy"><Reveal><span className="eyebrow light"><span className="tiny-line"/> THE FORMA EXPERIENCE</span><h2>A little less world.<br/><span>A lot more you.</span></h2><p>Find the space between the noise. Adaptive noise cancellation makes room for every detail, every emotion, every note.</p></Reveal>
        <div className="story-features"><Reveal delay={0.1}><Waves size={23}/><div><h3>Nothing but the music.</h3><p>Adaptive noise cancellation that listens to your surroundings, so you don’t have to.</p></div></Reveal><Reveal delay={0.2}><AudioLines size={23}/><div><h3>Feel every frequency.</h3><p>Custom 40 mm drivers. Rich lows, luminous highs, and everything in between.</p></div></Reveal><Reveal delay={0.3}><BatteryFull size={23}/><div><h3>Stay in your own rhythm.</h3><p>Up to 40 hours of listening. A 10-minute charge for 5 more hours of your favorites.</p></div></Reveal></div>
      </div>
      <div className="story-progress"><motion.span style={{ scaleX: scrollYProgress }}/></div>
    </div>
  </section>
}

export default function App() {
  const [finish, setFinish] = useState(0)
  const [rotation, setRotation] = useState(0)
  const [resetToken, setResetToken] = useState(0)
  const [filter, setFilter] = useState<Filter>('All products')
  const [cart, setCart] = useState<CartItem[]>(loadCart)
  const [modal, setModal] = useState<Modal>(null)
  const [selected, setSelected] = useState<Product>(products[0])
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [announcement, setAnnouncement] = useState('')
  const heroRef = useRef<HTMLElement>(null)
  const inView = useInView(heroRef)
  const reduced = !!useReducedMotion()
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  const total = cart.reduce((sum, item) => sum + products.find(p => p.id === item.productId)!.price * item.quantity, 0)
  const visibleProducts = products.filter(p => filter === 'All products' || p.kind === ({ Headphones: 'headphones', Earbuds: 'earbuds', Speakers: 'speaker' } as const)[filter])

  useEffect(() => { try { localStorage.setItem('aure-bag', JSON.stringify(cart)) } catch { /* The shopping bag still works when storage is unavailable. */ } }, [cart])
  useEffect(() => {
    if (!announcement) return
    const timeout = window.setTimeout(() => setAnnouncement(''), 2500)
    return () => window.clearTimeout(timeout)
  }, [announcement])
  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [])

  function addToBag(product: Product, color = finishes[finish].name, open = true) {
    setCart(previous => {
      const exists = previous.find(item => item.productId === product.id && item.finish === color)
      return exists ? previous.map(item => item === exists ? { ...item, quantity: Math.min(item.quantity + 1, 99) } : item) : [...previous, { productId: product.id, finish: color, quantity: 1 }]
    })
    setAnnouncement(`${product.name} in ${color} added to your bag`)
    if (open) setModal('bag')
  }
  function changeQuantity(item: CartItem, delta: number) {
    setCart(previous => previous.map(row => row.productId === item.productId && row.finish === item.finish ? { ...row, quantity: Math.min(row.quantity + delta, 99) } : row).filter(row => row.quantity > 0))
  }
  function browse(next: Filter) { setFilter(next); setMenuOpen(false); document.getElementById('collection')?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' }) }
  function openProduct(product: Product) { setSelected(product); setFinish(product.id === 'air' ? 1 : 0); setModal('product') }
  const fallback = <ProductArt color={finishes[finish].color} className="hero-fallback"/>

  return <MotionConfig reducedMotion="user">
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><div className="nav-shell">
      <a className="wordmark" href="#" aria-label="AURE home">aure<span>®</span></a>
      <nav className="desktop-nav" aria-label="Main navigation"><button onClick={() => browse('All products')} className="nav-current">Discover</button><button onClick={() => browse('Headphones')}>Headphones</button><button onClick={() => browse('Earbuds')}>Earbuds</button><button onClick={() => browse('Speakers')}>Speakers</button><a href="#philosophy">Our philosophy</a></nav>
      <div className="nav-actions"><button className="icon-button" aria-label="Search products" onClick={() => setModal('search')}><Search size={19}/></button><button className="bag-button" aria-label={`Open shopping bag, ${count} items`} onClick={() => setModal('bag')}><ShoppingBag size={19}/><span className="bag-count">{count}</span></button><button className="icon-button menu-button" aria-label="Toggle navigation" aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22}/> : <Menu size={22}/>}</button></div>
    </div><AnimatePresence>{menuOpen && <motion.nav id="mobile-nav" aria-label="Mobile navigation" className="mobile-nav" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>{filters.map(option => <button key={option} onClick={() => browse(option)}>{option}<ArrowUpRight size={18}/></button>)}<a href="#philosophy" onClick={() => setMenuOpen(false)}>Our philosophy<ArrowUpRight size={18}/></a></motion.nav>}</AnimatePresence></header>

    <main id="main">
      <section ref={heroRef} className="hero" aria-labelledby="hero-title">
        <div className="hero-topline"><span>THOUGHTFULLY DESIGNED. BEAUTIFULLY HEARD.</span><span>EST. 2024 <span className="small-star">✳</span> SOUND, RECONSIDERED.</span></div>
        <div className="hero-layout">
          <div className="hero-copy"><motion.div initial={{ opacity: 0, y: reduced ? 0 : 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}><div className="new-label"><span/> INTRODUCING FORMA</div><h1 id="hero-title">Less noise.<br/>More <span>feeling.</span></h1><p>Extraordinary sound. Effortless silence.<br/>A little space to get lost in what moves you.</p><div className="hero-cta"><button className="button button-dark" onClick={() => addToBag(products[0])}>Meet Forma <ArrowUpRight size={18}/></button><a className="text-link" href="#experience">Explore the sound <ArrowRight size={16}/></a></div><div className="hero-price"><span>From $349</span><span className="price-divider"/>Made for your everyday.</div></motion.div></div>
          <div className="hero-visual"><div className="hero-orbit"/><span className="giant-word" aria-hidden="true">forma</span><div className="model-container"><SceneBoundary fallback={fallback}><Suspense fallback={fallback}><Scene color={finishes[finish].color} dark={finishes[finish].dark} progress={scrollYProgress} reducedMotion={reduced} rotation={rotation} resetToken={resetToken} active={inView && !modal}/></Suspense></SceneBoundary></div><div className="floating-spec"><span className="spec-dot"/><div><strong>40 hours.</strong><span>One uninterrupted feeling.</span></div></div><div className="model-controls"><button aria-label="Rotate headphones left" onClick={() => setRotation(r => r - Math.PI / 6)}><ArrowLeft size={14}/></button><span><MoveHorizontal size={15}/> DRAG TO EXPLORE</span><button aria-label="Rotate headphones right" onClick={() => setRotation(r => r + Math.PI / 6)}><ArrowRight size={14}/></button><button aria-label="Reset headphone rotation" onClick={() => { setRotation(0); setResetToken(value => value + 1) }}><RotateCcw size={13}/></button></div></div>
        </div>
        <div className="hero-bottom"><a href="#experience" className="scroll-cue"><span><ArrowDown size={16}/></span>SCROLL TO FEEL THE DIFFERENCE</a><div className="finish-selector"><span>YOUR COLOR. YOUR FREQUENCY.</span><div className="swatches" role="group" aria-label="Choose a headphone finish">{finishes.map((color, index) => <button key={color.name} aria-label={`${color.name} finish`} aria-pressed={finish === index} className={`swatch ${finish === index ? 'selected' : ''}`} style={{ backgroundColor: color.color }} onClick={() => setFinish(index)}/>)}</div><span className="finish-name">{finishes[finish].name}</span></div><span className="hero-edition">01 / 03</span></div>
      </section>

      <div className="benefit-strip"><span><Truck size={19}/>Complimentary shipping</span><span><Headphones size={19}/>30 days to find your frequency</span><span><ShieldCheck size={19}/>2-year peace of mind</span></div>

      <section id="collection" className="collection section-shell"><Reveal className="section-heading"><div><span className="eyebrow">THE COLLECTION</span><h2>Good sound.<br className="mobile-break"/> In every form.</h2></div><p>Considered design. Uncompromising sound.<br/>Find the one that fits your world.</p></Reveal>
        <div className="collection-toolbar"><div className="filter-tabs" role="group" aria-label="Filter products">{filters.map(option => <button key={option} className={filter === option ? 'active' : ''} aria-pressed={filter === option} onClick={() => setFilter(option)}>{option}</button>)}</div><span className="product-count">{visibleProducts.length.toString().padStart(2, '0')} thoughtfully made essentials</span></div>
        <motion.div layout className="product-grid"><AnimatePresence mode="popLayout">{visibleProducts.map((product, index) => <motion.article layout key={product.id} className={`product-card product-${product.id}`} initial={{ opacity: 0, y: reduced ? 0 : 25 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.35, delay: index * 0.07 }}><div className="product-card-top"><span className="product-tag">{product.tag}</span><button className="quick-add" aria-label={`Add ${product.name} to bag`} onClick={() => addToBag(product, product.id === 'air' ? 'Chalk' : 'Sage')}><Plus size={20}/></button></div><button className="product-image-button" aria-label={`View ${product.name} details`} onClick={() => openProduct(product)}><ProductArt kind={product.kind} color={product.color}/></button><div className="product-card-info"><div><h3><button onClick={() => openProduct(product)}>{product.name}<ArrowUpRight size={19}/></button></h3><p>{product.subtitle}</p></div><span className="product-price">{money(product.price)}</span></div><div className="card-colors" aria-label="Available in Sage, Chalk, and Graphite">{finishes.map(color => <span key={color.name} style={{ background: color.color }}/>)}</div></motion.article>)}</AnimatePresence></motion.div>
      </section>

      <SoundStory/>

      <section id="philosophy" className="philosophy section-shell"><Reveal className="philosophy-intro"><span className="eyebrow">LESS, BUT BETTER.</span><h2>Designed with purpose.<br/><span>Made to stay.</span></h2></Reveal><div className="philosophy-grid"><Reveal><Leaf size={25} strokeWidth={1.4}/><h3>A lighter footprint.</h3><p>Recycled materials. Plastic-free packaging. Thoughtful choices, from the first sketch to your front door.</p></Reveal><Reveal delay={0.1}><AudioLines size={25} strokeWidth={1.4}/><h3>Only what matters.</h3><p>Every curve, every control, every quiet detail. Nothing added without a reason. Nothing between you and the music.</p></Reveal><Reveal delay={0.2}><Globe2 size={25} strokeWidth={1.4}/><h3>For the long listen.</h3><p>Timeless by design and built for everyday life. Because the things you love should be the things you keep.</p></Reveal></div></section>

      <section className="closing-note"><span className="eyebrow">TUNE INTO YOURSELF.</span><Reveal><h2>Find your frequency.</h2></Reveal><button className="button button-dark" onClick={() => browse('All products')}>Explore the collection<ArrowUpRight size={18}/></button><span className="closing-star" aria-hidden="true">✳</span></section>
    </main>

    <footer className="site-footer section-shell"><div className="footer-top"><div><a href="#" className="wordmark">aure<span>®</span></a><p>Sound for a more considered life.</p></div><div className="footer-links"><div><span>EXPLORE</span><button onClick={() => browse('Headphones')}>Headphones</button><button onClick={() => browse('Earbuds')}>Earbuds</button><button onClick={() => browse('Speakers')}>Speakers</button></div><div><span>HERE TO HELP</span><button onClick={() => setModal('support')}>Contact & support</button><button onClick={() => setModal('shipping')}>Shipping & returns</button><a href="#philosophy">Our philosophy</a></div></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} AURE. All rights reserved.</span><span className="demo-label">A concept in sound. A storefront prototype.</span><button onClick={() => setModal('privacy')}>Privacy</button><span>United States · USD $</span></div></footer>
    <div className="sr-only" role="status" aria-live="polite">{announcement}</div>

    {modal && <Dialog key={modal === 'product' ? 'product' : modal} title={modal === 'bag' ? `Your bag (${count})` : modal === 'search' ? 'Find your frequency.' : modal === 'product' ? selected.name : modal === 'checkout' ? 'Demo checkout' : modal === 'success' ? 'A little more good sound.' : modal === 'shipping' ? 'The finer details.' : modal === 'privacy' ? 'Your privacy.' : 'We’re here to listen.'} onClose={() => setModal(null)} wide={modal === 'product'}>
      {modal === 'bag' && <>{cart.length ? <><div className="cart-items">{cart.map(item => { const product = products.find(p => p.id === item.productId)!; return <div className="cart-item" key={`${item.productId}-${item.finish}`}><div className="cart-art"><ProductArt kind={product.kind} color={finishes.find(f => f.name === item.finish)!.color}/></div><div className="cart-item-info"><h3>{product.name}</h3><p>{item.finish} · {money(product.price)}</p><div className="quantity-control"><button aria-label={`Decrease ${product.name} ${item.finish} quantity`} onClick={() => changeQuantity(item, -1)}><Minus size={14}/></button><span>{item.quantity}</span><button aria-label={`Increase ${product.name} ${item.finish} quantity`} disabled={item.quantity >= 99} onClick={() => changeQuantity(item, 1)}><Plus size={14}/></button></div></div><strong>{money(product.price * item.quantity)}</strong></div> })}</div><div className="cart-total"><span>Subtotal</span><strong>{money(total)}</strong></div><p className="fine-print">Complimentary shipping. Taxes calculated at checkout.</p><button className="button button-dark full-width" onClick={() => setModal('checkout')}>Continue to demo checkout<ArrowRight size={18}/></button><button className="text-link continue-shopping" onClick={() => setModal(null)}>Keep exploring</button></> : <div className="empty-state"><ShoppingBag size={40} strokeWidth={1}/><h3>A little room for good sound.</h3><p>Your next favorite is waiting in the collection.</p><button className="button button-dark" onClick={() => { setModal(null); browse('All products') }}>Explore the collection<ArrowRight size={18}/></button></div>}</>}
      {modal === 'search' && <><div className="search-input"><Search size={19}/><input autoFocus aria-label="Search products" placeholder="Try headphones, earbuds, or speakers…" value={query} onChange={event => setQuery(event.target.value)}/></div><div className="search-results">{products.filter(p => `${p.name} ${p.kind} ${p.subtitle}`.toLowerCase().includes(query.toLowerCase().trim())).map(product => <button key={product.id} onClick={() => openProduct(product)}><ProductArt kind={product.kind} color={product.color}/><span><strong>{product.name}</strong><small>{product.subtitle}</small></span><span>{money(product.price)}</span><ChevronRight size={18}/></button>)}{!products.some(p => `${p.name} ${p.kind} ${p.subtitle}`.toLowerCase().includes(query.toLowerCase().trim())) && <p className="empty-search">No matches yet. Try “Forma”, “Air”, or “Room”.</p>}</div></>}
      {modal === 'product' && <div className="product-detail"><div className="detail-art"><ProductArt kind={selected.kind} color={finishes[finish].color}/></div><div><span className="eyebrow">{selected.tag}</span><h3>{selected.subtitle}</h3><p>{selected.kind === 'headphones' ? 'An immersive over-ear experience with adaptive noise cancellation, custom 40 mm drivers, and up to 40 hours of listening.' : selected.kind === 'earbuds' ? 'Effortless wireless listening in a pocket-sized design. Adaptive noise cancellation and up to 24 hours with the charging case.' : 'Warm, room-filling sound in a thoughtfully compact form. Wireless pairing, tactile controls, and up to 18 hours of music.'}</p><div className="detail-finish"><span>Finish — {finishes[finish].name}</span><div className="swatches">{finishes.map((color, index) => <button key={color.name} aria-label={`Select ${color.name}`} aria-pressed={finish === index} className={`swatch ${finish === index ? 'selected' : ''}`} style={{ background: color.color }} onClick={() => setFinish(index)}/>)}</div></div><button className="button button-dark full-width" onClick={() => addToBag(selected)}>Add to bag — {money(selected.price)}<Plus size={18}/></button><p className="fine-print"><Truck size={15}/> Complimentary shipping & 30-day returns</p></div></div>}
      {modal === 'checkout' && <form className="checkout-form" onSubmit={event => { event.preventDefault(); setCart([]); setModal('success') }}><p>This is a frontend demo. No payment is collected and no order will be shipped.</p><label>Name<input required autoComplete="name" placeholder="Your name" maxLength={100}/></label><label>Email<input required type="email" autoComplete="email" placeholder="you@example.com" maxLength={200}/></label><div className="cart-total"><span>Demo order total</span><strong>{money(total)}</strong></div><button className="button button-dark full-width" type="submit">Place demo order<ArrowRight size={18}/></button><button type="button" className="text-link continue-shopping" onClick={() => setModal('bag')}>Back to bag</button></form>}
      {modal === 'success' && <div className="empty-state"><span className="success-icon"><Check size={28}/></span><h3>Your demo order is complete.</h3><p>No payment was taken, and your details haven’t been saved. Thanks for exploring AURE.</p><button className="button button-dark" onClick={() => setModal(null)}>Keep listening<ArrowRight size={18}/></button></div>}
      {modal === 'support' && <div className="info-content"><p>Good sound starts with a good experience.</p><details open><summary>How do I pair my headphones?</summary><p>For this concept, hold the power button for 3 seconds, then select AURE Forma in your device’s Bluetooth settings.</p></details><details><summary>What’s included?</summary><p>Your headphones, a protective travel case, a USB-C charging cable, and a quick-start guide.</p></details><details><summary>Can I get help with an order?</summary><p>AURE is a fictional brand. This prototype does not accept payments or fulfill orders.</p></details></div>}
      {modal === 'shipping' && <div className="info-content"><h3>Made to arrive beautifully.</h3><p>The concept includes complimentary standard shipping, a 30-day listening period, and a 2-year limited warranty.</p><p>All products, specifications, prices, and policies are illustrative. This prototype does not process shipments or returns.</p></div>}
      {modal === 'privacy' && <div className="info-content"><p>Your shopping bag is stored locally in this browser so it’s here when you return. No analytics, tracking cookies, or payment services are connected.</p><p>Demo checkout details are never transmitted or saved. Clearing your browser’s site data removes your saved bag.</p></div>}
    </Dialog>}
  </MotionConfig>
}
