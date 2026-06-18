'use client'

import Link from 'next/link'
import { C } from '@/constants/colors'

const ACTIONS = [
  { label: 'Call',      href: 'tel:+919259241423',            isLink: true,  accent: false },
  { label: 'WhatsApp',  href: 'https://wa.me/919259241423',   isLink: true,  accent: false },
  { label: 'Get Quote', href: '/contact',                     isLink: false, accent: true  },
]

export default function MobileCTA() {
  return (
    <div
      className="mobile-only"
      style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000,
        display: 'flex',
        borderTop: '1px solid rgba(0,0,0,0.1)',
        background: '#fff',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      {ACTIONS.map((action, i) => {
        const shared = {
          flex: 1,
          padding: '14px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Manrope', sans-serif",
          fontSize: 12,
          fontWeight: 600,
          borderRight: i < ACTIONS.length - 1 ? '1px solid rgba(0,0,0,0.08)' : 'none',
          background: action.accent ? C.blue : '#fff',
          color: action.accent ? '#FAF6F0' : C.charcoal,
          textDecoration: 'none',
          cursor: 'pointer',
        }

        if (action.isLink) {
          return <a key={action.label} href={action.href} style={shared}>{action.label}</a>
        }

        return (
          <Link key={action.label} href={action.href} style={shared}>
            {action.label}
          </Link>
        )
      })}
    </div>
  )
}
