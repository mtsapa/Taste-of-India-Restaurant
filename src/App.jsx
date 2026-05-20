import { useEffect, useRef, useState } from 'react'

/* ----------------------------------------------------------------
   DATA — edit these arrays to update site content
-----------------------------------------------------------------*/
const FAVORITES = [
  'Chicken Biryani', 'Chicken 65', 'Tandoori Chicken Combo', 'Lentil Lemon Rice',
  'Butter Chicken', 'Spinach Chicken', 'Masala Dosa', 'Vegetable Combo',
  'Chicken Samosa', 'Plain Idli', 'Mango Lassi', 'Naan',
]

const MENU = {
  mains: {
    title: 'Mains & Plates',
    sub: 'Hearty classics — includes 1 veg where noted',
    items: [
      { name: 'Vegetable Biryani', price: '$9.49', tag: 'veg' },
      { name: 'Chicken Biryani', price: '$9.99' },
      { name: 'Butter Chicken', price: '$10.49' },
      { name: 'Chicken 65', price: '$10.49', tag: 'spicy' },
      { name: 'Tandoori Chicken', price: '$8.99' },
      { name: 'Spinach Chicken', price: '$8.99' },
    ],
  },
  dosa: {
    title: 'Dosa & Idli',
    sub: 'Served with chutney & sambar',
    items: [
      { name: 'Masala Dosa', price: '$10.99', tag: 'veg' },
      { name: 'Idli', price: '$7.49', desc: '— 3 plain idlis with chutney & sambar' },
    ],
  },
  snacks: {
    title: 'Snacks & Sides',
    sub: 'Light bites & breads',
    items: [
      { name: 'Chicken Samosa', price: '$4.49' },
      { name: 'Vegetable Samosa', price: '$3.99', tag: 'veg' },
      { name: 'Naan', price: '$2.29', tag: 'veg' },
      { name: 'Chapathi or Roti', price: '$1.49', tag: 'veg' },
    ],
  },
  drinks: {
    title: 'Drinks',
    sub: 'Bottle deposit where applicable',
    items: [
      { name: 'Mango Lassi', price: '$3.99' },
      { name: 'Mango Juice', price: '$1.45' },
      { name: 'Apple / Orange Juice', price: '$1.20' },
      { name: 'Coconut Water', price: '$1.99' },
      { name: 'V8', price: '$2.29' },
      { name: 'Water', price: '$1.75' },
      { name: 'All Pops', price: '$1.99' },
    ],
  },
}

const ADDONS = [
  { name: 'Veg Dish', price: '$1.99' },
  { name: 'Meat Dish', price: '$3.75' },
  { name: 'Piece of Chicken', price: '$3.25' },
  { name: 'Extra Rice', price: '$3.00' },
]

const HOURS = [
  { day: 'Monday', time: '10 AM – 6 PM' },
  { day: 'Tuesday', time: '10 AM – 6 PM' },
  { day: 'Wednesday', time: '10 AM – 6 PM' },
  { day: 'Thursday', time: '10 AM – 6 PM' },
  { day: 'Friday', time: '10 AM – 6 PM' },
  { day: 'Saturday', time: 'Closed', closed: true },
  { day: 'Sunday', time: 'Closed', closed: true },
]

const CONTACT = {
  address: '5201 Duke St, Halifax, NS, Canada',
  mapUrl: 'https://maps.google.com/?q=5201+Duke+St,+Halifax,+NS,+Canada',
  phone: '+1 902-455-5467',
  phoneHref: 'tel:+19024555467',
  email: 'jk.atoi@yahoo.ca',
  website: 'atasteofindia.net',
  websiteUrl: 'http://www.atasteofindia.net/',
  reviewsUrl: 'https://www.facebook.com/atasteofindia/reviews',
}

const IMG = {
  spread: '/images/curry-spread.jpg',
  tandoori: '/images/tandoori-chicken.jpg',
  buffet: '/images/buffet-trays.jpg',
  combo: '/images/combo-plate.jpg',
}

/* ----------------------------------------------------------------
   Reveal-on-scroll hook
-----------------------------------------------------------------*/
function useReveal() {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          obs.unobserve(el)
        }
      },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, shown]
}

function Reveal({ children, className = '', as: Tag = 'div' }) {
  const [ref, shown] = useReveal()
  return (
    <Tag ref={ref} className={`${className} reveal ${shown ? 'in' : ''}`}>
      {children}
    </Tag>
  )
}

/* ----------------------------------------------------------------
   Components
-----------------------------------------------------------------*/
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <nav style={{ padding: scrolled ? '12px 36px' : '18px 36px' }}>
      <a href="#top" className="brand">
        <span className="dot" />
        A Taste of India
      </a>
      <div className="links">
        <a href="#about">About</a>
        <a href="#favorites">Favorites</a>
        <a href="#menu">Menu</a>
        <a href="#gallery">Gallery</a>
        <a href="#visit">Visit</a>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <header className="hero" id="top">
      <div className="ring r1" />
      <div className="ring r2" />
      <div className="ring r3" />
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">Authentic Indian Kitchen</div>
          <h1>
            Honest spice,
            <br />
            <em>generous</em> plates.
          </h1>
          <p className="lead">
            A cozy neighborhood spot in Halifax serving fresh, flavorful Indian
            classics — biryani, dosa, tandoori and more — at prices that keep
            everyone coming back.
          </p>
          <div className="btn-row">
            <a href="#menu" className="btn btn-primary">View the Menu →</a>
            <a href={CONTACT.phoneHref} className="btn btn-ghost">
              📞 Call {CONTACT.phone}
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="badge">
            <span className="big">100%</span>
            <span className="small">Halal Meat</span>
          </div>
          <div className="photo-card pc-main">
            <img src={IMG.spread} alt="Indian curry and biryani spread" />
          </div>
          <div className="photo-card pc-sub">
            <img src={IMG.combo} alt="Chicken curry combo plate with rice" />
          </div>
          <div className="photo-card pc-back">
            <img src={IMG.buffet} alt="Indian buffet trays" />
          </div>
        </div>
      </div>
    </header>
  )
}

function About() {
  return (
    <section className="about" id="about">
      <div className="wrap about-grid">
        <Reveal className="about-text">
          <div className="kicker">Our Story</div>
          <h2 className="about-h2">
            A small kitchen with a <em>big</em> following.
          </h2>
          <p>
            A Taste of India is a popular neighborhood restaurant offering a
            variety of Indian dishes at genuinely affordable prices — and a
            loyal customer base that keeps praising the consistent quality.
          </p>
          <p>
            It's a cozy spot with a limited but well-curated menu — perfect for
            a simple, tasty meal without spending too much. With options for
            non-veg, veg, and vegan diners, the combos are a great value with
            generous portion sizes.
          </p>
          <p>
            Fresh, flavorful food at reasonable prices: that's the whole idea.
          </p>
          <div className="stats">
            <div className="stat">
              <div className="num">100%</div>
              <div className="lbl">Fresh halal meat</div>
            </div>
            <div className="stat">
              <div className="num">3</div>
              <div className="lbl">Veg · Non-veg · Vegan</div>
            </div>
            <div className="stat">
              <div className="num">$1.49+</div>
              <div className="lbl">Snacks & sides</div>
            </div>
          </div>
        </Reveal>
        <Reveal className="about-photo" as="figure">
          <img src={IMG.tandoori} alt="Grilled tandoori chicken" />
          <figcaption className="frame-tag">
            Fresh & flavorful, every plate
          </figcaption>
        </Reveal>
      </div>
    </section>
  )
}

function Favorites() {
  return (
    <section id="favorites">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="kicker">Crowd Pleasers</div>
          <h2>
            Customers' <em>favorites</em>
          </h2>
          <p>The dishes regulars order again and again.</p>
        </Reveal>
        <Reveal className="fav-track">
          {FAVORITES.map((f) => (
            <span className="fav-chip" key={f}>
              <span className="star">★</span>
              {f}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function MenuBlock({ block }) {
  return (
    <Reveal className="menu-block">
      <h3>{block.title}</h3>
      <div className="sub">{block.sub}</div>
      {block.items.map((item) => (
        <div className="m-item" key={item.name}>
          <span className="m-name">
            {item.name}
            {item.tag && (
              <span className={`tag ${item.tag}`}>
                {item.tag === 'veg' ? 'Veg' : 'Spicy'}
              </span>
            )}
          </span>
          {item.desc && <span className="m-desc">{item.desc}</span>}
          <span className="m-dots" />
          <span className="m-price">{item.price}</span>
        </div>
      ))}
    </Reveal>
  )
}

function Menu() {
  return (
    <section className="menu" id="menu">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="kicker">The Menu</div>
          <h2>
            What's <em>cooking</em>
          </h2>
          <p>A tight, well-loved lineup. All meat is fresh halal — taxes extra.</p>
        </Reveal>

        <div className="menu-cols">
          <div>
            <MenuBlock block={MENU.mains} />
            <MenuBlock block={MENU.dosa} />
          </div>
          <div>
            <MenuBlock block={MENU.snacks} />
            <MenuBlock block={MENU.drinks} />
          </div>
        </div>

        <Reveal className="addons-wrap">
          <h3 className="addons-title">Build Your Plate</h3>
          <p className="addons-sub">Add the following to any plate</p>
          <div className="addons">
            {ADDONS.map((a) => (
              <div className="addon" key={a.name}>
                <div className="a-name">{a.name}</div>
                <div className="a-price">{a.price}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="menu-note">
          <strong>Good to know —</strong> All meat is fresh halal meat. Extra
          chutney or sambar is $1.25. Prices do not include tax. Menu items and
          prices may vary; please confirm in-store.
        </Reveal>
      </div>
    </section>
  )
}

function Gallery() {
  const tiles = [
    { src: IMG.tandoori, alt: 'Tandoori chicken legs', cap: 'Tandoori Chicken', cls: 'g1' },
    { src: IMG.spread, alt: 'Curry and biryani in copper bowls', cap: 'Curry & Biryani', cls: 'g2' },
    { src: IMG.buffet, alt: 'Indian buffet trays', cap: 'Daily Selection' },
    { src: IMG.combo, alt: 'Indian combo plate with chana, rice and naan', cap: 'Combo Plate' },
  ]
  return (
    <section className="gallery" id="gallery">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="kicker">From the Kitchen</div>
          <h2>
            A look at the <em>plates</em>
          </h2>
        </Reveal>
        <Reveal className="gal-grid">
          {tiles.map((t) => (
            <figure className={t.cls || ''} key={t.cap}>
              <img src={t.src} alt={t.alt} />
              <figcaption>{t.cap}</figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function Visit() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  return (
    <section className="visit" id="visit">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="kicker">Plan a Visit</div>
          <h2>
            Stop <em>by</em>
          </h2>
          <p>Open weekdays — come in for lunch or an early dinner.</p>
        </Reveal>
        <div className="visit-grid">
          <Reveal className="hours-card">
            {HOURS.map((h) => {
              const isToday = h.day === today
              return (
                <div
                  className={`hours-row ${h.closed ? 'closed' : ''} ${
                    isToday ? 'today' : ''
                  }`}
                  key={h.day}
                >
                  <span className="day">{h.day}</span>
                  <span className="time">{h.time}</span>
                </div>
              )
            })}
          </Reveal>

          <Reveal className="visit-aside">
            <h3>Find us & get in touch</h3>
            <p>
              Dine-in or in-store pickup. We'd love to see you — here's
              everything you need.
            </p>

            <a
              className="review-badge"
              href={CONTACT.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="rb-score">88%</div>
              <div className="rb-text">
                <div className="rb-label">Recommended by diners</div>
                <span className="rb-link">Based on 30 reviews →</span>
              </div>
            </a>

            <div className="info-list">
              <a
                className="info-item"
                href={CONTACT.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="ic">📍</div>
                <div>
                  <div className="it-label">Address</div>
                  <div className="it-value">{CONTACT.address}</div>
                </div>
              </a>
              <a className="info-item" href={CONTACT.phoneHref}>
                <div className="ic">📞</div>
                <div>
                  <div className="it-label">Phone</div>
                  <div className="it-value">{CONTACT.phone}</div>
                </div>
              </a>
              <a className="info-item" href={`mailto:${CONTACT.email}`}>
                <div className="ic">✉️</div>
                <div>
                  <div className="it-label">Email</div>
                  <div className="it-value">{CONTACT.email}</div>
                </div>
              </a>
              <a
                className="info-item"
                href={CONTACT.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="ic">🌐</div>
                <div>
                  <div className="it-label">Website</div>
                  <div className="it-value">{CONTACT.website}</div>
                </div>
              </a>
              <div className="info-item static">
                <div className="ic">🍽️</div>
                <div>
                  <div className="it-label">Service & Pricing</div>
                  <div className="it-value">
                    Dine-in · In-store pickup · Price range $$
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <div className="fb-name">A Taste of India</div>
            <p>
              Honest, flavorful Indian cooking served fresh — a cozy
              neighborhood favorite for biryani, dosa, tandoori and more.
            </p>
          </div>
          <div className="foot-links">
            <div className="foot-col">
              <h4>Explore</h4>
              <a href="#about">About</a>
              <a href="#favorites">Favorites</a>
              <a href="#menu">Menu</a>
              <a href="#gallery">Gallery</a>
            </div>
            <div className="foot-col">
              <h4>Hours</h4>
              <span>Mon – Fri</span>
              <span>10 AM – 6 PM</span>
              <span>Sat – Sun · Closed</span>
            </div>
            <div className="foot-col">
              <h4>Contact</h4>
              <a href={CONTACT.mapUrl} target="_blank" rel="noopener noreferrer">
                5201 Duke St, Halifax, NS
              </a>
              <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              <a href={CONTACT.websiteUrl} target="_blank" rel="noopener noreferrer">
                {CONTACT.website}
              </a>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} A Taste of India. All rights reserved.</span>
          <span>Prices & menu subject to change · Taxes extra</span>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Favorites />
      <Menu />
      <Gallery />
      <Visit />
      <Footer />
    </>
  )
}
