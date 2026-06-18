'use client'

import { motion } from 'framer-motion'
import { C } from '@/constants/colors'
import { I } from '@/constants/images'
import FadeIn from '@/components/ui/FadeIn'
import Label from '@/components/ui/Label'

const IG_IMAGES = [I.living2, I.bed3, I.kit1, I.din1]

export default function InstagramPreview() {
  return (
    <section style={{ padding: '110px 48px', maxWidth: 1200, margin: '0 auto' }} className="section-pad">
      <FadeIn style={{ textAlign: 'center', marginBottom: 50 }}>
        <Label>@blubloominteriors</Label>
        <h2 className="font-playfair hero-title" style={{ fontSize: 46, fontWeight: 600, color: C.blue }}>Follow Our Journey</h2>
        <p className="font-dm" style={{ color: '#888', marginTop: 12, fontSize: 15 }}>40K+ Followers · 140+ Posts on Instagram</p>
      </FadeIn>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }} className="grid-4">
        {IG_IMAGES.map((img, i) => (
          <FadeIn key={i} delay={i * 0.08}>
            <motion.a
              href="https://instagram.com/blubloominteriors"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              style={{ display: 'block', position: 'relative', borderRadius: 10, overflow: 'hidden', paddingTop: '100%', cursor: 'pointer' }}
            >
              <img src={img} alt={`Instagram post ${i + 1}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}/>
              <motion.div
                initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}
                style={{ position: 'absolute', inset: 0, background: 'rgba(27,58,92,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none"/>
                </svg>
              </motion.div>
            </motion.a>
          </FadeIn>
        ))}
      </div>

      <FadeIn style={{ textAlign: 'center', marginTop: 40 }}>
        <a
          href="https://instagram.com/blubloominteriors"
          target="_blank"
          rel="noopener noreferrer"
          className="font-manrope"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: C.blue, fontSize: 14, fontWeight: 700, letterSpacing: '0.05em', borderBottom: `2px solid ${C.gold}`, paddingBottom: 4 }}
        >
          Follow @blubloominteriors → 40K+ Followers
        </a>
      </FadeIn>
    </section>
  )
}
