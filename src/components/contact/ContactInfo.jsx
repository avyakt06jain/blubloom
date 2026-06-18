import { C } from '@/constants/colors'
import Label from '@/components/ui/Label'

const DETAILS = [
  { abbr: 'LOC', label: 'Our Office',     text: 'Jasola, New Delhi 110025, India' },
  { abbr: 'TEL', label: 'Phone',          text: '+91 92592 41423', href: 'tel:+919259241423' },
  { abbr: 'MAI', label: 'Email',          text: 'hello@blubloominterior.in', href: 'mailto:hello@blubloominterior.in' },
  { abbr: 'HRS', label: 'Business Hours', text: 'Monday – Saturday: 10:00 AM – 7:00 PM' },
]

const AREAS = ['Delhi NCR', 'Noida', 'Gurgaon', 'Faridabad', 'Pan India']

const SOCIALS = [
  { label: 'Instagram', url: 'https://instagram.com/blubloominteriors' },
  { label: 'Facebook',  url: '#' },
  { label: 'YouTube',   url: '#' },
]

export default function ContactInfo() {
  return (
    <div>
      <Label>Contact Details</Label>
      <h2 className="font-playfair" style={{ fontSize: 32, fontWeight: 600, color: C.blue, marginBottom: 36, lineHeight: 1.25 }}>
        Let&apos;s connect and create something extraordinary.
      </h2>

      {/* Detail cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
        {DETAILS.map(({ abbr, label, text, href }) => (
          <div key={label} style={{ display: 'flex', gap: 18, alignItems: 'flex-start', padding: '20px 24px', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.05)', border: `1px solid rgba(201,169,110,0.12)` }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: `${C.blue}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span className="font-manrope" style={{ fontSize: 9, fontWeight: 800, color: C.blue, letterSpacing: '0.05em' }}>{abbr}</span>
            </div>
            <div>
              <div className="font-manrope" style={{ fontSize: 11, color: C.gold, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 5 }}>{label}</div>
              {href
                ? <a href={href} className="font-dm" style={{ fontSize: 15, color: C.charcoal, textDecoration: 'none', fontWeight: 500 }}>{text}</a>
                : <div className="font-dm" style={{ fontSize: 15, color: C.charcoal }}>{text}</div>}
            </div>
          </div>
        ))}
      </div>

      {/* Service areas */}
      <div style={{ background: `linear-gradient(135deg, ${C.blue}, ${C.lightBlue})`, borderRadius: 16, padding: '28px', marginBottom: 24 }}>
        <div className="font-manrope" style={{ fontSize: 11, color: C.gold, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>Service Areas</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {AREAS.map(area => (
            <span key={area} className="font-manrope" style={{ fontSize: 12, background: 'rgba(201,169,110,0.2)', color: C.gold, padding: '6px 14px', borderRadius: 50, fontWeight: 600, border: '1px solid rgba(201,169,110,0.3)' }}>
              {area}
            </span>
          ))}
        </div>
      </div>

      {/* WhatsApp */}
      <a href="https://wa.me/919259241423" target="_blank" rel="noopener noreferrer"
        style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#25D366', borderRadius: 12, padding: '20px 24px', textDecoration: 'none', boxShadow: '0 8px 24px rgba(37,211,102,0.3)', marginBottom: 24 }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.128.558 4.127 1.534 5.857L.057 23.882l6.188-1.622A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.371l-.36-.214-3.724.976.994-3.634-.234-.374A9.818 9.818 0 1112 21.818z"/></svg>
        </div>
        <div>
          <div className="font-manrope" style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Chat on WhatsApp</div>
          <div className="font-dm" style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', marginTop: 3 }}>Quick responses · Available Mon–Sat</div>
        </div>
        <div className="font-manrope" style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.8)', fontSize: 20 }}>→</div>
      </a>

      {/* Social links */}
      <div>
        <div className="font-manrope" style={{ fontSize: 11, color: '#888', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 14 }}>Follow Us</div>
        <div style={{ display: 'flex', gap: 12 }}>
          {SOCIALS.map(s => (
            <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', border: '1.5px solid rgba(0,0,0,0.1)', borderRadius: 8, textDecoration: 'none', color: C.charcoal, fontFamily: "'Manrope',sans-serif", fontSize: 12, fontWeight: 600, background: '#fff' }}>
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
