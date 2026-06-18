'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { C } from '@/constants/colors'
import { I } from '@/constants/images'
import { SERVICES } from '@/data/services'
import FadeIn  from '@/components/ui/FadeIn'
import GoldBtn from '@/components/ui/GoldBtn'
import Label   from '@/components/ui/Label'

const PROCESS_STEPS = [
  { n: 1, t: 'Consultation', desc: 'We listen deeply to understand your vision, lifestyle, and budget.' },
  { n: 2, t: '3D Design',    desc: 'Photorealistic renders so you can walk through your space before it\'s built.' },
  { n: 3, t: 'Materials',    desc: 'Curated selection of premium finishes, furniture, and fixtures.' },
  { n: 4, t: 'Execution',    desc: 'Our skilled craftsmen bring the design to life with precision.' },
  { n: 5, t: 'Handover',     desc: 'A flawless reveal — styled, snag-free, and ready to live in.' },
]

export default function ServicesPage() {
  return (
    <div style={{ background: C.cream, paddingTop: 80 }}>

      {/* ── Hero ── */}
      <section style={{ position: 'relative', height: 420, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${I.hero3})`, backgroundSize: 'cover', backgroundPosition: 'center' }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(18,40,64,0.85) 0%, rgba(18,40,64,0.6) 100%)' }}/>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px' }}>
          <Label>What We Offer</Label>
          <h1 className="font-playfair" style={{ fontSize: 'clamp(40px,6vw,72px)', fontWeight: 700, color: '#FAF6F0', marginBottom: 16 }}>Our Services</h1>
          <p className="font-dm" style={{ fontSize: 18, color: 'rgba(250,246,240,0.75)', maxWidth: 560, margin: '0 auto' }}>
            End-to-end interior design &amp; contracting — from concept to completion.
          </p>
        </motion.div>
      </section>

      {/* ── Alternating service rows ── */}
      <section style={{ padding: '80px 48px 40px' }} className="section-pad">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {SERVICES.map((sv, i) => (
            <FadeIn key={sv.id} delay={0.1}>
              <div style={{ display: 'flex', gap: 70, alignItems: 'center', marginBottom: 90, flexDirection: i % 2 === 0 ? 'row' : 'row-reverse' }} className="alt-row">
                <div style={{ flex: '0 0 48%' }}>
                  <motion.div whileHover={{ scale: 1.02 }} style={{ borderRadius: 16, overflow: 'hidden', height: 380 }}>
                    <img src={sv.img} alt={sv.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                  </motion.div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 36, marginBottom: 16 }}>{sv.icon}</div>
                  <Label>{`Service 0${i + 1}`}</Label>
                  <h2 className="font-playfair" style={{ fontSize: 34, fontWeight: 600, color: C.blue, marginBottom: 18, lineHeight: 1.2 }}>{sv.title}</h2>
                  <p className="font-dm" style={{ fontSize: 16, color: '#555', lineHeight: 1.8, marginBottom: 26 }}>{sv.desc}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 32 }}>
                    {sv.features.map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.gold, flexShrink: 0 }}/>
                        <span className="font-dm" style={{ fontSize: 14, color: '#555' }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/contact" style={{ textDecoration: 'none' }}>
                    <GoldBtn>Get a Quote →</GoldBtn>
                  </Link>
                </div>
              </div>
              {i < SERVICES.length - 1 && <div style={{ height: 1, background: 'rgba(201,169,110,0.15)', marginBottom: 90 }}/>}
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Process ── */}
      <section style={{ background: `linear-gradient(160deg, ${C.blueDark} 0%, ${C.blue} 55%, #1e4268 100%)`, padding: '110px 48px', position: 'relative', overflow: 'hidden' }} className="section-pad">
        {/* Decorative background circles */}
        <div style={{ position: 'absolute', top: -120, right: -120, width: 480, height: 480, borderRadius: '50%', background: 'rgba(201,169,110,0.04)', pointerEvents: 'none' }}/>
        <div style={{ position: 'absolute', bottom: -80, left: -80, width: 320, height: 320, borderRadius: '50%', background: 'rgba(201,169,110,0.04)', pointerEvents: 'none' }}/>

        <div style={{ maxWidth: 1160, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <FadeIn style={{ textAlign: 'center', marginBottom: 80 }}>
            <Label>Our Process</Label>
            <h2 className="font-playfair" style={{ fontSize: 'clamp(38px,4.5vw,54px)', fontWeight: 600, color: '#FAF6F0', marginBottom: 16 }}>How We Work</h2>
            <p className="font-dm" style={{ fontSize: 16, color: 'rgba(250,246,240,0.55)', maxWidth: 420, margin: '0 auto' }}>Five seamless stages — from your first call to your final reveal.</p>
          </FadeIn>

          {/* Steps row with connector line */}
          <div style={{ position: 'relative' }}>
            {/* Horizontal connector line (desktop only) */}
            <div className="process-line" style={{ position: 'absolute', top: 44, left: '10%', right: '10%', height: 1, background: `linear-gradient(90deg, transparent, ${C.gold}40, ${C.gold}80, ${C.gold}40, transparent)`, pointerEvents: 'none' }}/>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 24 }} className="grid-3">
              {PROCESS_STEPS.map((step, i) => (
                <FadeIn key={step.n} delay={i * 0.12}>
                  <div style={{ textAlign: 'center', padding: '0 8px' }}>
                    {/* Number circle */}
                    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                      {/* Outer glow ring */}
                      <div style={{ position: 'absolute', width: 96, height: 96, borderRadius: '50%', background: `radial-gradient(circle, ${C.gold}18 0%, transparent 70%)` }}/>
                      <div style={{ width: 80, height: 80, borderRadius: '50%', background: `linear-gradient(135deg, rgba(201,169,110,0.18) 0%, rgba(201,169,110,0.06) 100%)`, border: `1.5px solid ${C.gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', backdropFilter: 'blur(4px)' }}>
                        <span className="font-manrope" style={{ fontSize: 20, fontWeight: 800, color: C.gold, letterSpacing: '0.05em' }}>0{step.n}</span>
                      </div>
                    </div>

                    {/* Gold accent line */}
                    <div style={{ width: 24, height: 2, background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, margin: '0 auto 14px' }}/>

                    <div className="font-playfair" style={{ fontSize: 19, fontWeight: 600, color: '#FAF6F0', marginBottom: 12 }}>{step.t}</div>
                    <p className="font-dm" style={{ fontSize: 13.5, color: 'rgba(250,246,240,0.55)', lineHeight: 1.7, maxWidth: 160, margin: '0 auto' }}>{step.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '120px 48px', textAlign: 'center', background: C.cream, position: 'relative', overflow: 'hidden' }} className="section-pad">
        {/* Subtle background pattern */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle at 20% 50%, rgba(201,169,110,0.07) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(27,58,92,0.05) 0%, transparent 50%)`, pointerEvents: 'none' }}/>

        {/* Decorative frame lines */}
        <div style={{ position: 'absolute', top: 40, left: '50%', transform: 'translateX(-50%)', width: 1, height: 48, background: `linear-gradient(180deg, transparent, ${C.gold}60)` }}/>
        <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', width: 1, height: 48, background: `linear-gradient(0deg, transparent, ${C.gold}60)` }}/>

        <FadeIn>
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 28 }}>
              <div style={{ width: 40, height: 1, background: C.gold }}/>
              <span className="font-manrope" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: C.gold, textTransform: 'uppercase' }}>Let's Connect</span>
              <div style={{ width: 40, height: 1, background: C.gold }}/>
            </div>

            <h2 className="font-playfair" style={{ fontSize: 'clamp(34px,4.5vw,58px)', fontWeight: 600, color: C.blue, marginBottom: 8, lineHeight: 1.1 }}>
              Not sure what<br/><em style={{ fontStyle: 'italic', color: C.gold }}>you need?</em>
            </h2>

            {/* Decorative diamond */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, margin: '20px 0 24px' }}>
              <div style={{ width: 60, height: 1, background: `linear-gradient(90deg, transparent, ${C.gold}60)` }}/>
              <div style={{ width: 6, height: 6, background: C.gold, transform: 'rotate(45deg)' }}/>
              <div style={{ width: 60, height: 1, background: `linear-gradient(90deg, ${C.gold}60, transparent)` }}/>
            </div>

            <p className="font-dm" style={{ fontSize: 17, color: '#6b6b6b', maxWidth: 460, margin: '0 auto 52px', lineHeight: 1.8 }}>
              Let&apos;s talk. Our experts will guide you to the perfect solution for your space and budget.
            </p>

            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link href="/contact" style={{ textDecoration: 'none' }}>
                <GoldBtn style={{ padding: '18px 56px', fontSize: 13, letterSpacing: '0.12em' }}>Schedule a Free Call</GoldBtn>
              </Link>
              <a href="https://wa.me/919259241423" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'transparent', color: '#1a1a1a', padding: '17px 40px', borderRadius: 4, textDecoration: 'none', fontFamily: "'Manrope',sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', border: '1.5px solid #1a1a1a', transition: 'all 0.25s' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}
