import { C } from '@/constants/colors'
import FadeIn from '@/components/ui/FadeIn'
import Label from '@/components/ui/Label'

export default function Philosophy() {
  return (
    <section style={{ padding: '80px 48px 72px', maxWidth: 860, margin: '0 auto', textAlign: 'center' }} className="section-pad">
      <FadeIn>
        <Label>Our Philosophy</Label>
        <h2 className="font-playfair philosophy-title" style={{ fontSize: 50, fontWeight: 600, color: C.blue, lineHeight: 1.18, marginBottom: 26 }}>
          Design is not just what it <em>looks like</em> —<br />it&apos;s how it <em>feels.</em>
        </h2>
        <p className="font-dm" style={{ fontSize: 18, color: '#666', lineHeight: 1.85, maxWidth: 660, margin: '0 auto' }}>
          At Blubloom, we believe every space has a story waiting to unfold. Founded in 2024 by Director Sunny, we blend aesthetics with practicality — creating environments that inspire, function seamlessly, and stand the test of time. Where spaces bloom.
        </p>
      </FadeIn>
    </section>
  )
}
