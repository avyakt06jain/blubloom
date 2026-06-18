'use client'

import { motion } from 'framer-motion'
import { C } from '@/constants/colors'
import { PORTFOLIO_CATS } from '@/data/portfolio'

/**
 * @param {{ active: string, onChange: (cat: string) => void, total: number }} props
 */
export default function FilterBar({ active, onChange, total }) {
  return (
    <div style={{ padding: '40px 48px 20px', borderBottom: '1px solid rgba(201,169,110,0.15)', background: '#fff', position: 'sticky', top: 62, zIndex: 100, backdropFilter: 'blur(20px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <span className="font-manrope" style={{ fontSize: 12, color: '#888', letterSpacing: '0.15em', textTransform: 'uppercase', marginRight: 8 }}>Filter:</span>

        {PORTFOLIO_CATS.map(cat => (
          <motion.button
            key={cat}
            whileHover={{ y: -2 }}
            onClick={() => onChange(cat)}
            className="font-manrope"
            style={{
              padding: '9px 22px', borderRadius: 50,
              border: `1.5px solid ${active === cat ? C.blue : 'rgba(0,0,0,0.12)'}`,
              background: active === cat ? C.blue : 'transparent',
              color: active === cat ? '#FAF6F0' : C.charcoal,
              cursor: 'pointer', fontSize: 13,
              fontWeight: active === cat ? 700 : 500,
              transition: 'all 0.25s',
            }}
          >
            {cat}
          </motion.button>
        ))}

        <span className="font-dm" style={{ marginLeft: 'auto', fontSize: 13, color: '#888' }}>{total} projects</span>
      </div>
    </div>
  )
}
