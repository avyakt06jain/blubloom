import Link from 'next/link'
import { C } from '@/constants/colors'

const QUICK_LINKS = [
  { href: '/',          label: 'Home'      },
  { href: '/about',     label: 'About Us'  },
  { href: '/services',  label: 'Services'  },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact',   label: 'Contact'   },
]

const SERVICE_LINKS = [
  'Modular Kitchens', 'Wardrobes', 'Wall Paneling',
  'False Ceilings', 'Flooring', 'Custom Furniture',
  'Home Interiors', 'Commercial',
]

const CONTACT_ITEMS = [
  { label: 'Our Office',     text: 'Jasola, New Delhi 110025, India' },
  { label: 'Phone',          text: '+91 92592 41423', href: 'tel:+919259241423' },
  { label: 'Email',          text: 'hello@blubloominterior.in', href: 'mailto:hello@blubloominterior.in' },
  { label: 'Business Hours', text: 'Mon–Sat: 10 AM – 7 PM' },
]

export default function Footer() {
  return (
    <footer style={{ background: C.blueDark, padding: '80px 48px 40px', color: 'rgba(250,246,240,0.75)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* ── Grid ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: 60, marginBottom: 60 }} className="grid-3">

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 2px 16px rgba(0,0,0,0.3)',
                padding: 6,
              }}>
                <img src="/images/logo.png" alt="Blubloom logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }}/>
              </div>
              <span className="font-playfair" style={{ fontSize: 22, fontWeight: 700, color: '#FAF6F0' }}>Blubloom</span>
            </div>
            <p className="font-dm" style={{ fontSize: 14, lineHeight: 1.8, maxWidth: 280, marginBottom: 24 }}>
              Premium interior design &amp; contracting across Delhi NCR. Where every space blooms.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { href: 'https://instagram.com/blubloominteriors', label: 'IG' },
                { href: '#', label: 'FB' },
                { href: '#', label: 'YT' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(201,169,110,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                  <span className="font-manrope" style={{ fontSize: 10, fontWeight: 700, color: 'rgba(201,169,110,0.8)', letterSpacing: '0.05em' }}>{s.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <div className="font-manrope" style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.gold, marginBottom: 20 }}>Quick Links</div>
            {QUICK_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} style={{ textDecoration: 'none' }}>
                <div className="font-dm" style={{ fontSize: 14, marginBottom: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(250,246,240,0.75)' }}>
                  <span style={{ color: C.gold, fontSize: 10 }}>›</span> {label}
                </div>
              </Link>
            ))}
          </div>

          {/* Services */}
          <div>
            <div className="font-manrope" style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.gold, marginBottom: 20 }}>Services</div>
            {SERVICE_LINKS.map(s => (
              <Link key={s} href="/services" style={{ textDecoration: 'none' }}>
                <div className="font-dm" style={{ fontSize: 14, marginBottom: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(250,246,240,0.75)' }}>
                  <span style={{ color: C.gold, fontSize: 10 }}>›</span> {s}
                </div>
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div className="font-manrope" style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.gold, marginBottom: 20 }}>Contact Us</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {CONTACT_ITEMS.map(({ label, text, href }) => (
                <div key={label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  {href
                    ? <a href={href} className="font-dm" style={{ fontSize: 14, lineHeight: 1.5, color: 'rgba(250,246,240,0.75)', textDecoration: 'none' }}>{text}</a>
                    : <span className="font-dm" style={{ fontSize: 14, lineHeight: 1.5 }}>{text}</span>}
                </div>
              ))}
              <div style={{ marginTop: 8, padding: '16px', background: 'rgba(201,169,110,0.1)', borderRadius: 8, border: '1px solid rgba(201,169,110,0.2)' }}>
                <div className="font-manrope" style={{ fontSize: 11, color: C.gold, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Service Areas</div>
                <div className="font-dm" style={{ fontSize: 13 }}>Delhi NCR · Pan India</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div style={{ borderTop: '1px solid rgba(201,169,110,0.15)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div className="font-dm" style={{ fontSize: 13 }}>© 2024 Blubloom Interior & Contractor LLP. All rights reserved.</div>
          <div className="font-manrope" style={{ fontSize: 12, color: C.gold }}>Est. 2024 · Where Spaces Bloom</div>
        </div>
      </div>
    </footer>
  )
}
