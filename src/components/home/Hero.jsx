'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { C } from '@/constants/colors'

export default function Hero() {
  const containerRef = useRef(null)
  const { scrollY } = useScroll()
  const bgY    = useTransform(scrollY, [0, 700], [0, 220])
  const textOp = useTransform(scrollY, [0, 500], [1, 0])

  return (
    <section
      ref={containerRef}
      style={{ position: 'relative', height: '100vh', minHeight: 600, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      {/* Video background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <video
          autoPlay muted loop playsInline
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            filter: 'blur(3px) brightness(0.85)',
            transform: 'scale(1.06)', // hides blur edges
          }}
        >
          <source src="/images/hero-bg.mp4" type="video/mp4"/>
        </video>
        {/* Dark overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(140deg, rgba(18,40,64,0.72) 0%, rgba(27,58,92,0.45) 50%, rgba(20,20,35,0.60) 100%)' }}/>
      </div>

      {/* Content */}
      <motion.div
        className="hero-container"
        style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px', maxWidth: 900, margin: '0 auto', opacity: textOp }}
      >
        {/* Eyebrow */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
          <div className="font-manrope" style={{ fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: C.gold, marginBottom: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
            <span style={{ width: 36, height: 1, background: C.gold, display: 'inline-block' }}/>
            Premium Interior Design &amp; Contracting
            <span style={{ width: 36, height: 1, background: C.gold, display: 'inline-block' }}/>
          </div>
        </motion.div>

        {/* Staggered headline */}
        <div style={{ overflow: 'hidden', marginBottom: 8 }}>
          {[{ w: 'Where', c: '#FAF6F0' }, { w: 'Spaces', c: C.gold }, { w: 'Bloom.', c: '#FAF6F0' }].map(({ w, c }, i) => (
            <motion.span
              key={w}
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
              className="hero-title font-playfair"
              style={{ display: 'inline-block', fontSize: 90, fontWeight: 700, color: c, lineHeight: 1.08, marginRight: 18, textShadow: '0 4px 40px rgba(0,0,0,0.25)' }}
            >
              {w}
            </motion.span>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }}
          className="font-dm hero-sub"
          style={{ fontSize: 19, color: 'rgba(250,246,240,0.78)', marginTop: 24, marginBottom: 50, lineHeight: 1.7, maxWidth: 540, marginLeft: 'auto', marginRight: 'auto' }}
        >
          Transforming homes &amp; offices across Delhi NCR — one extraordinary space at a time.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.8 }}
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link href="/portfolio" style={{ textDecoration: 'none' }}>
            <motion.span whileHover={{ background: 'rgba(250,246,240,0.15)' }} whileTap={{ scale: 0.97 }}
              style={{ display: 'inline-block', border: '2px solid rgba(250,246,240,0.7)', color: '#FAF6F0', padding: '14px 40px', borderRadius: 4, cursor: 'pointer', fontFamily: "'Manrope',sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Explore Our Work
            </motion.span>
          </Link>
          <Link href="/contact" style={{ textDecoration: 'none' }}>
            <motion.span
              whileHover={{ y: -3, boxShadow: '0 16px 40px rgba(201,169,110,0.5)' }} whileTap={{ scale: 0.97 }}
              style={{ display: 'inline-block', background: `linear-gradient(135deg, ${C.gold}, ${C.darkGold})`, color: '#FAF6F0', padding: '15px 44px', borderRadius: 4, cursor: 'pointer', fontFamily: "'Manrope',sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', boxShadow: '0 8px 24px rgba(201,169,110,0.35)' }}>
              Get Free Consultation
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
        style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}
          className="font-manrope" style={{ color: 'rgba(250,246,240,0.5)', fontSize: 10, letterSpacing: '0.3em' }}>SCROLL</motion.div>
        <div style={{ width: 1, height: 48, background: `linear-gradient(to bottom, ${C.gold}, transparent)`, margin: '8px auto 0' }}/>
      </motion.div>
    </section>
  )
}
