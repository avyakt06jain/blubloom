'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

/**
 * Animates a number from 0 to `val` when scrolled into view.
 *
 * @param {{ val: number, suf: string }} props
 */
export default function Counter({ val, suf }) {
  const [n, setN] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let cur = 0
    const step = val / 80
    const timer = setInterval(() => {
      cur += step
      if (cur >= val) {
        setN(val)
        clearInterval(timer)
      } else {
        setN(Math.floor(cur))
      }
    }, 20)
    return () => clearInterval(timer)
  }, [inView, val])

  const display = n >= 1000 ? `${(n / 1000).toFixed(0)}k` : n

  return <span ref={ref}>{display}{suf}</span>
}
