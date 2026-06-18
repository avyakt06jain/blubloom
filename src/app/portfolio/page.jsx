'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { C } from '@/constants/colors'
import { I } from '@/constants/images'
import FadeIn        from '@/components/ui/FadeIn'
import GoldBtn       from '@/components/ui/GoldBtn'
import Label         from '@/components/ui/Label'
import PortfolioGrid from '@/components/portfolio/PortfolioGrid'

export default function PortfolioPage() {
  return (
    <div style={{ background: C.cream, paddingTop: 80 }}>

      {/* ── Hero ── */}
      <section style={{ position: 'relative', height: 420, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${I.hero2})`, backgroundSize: 'cover', backgroundPosition: 'center' }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(18,40,64,0.82) 0%, rgba(18,40,64,0.55) 100%)' }}/>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px' }}>
          <Label>Our Work Speaks</Label>
          <h1 className="font-playfair" style={{ fontSize: 'clamp(40px,6vw,72px)', fontWeight: 700, color: '#FAF6F0', marginBottom: 16 }}>Crafted Spaces</h1>
          <p className="font-dm" style={{ fontSize: 18, color: 'rgba(250,246,240,0.75)', maxWidth: 520, margin: '0 auto' }}>
            100+ projects that transformed lives — browse our portfolio of exceptional spaces.
          </p>
        </motion.div>
      </section>

      {/* ── Filterable grid + lightbox ── */}
      <PortfolioGrid />

      {/* ── CTA ── */}
      <section style={{ background: C.bg2, padding: '100px 48px', textAlign: 'center' }} className="section-pad">
        <FadeIn>
          <h2 className="font-playfair" style={{ fontSize: 46, fontWeight: 600, color: C.blue, marginBottom: 20 }}>Want a space like this?</h2>
          <p className="font-dm" style={{ fontSize: 18, color: '#666', maxWidth: 440, margin: '0 auto 44px', lineHeight: 1.7 }}>
            Let&apos;s start your project. Get a free consultation and 3D design preview today.
          </p>
          <Link href="/contact" style={{ textDecoration: 'none' }}>
            <GoldBtn style={{ padding: '17px 56px', fontSize: 14 }}>Start Your Project →</GoldBtn>
          </Link>
        </FadeIn>
      </section>
    </div>
  )
}
