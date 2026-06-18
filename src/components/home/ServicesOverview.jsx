'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { C } from '@/constants/colors'
import { SERVICES } from '@/data/services'
import FadeIn from '@/components/ui/FadeIn'

const FEATURED = SERVICES.slice(0, 6)

export default function ServicesOverview() {
  return (
    <section style={{ background: C.bg2, padding: '72px 0 80px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px' }}>

        {/* Centered Header */}
        <FadeIn style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 14 }}>
            <div style={{ width: 36, height: 1, background: C.gold }} />
            <span style={{
              fontFamily: 'var(--font-manrope)', fontSize: 10, fontWeight: 700,
              letterSpacing: '0.2em', textTransform: 'uppercase', color: C.gold,
            }}>
              What We Offer
            </span>
            <div style={{ width: 36, height: 1, background: C.gold }} />
          </div>
          <h2 className="font-playfair" style={{
            fontSize: 36, fontWeight: 600, color: C.blue,
            lineHeight: 1.15, margin: '0 0 16px',
          }}>
            Our Services
          </h2>
          <p className="font-dm" style={{
            fontSize: 14, color: '#888', maxWidth: 480,
            margin: '0 auto', lineHeight: 1.75,
          }}>
            From modular kitchens to complete home transformations — every service crafted with precision and artistry.
          </p>
        </FadeIn>

        {/* Symmetric 3×2 Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
        }}>
          {FEATURED.map((sv, i) => (
            <FadeIn key={sv.id} delay={i * 0.07}>
              <ServiceCard sv={sv} index={i} />
            </FadeIn>
          ))}
        </div>

        {/* Centered CTA */}
        <FadeIn style={{ textAlign: 'center', marginTop: 44 }}>
          <Link href="/services" style={{ textDecoration: 'none' }}>
            <motion.div
              whileHover={{ backgroundColor: C.blue, color: '#fff' }}
              transition={{ duration: 0.22 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                border: `1.5px solid ${C.blue}`, color: C.blue,
                padding: '12px 32px', fontFamily: 'var(--font-manrope)',
                fontSize: 10, fontWeight: 700, letterSpacing: '0.18em',
                textTransform: 'uppercase', cursor: 'pointer',
              }}
            >
              View All 9 Services
              <svg width="13" height="8" viewBox="0 0 13 8" fill="none">
                <path d="M1 4h11M8 1l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </Link>
        </FadeIn>

      </div>
    </section>
  )
}

function ServiceCard({ sv, index }) {
  const num = String(index + 1).padStart(2, '0')

  return (
    <Link href="/services" style={{ textDecoration: 'none', display: 'block' }}>
      <motion.div
        whileHover="hov"
        style={{
          background: '#fff',
          overflow: 'hidden',
          boxShadow: '0 2px 12px rgba(27,58,92,0.06)',
          display: 'flex', flexDirection: 'column',
          height: '100%',
        }}
      >
        {/* Image */}
        <div style={{ position: 'relative', height: 200, overflow: 'hidden', flexShrink: 0 }}>
          <motion.img
            variants={{ hov: { scale: 1.06 } }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            src={sv.img} alt={sv.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {/* Gold bottom bar */}
          <motion.div
            variants={{ hov: { scaleX: 1 } }} initial={{ scaleX: 0 }}
            transition={{ duration: 0.35 }}
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: 3, background: C.gold, transformOrigin: 'left',
            }}
          />
          {/* Number badge */}
          <div style={{
            position: 'absolute', top: 14, left: 14,
            fontFamily: 'var(--font-manrope)', fontSize: 10, fontWeight: 700,
            letterSpacing: '0.12em', color: '#fff',
            background: C.gold, padding: '4px 9px',
          }}>
            {num}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '22px 24px 26px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div className="font-playfair" style={{
            fontSize: 17, fontWeight: 600, color: C.blue,
            marginBottom: 10, lineHeight: 1.3,
          }}>
            {sv.title}
          </div>

          <p className="font-dm" style={{
            fontSize: 13, color: '#777', lineHeight: 1.72,
            margin: 0, flex: 1,
          }}>
            {sv.desc}
          </p>

          {/* Learn More */}
          <motion.div
            variants={{ hov: { gap: 12 } }}
            transition={{ duration: 0.22 }}
            className="font-manrope"
            style={{
              marginTop: 18, display: 'flex', alignItems: 'center', gap: 8,
              fontSize: 9.5, fontWeight: 700, letterSpacing: '0.15em',
              textTransform: 'uppercase', color: C.gold,
            }}
          >
            Learn More
            <motion.svg
              variants={{ hov: { x: 3 } }} transition={{ duration: 0.22 }}
              width="13" height="8" viewBox="0 0 13 8" fill="none"
            >
              <path d="M1 4h11M8 1l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.svg>
          </motion.div>
        </div>

        {/* Hover bottom border accent */}
        <motion.div
          variants={{ hov: { scaleX: 1 } }} initial={{ scaleX: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            height: 2, background: C.gold,
            transformOrigin: 'left', flexShrink: 0,
          }}
        />
      </motion.div>
    </Link>
  )
}
