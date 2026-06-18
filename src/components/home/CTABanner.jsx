import Link from 'next/link'
import { C } from '@/constants/colors'
import { I } from '@/constants/images'
import FadeIn from '@/components/ui/FadeIn'
import GoldBtn from '@/components/ui/GoldBtn'
import Label from '@/components/ui/Label'

export default function CTABanner() {
  return (
    <section style={{ position: 'relative', padding: '140px 48px', overflow: 'hidden', textAlign: 'center' }} className="section-pad">
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${I.cta})`, backgroundSize: 'cover', backgroundPosition: 'center' }}/>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(18,40,64,0.9) 0%, rgba(42,42,42,0.78) 100%)' }}/>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <FadeIn>
          <Label>Let&apos;s Get Started</Label>
          <h2 className="font-playfair cta-title" style={{ fontSize: 'clamp(34px,6vw,64px)', fontWeight: 700, color: '#FAF6F0', maxWidth: 700, margin: '0 auto 24px', lineHeight: 1.15 }}>
            Ready to Transform Your Space?
          </h2>
          <p className="font-dm" style={{ fontSize: 18, color: 'rgba(250,246,240,0.72)', maxWidth: 480, margin: '0 auto 52px', lineHeight: 1.7 }}>
            Get a free consultation and immersive 3D design preview. Let&apos;s bring your vision to life.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ textDecoration: 'none' }}>
              <GoldBtn style={{ padding: '17px 56px', fontSize: 14 }}>Start Your Project →</GoldBtn>
            </Link>
            <a
              href="https://wa.me/919259241423"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.3)', color: '#FAF6F0', padding: '17px 40px', borderRadius: 4, textDecoration: 'none', fontFamily: "'Manrope',sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              WhatsApp Us
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
