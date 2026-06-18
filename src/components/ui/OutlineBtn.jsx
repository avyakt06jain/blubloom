'use client'

import { motion } from 'framer-motion'
import { C } from '@/constants/colors'

/**
 * Secondary outline button. Two variants: light (on dark bg) and dark (on light bg).
 *
 * @param {{ children: React.ReactNode, onClick?: () => void, dark?: boolean, style?: object }} props
 */
export default function OutlineBtn({ children, onClick, dark = false, style = {} }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ background: dark ? C.blue : C.cream, color: dark ? C.cream : C.blue }}
      whileTap={{ scale: 0.97 }}
      style={{
        background: 'transparent',
        border: `2px solid ${dark ? C.blue : 'rgba(250,246,240,0.7)'}`,
        color: dark ? C.blue : '#FAF6F0',
        padding: '14px 40px',
        borderRadius: 4,
        cursor: 'pointer',
        fontFamily: "'Manrope', sans-serif",
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        transition: 'all 0.3s',
        ...style,
      }}
    >
      {children}
    </motion.button>
  )
}
