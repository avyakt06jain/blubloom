'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { C } from '@/constants/colors'
import { PORTFOLIO } from '@/data/portfolio'
import FadeIn from '@/components/ui/FadeIn'
import GoldBtn from '@/components/ui/GoldBtn'
import Label from '@/components/ui/Label'

const FEATURED = [
  { p: PORTFOLIO[0], col: '1/2', h: 380 },
  { p: PORTFOLIO[6], col: '2/3', h: 380 },
  { p: PORTFOLIO[3], col: '1/2', h: 340 },
  { p: PORTFOLIO[1], col: '2/3', h: 340 },
]

export default function FeaturedProjects() {
  return (
    <section style={{ padding: '110px 48px', maxWidth: 1200, margin: '0 auto' }} className="section-pad">
      <FadeIn style={{ textAlign: 'center', marginBottom: 60 }}>
        <Label>Our Work</Label>
        <h2 className="font-playfair" style={{ fontSize: 46, fontWeight: 600, color: C.blue }}>Featured Projects</h2>
      </FadeIn>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gridTemplateRows: 'auto auto', gap: 20 }} className="proj-grid">
        {FEATURED.map(({ p, col, h }, i) => (
          <FadeIn key={p.id} delay={i * 0.1} style={{ gridColumn: col }} className="proj-item">
            <Link href="/portfolio" style={{ textDecoration: 'none', display: 'block', height: h }}>
              <motion.div
                whileHover="hov"
                style={{ position: 'relative', borderRadius: 14, overflow: 'hidden', height: '100%', cursor: 'pointer' }}
              >
                <motion.img variants={{ hov: { scale: 1.07 } }} transition={{ duration: 0.6 }}
                  src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                <motion.div variants={{ hov: { opacity: 1 } }} initial={{ opacity: 0 }}
                  style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(18,40,64,0.88) 0%, rgba(18,40,64,0.2) 60%, transparent 100%)' }}/>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 24 }}>
                  <div className="font-manrope" style={{ fontSize: 10, letterSpacing: '0.22em', color: C.gold, textTransform: 'uppercase', marginBottom: 6 }}>{p.cat}</div>
                  <div className="font-playfair" style={{ fontSize: 20, fontWeight: 600, color: '#FAF6F0' }}>{p.title}</div>
                  <div className="font-dm" style={{ fontSize: 13, color: 'rgba(250,246,240,0.65)', marginTop: 4 }}>{p.loc}</div>
                </div>
              </motion.div>
            </Link>
          </FadeIn>
        ))}
      </div>

      <FadeIn style={{ textAlign: 'center', marginTop: 50 }}>
        <Link href="/portfolio" style={{ textDecoration: 'none' }}>
          <GoldBtn>View Full Portfolio →</GoldBtn>
        </Link>
      </FadeIn>
    </section>
  )
}
