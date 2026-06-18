'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { C } from '@/constants/colors'
import GoldBtn from '@/components/ui/GoldBtn'

/**
 * @param {{ project: import('@/data/portfolio').Project | null, onClose: () => void }} props
 */
export default function Lightbox({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          style={{ position: 'fixed', inset: 0, zIndex: 3000, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
            onClick={e => e.stopPropagation()}
            style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', maxWidth: 860, width: '100%', maxHeight: '90vh', overflowY: 'auto' }}
          >
            <div style={{ height: 480, overflow: 'hidden' }}>
              <img src={project.img} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
            </div>
            <div style={{ padding: '32px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20 }}>
              <div>
                <div className="font-manrope" style={{ fontSize: 11, color: C.gold, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>{project.cat}</div>
                <h3 className="font-playfair" style={{ fontSize: 26, fontWeight: 600, color: C.blue, marginBottom: 8 }}>{project.title}</h3>
                <p className="font-dm" style={{ fontSize: 15, color: '#777' }}>{project.loc}</p>
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/contact" style={{ textDecoration: 'none' }}>
                  <GoldBtn>Get Similar →</GoldBtn>
                </Link>
                <button
                  onClick={onClose}
                  style={{ background: 'transparent', border: '1.5px solid rgba(0,0,0,0.15)', borderRadius: 4, padding: '10px 20px', cursor: 'pointer', fontFamily: "'Manrope',sans-serif", fontSize: 13, fontWeight: 600 }}
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
