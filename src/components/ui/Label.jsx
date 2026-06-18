import { C } from '@/constants/colors'

/**
 * Small all-caps eyebrow label with decorative line.
 *
 * @param {{ children: React.ReactNode }} props
 */
export default function Label({ children }) {
  return (
    <div
      className="font-manrope"
      style={{
        fontSize: 11,
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: C.gold,
        marginBottom: 14,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <span style={{ width: 32, height: 1, background: C.gold, display: 'inline-block', flexShrink: 0 }} />
      {children}
    </div>
  )
}
