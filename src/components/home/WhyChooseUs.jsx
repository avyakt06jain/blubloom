'use client'

import { motion } from 'framer-motion'
import { C } from '@/constants/colors'
import FadeIn from '@/components/ui/FadeIn'
import Label from '@/components/ui/Label'

const REASONS = [
  { icon: '01', title: 'Turnkey Solutions',        desc: "From concept to handover — we manage every detail so you don't have to worry about a thing." },
  { icon: '02', title: '100+ Projects Delivered',  desc: 'Proven expertise across residential & commercial spaces in Delhi NCR.' },
  { icon: '03', title: 'Premium Materials Only',   desc: 'We source only the finest materials with rigorous quality checks at every stage of production.' },
  { icon: '04', title: 'On-Time Delivery',          desc: 'We respect your time. Structured timelines and proactive communication ensure zero delays.' },
]

export default function WhyChooseUs() {
  return (
    <section style={{ background: C.blue, padding: '110px 48px' }} className="section-pad">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <FadeIn style={{ textAlign: 'center', marginBottom: 70 }}>
          <Label>Why Blubloom</Label>
          <h2 className="font-playfair" style={{ fontSize: 46, fontWeight: 600, color: '#FAF6F0' }}>The Blubloom Difference</h2>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 28 }} className="grid-4">
          {REASONS.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                style={{ textAlign: 'center', padding: '44px 24px', borderRadius: 16, border: '1px solid rgba(201,169,110,0.18)', background: 'rgba(255,255,255,0.04)', height: '100%' }}
              >
                <div className="font-manrope" style={{ fontSize: 36, fontWeight: 800, color: 'rgba(201,169,110,0.5)', marginBottom: 20, letterSpacing: '-0.02em' }}>{item.icon}</div>
                <h3 className="font-playfair" style={{ fontSize: 20, fontWeight: 600, color: '#FAF6F0', marginBottom: 14, lineHeight: 1.3 }}>{item.title}</h3>
                <p className="font-dm" style={{ fontSize: 14, color: 'rgba(250,246,240,0.6)', lineHeight: 1.75 }}>{item.desc}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
