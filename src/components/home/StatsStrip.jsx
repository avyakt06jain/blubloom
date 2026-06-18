import { C } from '@/constants/colors'
import { STATS } from '@/data/stats'
import Counter from '@/components/ui/Counter'
import FadeIn from '@/components/ui/FadeIn'

export default function StatsStrip() {
  return (
    <section style={{ background: C.blue, padding: '64px 48px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 40, textAlign: 'center' }} className="stat-grid">
        {STATS.map((s, i) => (
          <FadeIn key={s.label} delay={i * 0.1}>
            <div className="font-playfair" style={{ fontSize: 58, fontWeight: 700, color: C.gold, lineHeight: 1 }}>
              <Counter val={s.val} suf={s.suf} />
            </div>
            <div className="font-manrope" style={{ fontSize: 12, color: 'rgba(250,246,240,0.65)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 10 }}>
              {s.label}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
