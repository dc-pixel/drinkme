'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Clock3, Heart, MapPin, Minus, Plus, Search, ShoppingBag, Sparkles, Star, X } from 'lucide-react';

const categories = [
  ['🥤', 'Beverages', '24 items'], ['🍋', 'Lemon & Soda', '12 items'], ['🧊', 'Ice & Chillers', '8 items'],
  ['🥂', 'Glassware', '16 items'], ['🍿', 'Snacks', '28 items'], ['🍹', 'Mixers', '19 items'],
  ['🎉', 'Party Essentials', '14 items'], ['💧', 'Hydration', '11 items'], ['🌙', 'Next-Day', '9 items'],
];

const products = [
  { id: 1, name: 'Fresh Lemon Soda', price: 89, old: 109, rating: 4.8, time: '20–25 min', tag: 'Bestseller', image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=900&q=80' },
  { id: 2, name: 'Sparkling Mint Cooler', price: 129, old: 159, rating: 4.7, time: '15–20 min', tag: 'Refreshing', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80' },
  { id: 3, name: 'Classic Tonic Water', price: 99, old: 119, rating: 4.6, time: '15–20 min', tag: 'Popular', image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=900&q=80' },
  { id: 4, name: 'Premium Highball Glass', price: 349, old: 499, rating: 4.9, time: '30–35 min', tag: 'Premium', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80' },
  { id: 5, name: 'Party Ice Pack', price: 79, old: 99, rating: 4.7, time: '15–20 min', tag: 'Essential', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80' },
  { id: 6, name: 'Salted Nachos', price: 149, old: 179, rating: 4.5, time: '15–20 min', tag: 'Snack', image: 'https://images.unsplash.com/photo-1621939514649-280e2aa2f34f?auto=format&fit=crop&w=900&q=80' },
];

export default function Home() {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [query, setQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showCart, setShowCart] = useState(false);

  const filtered = useMemo(() => products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())), [query]);
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const subtotal = products.reduce((sum, p) => sum + (cart[p.id] ?? 0) * p.price, 0);

  const add = (id: number) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  const remove = (id: number) => setCart((c) => ({ ...c, [id]: Math.max((c[id] ?? 0) - 1, 0) }));

  return (
    <main className="page-shell">
      <div className="ambient ambient-a" /><div className="ambient ambient-b" />
      <header className="topbar glass">
        <div className="brand"><div className="brand-mark">D</div><span>Drink<span>Me</span></span></div>
        <button className="location"><MapPin size={17} /><span>Deliver to <strong>Dwarka</strong></span><ChevronRight size={16} /></button>
        <div className="search-wrap"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search drinks, mixers, snacks & more..." /><kbd>⌘ K</kbd></div>
        <nav className="nav"><a href="#discover">Discover</a><a href="#offers">Offers</a><a href="#orders">Orders</a></nav>
        <button className="cart-btn" onClick={() => setShowCart(true)}><ShoppingBag size={18} />Cart{cartCount > 0 && <b>{cartCount}</b>}</button>
      </header>

      <section className="hero section">
        <div className="hero-copy">
          <span className="eyebrow"><Sparkles size={15}/> Fast delivery · curated drinks</span>
          <h1>Everything you need for the <span>perfect sip.</span></h1>
          <p>Drinks, mixers, glasses, snacks and party essentials — delivered to your doorstep, without the wait.</p>
          <div className="hero-actions"><a className="primary" href="#discover">Explore drinks <ArrowRight size={18}/></a><a className="secondary" href="#offers">View offers</a></div>
          <div className="trust-row"><span><span className="dot"/> 20–30 min delivery</span><span>★ 4.9 average rating</span><span>10k+ happy sips</span></div>
        </div>
        <div className="hero-art">
          <motion.div className="orb orb-one" animate={{ y: [0, -16, 0] }} transition={{ duration: 4, repeat: Infinity }} />
          <motion.div className="orb orb-two" animate={{ y: [0, 14, 0] }} transition={{ duration: 5, repeat: Infinity }} />
          <motion.div className="drink-card large" animate={{ y: [0, -8, 0], rotate: [0, 1.5, 0] }} transition={{ duration: 5, repeat: Infinity }}>
            <img src="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=80" alt="Sparkling beverage" />
            <div className="floating-info"><div><strong>Signature Mint Cooler</strong><small>Fresh · Sparkling · Chilled</small></div><b>₹129</b></div>
          </motion.div>
          <motion.div className="mini-card mini-a" animate={{ y: [0, -8, 0] }} transition={{ duration: 3.8, repeat: Infinity }}>🍋 <span>Lemon Soda</span><b>₹89</b></motion.div>
          <motion.div className="mini-card mini-b" animate={{ y: [0, 10, 0] }} transition={{ duration: 4.6, repeat: Infinity }}>🥂 <span>Glass Set</span><b>₹349</b></motion.div>
        </div>
      </section>

      <section className="section"><div className="section-head"><div><span className="kicker">Browse by mood</span><h2>Find your next favorite.</h2></div><a href="#discover">View all <ArrowRight size={17}/></a></div><div className="category-grid">{categories.map(([icon, title, meta]) => <a href="#discover" className="category-card glass" key={title}><span className="cat-icon">{icon}</span><div><strong>{title}</strong><small>{meta}</small></div><ChevronRight size={17}/></a>)}</div></section>

      <section className="section" id="discover"><div className="section-head"><div><span className="kicker">Curated for you</span><h2>Popular near you.</h2></div><div className="filter-pills"><button className="active">Recommended</button><button>Top rated</button><button>Under ₹199</button></div></div>
        <div className="product-grid">{filtered.map((p) => <motion.article key={p.id} className="product-card glass" whileHover={{ y: -8 }}>
          <div className="product-media"><img src={p.image} alt={p.name}/><span>{p.tag}</span><button className={`heart ${favorites.includes(p.id) ? 'liked' : ''}`} onClick={() => setFavorites((f) => f.includes(p.id) ? f.filter((id) => id !== p.id) : [...f, p.id])}><Heart size={17} fill={favorites.includes(p.id) ? 'currentColor' : 'none'} /></button></div>
          <div className="product-body"><div className="rating"><Star size={14} fill="currentColor"/> {p.rating}<span>·</span><Clock3 size={14}/> {p.time}</div><h3>{p.name}</h3><div className="price-row"><div><strong>₹{p.price}</strong> <del>₹{p.old}</del></div>{(cart[p.id] ?? 0) === 0 ? <button className="add-btn" onClick={() => add(p.id)}>+ ADD</button> : <div className="qty"><button onClick={() => remove(p.id)}><Minus size={15}/></button><b>{cart[p.id]}</b><button onClick={() => add(p.id)}><Plus size={15}/></button></div>}</div></div>
        </motion.article>)}</div>
      </section>

      <section className="combo section" id="offers"><div className="combo-inner"><div><span className="eyebrow">Tonight, sorted.</span><h2>Build your own drink night.</h2><p>Pair a chilled favorite with mixers, ice, glassware and snacks in one smart bundle.</p><button className="primary">Build your combo <ArrowRight size={18}/></button></div><div className="combo-stack"><div>🥤 Drink</div><div>🍋 Mixer</div><div>🧊 Ice</div><div>🥂 Glass</div><div>🍿 Snacks</div></div></div></section>

      <footer className="footer"><div><div className="brand"><div className="brand-mark">D</div><span>Drink<span>Me</span></span></div><p>Everything for the perfect sip, delivered.</p></div><div><strong>Company</strong><a>About</a><a>Careers</a><a>Support</a></div><div><strong>Explore</strong><a>Drinks</a><a>Glassware</a><a>Party packs</a></div></footer>

      <AnimatePresence>{showCart && <motion.div className="drawer-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowCart(false)}><motion.aside className="cart-drawer" initial={{ x: 420 }} animate={{ x: 0 }} exit={{ x: 420 }} onClick={(e) => e.stopPropagation()}><div className="drawer-head"><div><span className="kicker">Your bag</span><h2>{cartCount} item{cartCount === 1 ? '' : 's'}</h2></div><button onClick={() => setShowCart(false)}><X/></button></div><div className="drawer-items">{cartCount === 0 ? <div className="empty"><ShoppingBag size={34}/><h3>Your bag is feeling empty.</h3><p>Add a few favorites and your night is sorted.</p></div> : products.filter((p) => cart[p.id]).map((p) => <div className="drawer-item" key={p.id}><img src={p.image} alt=""/><div><strong>{p.name}</strong><small>₹{p.price} each</small><div className="qty"><button onClick={() => remove(p.id)}><Minus size={14}/></button><b>{cart[p.id]}</b><button onClick={() => add(p.id)}><Plus size={14}/></button></div></div><b>₹{p.price * (cart[p.id] ?? 0)}</b></div>)}</div>{cartCount > 0 && <div className="checkout-box"><div><span>Subtotal</span><strong>₹{subtotal}</strong></div><div><span>Delivery</span><strong>{subtotal >= 499 ? 'FREE' : '₹39'}</strong></div><button className="primary">Proceed to checkout <ArrowRight size={18}/></button></div>}</motion.aside></motion.div>}</AnimatePresence>
    </main>
  );
}
