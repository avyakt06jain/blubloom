'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { C } from '@/constants/colors'
import { PORTFOLIO } from '@/data/portfolio'
import FilterBar from './FilterBar'
import Lightbox from './Lightbox'

export default function PortfolioGrid() {
  const [active, setActive]     = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = active === 'All' ? PORTFOLIO : PORTFOLIO.filter(p => p.cat === active)

  return (
    <>
      <FilterBar active={active} onChange={setActive} total={filtered.length} />

      <section style={{ padding: '48px 48px 100px', maxWidth: 1200, margin: '0 auto' }} className="section-pad">
        <motion.div layout style={{ columns: 3, columnGap: 20 }} className="grid-3">
          <AnimatePresence>
            {filtered.map((p, i) => (
              <motion.div
                key={p.id} layout
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                style={{ breakInside: 'avoid', marginBottom: 20 }}
              >
                <motion.div
                  whileHover="hov"
                  onClick={() => setSelected(p)}
                  style={{ position: 'relative', borderRadius: 14, overflow: 'hidden', height: p.h, cursor: 'pointer' }}
                >
                  <motion.img
                    variants={{ hov: { scale: 1.07 } }} transition={{ duration: 0.6 }}
                    src={p.img} alt={p.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <motion.div
                    variants={{ hov: { opacity: 1 } }} initial={{ opacity: 0 }} transition={{ duration: 0.3 }}
                    style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(18,40,64,0.92) 0%, rgba(18,40,64,0.3) 60%, transparent 100%)' }}
                  />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 22 }}>
                    <div className="font-manrope" style={{ fontSize: 10, letterSpacing: '0.2em', color: C.gold, textTransform: 'uppercase', marginBottom: 6 }}>{p.cat}</div>
                    <div className="font-playfair" style={{ fontSize: 18, fontWeight: 600, color: '#FAF6F0', lineHeight: 1.3 }}>{p.title}</div>
                    <div className="font-dm" style={{ fontSize: 12, color: 'rgba(250,246,240,0.65)', marginTop: 5 }}>{p.loc}</div>
                  </div>
                  <motion.div
                    variants={{ hov: { opacity: 1 } }} initial={{ opacity: 0 }}
                    style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(201,169,110,0.9)', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <Lightbox project={selected} onClose={() => setSelected(null)} />
    </>
  )
}
