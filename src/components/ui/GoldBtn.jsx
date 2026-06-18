'use client'

import { motion } from 'framer-motion'
import { C } from '@/constants/colors'

/**
 * Primary CTA button — gold gradient.
 *
 * @param {{ children: React.ReactNode, onClick?: () => void, href?: string, style?: object, type?: string }} props
 */
export default function GoldBtn({ children, onClick, href, style = {}, type = 'button' }) {
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `linear-gradient(135deg, ${C.gold}, ${C.darkGold})`,
    border: 'none',
    color: '#FAF6F0',
    padding: '15px 44px',
    borderRadius: 4,
    cursor: 'pointer',
    fontFamily: "'Manrope', sans-serif",
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    boxShadow: '0 8px 24px rgba(201,169,110,0.35)',
    ...style,
  }

  if (href) {
    return (
      <motion.a href={href} whileHover={{ y: -3, boxShadow: '0 16px 40px rgba(201,169,110,0.5)' }} whileTap={{ scale: 0.97 }} style={baseStyle}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button type={type} onClick={onClick} whileHover={{ y: -3, boxShadow: '0 16px 40px rgba(201,169,110,0.5)' }} whileTap={{ scale: 0.97 }} style={baseStyle}>
      {children}
    </motion.button>
  )
}
