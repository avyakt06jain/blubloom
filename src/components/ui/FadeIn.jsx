'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * Scroll-triggered fade + slide wrapper.
 *
 * @param {{ children: React.ReactNode, delay?: number, dir?: 'up'|'down'|'left'|'right', style?: object, once?: boolean }} props
 */
export default function FadeIn({ children, delay = 0, dir = 'up', style = {}, once = true }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '-40px' })

  const variants = {
    hidden: {
      opacity: 0,
      y: dir === 'up' ? 40 : dir === 'down' ? -40 : 0,
      x: dir === 'left' ? 50 : dir === 'right' ? -50 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
    },
  }

  return (
    <motion.div ref={ref} variants={variants} initial="hidden" animate={inView ? 'visible' : 'hidden'} style={style}>
      {children}
    </motion.div>
  )
}
