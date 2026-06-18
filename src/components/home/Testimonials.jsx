'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { C } from '@/constants/colors'
import { TESTIMONIALS } from '@/data/testimonials'
import FadeIn from '@/components/ui/FadeIn'
import Label from '@/components/ui/Label'

const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/place/Blubloom+Interior+%26+Contractor+LLP/@28.5509305,77.2879334,17z/data=!3m1!4b1!4m6!3m5!1s0x390ce5239e016015:0x40d41f2c4254ea72!8m2!3d28.5509305!4d77.2905083!16s%2Fg%2F11w7w2wzgg?entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D'

const GOOGLE_REVIEWS_URL =
  'https://www.google.com/search?q=blubloom'

function GoogleGLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

function StarRating({ rating = 5, size = 18 }) {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" fill={i < rating ? C.gold : '#e0d5c5'}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [idx, setIdx] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const timerRef = useRef(null)

  const startTimer = () => {
    timerRef.current = setInterval(() => setIdx(i => (i + 1) % TESTIMONIALS.length), 5000)
  }

  useEffect(() => {
    if (!isHovered) startTimer()
    else clearInterval(timerRef.current)
    return () => clearInterval(timerRef.current)
  }, [isHovered])

  const goTo = (i) => {
    setIdx(i)
    clearInterval(timerRef.current)
    startTimer()
  }

  return (
    <section
      style={{
        padding: '120px 48px',
        background: `linear-gradient(160deg, ${C.blueDark} 0%, ${C.blue} 60%, #1f4570 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background elements */}
      <div style={{
        position: 'absolute', top: -80, right: -80, width: 400, height: 400,
        borderRadius: '50%',
        background: `radial-gradient(circle, rgba(201,169,110,0.12) 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -60, left: -60, width: 300, height: 300,
        borderRadius: '50%',
        background: `radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />
      {/* Subtle quote mark */}
      <div style={{
        position: 'absolute', top: 60, left: '50%', transform: 'translateX(-50%)',
        fontSize: 240, fontFamily: 'Georgia, serif', color: 'rgba(201,169,110,0.05)',
        lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
      }}>❝</div>

      <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <FadeIn>
          {/* Google rating badge */}
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(201,169,110,0.3)',
              borderRadius: 50,
              padding: '8px 20px',
              marginBottom: 32,
              textDecoration: 'none',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.3s',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.14)'
              e.currentTarget.style.borderColor = 'rgba(201,169,110,0.6)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
              e.currentTarget.style.borderColor = 'rgba(201,169,110,0.3)'
            }}
          >
            <GoogleGLogo />
            <span className="font-manrope" style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)', fontWeight: 600, letterSpacing: 0.3 }}>
              4.9
            </span>
            <StarRating rating={5} size={14} />
            <span className="font-manrope" style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 400 }}>
              233 Google Reviews
            </span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(201,169,110,0.7)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 2 }}>
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>

          <Label style={{ color: 'rgba(201,169,110,0.8)', borderColor: 'rgba(201,169,110,0.3)' }}>Client Love</Label>
          <h2
            className="font-playfair"
            style={{ fontSize: 48, fontWeight: 600, color: '#fff', marginBottom: 56, marginTop: 12 }}
          >
            What Our Clients Say
          </h2>
        </FadeIn>

        {/* Testimonial card */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ position: 'relative' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: 24,
                padding: '60px 68px',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                position: 'relative',
              }}
            >
              {/* Gold accent top line */}
              <div style={{
                position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                width: 60, height: 2, borderRadius: 1,
                background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`,
              }} />

              {/* Stars */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
                <StarRating rating={TESTIMONIALS[idx].rating} size={22} />
              </div>

              <p
                className="font-playfair"
                style={{
                  fontSize: 21, color: 'rgba(255,255,255,0.92)', lineHeight: 1.9,
                  fontStyle: 'italic', marginBottom: 40,
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                }}
              >
                "{TESTIMONIALS[idx].text}"
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                <div style={{
                  width: 1, height: 28,
                  background: `linear-gradient(180deg, transparent, ${C.gold}, transparent)`,
                }} />
                <div>
                  <div
                    className="font-manrope"
                    style={{ fontWeight: 700, fontSize: 15, color: C.gold, letterSpacing: 0.5 }}
                  >
                    {TESTIMONIALS[idx].name}
                  </div>
                  <div
                    className="font-dm"
                    style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 3 }}
                  >
                    {TESTIMONIALS[idx].loc}
                  </div>
                </div>
                <div style={{
                  width: 1, height: 28,
                  background: `linear-gradient(180deg, transparent, ${C.gold}, transparent)`,
                }} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot nav */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32 }}>
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Testimonial ${i + 1}`}
              style={{
                width: i === idx ? 32 : 8, height: 8, borderRadius: 4, border: 'none',
                cursor: 'pointer',
                background: i === idx
                  ? `linear-gradient(90deg, ${C.gold}, ${C.darkGold})`
                  : 'rgba(255,255,255,0.2)',
                transition: 'all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
                boxShadow: i === idx ? `0 0 12px rgba(201,169,110,0.5)` : 'none',
              }}
            />
          ))}
        </div>

        {/* Google Reviews CTA */}
        <FadeIn delay={0.3}>
          <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div
              className="font-manrope"
              style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', letterSpacing: 1, textTransform: 'uppercase' }}
            >
              Trusted across Delhi NCR
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '11px 24px',
                  background: 'rgba(255,255,255,0.07)',
                  border: `1px solid rgba(201,169,110,0.4)`,
                  borderRadius: 50,
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  backdropFilter: 'blur(8px)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(201,169,110,0.15)'
                  e.currentTarget.style.borderColor = C.gold
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.borderColor = 'rgba(201,169,110,0.4)'
                }}
              >
                <GoogleGLogo />
                <span className="font-manrope" style={{ fontSize: 13, color: '#fff', fontWeight: 600 }}>
                  Read All 233 Reviews
                </span>
              </a>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '11px 24px',
                  background: 'rgba(255,255,255,0.07)',
                  border: `1px solid rgba(255,255,255,0.15)`,
                  borderRadius: 50,
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  backdropFilter: 'blur(8px)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span className="font-manrope" style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>
                  View on Google Maps
                </span>
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
