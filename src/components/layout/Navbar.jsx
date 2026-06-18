'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { C } from '@/constants/colors'

const NAV_LINKS = [
  { href: '/',          label: 'Home'      },
  { href: '/about',     label: 'About'     },
  { href: '/services',  label: 'Services'  },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact',   label: 'Contact'   },
]

export default function Navbar() {
  const pathname = usePathname()
  const router   = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  const isActive = (href) => href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      <motion.nav
        className="nav-pad"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'all 0.4s ease',
          padding:      scrolled ? '12px 48px' : '24px 48px',
          background:   scrolled ? 'rgba(18,40,64,0.96)' : 'rgba(250,246,240,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: scrolled ? '1px solid rgba(201,169,110,0.18)' : '1px solid rgba(201,169,110,0.15)',
        }}
      >
        {/* ── Logo ── */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            boxShadow: scrolled
              ? '0 2px 12px rgba(0,0,0,0.25)'
              : '0 2px 12px rgba(18,40,64,0.15)',
            padding: 6,
          }}>
            <img
              src="/images/logo.png"
              alt="Blubloom logo"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <div>
            <div className="font-playfair" style={{ fontSize: 22, fontWeight: 700, color: scrolled ? '#FAF6F0' : C.blueDark, letterSpacing: '0.01em', lineHeight: 1 }}>
              Blubloom
            </div>
            <div className="font-manrope" style={{ fontSize: 9, color: C.gold, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              Let's speak your home
            </div>
          </div>
        </Link>

        {/* ── Desktop links ── */}
        <div className="desktop-only" style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} style={{ textDecoration: 'none' }}>
              <span
                className="font-manrope"
                style={{
                  display: 'block',
                  fontSize: 13, fontWeight: isActive(href) ? 700 : 400,
                  color: isActive(href) ? C.darkGold : (scrolled ? 'rgba(250,246,240,0.82)' : C.blue),
                  padding: '8px 18px',
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  borderBottom: `2px solid ${isActive(href) ? C.darkGold : 'transparent'}`,
                  transition: 'all 0.25s',
                  cursor: 'pointer',
                }}
              >
                {label}
              </span>
            </Link>
          ))}
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push('/contact')}
            style={{
              background: `linear-gradient(135deg, ${C.gold}, ${C.darkGold})`,
              border: 'none', color: '#FAF6F0',
              padding: '10px 24px', borderRadius: 4, cursor: 'pointer',
              fontFamily: "'Manrope', sans-serif",
              fontSize: 12, fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              marginLeft: 8,
              boxShadow: '0 4px 16px rgba(201,169,110,0.35)',
            }}
          >
            Free Quote
          </motion.button>
        </div>

        {/* ── Hamburger ── */}
        <button
          className="mobile-only"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          style={{ background: 'none', border: 'none', cursor: 'pointer', flexDirection: 'column', gap: 5, padding: 8 }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', width: 24, height: 2, background: scrolled ? '#FAF6F0' : C.blueDark, transition: 'all 0.3s',
              transform: menuOpen && i === 0 ? 'rotate(45deg) translate(5px,5px)'
                : menuOpen && i === 2 ? 'rotate(-45deg) translate(5px,-5px)' : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1,
            }}/>
          ))}
        </button>
      </motion.nav>

      {/* ── Mobile fullscreen overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 999,
              background: C.blueDark,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36,
            }}
          >
            {NAV_LINKS.map(({ href, label }, i) => (
              <motion.div key={href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <Link href={href} style={{ textDecoration: 'none' }}>
                  <span className="font-playfair" style={{ fontSize: 38, fontWeight: 500, color: isActive(href) ? C.gold : '#FAF6F0', cursor: 'pointer' }}>
                    {label}
                  </span>
                </Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
              <Link href="/contact">
                <motion.span
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'inline-block',
                    background: `linear-gradient(135deg, ${C.gold}, ${C.darkGold})`,
                    color: '#FAF6F0', padding: '14px 48px', borderRadius: 4, cursor: 'pointer',
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 14, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                    marginTop: 16, textDecoration: 'none',
                  }}
                >
                  Get Free Quote
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
