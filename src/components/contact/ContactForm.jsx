'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { C } from '@/constants/colors'
import { SERVICES } from '@/data/services'
import GoldBtn from '@/components/ui/GoldBtn'
import Label from '@/components/ui/Label'

const INITIAL = { name: '', phone: '', email: '', service: '', propType: '', budget: '', city: '', message: '' }

const FIELD_STYLE = {
  width: '100%', padding: '14px 18px',
  border: '1.5px solid rgba(0,0,0,0.1)', borderRadius: 8,
  fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: '#2A2A2A',
  background: '#fff', outline: 'none', transition: 'border-color 0.25s', appearance: 'none',
}

const FOCUS = e => { e.target.style.borderColor = C.gold }
const BLUR  = e => { e.target.style.borderColor = 'rgba(0,0,0,0.1)' }

function FieldLabel({ children }) {
  return (
    <label className="font-manrope" style={{ fontSize: 12, color: '#777', letterSpacing: '0.08em', display: 'block', marginBottom: 8, textTransform: 'uppercase' }}>
      {children}
    </label>
  )
}

export default function ContactForm() {
  const [form, setForm]     = useState(INITIAL)
  const [status, setStatus] = useState('idle') // idle | loading | success

  const set = (key) => (e) => setForm(prev => ({ ...prev, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('loading')
    // Replace this timeout with a real API call (e.g. fetch('/api/contact', { method:'POST', body: JSON.stringify(form) }))
    setTimeout(() => setStatus('success'), 1800)
  }

  if (status === 'success') {
    return (
      <div style={{ background: '#fff', borderRadius: 20, padding: '52px', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', textAlign: 'center' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(201,169,110,0.12)', border: '2px solid rgba(201,169,110,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
        <h3 className="font-playfair" style={{ fontSize: 28, color: C.blue, marginBottom: 14 }}>Thank You!</h3>
        <p className="font-dm" style={{ fontSize: 16, color: '#666', lineHeight: 1.7, maxWidth: 360, margin: '0 auto 32px' }}>
          Your inquiry has been received. Our team will reach out within 24 hours to schedule your free consultation.
        </p>
        <GoldBtn onClick={() => setStatus('idle')}>Submit Another Inquiry</GoldBtn>
      </div>
    )
  }

  return (
    <div style={{ background: '#fff', borderRadius: 20, padding: '52px', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
      <Label>Inquiry Form</Label>
      <h2 className="font-playfair" style={{ fontSize: 34, fontWeight: 600, color: C.blue, marginBottom: 36 }}>Tell Us About Your Project</h2>

      <form onSubmit={handleSubmit}>
        {/* Row 1 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 18 }} className="grid-2">
          <div>
            <FieldLabel>Full Name *</FieldLabel>
            <input required style={FIELD_STYLE} placeholder="Rajesh Sharma" value={form.name} onChange={set('name')} onFocus={FOCUS} onBlur={BLUR}/>
          </div>
          <div>
            <FieldLabel>Phone *</FieldLabel>
            <input required style={FIELD_STYLE} placeholder="+91 98765 43210" value={form.phone} onChange={set('phone')} onFocus={FOCUS} onBlur={BLUR}/>
          </div>
        </div>

        {/* Email */}
        <div style={{ marginBottom: 18 }}>
          <FieldLabel>Email Address</FieldLabel>
          <input type="email" style={FIELD_STYLE} placeholder="rajesh@email.com" value={form.email} onChange={set('email')} onFocus={FOCUS} onBlur={BLUR}/>
        </div>

        {/* Row 2 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 18 }} className="grid-2">
          <div>
            <FieldLabel>Service Interested In *</FieldLabel>
            <select required style={FIELD_STYLE} value={form.service} onChange={set('service')} onFocus={FOCUS} onBlur={BLUR}>
              <option value="">Select a service</option>
              {SERVICES.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
            </select>
          </div>
          <div>
            <FieldLabel>Property Type</FieldLabel>
            <select style={FIELD_STYLE} value={form.propType} onChange={set('propType')} onFocus={FOCUS} onBlur={BLUR}>
              <option value="">Select type</option>
              <option>Residential — Apartment</option>
              <option>Residential — Villa / Bungalow</option>
              <option>Commercial — Office</option>
              <option>Commercial — Retail / Showroom</option>
              <option>Commercial — Restaurant / Café</option>
            </select>
          </div>
        </div>

        {/* Row 3 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 18 }} className="grid-2">
          <div>
            <FieldLabel>Budget Range</FieldLabel>
            <select style={FIELD_STYLE} value={form.budget} onChange={set('budget')} onFocus={FOCUS} onBlur={BLUR}>
              <option value="">Select budget</option>
              <option>Under ₹5 Lakhs</option>
              <option>₹5 – 10 Lakhs</option>
              <option>₹10 – 25 Lakhs</option>
              <option>₹25 – 50 Lakhs</option>
              <option>₹50 Lakhs+</option>
            </select>
          </div>
          <div>
            <FieldLabel>City / Location</FieldLabel>
            <input style={FIELD_STYLE} placeholder="Delhi, Gurgaon, Noida..." value={form.city} onChange={set('city')} onFocus={FOCUS} onBlur={BLUR}/>
          </div>
        </div>

        {/* Message */}
        <div style={{ marginBottom: 32 }}>
          <FieldLabel>Your Message</FieldLabel>
          <textarea rows={4} style={{ ...FIELD_STYLE, resize: 'vertical', minHeight: 110 }}
            placeholder="Tell us about your project vision, timeline, or any specific requirements..."
            value={form.message} onChange={set('message')} onFocus={FOCUS} onBlur={BLUR}/>
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}
          disabled={status === 'loading'}
          style={{ width: '100%', background: `linear-gradient(135deg, ${C.gold}, ${C.darkGold})`, border: 'none', color: '#FAF6F0', padding: '17px 24px', borderRadius: 8, cursor: 'pointer', fontFamily: "'Manrope',sans-serif", fontSize: 15, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', boxShadow: '0 8px 24px rgba(201,169,110,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: status === 'loading' ? 0.8 : 1 }}
        >
          {status === 'loading' ? (
            <>
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%' }}/>
              Sending Your Inquiry...
            </>
          ) : 'Submit Inquiry →'}
        </motion.button>
      </form>
    </div>
  )
}
