'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { C } from '@/constants/colors'
import { I } from '@/constants/images'
import { STATS } from '@/data/stats'
import FadeIn   from '@/components/ui/FadeIn'
import Counter  from '@/components/ui/Counter'
import GoldBtn  from '@/components/ui/GoldBtn'
import Label    from '@/components/ui/Label'

const PROCESS = [
  { n: '01', t: 'Consultation', d: 'We start with a deep dive into your vision, lifestyle, and requirements — listening before we design.' },
  { n: '02', t: '3D Design',    d: 'Our designers create photorealistic 3D renders so you can visualize your space before a single nail is driven.' },
  { n: '03', t: 'Materials',    d: 'We curate the finest materials — from stone countertops to luxury wallpapers — with complete transparency.' },
  { n: '04', t: 'Execution',    d: 'Our skilled craftsmen bring the design to life with precision, using premium tools and proven techniques.' },
  { n: '05', t: 'Handover',     d: 'We deliver a spotless, move-in-ready space — on time, on budget, and beyond your expectations.' },
]

const VALUES = [
  { ic: '01', t: 'Growth Mindset', d: 'We approach every project as an opportunity to learn, innovate, and push creative boundaries.' },
  { ic: '02', t: 'Client First',   d: 'Your vision is our blueprint. We listen deeply and communicate transparently throughout.' },
  { ic: '03', t: 'Innovation',     d: 'We stay ahead of global design trends, bringing fresh ideas and cutting-edge solutions to every space.' },
  { ic: '04', t: 'Excellence',     d: 'We hold ourselves to the highest standards — in design, materials, and craftsmanship — always.' },
]

const TEAM = [
  { name: 'Sunny',        role: 'Founder & Director',           initials: 'S',  note: 'Visionary designer with a passion for creating spaces that inspire and endure.' },
  { name: 'Design Team',  role: 'Creative Designers',           initials: 'DT', note: 'Talented designers bringing fresh perspectives and global design trends to every project.' },
  { name: 'Site Team',    role: 'Project Managers & Craftsmen', initials: 'ST', note: 'Expert craftsmen who bring designs to life with precision and premium workmanship.' },
]

export default function AboutPage() {
  return (
    <div style={{ background: C.cream, paddingTop: 80 }}>

      {/* ── Hero ── */}
      <section style={{ position: 'relative', height: 480, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${I.about})`, backgroundSize: 'cover', backgroundPosition: 'center top' }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(18,40,64,0.82) 0%, rgba(18,40,64,0.55) 100%)' }}/>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px' }}>
          <Label>Our Story</Label>
          <h1 className="font-playfair" style={{ fontSize: 'clamp(40px,6vw,72px)', fontWeight: 700, color: '#FAF6F0', marginBottom: 16 }}>About Blubloom</h1>
          <p className="font-dm" style={{ fontSize: 18, color: 'rgba(250,246,240,0.75)', maxWidth: 560, margin: '0 auto' }}>
            Where spaces bloom — and every room tells a beautiful story.
          </p>
        </motion.div>
      </section>

      {/* ── Story ── */}
      <section style={{ padding: '110px 48px', maxWidth: 1200, margin: '0 auto' }} className="section-pad">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="grid-2">
          <FadeIn dir="right">
            <Label>Who We Are</Label>
            <h2 className="font-playfair" style={{ fontSize: 42, fontWeight: 600, color: C.blue, marginBottom: 28, lineHeight: 1.2 }}>Born from a passion for beautiful spaces</h2>
            <p className="font-dm" style={{ fontSize: 16, color: '#555', lineHeight: 1.85, marginBottom: 20 }}>
              Blubloom was founded in 2024 by Director Sunny with a singular vision — to make exceptional interior design accessible to everyone. The name "Blubloom" represents our belief: like a flower in bloom, every space has the potential to flourish with the right care and creativity.
            </p>
            <p className="font-dm" style={{ fontSize: 16, color: '#555', lineHeight: 1.85, marginBottom: 32 }}>
              From our home base in Jasola, New Delhi, we've grown to serve clients across Delhi NCR. In one year, we've completed 100+ projects and delivered 10,000+ units — a testament to the trust our clients place in us.
            </p>
            <Link href="/contact" style={{ textDecoration: 'none' }}>
              <GoldBtn>Work With Us</GoldBtn>
            </Link>
          </FadeIn>
          <FadeIn dir="left">
            <div style={{ position: 'relative' }}>
              <div style={{ borderRadius: 16, overflow: 'hidden', height: 480 }}>
                <img src={I.living2} alt="Blubloom project" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
              </div>
              <div style={{ position: 'absolute', bottom: -28, left: -28, background: C.blue, borderRadius: 12, padding: '24px 32px', boxShadow: '0 16px 40px rgba(18,40,64,0.3)' }}>
                <div className="font-playfair" style={{ fontSize: 42, fontWeight: 700, color: C.gold }}>100+</div>
                <div className="font-manrope" style={{ fontSize: 12, color: 'rgba(250,246,240,0.7)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Projects Delivered</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ background: C.blue, padding: '70px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 40, textAlign: 'center' }} className="stat-grid">
          {STATS.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.1}>
              <div className="font-playfair" style={{ fontSize: 56, fontWeight: 700, color: C.gold }}><Counter val={s.val} suf={s.suf}/></div>
              <div className="font-manrope" style={{ fontSize: 12, color: 'rgba(250,246,240,0.65)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 10 }}>{s.label}</div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Process ── */}
      <section style={{ padding: '110px 48px', background: C.bg2 }} className="section-pad">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeIn style={{ textAlign: 'center', marginBottom: 70 }}>
            <Label>How We Work</Label>
            <h2 className="font-playfair" style={{ fontSize: 46, fontWeight: 600, color: C.blue }}>Our Process</h2>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 24 }} className="grid-3">
            {PROCESS.map((step, i) => (
              <FadeIn key={step.n} delay={i * 0.1}>
                <div style={{ textAlign: 'center', padding: '0 12px' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: `linear-gradient(135deg, ${C.blue}, ${C.lightBlue})`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 8px 24px rgba(27,58,92,0.3)' }}>
                    <span className="font-manrope" style={{ fontSize: 14, fontWeight: 800, color: C.gold }}>{step.n}</span>
                  </div>
                  <h3 className="font-playfair" style={{ fontSize: 18, fontWeight: 600, color: C.blue, marginBottom: 12 }}>{step.t}</h3>
                  <p className="font-dm" style={{ fontSize: 14, color: '#666', lineHeight: 1.7 }}>{step.d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section style={{ padding: '110px 48px' }} className="section-pad">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeIn style={{ textAlign: 'center', marginBottom: 70 }}>
            <Label>What Drives Us</Label>
            <h2 className="font-playfair" style={{ fontSize: 46, fontWeight: 600, color: C.blue }}>Our Core Values</h2>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 28 }} className="grid-4">
            {VALUES.map((v, i) => (
              <FadeIn key={v.t} delay={i * 0.1}>
                <motion.div whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(27,58,92,0.14)' }}
                  style={{ background: '#fff', borderRadius: 16, padding: '44px 28px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', height: '100%', border: '1px solid rgba(201,169,110,0.1)' }}>
                  <div className="font-manrope" style={{ fontSize: 36, fontWeight: 800, color: 'rgba(201,169,110,0.4)', marginBottom: 20 }}>{v.ic}</div>
                  <h3 className="font-playfair" style={{ fontSize: 20, fontWeight: 600, color: C.blue, marginBottom: 14 }}>{v.t}</h3>
                  <p className="font-dm" style={{ fontSize: 14, color: '#666', lineHeight: 1.75 }}>{v.d}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section style={{ padding: '80px 48px 110px', background: C.bg2 }} className="section-pad">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeIn style={{ textAlign: 'center', marginBottom: 60 }}>
            <Label>Leadership</Label>
            <h2 className="font-playfair" style={{ fontSize: 46, fontWeight: 600, color: C.blue }}>The Team Behind Blubloom</h2>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32 }} className="grid-3">
            {TEAM.map((member, i) => (
              <FadeIn key={member.name} delay={i * 0.1}>
                <motion.div whileHover={{ y: -6 }} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
                  <div style={{ height: 280, background: `linear-gradient(135deg, ${C.blue} 0%, ${C.lightBlue} 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="font-playfair" style={{ fontSize: 64, fontWeight: 700, color: 'rgba(201,169,110,0.5)' }}>{member.initials}</span>
                  </div>
                  <div style={{ padding: '28px 28px 32px' }}>
                    <div className="font-playfair" style={{ fontSize: 22, fontWeight: 600, color: C.blue, marginBottom: 6 }}>{member.name}</div>
                    <div className="font-manrope" style={{ fontSize: 11, color: C.gold, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14 }}>{member.role}</div>
                    <p className="font-dm" style={{ fontSize: 14, color: '#666', lineHeight: 1.7 }}>{member.note}</p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
