import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion"

/* ─── GLOBAL STYLES ─── */
const GS = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=Manrope:wght@400;500;600;700;800&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{font-family:'DM Sans',sans-serif;background:#FAF6F0;color:#2A2A2A;overflow-x:hidden}
    ::-webkit-scrollbar{width:5px}
    ::-webkit-scrollbar-track{background:#FAF6F0}
    ::-webkit-scrollbar-thumb{background:#C9A96E;border-radius:10px}
    .pf{font-family:'Playfair Display',serif}
    .dm{font-family:'DM Sans',sans-serif}
    .mn{font-family:'Manrope',sans-serif}
    @media(max-width:768px){
      .desktop-only{display:none!important}
      .mobile-only{display:flex!important}
      .grid-4{grid-template-columns:repeat(2,1fr)!important}
      .grid-3{grid-template-columns:1fr!important}
      .grid-2{grid-template-columns:1fr!important}
      .hero-title{font-size:48px!important}
      .section-pad{padding:60px 20px!important}
      .nav-pad{padding:16px 20px!important}
      .stat-grid{grid-template-columns:repeat(2,1fr)!important}
      .alt-grid{grid-template-columns:1fr!important;gap:40px!important}
      .proj-grid{grid-template-columns:1fr!important}
      .service-alt{flex-direction:column!important}
    }
    @media(min-width:769px){.mobile-only{display:none!important}}
    @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
    @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
    .wa-btn{animation:pulse 2.5s ease-in-out infinite}
    .float-el{animation:floatY 5s ease-in-out infinite}
  `}</style>
)

/* ─── COLORS ─── */
const C = {
  blue:'#1B3A5C', gold:'#C9A96E', cream:'#FAF6F0',
  charcoal:'#2A2A2A', sage:'#7A8B6F', rose:'#C4A08A',
  lightBlue:'#2A5278', darkGold:'#A8834A', bg2:'#F3EDE4',
  blueDark:'#122840'
}

/* ─── IMAGES ─── */
const I = {
  hero1:'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1800&q=85&auto=format&fit=crop',
  hero2:'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1800&q=85&auto=format&fit=crop',
  hero3:'https://images.unsplash.com/photo-1618220048045-10a6dbdf83e0?w=1800&q=85&auto=format&fit=crop',
  living1:'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80&auto=format&fit=crop',
  living2:'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=80&auto=format&fit=crop',
  living3:'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80&auto=format&fit=crop',
  bed1:'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=900&q=80&auto=format&fit=crop',
  bed2:'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=900&q=80&auto=format&fit=crop',
  bed3:'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80&auto=format&fit=crop',
  kit1:'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80&auto=format&fit=crop',
  kit2:'https://images.unsplash.com/photo-1556909196-f1ced87cd7b5?w=900&q=80&auto=format&fit=crop',
  din1:'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=900&q=80&auto=format&fit=crop',
  off1:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&auto=format&fit=crop',
  ward:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&auto=format&fit=crop',
  floor:'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=80&auto=format&fit=crop',
  ceil:'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80&auto=format&fit=crop',
  wall:'https://images.unsplash.com/photo-1618220179428-22790b461013?w=900&q=80&auto=format&fit=crop',
  win:'https://images.unsplash.com/photo-1613685703305-ce64b471f72f?w=900&q=80&auto=format&fit=crop',
  furn:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80&auto=format&fit=crop',
  about:'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80&auto=format&fit=crop',
  cta:'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=1600&q=80&auto=format&fit=crop',
}

/* ─── DATA ─── */
const SERVICES = [
  { id:'kitchens', title:'Modular Kitchens', icon:'🍳',
    desc:'L-shaped, U-shaped, parallel, island & peninsula layouts with premium hardware and stone countertops.',
    features:['Custom cabinetry','Premium hardware','Stone countertops','Smart storage solutions'],
    img:I.kit1 },
  { id:'wardrobes', title:'Wardrobes & Storage', icon:'🚪',
    desc:'Walk-in closets, sliding and hinged wardrobes — bespoke storage solutions designed for your lifestyle.',
    features:['Walk-in closets','Sliding wardrobes','Hinged wardrobes','Custom storage units'],
    img:I.ward },
  { id:'windows', title:'UPVC Aluminium Windows & Doors', icon:'🪟',
    desc:'Energy-efficient, noise-reducing window & door systems in sliding, casement & tilt-and-turn styles.',
    features:['Glass-to-glass profiles','Sliding & casement','Energy efficient','Noise reduction'],
    img:I.win },
  { id:'wallpanel', title:'Wall Paneling & Decor', icon:'🖼️',
    desc:'PVC panels, 3D sculptural panels, wood panelling with integrated lighting, and luxury wallpaper collections.',
    features:['3D wall panels','Wood panelling','Integrated LED lighting','Luxury wallpapers'],
    img:I.wall },
  { id:'flooring', title:'Wooden & Vinyl Flooring', icon:'🪵',
    desc:'Floating wood, engineered hardwood, laminate & vinyl plank flooring that transforms every room underfoot.',
    features:['Engineered wood','Laminate flooring','Vinyl plank','Floating floors'],
    img:I.floor },
  { id:'ceiling', title:'False Ceilings (POP)', icon:'✨',
    desc:'Designer POP and gypsum board ceilings with integrated LED lighting — where architecture meets artistry.',
    features:['POP ceilings','Gypsum board','LED integration','Custom shapes & coffers'],
    img:I.ceil },
  { id:'furniture', title:'Custom Furniture & Decor', icon:'🛋️',
    desc:'Bespoke sofas, recliners, TV units, study tables and beds — furniture crafted exactly for your space.',
    features:['Custom sofas & recliners','TV & entertainment units','Study & work desks','Beds & headboards'],
    img:I.furn },
  { id:'residential', title:'Complete Home Interiors', icon:'🏠',
    desc:'End-to-end turnkey residential projects — from concept design to final handover, we handle everything.',
    features:['Turnkey project delivery','Full home makeovers','3D design previews','Project management'],
    img:I.living1 },
  { id:'commercial', title:'Commercial Interiors', icon:'🏢',
    desc:'Dynamic office spaces, retail stores, restaurants & showrooms designed to impress clients and perform.',
    features:['Office workspaces','Retail & showrooms','Restaurants & cafes','Brand-aligned design'],
    img:I.off1 },
]

const PORTFOLIO = [
  { id:1, title:'Red Lounge — Luxury Living Room', cat:'Residential', loc:'Vasant Kunj, Delhi', img:I.living2, h:420 },
  { id:2, title:'Master Bedroom Suite', cat:'Residential', loc:'Sector 62, Noida', img:I.bed1, h:300 },
  { id:3, title:'Open Kitchen Design', cat:'Kitchen', loc:'Gurgaon', img:I.kit1, h:300 },
  { id:4, title:'Executive Office Space', cat:'Commercial', loc:'Connaught Place, Delhi', img:I.off1, h:380 },
  { id:5, title:'Walk-In Wardrobe', cat:'Wardrobe', loc:'South Delhi', img:I.ward, h:280 },
  { id:6, title:'Contemporary Dining', cat:'Residential', loc:'Greater Noida', img:I.din1, h:320 },
  { id:7, title:'Gold Headboard Bedroom', cat:'Residential', loc:'DLF City, Gurgaon', img:I.bed3, h:400 },
  { id:8, title:'Island Kitchen', cat:'Kitchen', loc:'Dwarka, Delhi', img:I.kit2, h:280 },
  { id:9, title:'Modern Living Suite', cat:'Residential', loc:'Faridabad', img:I.living1, h:350 },
  { id:10, title:'Luxury Bedroom Suite', cat:'Residential', loc:'Aerocity, Delhi', img:I.bed2, h:340 },
  { id:11, title:'Contemporary Living', cat:'Residential', loc:'Noida Extension', img:I.living3, h:310 },
  { id:12, title:'Showroom Design', cat:'Commercial', loc:'Lajpat Nagar', img:I.furn, h:300 },
]

const TESTIMONIALS = [
  { name:'Rajesh & Priya Sharma', loc:'Vasant Kunj, Delhi', text:'Blubloom transformed our 3BHK into something straight out of a magazine. Sunny and his team were professional, punctual, and the quality is top-notch. We get compliments every single day!' },
  { name:'Amit & Neha Kapoor', loc:'Sector 62, Noida', text:'We handed them our entire apartment and they delivered beyond expectations. The modular kitchen and wardrobes are absolutely stunning. Every guest asks who did our interiors!' },
  { name:'Meenakshi Gupta', loc:'Gurgaon', text:'Professional team, transparent pricing, and zero compromise on quality. The false ceiling with integrated lighting has completely transformed our living space. 100% recommend.' },
  { name:'Vikram Malhotra', loc:'Greater Noida', text:'Got our office interiors done by Blubloom. Outstanding result — our team loves the workspace and clients are always impressed. Worth every rupee. Will definitely use them again.' },
]

const STATS = [
  { val:100, suf:'+', label:'Projects Completed' },
  { val:10000, suf:'+', label:'Units Delivered' },
  { val:4, suf:'', label:'Countries Served' },
  { val:98, suf:'%', label:'Client Satisfaction' },
]

/* ─── REUSABLE ATOMS ─── */
const FI = ({ children, delay=0, dir='up', style={}, once=true }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin:'-40px' })
  const variants = {
    h:{ opacity:0, y:dir==='up'?40:dir==='down'?-40:0, x:dir==='left'?50:dir==='right'?-50:0 },
    v:{ opacity:1, y:0, x:0, transition:{ duration:0.75, ease:[0.22,1,0.36,1], delay } }
  }
  return (
    <motion.div ref={ref} variants={variants} initial="h" animate={inView?'v':'h'} style={style}>
      {children}
    </motion.div>
  )
}

const Counter = ({ val, suf }) => {
  const [n, setN] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once:true })
  useEffect(() => {
    if (!inView) return
    let cur = 0, step = val / 80
    const t = setInterval(() => {
      cur += step
      if (cur >= val) { setN(val); clearInterval(t) }
      else setN(Math.floor(cur))
    }, 20)
    return () => clearInterval(t)
  }, [inView, val])
  return <span ref={ref}>{n >= 1000 ? (n/1000).toFixed(0)+'k' : n}{suf}</span>
}

const Label = ({ children }) => (
  <div className="mn" style={{ fontSize:11, letterSpacing:'0.3em', textTransform:'uppercase', color:C.gold, marginBottom:14, display:'flex', alignItems:'center', gap:12 }}>
    <span style={{ width:32, height:1, background:C.gold, display:'inline-block' }}/>
    {children}
  </div>
)

const GoldBtn = ({ children, onClick, style={} }) => (
  <motion.button
    whileHover={{ y:-3, boxShadow:'0 16px 40px rgba(201,169,110,0.5)' }}
    whileTap={{ scale:0.97 }}
    onClick={onClick}
    style={{ background:`linear-gradient(135deg, ${C.gold}, ${C.darkGold})`, border:'none', color:'#FAF6F0', padding:'15px 44px', borderRadius:4, cursor:'pointer', fontFamily:"'Manrope',sans-serif", fontSize:13, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', boxShadow:'0 8px 24px rgba(201,169,110,0.35)', ...style }}
  >
    {children}
  </motion.button>
)

const OutlineBtn = ({ children, onClick, dark=false, style={} }) => (
  <motion.button
    whileHover={{ background: dark ? C.blue : C.cream, color: dark ? C.cream : C.blue }}
    whileTap={{ scale:0.97 }}
    onClick={onClick}
    style={{ background:'transparent', border:`2px solid ${dark?C.blue:'rgba(250,246,240,0.7)'}`, color:dark?C.blue:'#FAF6F0', padding:'14px 40px', borderRadius:4, cursor:'pointer', fontFamily:"'Manrope',sans-serif", fontSize:13, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', transition:'all 0.3s', ...style }}
  >
    {children}
  </motion.button>
)

/* ─── NAVBAR ─── */
const Navbar = ({ page, setPage }) => {
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])
  const links = [['home','Home'],['about','About'],['services','Services'],['portfolio','Portfolio'],['contact','Contact']]
  return (
    <>
      <motion.nav
        style={{ position:'fixed', top:0, left:0, right:0, zIndex:1000, display:'flex', alignItems:'center', justifyContent:'space-between', transition:'all 0.4s ease',
          padding: scrolled ? '12px 48px' : '24px 48px',
          background: scrolled ? 'rgba(18,40,64,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,169,110,0.18)' : 'none' }}
        className="nav-pad"
      >
        {/* Logo */}
        <div onClick={() => { setPage('home'); setMenu(false) }} style={{ cursor:'pointer', display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:38, height:38, borderRadius:'50%', background:`linear-gradient(135deg, ${C.gold} 0%, ${C.sage} 100%)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0, boxShadow:'0 4px 16px rgba(201,169,110,0.4)' }}>🌸</div>
          <div>
            <div className="pf" style={{ fontSize:22, fontWeight:700, color:'#FAF6F0', letterSpacing:'0.01em', lineHeight:1 }}>Blubloom</div>
            <div className="mn" style={{ fontSize:9, color:C.gold, letterSpacing:'0.18em', textTransform:'uppercase' }}>Interior & Contractor</div>
          </div>
        </div>

        {/* Desktop links */}
        <div className="desktop-only" style={{ display:'flex', gap:4, alignItems:'center' }}>
          {links.map(([id, label]) => (
            <button key={id} onClick={() => setPage(id)} className="mn" style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, fontWeight:page===id?700:400, color:page===id?C.gold:'rgba(250,246,240,0.82)', padding:'8px 18px', letterSpacing:'0.07em', textTransform:'uppercase', borderBottom:`2px solid ${page===id?C.gold:'transparent'}`, transition:'all 0.25s' }}>
              {label}
            </button>
          ))}
          <GoldBtn onClick={() => setPage('contact')} style={{ padding:'10px 24px', fontSize:12, marginLeft:8 }}>Free Quote</GoldBtn>
        </div>

        {/* Hamburger */}
        <button className="mobile-only" onClick={() => setMenu(!menu)} style={{ background:'none', border:'none', cursor:'pointer', flexDirection:'column', gap:5, padding:8 }}>
          {[0,1,2].map(i => (
            <span key={i} style={{ display:'block', width:24, height:2, background:'#FAF6F0', transition:'all 0.3s',
              transform: menu && i===0 ? 'rotate(45deg) translate(5px,5px)' : menu && i===2 ? 'rotate(-45deg) translate(5px,-5px)' : 'none',
              opacity: menu && i===1 ? 0 : 1 }}/>
          ))}
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menu && (
          <motion.div initial={{ x:'100%' }} animate={{ x:0 }} exit={{ x:'100%' }} transition={{ type:'tween', duration:0.35 }}
            style={{ position:'fixed', inset:0, zIndex:999, background:C.blueDark, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:36 }}>
            {links.map(([id, label], i) => (
              <motion.button key={id} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.07 }}
                onClick={() => { setPage(id); setMenu(false) }} className="pf"
                style={{ background:'none', border:'none', cursor:'pointer', fontSize:38, fontWeight:500, color:page===id?C.gold:'#FAF6F0' }}>
                {label}
              </motion.button>
            ))}
            <GoldBtn onClick={() => { setPage('contact'); setMenu(false) }} style={{ marginTop:16 }}>Get Free Quote</GoldBtn>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ─── WHATSAPP BUTTON ─── */
const WA = () => (
  <a href="https://wa.me/919259241423" target="_blank" rel="noopener noreferrer"
    style={{ position:'fixed', bottom:28, right:28, zIndex:2000, width:60, height:60, borderRadius:'50%', background:'#25D366', display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, boxShadow:'0 8px 24px rgba(37,211,102,0.5)', textDecoration:'none' }}
    className="wa-btn">
    💬
  </a>
)

/* ─── MOBILE CTA BAR ─── */
const MobileCTA = ({ setPage }) => (
  <div className="mobile-only" style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:1000, display:'flex', borderTop:'1px solid rgba(0,0,0,0.1)', background:'#fff' }}>
    {[
      { label:'📞 Call', href:'tel:+919259241423' },
      { label:'💬 WhatsApp', href:'https://wa.me/919259241423' },
      { label:'✉️ Get Quote', action:() => setPage('contact') },
    ].map((item, i) => (
      item.action
        ? <button key={i} onClick={item.action} style={{ flex:1, padding:'14px 0', border:'none', background: i===2?C.blue:'white', color: i===2?'#FAF6F0':C.charcoal, cursor:'pointer', fontFamily:"'Manrope',sans-serif", fontSize:12, fontWeight:600, borderRight: i<2?'1px solid rgba(0,0,0,0.08)':'' }}>{item.label}</button>
        : <a key={i} href={item.href} style={{ flex:1, padding:'14px 0', textDecoration:'none', display:'flex', alignItems:'center', justifyContent:'center', background:'white', color:C.charcoal, fontFamily:"'Manrope',sans-serif", fontSize:12, fontWeight:600, borderRight:'1px solid rgba(0,0,0,0.08)' }}>{item.label}</a>
    ))}
  </div>
)

/* ─── FOOTER ─── */
const Footer = ({ setPage }) => (
  <footer style={{ background:C.blueDark, padding:'80px 48px 40px', color:'rgba(250,246,240,0.75)' }}>
    <div style={{ maxWidth:1200, margin:'0 auto' }}>
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1.5fr', gap:60, marginBottom:60 }} className="grid-3">
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
            <div style={{ width:36, height:36, borderRadius:'50%', background:`linear-gradient(135deg, ${C.gold}, ${C.sage})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>🌸</div>
            <div className="pf" style={{ fontSize:22, fontWeight:700, color:'#FAF6F0' }}>Blubloom</div>
          </div>
          <p className="dm" style={{ fontSize:14, lineHeight:1.8, maxWidth:280, marginBottom:24 }}>
            Premium interior design & contracting across Delhi NCR. Where every space blooms.
          </p>
          <div style={{ display:'flex', gap:16 }}>
            {['📸','👍','▶️'].map((icon,i) => (
              <div key={i} style={{ width:40, height:40, borderRadius:'50%', border:'1px solid rgba(201,169,110,0.3)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontSize:16, transition:'all 0.3s' }}>
                {icon}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mn" style={{ fontSize:12, letterSpacing:'0.2em', textTransform:'uppercase', color:C.gold, marginBottom:20 }}>Quick Links</div>
          {[['home','Home'],['about','About Us'],['services','Services'],['portfolio','Portfolio'],['contact','Contact']].map(([id,label]) => (
            <div key={id} onClick={() => setPage(id)} className="dm" style={{ fontSize:14, marginBottom:12, cursor:'pointer', transition:'color 0.2s', display:'flex', alignItems:'center', gap:6 }}>
              <span style={{ color:C.gold, fontSize:10 }}>›</span> {label}
            </div>
          ))}
        </div>

        <div>
          <div className="mn" style={{ fontSize:12, letterSpacing:'0.2em', textTransform:'uppercase', color:C.gold, marginBottom:20 }}>Services</div>
          {['Modular Kitchens','Wardrobes','Wall Paneling','False Ceilings','Flooring','Custom Furniture','Home Interiors','Commercial'].map(s => (
            <div key={s} className="dm" style={{ fontSize:14, marginBottom:12, cursor:'pointer', display:'flex', alignItems:'center', gap:6 }}>
              <span style={{ color:C.gold, fontSize:10 }}>›</span> {s}
            </div>
          ))}
        </div>

        <div>
          <div className="mn" style={{ fontSize:12, letterSpacing:'0.2em', textTransform:'uppercase', color:C.gold, marginBottom:20 }}>Contact Us</div>
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {[
              { icon:'📍', text:'Jasola, New Delhi 110025, India' },
              { icon:'📞', text:'+91 92592 41423' },
              { icon:'✉️', text:'hello@blubloominterior.in' },
              { icon:'⏰', text:'Mon–Sat: 10am – 7pm' },
            ].map(({icon, text}, i) => (
              <div key={i} style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                <span style={{ fontSize:16, flexShrink:0 }}>{icon}</span>
                <span className="dm" style={{ fontSize:14, lineHeight:1.5 }}>{text}</span>
              </div>
            ))}
            <div style={{ marginTop:8, padding:'16px', background:'rgba(201,169,110,0.1)', borderRadius:8, border:'1px solid rgba(201,169,110,0.2)' }}>
              <div className="mn" style={{ fontSize:11, color:C.gold, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:6 }}>Service Areas</div>
              <div className="dm" style={{ fontSize:13 }}>Delhi NCR · Pan India</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop:'1px solid rgba(201,169,110,0.15)', paddingTop:28, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16 }}>
        <div className="dm" style={{ fontSize:13 }}>© 2024 Blubloom Interior & Contractor LLP. All rights reserved.</div>
        <div className="mn" style={{ fontSize:12, color:C.gold }}>Est. 2024 · Where Spaces Bloom 🌸</div>
      </div>
    </div>
  </footer>
)

/* ══════════════════════════════════════════
   PAGE: HOME
══════════════════════════════════════════ */
const HomePage = ({ setPage }) => {
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 700], [0, 220])
  const heroOp = useTransform(scrollY, [0, 500], [1, 0])
  const [tIdx, setTIdx] = useState(0)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    const t = setInterval(() => setTIdx(i => (i+1) % TESTIMONIALS.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{ background:C.cream }}>

      {/* ── HERO ── */}
      <section style={{ position:'relative', height:'100vh', minHeight:600, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <motion.div style={{ position:'absolute', inset:0, y:heroY }}>
          <div style={{ position:'absolute', inset:'-20%', backgroundImage:`url(${I.hero1})`, backgroundSize:'cover', backgroundPosition:'center' }}/>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(140deg, rgba(18,40,64,0.82) 0%, rgba(27,58,92,0.55) 50%, rgba(42,42,42,0.65) 100%)' }}/>
        </motion.div>

        <motion.div style={{ position:'relative', zIndex:1, textAlign:'center', padding:'0 24px', maxWidth:900, margin:'0 auto', opacity:heroOp }}>
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4, duration:0.8 }}>
            <div className="mn" style={{ fontSize:11, letterSpacing:'0.35em', textTransform:'uppercase', color:C.gold, marginBottom:28, display:'flex', alignItems:'center', justifyContent:'center', gap:14 }}>
              <span style={{ width:36, height:1, background:C.gold, display:'inline-block' }}/>
              Premium Interior Design & Contracting
              <span style={{ width:36, height:1, background:C.gold, display:'inline-block' }}/>
            </div>
          </motion.div>

          <div style={{ overflow:'hidden', marginBottom:8 }}>
            {[{ w:'Where', c:'#FAF6F0' },{ w:'Spaces', c:C.gold },{ w:'Bloom.', c:'#FAF6F0' }].map(({ w, c }, i) => (
              <motion.span key={w} initial={{ y:'110%', opacity:0 }} animate={{ y:0, opacity:1 }}
                transition={{ duration:1, delay:0.6+i*0.14, ease:[0.22,1,0.36,1] }}
                className="hero-title pf"
                style={{ display:'inline-block', fontSize:90, fontWeight:700, color:c, lineHeight:1.08, marginRight:18, textShadow:'0 4px 40px rgba(0,0,0,0.25)' }}>
                {w}
              </motion.span>
            ))}
          </div>

          <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.1, duration:0.8 }}
            className="dm" style={{ fontSize:19, color:'rgba(250,246,240,0.78)', marginTop:24, marginBottom:50, lineHeight:1.7, maxWidth:540, marginLeft:'auto', marginRight:'auto' }}>
            Transforming homes & offices across Delhi NCR — one extraordinary space at a time.
          </motion.p>

          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.3, duration:0.8 }}
            style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
            <OutlineBtn onClick={() => setPage('portfolio')}>Explore Our Work</OutlineBtn>
            <GoldBtn onClick={() => setPage('contact')}>Get Free Consultation</GoldBtn>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2.2 }}
          style={{ position:'absolute', bottom:36, left:'50%', transform:'translateX(-50%)', textAlign:'center' }}>
          <motion.div animate={{ y:[0,10,0] }} transition={{ repeat:Infinity, duration:1.8 }}
            className="mn" style={{ color:'rgba(250,246,240,0.5)', fontSize:10, letterSpacing:'0.3em' }}>SCROLL</motion.div>
          <div style={{ width:1, height:48, background:`linear-gradient(to bottom, ${C.gold}, transparent)`, margin:'8px auto 0' }}/>
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background:C.blue, padding:'64px 48px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:40, textAlign:'center' }} className="stat-grid">
          {STATS.map((s,i) => (
            <FI key={i} delay={i*0.1}>
              <div className="pf" style={{ fontSize:58, fontWeight:700, color:C.gold, lineHeight:1 }}>
                <Counter val={s.val} suf={s.suf}/>
              </div>
              <div className="mn" style={{ fontSize:12, color:'rgba(250,246,240,0.65)', letterSpacing:'0.12em', textTransform:'uppercase', marginTop:10 }}>{s.label}</div>
            </FI>
          ))}
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section style={{ padding:'110px 48px', maxWidth:860, margin:'0 auto', textAlign:'center' }} className="section-pad">
        <FI>
          <Label>Our Philosophy</Label>
          <h2 className="pf" style={{ fontSize:50, fontWeight:600, color:C.blue, lineHeight:1.18, marginBottom:26 }}>
            Design is not just what it <em>looks like</em> —<br/>it's how it <em>feels.</em>
          </h2>
          <p className="dm" style={{ fontSize:18, color:'#666', lineHeight:1.85, maxWidth:660, margin:'0 auto' }}>
            At Blubloom, we believe every space has a story waiting to unfold. Founded in 2024 by Director Sunny, we blend aesthetics with practicality — creating environments that inspire, function seamlessly, and stand the test of time. Where spaces bloom.
          </p>
        </FI>
      </section>

      {/* ── SERVICES OVERVIEW ── */}
      <section style={{ padding:'60px 48px 110px', background:C.bg2 }} className="section-pad">
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <FI style={{ textAlign:'center', marginBottom:60 }}>
            <Label>What We Do</Label>
            <h2 className="pf" style={{ fontSize:46, fontWeight:600, color:C.blue }}>Our Services</h2>
          </FI>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }} className="grid-3">
            {SERVICES.slice(0,6).map((sv,i) => (
              <FI key={sv.id} delay={i*0.07}>
                <motion.div whileHover={{ y:-10, boxShadow:'0 24px 60px rgba(27,58,92,0.18)' }}
                  onClick={() => setPage('services')} style={{ background:'#fff', borderRadius:14, overflow:'hidden', cursor:'pointer', boxShadow:'0 4px 20px rgba(0,0,0,0.07)', height:'100%' }}>
                  <div style={{ position:'relative', height:220, overflow:'hidden' }}>
                    <motion.img whileHover={{ scale:1.07 }} transition={{ duration:0.6 }}
                      src={sv.img} alt={sv.title} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(27,58,92,0.75) 0%, transparent 55%)' }}/>
                    <div className="pf" style={{ position:'absolute', bottom:16, left:20, fontSize:18, fontWeight:600, color:'#FAF6F0' }}>{sv.title}</div>
                  </div>
                  <div style={{ padding:'18px 22px 22px' }}>
                    <p className="dm" style={{ fontSize:14, color:'#666', lineHeight:1.7 }}>{sv.desc}</p>
                    <div className="mn" style={{ marginTop:14, fontSize:12, fontWeight:700, color:C.gold, letterSpacing:'0.05em', display:'flex', alignItems:'center', gap:6 }}>
                      Learn More <span>→</span>
                    </div>
                  </div>
                </motion.div>
              </FI>
            ))}
          </div>
          <FI style={{ textAlign:'center', marginTop:50 }}>
            <OutlineBtn dark onClick={() => setPage('services')}>View All 9 Services</OutlineBtn>
          </FI>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      <section style={{ padding:'110px 48px', maxWidth:1200, margin:'0 auto' }} className="section-pad">
        <FI style={{ textAlign:'center', marginBottom:60 }}>
          <Label>Our Work</Label>
          <h2 className="pf" style={{ fontSize:46, fontWeight:600, color:C.blue }}>Featured Projects</h2>
        </FI>

        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gridTemplateRows:'auto auto', gap:20 }} className="proj-grid">
          {[
            { p:PORTFOLIO[0], col:'1/2', row:'1', h:380 },
            { p:PORTFOLIO[6], col:'2/3', row:'1', h:380 },
            { p:PORTFOLIO[3], col:'1/2', row:'2', h:340 },
            { p:PORTFOLIO[1], col:'2/3', row:'2', h:340 },
          ].map(({ p, col, row, h }, i) => (
            <FI key={i} delay={i*0.1} style={{ gridColumn:col, gridRow:row }}>
              <motion.div whileHover="hov" onClick={() => setPage('portfolio')}
                style={{ position:'relative', borderRadius:14, overflow:'hidden', height:h, cursor:'pointer' }}>
                <motion.img variants={{ hov:{ scale:1.07 } }} transition={{ duration:0.6 }}
                  src={p.img} alt={p.title} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                <motion.div variants={{ hov:{ opacity:1 } }} initial={{ opacity:0 }}
                  style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(18,40,64,0.88) 0%, rgba(18,40,64,0.2) 60%, transparent 100%)' }}/>
                <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:24 }}>
                  <div className="mn" style={{ fontSize:10, letterSpacing:'0.22em', color:C.gold, textTransform:'uppercase', marginBottom:6 }}>{p.cat}</div>
                  <div className="pf" style={{ fontSize:20, fontWeight:600, color:'#FAF6F0' }}>{p.title}</div>
                  <div className="dm" style={{ fontSize:13, color:'rgba(250,246,240,0.65)', marginTop:4 }}>📍 {p.loc}</div>
                </div>
              </motion.div>
            </FI>
          ))}
        </div>

        <FI style={{ textAlign:'center', marginTop:50 }}>
          <GoldBtn onClick={() => setPage('portfolio')}>View Full Portfolio →</GoldBtn>
        </FI>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section style={{ background:C.blue, padding:'110px 48px' }} className="section-pad">
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <FI style={{ textAlign:'center', marginBottom:70 }}>
            <Label>Why Blubloom</Label>
            <h2 className="pf" style={{ fontSize:46, fontWeight:600, color:'#FAF6F0' }}>The Blubloom Difference</h2>
          </FI>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:28 }} className="grid-4">
            {[
              { ic:'🏆', t:'Turnkey Solutions', d:"From concept to handover — we manage every detail so you don't have to worry about a thing." },
              { ic:'✅', t:'100+ Projects Delivered', d:'Proven expertise across residential & commercial spaces in Delhi NCR.' },
              { ic:'💎', t:'Premium Materials Only', d:'We source only the finest materials with rigorous quality checks at every stage of production.' },
              { ic:'⏰', t:'On-Time Delivery', d:'We respect your time. Structured timelines and proactive communication ensure zero delays.' },
            ].map((item,i) => (
              <FI key={i} delay={i*0.1}>
                <motion.div whileHover={{ y:-8 }}
                  style={{ textAlign:'center', padding:'44px 24px', borderRadius:16, border:'1px solid rgba(201,169,110,0.18)', background:'rgba(255,255,255,0.04)', height:'100%' }}>
                  <div style={{ fontSize:52, marginBottom:20 }}>{item.ic}</div>
                  <h3 className="pf" style={{ fontSize:20, fontWeight:600, color:'#FAF6F0', marginBottom:14, lineHeight:1.3 }}>{item.t}</h3>
                  <p className="dm" style={{ fontSize:14, color:'rgba(250,246,240,0.6)', lineHeight:1.75 }}>{item.d}</p>
                </motion.div>
              </FI>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding:'110px 48px', background:C.bg2 }} className="section-pad">
        <div style={{ maxWidth:760, margin:'0 auto', textAlign:'center' }}>
          <FI>
            <Label>Client Love</Label>
            <h2 className="pf" style={{ fontSize:46, fontWeight:600, color:C.blue, marginBottom:56 }}>What Our Clients Say</h2>
          </FI>
          <AnimatePresence mode="wait">
            <motion.div key={tIdx} initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-24 }} transition={{ duration:0.5 }}
              style={{ background:'#fff', borderRadius:20, padding:'56px 60px', boxShadow:'0 12px 50px rgba(0,0,0,0.09)' }}>
              <div style={{ fontSize:22, color:C.gold, letterSpacing:5, marginBottom:28 }}>★★★★★</div>
              <p className="pf" style={{ fontSize:20, color:C.charcoal, lineHeight:1.85, fontStyle:'italic', marginBottom:32 }}>"{TESTIMONIALS[tIdx].text}"</p>
              <div className="mn" style={{ fontWeight:700, fontSize:15, color:C.blue }}>{TESTIMONIALS[tIdx].name}</div>
              <div className="dm" style={{ fontSize:13, color:'#999', marginTop:5 }}>{TESTIMONIALS[tIdx].loc}</div>
            </motion.div>
          </AnimatePresence>
          <div style={{ display:'flex', justifyContent:'center', gap:8, marginTop:28 }}>
            {TESTIMONIALS.map((_,i) => (
              <button key={i} onClick={() => setTIdx(i)} style={{ width:i===tIdx?30:8, height:8, borderRadius:4, border:'none', cursor:'pointer', background:i===tIdx?C.gold:'rgba(27,58,92,0.2)', transition:'all 0.35s' }}/>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM PREVIEW ── */}
      <section style={{ padding:'110px 48px', maxWidth:1200, margin:'0 auto' }} className="section-pad">
        <FI style={{ textAlign:'center', marginBottom:50 }}>
          <Label>@blubloominteriors</Label>
          <h2 className="pf" style={{ fontSize:46, fontWeight:600, color:C.blue }}>Follow Our Journey</h2>
          <p className="dm" style={{ color:'#888', marginTop:12, fontSize:15 }}>40K+ Followers · 140+ Posts on Instagram</p>
        </FI>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14 }} className="grid-4">
          {[I.living2, I.bed3, I.kit1, I.din1].map((img,i) => (
            <FI key={i} delay={i*0.08}>
              <motion.div whileHover={{ scale:1.03 }} style={{ position:'relative', borderRadius:10, overflow:'hidden', paddingTop:'100%', cursor:'pointer' }}>
                <img src={img} alt="ig" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }}/>
                <motion.div initial={{ opacity:0 }} whileHover={{ opacity:1 }} style={{ position:'absolute', inset:0, background:'rgba(27,58,92,0.65)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:28 }}>📸</motion.div>
              </motion.div>
            </FI>
          ))}
        </div>
        <FI style={{ textAlign:'center', marginTop:40 }}>
          <a href="https://instagram.com/blubloominteriors" target="_blank" rel="noopener noreferrer" className="mn"
            style={{ display:'inline-flex', alignItems:'center', gap:8, textDecoration:'none', color:C.blue, fontSize:14, fontWeight:700, letterSpacing:'0.05em', borderBottom:`2px solid ${C.gold}`, paddingBottom:4 }}>
            Follow @blubloominteriors → 40K+ Followers
          </a>
        </FI>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ position:'relative', padding:'140px 48px', overflow:'hidden', textAlign:'center' }} className="section-pad">
        <div style={{ position:'absolute', inset:0, backgroundImage:`url(${I.cta})`, backgroundSize:'cover', backgroundPosition:'center' }}/>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(18,40,64,0.9) 0%, rgba(42,42,42,0.78) 100%)' }}/>
        <div style={{ position:'relative', zIndex:1 }}>
          <FI>
            <Label>Let's Get Started</Label>
            <h2 className="pf" style={{ fontSize:'clamp(34px,6vw,64px)', fontWeight:700, color:'#FAF6F0', maxWidth:700, margin:'0 auto 24px', lineHeight:1.15 }}>
              Ready to Transform Your Space?
            </h2>
            <p className="dm" style={{ fontSize:18, color:'rgba(250,246,240,0.72)', maxWidth:480, margin:'0 auto 52px', lineHeight:1.7 }}>
              Get a free consultation and immersive 3D design preview. Let's bring your vision to life.
            </p>
            <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
              <GoldBtn onClick={() => setPage('contact')} style={{ padding:'17px 56px', fontSize:14 }}>Start Your Project →</GoldBtn>
              <a href="https://wa.me/919259241423" target="_blank" rel="noopener noreferrer"
                style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.12)', border:'1px solid rgba(255,255,255,0.3)', color:'#FAF6F0', padding:'17px 40px', borderRadius:4, textDecoration:'none', fontFamily:"'Manrope',sans-serif", fontSize:13, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase' }}>
                💬 WhatsApp Us
              </a>
            </div>
          </FI>
        </div>
      </section>
    </div>
  )
}

/* ══════════════════════════════════════════
   PAGE: ABOUT
══════════════════════════════════════════ */
const AboutPage = ({ setPage }) => {
  const processSteps = [
    { n:'01', t:'Consultation', d:'We start with a deep dive into your vision, lifestyle, and requirements — listening before we design.' },
    { n:'02', t:'3D Design', d:'Our designers create photorealistic 3D renders so you can visualize your space before a single nail is driven.' },
    { n:'03', t:'Material Selection', d:'We curate the finest materials — from stone countertops to luxury wallpapers — with complete transparency.' },
    { n:'04', t:'Execution', d:'Our skilled craftsmen bring the design to life with precision, using premium tools and proven techniques.' },
    { n:'05', t:'Handover', d:'We deliver a spotless, move-in-ready space — on time, on budget, and beyond your expectations.' },
  ]
  const values = [
    { ic:'🌱', t:'Growth Mindset', d:'We approach every project as an opportunity to learn, innovate, and push creative boundaries.' },
    { ic:'🤝', t:'Client First', d:'Your vision is our blueprint. We listen deeply and communicate transparently throughout.' },
    { ic:'💡', t:'Innovation', d:'We stay ahead of global design trends, bringing fresh ideas and cutting-edge solutions to every space.' },
    { ic:'⭐', t:'Excellence Always', d:'We hold ourselves to the highest standards — in design, materials, and craftsmanship — always.' },
  ]
  return (
    <div style={{ background:C.cream, paddingTop:80 }}>
      {/* Hero */}
      <section style={{ position:'relative', height:480, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:`url(${I.about})`, backgroundSize:'cover', backgroundPosition:'center top' }}/>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(18,40,64,0.82) 0%, rgba(18,40,64,0.55) 100%)' }}/>
        <div style={{ position:'relative', zIndex:1, textAlign:'center', padding:'0 24px' }}>
          <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8 }}>
            <Label>Our Story</Label>
            <h1 className="pf" style={{ fontSize:'clamp(40px,6vw,72px)', fontWeight:700, color:'#FAF6F0', marginBottom:16 }}>About Blubloom</h1>
            <p className="dm" style={{ fontSize:18, color:'rgba(250,246,240,0.75)', maxWidth:560, margin:'0 auto' }}>Where spaces bloom — and every room tells a beautiful story.</p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section style={{ padding:'110px 48px', maxWidth:1200, margin:'0 auto' }} className="section-pad">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center' }} className="grid-2">
          <FI dir="right">
            <Label>Who We Are</Label>
            <h2 className="pf" style={{ fontSize:42, fontWeight:600, color:C.blue, marginBottom:28, lineHeight:1.2 }}>
              Born from a passion for beautiful spaces
            </h2>
            <p className="dm" style={{ fontSize:16, color:'#555', lineHeight:1.85, marginBottom:20 }}>
              Blubloom was founded in 2024 by Director Sunny with a singular vision — to make exceptional interior design accessible to everyone who deserves a beautiful space. The name "Blubloom" represents our core belief: like a flower in bloom, every space has the potential to flourish with the right care and creativity.
            </p>
            <p className="dm" style={{ fontSize:16, color:'#555', lineHeight:1.85, marginBottom:32 }}>
              From our home base in Jasola, New Delhi, we've grown to serve clients across Delhi NCR. In just one year, we've completed 100+ projects and delivered 10,000+ units — a testament to the trust our clients place in us.
            </p>
            <GoldBtn onClick={() => setPage('contact')}>Work With Us</GoldBtn>
          </FI>
          <FI dir="left">
            <div style={{ position:'relative' }}>
              <div style={{ borderRadius:16, overflow:'hidden', height:480 }}>
                <img src={I.living2} alt="Blubloom project" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
              </div>
              <div style={{ position:'absolute', bottom:-28, left:-28, background:C.blue, borderRadius:12, padding:'24px 32px', boxShadow:'0 16px 40px rgba(18,40,64,0.3)' }}>
                <div className="pf" style={{ fontSize:42, fontWeight:700, color:C.gold }}>100+</div>
                <div className="mn" style={{ fontSize:12, color:'rgba(250,246,240,0.7)', letterSpacing:'0.15em', textTransform:'uppercase' }}>Projects Delivered</div>
              </div>
            </div>
          </FI>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background:C.blue, padding:'70px 48px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:40, textAlign:'center' }} className="stat-grid">
          {STATS.map((s,i) => (
            <FI key={i} delay={i*0.1}>
              <div className="pf" style={{ fontSize:56, fontWeight:700, color:C.gold }}><Counter val={s.val} suf={s.suf}/></div>
              <div className="mn" style={{ fontSize:12, color:'rgba(250,246,240,0.65)', letterSpacing:'0.12em', textTransform:'uppercase', marginTop:10 }}>{s.label}</div>
            </FI>
          ))}
        </div>
      </section>

      {/* Process */}
      <section style={{ padding:'110px 48px', background:C.bg2 }} className="section-pad">
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <FI style={{ textAlign:'center', marginBottom:70 }}>
            <Label>How We Work</Label>
            <h2 className="pf" style={{ fontSize:46, fontWeight:600, color:C.blue }}>Our Process</h2>
          </FI>
          <div style={{ position:'relative' }}>
            <div style={{ position:'absolute', top:32, left:'10%', right:'10%', height:2, background:`linear-gradient(90deg, ${C.gold}, ${C.sage})`, opacity:0.3 }} className="desktop-only"/>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:24 }} className="grid-3">
              {processSteps.map((step, i) => (
                <FI key={i} delay={i*0.1}>
                  <div style={{ textAlign:'center', padding:'0 12px' }}>
                    <div style={{ width:64, height:64, borderRadius:'50%', background:`linear-gradient(135deg, ${C.blue}, ${C.lightBlue})`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', boxShadow:'0 8px 24px rgba(27,58,92,0.3)' }}>
                      <span className="mn" style={{ fontSize:14, fontWeight:800, color:C.gold }}>{step.n}</span>
                    </div>
                    <h3 className="pf" style={{ fontSize:18, fontWeight:600, color:C.blue, marginBottom:12 }}>{step.t}</h3>
                    <p className="dm" style={{ fontSize:14, color:'#666', lineHeight:1.7 }}>{step.d}</p>
                  </div>
                </FI>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding:'110px 48px' }} className="section-pad">
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <FI style={{ textAlign:'center', marginBottom:70 }}>
            <Label>What Drives Us</Label>
            <h2 className="pf" style={{ fontSize:46, fontWeight:600, color:C.blue }}>Our Core Values</h2>
          </FI>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:28 }} className="grid-4">
            {values.map((v,i) => (
              <FI key={i} delay={i*0.1}>
                <motion.div whileHover={{ y:-8, boxShadow:'0 20px 50px rgba(27,58,92,0.14)' }}
                  style={{ background:'#fff', borderRadius:16, padding:'44px 28px', textAlign:'center', boxShadow:'0 4px 20px rgba(0,0,0,0.06)', height:'100%', border:`1px solid rgba(201,169,110,0.1)` }}>
                  <div style={{ fontSize:52, marginBottom:20 }}>{v.ic}</div>
                  <h3 className="pf" style={{ fontSize:20, fontWeight:600, color:C.blue, marginBottom:14 }}>{v.t}</h3>
                  <p className="dm" style={{ fontSize:14, color:'#666', lineHeight:1.75 }}>{v.d}</p>
                </motion.div>
              </FI>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding:'80px 48px 110px', background:C.bg2 }} className="section-pad">
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <FI style={{ textAlign:'center', marginBottom:60 }}>
            <Label>Leadership</Label>
            <h2 className="pf" style={{ fontSize:46, fontWeight:600, color:C.blue }}>The Team Behind Blubloom</h2>
          </FI>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:32 }} className="grid-3">
            {[
              { name:'Sunny', role:'Founder & Director', note:'Visionary designer with a passion for creating spaces that inspire and endure.' },
              { name:'Design Team', role:'Creative Designers', note:'Our talented designers bring fresh perspectives and global design trends to every project.' },
              { name:'Execution Team', role:'Project Managers & Craftsmen', note:'Expert craftsmen who bring designs to life with precision and premium workmanship.' },
            ].map((member, i) => (
              <FI key={i} delay={i*0.1}>
                <motion.div whileHover={{ y:-6 }} style={{ background:'#fff', borderRadius:16, overflow:'hidden', boxShadow:'0 4px 20px rgba(0,0,0,0.07)' }}>
                  <div style={{ height:280, background:`linear-gradient(135deg, ${C.blue} 0%, ${C.lightBlue} 100%)`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <div style={{ fontSize:80 }}>
                      {i===0?'👤':i===1?'🎨':'🔨'}
                    </div>
                  </div>
                  <div style={{ padding:'28px 28px 32px' }}>
                    <div className="pf" style={{ fontSize:22, fontWeight:600, color:C.blue, marginBottom:6 }}>{member.name}</div>
                    <div className="mn" style={{ fontSize:11, color:C.gold, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:14 }}>{member.role}</div>
                    <p className="dm" style={{ fontSize:14, color:'#666', lineHeight:1.7 }}>{member.note}</p>
                  </div>
                </motion.div>
              </FI>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

/* ══════════════════════════════════════════
   PAGE: SERVICES
══════════════════════════════════════════ */
const ServicesPage = ({ setPage }) => (
  <div style={{ background:C.cream, paddingTop:80 }}>
    {/* Hero */}
    <section style={{ position:'relative', height:420, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:`url(${I.hero3})`, backgroundSize:'cover', backgroundPosition:'center' }}/>
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(18,40,64,0.85) 0%, rgba(18,40,64,0.6) 100%)' }}/>
      <div style={{ position:'relative', zIndex:1, textAlign:'center', padding:'0 24px' }}>
        <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8 }}>
          <Label>What We Offer</Label>
          <h1 className="pf" style={{ fontSize:'clamp(40px,6vw,72px)', fontWeight:700, color:'#FAF6F0', marginBottom:16 }}>Our Services</h1>
          <p className="dm" style={{ fontSize:18, color:'rgba(250,246,240,0.75)', maxWidth:560, margin:'0 auto' }}>
            End-to-end interior design & contracting — from concept to completion.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Services alternating */}
    <section style={{ padding:'80px 48px 40px' }} className="section-pad">
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        {SERVICES.map((sv, i) => (
          <FI key={sv.id} delay={0.1}>
            <div style={{ display:'flex', gap:70, alignItems:'center', marginBottom:90, flexDirection:i%2===0?'row':'row-reverse' }} className="service-alt">
              <div style={{ flex:'0 0 48%' }}>
                <motion.div whileHover={{ scale:1.02 }} style={{ borderRadius:16, overflow:'hidden', height:380 }}>
                  <img src={sv.img} alt={sv.title} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                </motion.div>
              </div>
              <div style={{ flex:1 }}>
                <div className="mn" style={{ fontSize:36, marginBottom:16 }}>{sv.ic}</div>
                <Label>{`Service 0${i+1}`}</Label>
                <h2 className="pf" style={{ fontSize:34, fontWeight:600, color:C.blue, marginBottom:18, lineHeight:1.2 }}>{sv.title}</h2>
                <p className="dm" style={{ fontSize:16, color:'#555', lineHeight:1.8, marginBottom:26 }}>{sv.desc}</p>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:32 }}>
                  {sv.features.map(f => (
                    <div key={f} style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <div style={{ width:8, height:8, borderRadius:'50%', background:C.gold, flexShrink:0 }}/>
                      <span className="dm" style={{ fontSize:14, color:'#555' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <GoldBtn onClick={() => setPage('contact')}>Get a Quote →</GoldBtn>
              </div>
            </div>
            {i < SERVICES.length - 1 && <div style={{ height:1, background:'rgba(201,169,110,0.15)', marginBottom:90 }}/>}
          </FI>
        ))}
      </div>
    </section>

    {/* Process */}
    <section style={{ background:C.blue, padding:'100px 48px' }} className="section-pad">
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <FI style={{ textAlign:'center', marginBottom:70 }}>
          <Label>Our Process</Label>
          <h2 className="pf" style={{ fontSize:46, fontWeight:600, color:'#FAF6F0' }}>How We Work</h2>
        </FI>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:24 }} className="grid-3">
          {[
            { n:1, t:'Consultation', ic:'💬' },
            { n:2, t:'3D Design', ic:'🖥️' },
            { n:3, t:'Materials', ic:'🧱' },
            { n:4, t:'Execution', ic:'🔨' },
            { n:5, t:'Handover', ic:'🎉' },
          ].map((step, i) => (
            <FI key={i} delay={i*0.1}>
              <div style={{ textAlign:'center' }}>
                <div style={{ width:72, height:72, borderRadius:'50%', background:'rgba(201,169,110,0.15)', border:`2px solid ${C.gold}`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', fontSize:28 }}>
                  {step.ic}
                </div>
                <div className="mn" style={{ fontSize:22, fontWeight:800, color:C.gold, marginBottom:8 }}>0{step.n}</div>
                <div className="pf" style={{ fontSize:18, fontWeight:600, color:'#FAF6F0' }}>{step.t}</div>
              </div>
            </FI>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section style={{ padding:'100px 48px', textAlign:'center' }} className="section-pad">
      <FI>
        <h2 className="pf" style={{ fontSize:46, fontWeight:600, color:C.blue, marginBottom:20 }}>Not sure what you need?</h2>
        <p className="dm" style={{ fontSize:18, color:'#666', marginBottom:44, maxWidth:480, margin:'0 auto 44px' }}>
          Let's talk. Our experts will guide you to the perfect solution for your space and budget.
        </p>
        <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
          <GoldBtn onClick={() => setPage('contact')} style={{ padding:'17px 52px', fontSize:14 }}>Schedule a Free Call</GoldBtn>
          <a href="https://wa.me/919259241423" target="_blank" rel="noopener noreferrer"
            style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#25D366', color:'#fff', padding:'17px 44px', borderRadius:4, textDecoration:'none', fontFamily:"'Manrope',sans-serif", fontSize:13, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase' }}>
            💬 Chat on WhatsApp
          </a>
        </div>
      </FI>
    </section>
  </div>
)

/* ══════════════════════════════════════════
   PAGE: PORTFOLIO
══════════════════════════════════════════ */
const PortfolioPage = ({ setPage }) => {
  const cats = ['All', 'Residential', 'Kitchen', 'Commercial', 'Wardrobe']
  const [active, setActive] = useState('All')
  const [lightbox, setLightbox] = useState(null)
  const filtered = active === 'All' ? PORTFOLIO : PORTFOLIO.filter(p => p.cat === active)

  return (
    <div style={{ background:C.cream, paddingTop:80 }}>
      {/* Hero */}
      <section style={{ position:'relative', height:420, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:`url(${I.hero2})`, backgroundSize:'cover', backgroundPosition:'center' }}/>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(18,40,64,0.82) 0%, rgba(18,40,64,0.55) 100%)' }}/>
        <div style={{ position:'relative', zIndex:1, textAlign:'center', padding:'0 24px' }}>
          <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8 }}>
            <Label>Our Work Speaks</Label>
            <h1 className="pf" style={{ fontSize:'clamp(40px,6vw,72px)', fontWeight:700, color:'#FAF6F0', marginBottom:16 }}>Crafted Spaces</h1>
            <p className="dm" style={{ fontSize:18, color:'rgba(250,246,240,0.75)', maxWidth:520, margin:'0 auto' }}>100+ projects that transformed lives — browse our portfolio of exceptional spaces.</p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <div style={{ padding:'40px 48px 20px', borderBottom:`1px solid rgba(201,169,110,0.15)`, background:'#fff', position:'sticky', top:76, zIndex:100, backdropFilter:'blur(20px)' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', gap:12, flexWrap:'wrap', alignItems:'center' }}>
          <span className="mn" style={{ fontSize:12, color:'#888', letterSpacing:'0.15em', textTransform:'uppercase', marginRight:8 }}>Filter:</span>
          {cats.map(cat => (
            <motion.button key={cat} whileHover={{ y:-2 }} onClick={() => setActive(cat)}
              className="mn"
              style={{ padding:'9px 22px', borderRadius:50, border:`1.5px solid ${active===cat?C.blue:'rgba(0,0,0,0.12)'}`, background:active===cat?C.blue:'transparent', color:active===cat?'#FAF6F0':C.charcoal, cursor:'pointer', fontSize:13, fontWeight:active===cat?700:500, transition:'all 0.25s' }}>
              {cat}
            </motion.button>
          ))}
          <span className="dm" style={{ marginLeft:'auto', fontSize:13, color:'#888' }}>{filtered.length} projects</span>
        </div>
      </div>

      {/* Grid */}
      <section style={{ padding:'48px 48px 100px', maxWidth:1200, margin:'0 auto' }} className="section-pad">
        <motion.div layout style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }} className="grid-3">
          <AnimatePresence>
            {filtered.map((p, i) => (
              <motion.div key={p.id} layout initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.95 }} transition={{ duration:0.4, delay:i*0.05 }}>
                <motion.div whileHover="hov" onClick={() => setLightbox(p)}
                  style={{ position:'relative', borderRadius:14, overflow:'hidden', height:p.h, cursor:'pointer' }}>
                  <motion.img variants={{ hov:{ scale:1.07 } }} transition={{ duration:0.6 }}
                    src={p.img} alt={p.title} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                  <motion.div variants={{ hov:{ opacity:1 } }} initial={{ opacity:0 }} transition={{ duration:0.3 }}
                    style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(18,40,64,0.92) 0%, rgba(18,40,64,0.3) 60%, transparent 100%)' }}/>
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:22 }}>
                    <div className="mn" style={{ fontSize:10, letterSpacing:'0.2em', color:C.gold, textTransform:'uppercase', marginBottom:6 }}>{p.cat}</div>
                    <div className="pf" style={{ fontSize:18, fontWeight:600, color:'#FAF6F0', lineHeight:1.3 }}>{p.title}</div>
                    <div className="dm" style={{ fontSize:12, color:'rgba(250,246,240,0.65)', marginTop:5 }}>📍 {p.loc}</div>
                  </div>
                  <motion.div variants={{ hov:{ opacity:1 } }} initial={{ opacity:0 }}
                    style={{ position:'absolute', top:16, right:16, background:'rgba(201,169,110,0.9)', borderRadius:'50%', width:40, height:40, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>
                    🔍
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={() => setLightbox(null)}
            style={{ position:'fixed', inset:0, zIndex:3000, background:'rgba(0,0,0,0.9)', display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
            <motion.div initial={{ scale:0.9, y:20 }} animate={{ scale:1, y:0 }} exit={{ scale:0.9 }} onClick={e => e.stopPropagation()}
              style={{ background:'#fff', borderRadius:20, overflow:'hidden', maxWidth:860, width:'100%', maxHeight:'90vh', overflowY:'auto' }}>
              <div style={{ height:480, overflow:'hidden' }}>
                <img src={lightbox.img} alt={lightbox.title} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
              </div>
              <div style={{ padding:'32px 36px', display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:20 }}>
                <div>
                  <div className="mn" style={{ fontSize:11, color:C.gold, letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:8 }}>{lightbox.cat}</div>
                  <h3 className="pf" style={{ fontSize:26, fontWeight:600, color:C.blue, marginBottom:8 }}>{lightbox.title}</h3>
                  <p className="dm" style={{ fontSize:15, color:'#777' }}>📍 {lightbox.loc}</p>
                </div>
                <div style={{ display:'flex', gap:12 }}>
                  <GoldBtn onClick={() => setPage('contact')}>Get Similar →</GoldBtn>
                  <button onClick={() => setLightbox(null)} style={{ background:'transparent', border:'1.5px solid rgba(0,0,0,0.15)', borderRadius:4, padding:'10px 20px', cursor:'pointer', fontFamily:"'Manrope',sans-serif", fontSize:13, fontWeight:600 }}>Close ✕</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section style={{ background:C.bg2, padding:'100px 48px', textAlign:'center' }} className="section-pad">
        <FI>
          <h2 className="pf" style={{ fontSize:46, fontWeight:600, color:C.blue, marginBottom:20 }}>Want a space like this?</h2>
          <p className="dm" style={{ fontSize:18, color:'#666', maxWidth:440, margin:'0 auto 44px', lineHeight:1.7 }}>
            Let's start your project. Get a free consultation and 3D design preview today.
          </p>
          <GoldBtn onClick={() => setPage('contact')} style={{ padding:'17px 56px', fontSize:14 }}>Start Your Project →</GoldBtn>
        </FI>
      </section>
    </div>
  )
}

/* ══════════════════════════════════════════
   PAGE: CONTACT
══════════════════════════════════════════ */
const ContactPage = () => {
  const [form, setForm] = useState({ name:'', phone:'', email:'', service:'', propType:'', budget:'', city:'', message:'' })
  const [status, setStatus] = useState('idle') // idle | loading | success

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('loading')
    setTimeout(() => setStatus('success'), 1800)
  }

  const inputStyle = { width:'100%', padding:'14px 18px', border:'1.5px solid rgba(0,0,0,0.1)', borderRadius:8, fontFamily:"'DM Sans',sans-serif", fontSize:15, color:C.charcoal, background:'#fff', outline:'none', transition:'border-color 0.25s', appearance:'none' }

  return (
    <div style={{ background:C.cream, paddingTop:80 }}>
      {/* Hero */}
      <section style={{ position:'relative', height:380, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:`url(${I.hero1})`, backgroundSize:'cover', backgroundPosition:'center 30%' }}/>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(18,40,64,0.88) 0%, rgba(18,40,64,0.6) 100%)' }}/>
        <div style={{ position:'relative', zIndex:1, textAlign:'center', padding:'0 24px' }}>
          <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8 }}>
            <Label>Get In Touch</Label>
            <h1 className="pf" style={{ fontSize:'clamp(36px,5vw,62px)', fontWeight:700, color:'#FAF6F0', lineHeight:1.2 }}>
              Let's Create Something<br/>Beautiful Together
            </h1>
          </motion.div>
        </div>
      </section>

      <section style={{ padding:'90px 48px 100px', maxWidth:1200, margin:'0 auto' }} className="section-pad">
        <div style={{ display:'grid', gridTemplateColumns:'3fr 2fr', gap:70, alignItems:'start' }} className="grid-2">

          {/* Form */}
          <FI dir="right">
            <div style={{ background:'#fff', borderRadius:20, padding:'52px 52px', boxShadow:'0 8px 40px rgba(0,0,0,0.08)' }}>
              <Label>Inquiry Form</Label>
              <h2 className="pf" style={{ fontSize:34, fontWeight:600, color:C.blue, marginBottom:36 }}>Tell Us About Your Project</h2>

              {status === 'success' ? (
                <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} style={{ textAlign:'center', padding:'60px 0' }}>
                  <div style={{ fontSize:72, marginBottom:24 }}>🎉</div>
                  <h3 className="pf" style={{ fontSize:28, color:C.blue, marginBottom:14 }}>Thank You!</h3>
                  <p className="dm" style={{ fontSize:16, color:'#666', lineHeight:1.7, maxWidth:360, margin:'0 auto 32px' }}>
                    Your inquiry has been received. Our team will reach out within 24 hours to schedule your free consultation.
                  </p>
                  <GoldBtn onClick={() => setStatus('idle')}>Submit Another Inquiry</GoldBtn>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:18, marginBottom:18 }}>
                    <div>
                      <label className="mn" style={{ fontSize:12, color:'#777', letterSpacing:'0.08em', display:'block', marginBottom:8, textTransform:'uppercase' }}>Full Name *</label>
                      <input required style={inputStyle} placeholder="Rajesh Sharma" value={form.name}
                        onChange={e => setForm({...form,name:e.target.value})}
                        onFocus={e => e.target.style.borderColor=C.gold}
                        onBlur={e => e.target.style.borderColor='rgba(0,0,0,0.1)'}/>
                    </div>
                    <div>
                      <label className="mn" style={{ fontSize:12, color:'#777', letterSpacing:'0.08em', display:'block', marginBottom:8, textTransform:'uppercase' }}>Phone *</label>
                      <input required style={inputStyle} placeholder="+91 98765 43210" value={form.phone}
                        onChange={e => setForm({...form,phone:e.target.value})}
                        onFocus={e => e.target.style.borderColor=C.gold}
                        onBlur={e => e.target.style.borderColor='rgba(0,0,0,0.1)'}/>
                    </div>
                  </div>
                  <div style={{ marginBottom:18 }}>
                    <label className="mn" style={{ fontSize:12, color:'#777', letterSpacing:'0.08em', display:'block', marginBottom:8, textTransform:'uppercase' }}>Email Address</label>
                    <input type="email" style={inputStyle} placeholder="rajesh@email.com" value={form.email}
                      onChange={e => setForm({...form,email:e.target.value})}
                      onFocus={e => e.target.style.borderColor=C.gold}
                      onBlur={e => e.target.style.borderColor='rgba(0,0,0,0.1)'}/>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:18, marginBottom:18 }}>
                    <div>
                      <label className="mn" style={{ fontSize:12, color:'#777', letterSpacing:'0.08em', display:'block', marginBottom:8, textTransform:'uppercase' }}>Service Interested In *</label>
                      <select required style={{...inputStyle, backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")", backgroundRepeat:'no-repeat', backgroundPosition:'right 16px center', paddingRight:40 }}
                        value={form.service} onChange={e => setForm({...form,service:e.target.value})}
                        onFocus={e => e.target.style.borderColor=C.gold}
                        onBlur={e => e.target.style.borderColor='rgba(0,0,0,0.1)'}>
                        <option value="">Select a service</option>
                        {SERVICES.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="mn" style={{ fontSize:12, color:'#777', letterSpacing:'0.08em', display:'block', marginBottom:8, textTransform:'uppercase' }}>Property Type</label>
                      <select style={{...inputStyle}} value={form.propType} onChange={e => setForm({...form,propType:e.target.value})}
                        onFocus={e => e.target.style.borderColor=C.gold}
                        onBlur={e => e.target.style.borderColor='rgba(0,0,0,0.1)'}>
                        <option value="">Select type</option>
                        <option>Residential — Apartment</option>
                        <option>Residential — Villa / Bungalow</option>
                        <option>Commercial — Office</option>
                        <option>Commercial — Retail / Showroom</option>
                        <option>Commercial — Restaurant / Café</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:18, marginBottom:18 }}>
                    <div>
                      <label className="mn" style={{ fontSize:12, color:'#777', letterSpacing:'0.08em', display:'block', marginBottom:8, textTransform:'uppercase' }}>Budget Range</label>
                      <select style={{...inputStyle}} value={form.budget} onChange={e => setForm({...form,budget:e.target.value})}
                        onFocus={e => e.target.style.borderColor=C.gold}
                        onBlur={e => e.target.style.borderColor='rgba(0,0,0,0.1)'}>
                        <option value="">Select budget</option>
                        <option>Under ₹5 Lakhs</option>
                        <option>₹5 – 10 Lakhs</option>
                        <option>₹10 – 25 Lakhs</option>
                        <option>₹25 – 50 Lakhs</option>
                        <option>₹50 Lakhs+</option>
                      </select>
                    </div>
                    <div>
                      <label className="mn" style={{ fontSize:12, color:'#777', letterSpacing:'0.08em', display:'block', marginBottom:8, textTransform:'uppercase' }}>City / Location</label>
                      <input style={inputStyle} placeholder="Delhi, Gurgaon, Noida..." value={form.city}
                        onChange={e => setForm({...form,city:e.target.value})}
                        onFocus={e => e.target.style.borderColor=C.gold}
                        onBlur={e => e.target.style.borderColor='rgba(0,0,0,0.1)'}/>
                    </div>
                  </div>
                  <div style={{ marginBottom:32 }}>
                    <label className="mn" style={{ fontSize:12, color:'#777', letterSpacing:'0.08em', display:'block', marginBottom:8, textTransform:'uppercase' }}>Your Message</label>
                    <textarea rows={4} style={{...inputStyle, resize:'vertical', minHeight:110}} placeholder="Tell us about your project vision, timeline, or any specific requirements..."
                      value={form.message} onChange={e => setForm({...form,message:e.target.value})}
                      onFocus={e => e.target.style.borderColor=C.gold}
                      onBlur={e => e.target.style.borderColor='rgba(0,0,0,0.1)'}/>
                  </div>
                  <motion.button type="submit" whileHover={{ y:-3 }} whileTap={{ scale:0.97 }} disabled={status==='loading'}
                    style={{ width:'100%', background:`linear-gradient(135deg, ${C.gold}, ${C.darkGold})`, border:'none', color:'#FAF6F0', padding:'17px 24px', borderRadius:8, cursor:'pointer', fontFamily:"'Manrope',sans-serif", fontSize:15, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', boxShadow:'0 8px 24px rgba(201,169,110,0.35)', display:'flex', alignItems:'center', justifyContent:'center', gap:10, opacity:status==='loading'?0.8:1 }}>
                    {status==='loading' ? (
                      <>
                        <motion.div animate={{ rotate:360 }} transition={{ repeat:Infinity, duration:1, ease:'linear' }}
                          style={{ width:18, height:18, border:'2px solid rgba(255,255,255,0.4)', borderTopColor:'#fff', borderRadius:'50%' }}/>
                        Sending Your Inquiry...
                      </>
                    ) : 'Submit Inquiry →'}
                  </motion.button>
                </form>
              )}
            </div>
          </FI>

          {/* Contact Info */}
          <FI dir="left">
            <div>
              <Label>Contact Details</Label>
              <h2 className="pf" style={{ fontSize:32, fontWeight:600, color:C.blue, marginBottom:36, lineHeight:1.25 }}>
                Let's connect and create something extraordinary.
              </h2>

              <div style={{ display:'flex', flexDirection:'column', gap:24, marginBottom:44 }}>
                {[
                  { ic:'📍', t:'Our Office', d:'Jasola, New Delhi 110025, India' },
                  { ic:'📞', t:'Phone', d:'+91 92592 41423', link:'tel:+919259241423' },
                  { ic:'✉️', t:'Email', d:'hello@blubloominterior.in', link:'mailto:hello@blubloominterior.in' },
                  { ic:'⏰', t:'Business Hours', d:'Monday – Saturday: 10:00 AM – 7:00 PM' },
                ].map((item, i) => (
                  <div key={i} style={{ display:'flex', gap:18, alignItems:'flex-start', padding:'20px 24px', background:'#fff', borderRadius:12, boxShadow:'0 2px 12px rgba(0,0,0,0.05)', border:'1px solid rgba(201,169,110,0.12)' }}>
                    <div style={{ width:44, height:44, borderRadius:'50%', background:`linear-gradient(135deg, ${C.blue}22, ${C.blue}11)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>{item.ic}</div>
                    <div>
                      <div className="mn" style={{ fontSize:11, color:C.gold, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:5 }}>{item.t}</div>
                      {item.link
                        ? <a href={item.link} className="dm" style={{ fontSize:15, color:C.charcoal, textDecoration:'none', fontWeight:500 }}>{item.d}</a>
                        : <div className="dm" style={{ fontSize:15, color:C.charcoal }}>{item.d}</div>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Service Areas */}
              <div style={{ background:`linear-gradient(135deg, ${C.blue}, ${C.lightBlue})`, borderRadius:16, padding:'28px 28px', marginBottom:28 }}>
                <div className="mn" style={{ fontSize:11, color:C.gold, letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:16 }}>Service Areas</div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
                  {['Delhi NCR','Noida','Gurgaon','Faridabad','Pan India'].map(area => (
                    <span key={area} className="mn" style={{ fontSize:12, background:'rgba(201,169,110,0.2)', color:C.gold, padding:'6px 14px', borderRadius:50, fontWeight:600, border:'1px solid rgba(201,169,110,0.3)' }}>{area}</span>
                  ))}
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a href="https://wa.me/919259241423" target="_blank" rel="noopener noreferrer"
                style={{ display:'flex', alignItems:'center', gap:14, background:'#25D366', borderRadius:12, padding:'20px 24px', textDecoration:'none', boxShadow:'0 8px 24px rgba(37,211,102,0.3)' }}>
                <div style={{ width:48, height:48, borderRadius:'50%', background:'rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, flexShrink:0 }}>💬</div>
                <div>
                  <div className="mn" style={{ fontSize:14, fontWeight:700, color:'#fff' }}>Chat on WhatsApp</div>
                  <div className="dm" style={{ fontSize:12, color:'rgba(255,255,255,0.85)', marginTop:3 }}>Quick responses · Available Mon–Sat</div>
                </div>
                <div className="mn" style={{ marginLeft:'auto', color:'rgba(255,255,255,0.8)', fontSize:20 }}>→</div>
              </a>

              {/* Social */}
              <div style={{ marginTop:28 }}>
                <div className="mn" style={{ fontSize:11, color:'#888', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:16 }}>Follow Us</div>
                <div style={{ display:'flex', gap:12 }}>
                  {[
                    { ic:'📸', label:'Instagram', url:'https://instagram.com/blubloominteriors', color:'#E1306C' },
                    { ic:'👍', label:'Facebook', url:'#', color:'#1877F2' },
                    { ic:'▶️', label:'YouTube', url:'#', color:'#FF0000' },
                  ].map(s => (
                    <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                      style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 18px', border:'1.5px solid rgba(0,0,0,0.1)', borderRadius:8, textDecoration:'none', color:C.charcoal, fontFamily:"'Manrope',sans-serif", fontSize:12, fontWeight:600, background:'#fff', transition:'all 0.25s' }}>
                      {s.ic} {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </FI>
        </div>
      </section>
    </div>
  )
}

/* ══════════════════════════════════════════
   ROOT APP
══════════════════════════════════════════ */
export default function BlubloomWebsite() {
  const [page, setPage] = useState('home')
  const [menu, setMenu] = useState(false)
  const topRef = useRef(null)

  const navigate = (p) => {
    setPage(p)
    setTimeout(() => topRef.current?.scrollIntoView({ behavior:'smooth' }), 10)
  }

  const pages = { home: HomePage, about: AboutPage, services: ServicesPage, portfolio: PortfolioPage, contact: ContactPage }
  const PageComponent = pages[page] || HomePage

  return (
    <div ref={topRef} style={{ fontFamily:"'DM Sans',sans-serif", minHeight:'100vh' }}>
      <GS/>
      <Navbar page={page} setPage={navigate} menu={menu} setMenu={setMenu}/>
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-16 }} transition={{ duration:0.4, ease:[0.22,1,0.36,1] }}>
          <PageComponent setPage={navigate}/>
        </motion.div>
      </AnimatePresence>
      <Footer setPage={navigate}/>
      <WA/>
      <MobileCTA setPage={navigate}/>
    </div>
  )
}
