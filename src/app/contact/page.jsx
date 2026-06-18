'use client'

import { motion } from 'framer-motion'
import { C } from '@/constants/colors'
import { I } from '@/constants/images'
import FadeIn      from '@/components/ui/FadeIn'
import Label       from '@/components/ui/Label'
import ContactForm from '@/components/contact/ContactForm'
import ContactInfo from '@/components/contact/ContactInfo'

export default function ContactPage() {
  return (
    <div style={{ background: C.cream, paddingTop: 80 }}>

      {/* ── Hero ── */}
      <section style={{ position: 'relative', height: 380, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${I.hero1})`, backgroundSize: 'cover', backgroundPosition: 'center 30%' }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(18,40,64,0.88) 0%, rgba(18,40,64,0.6) 100%)' }}/>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px' }}>
          <Label>Get In Touch</Label>
          <h1 className="font-playfair" style={{ fontSize: 'clamp(36px,5vw,62px)', fontWeight: 700, color: '#FAF6F0', lineHeight: 1.2 }}>
            Let&apos;s Create Something<br />Beautiful Together
          </h1>
        </motion.div>
      </section>

      {/* ── Form + Info ── */}
      <section style={{ padding: '90px 48px 100px', maxWidth: 1200, margin: '0 auto' }} className="section-pad">
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 70, alignItems: 'start' }} className="grid-2">
          <FadeIn dir="right">
            <ContactForm />
          </FadeIn>
          <FadeIn dir="left">
            <ContactInfo />
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
