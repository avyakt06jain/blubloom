/**
 * Centralised image URLs.
 * Swap any URL here and every component that uses it updates automatically.
 *
 * Local client images are served from /public/images/
 *   dlf/* → DLF Camellias project (Gurgaon)
 *   gk/*  → Greater Kailash Unit project (Delhi)
 */
const BASE = 'https://images.unsplash.com/photo'

// ── Real client project images ───────────────────────────────────────────────
export const DLF = {
  living1:   '/images/dlf/living-1.png',   // Red lounge — close crop
  living2:   '/images/dlf/living-2.png',   // Living room — window view
  living3:   '/images/dlf/living-3.png',   // Drawing room — sofas & curtains
  dining1:   '/images/dlf/dining-1.png',   // Dining — art + red chairs
  dining2:   '/images/dlf/dining-2.png',   // Kitchen-dining — round table
  mediaRoom: '/images/dlf/media-room.png', // Media room — fireplace + TV
  tvWall:    '/images/dlf/tv-wall.png',    // TV wall — armchair angle
}

export const GK = {
  bedroom1: '/images/gk/bedroom-1.png', // Master bedroom — gold lattice headboard
  bedroom2: '/images/gk/bedroom-2.png', // Bedroom suite — 3D wall panels
  bedroom3: '/images/gk/bedroom-3.png', // Bedroom — wider angle
  wardrobe: '/images/gk/wardrobe.png',  // Walk-in wardrobe — sculptural panels
  study:    '/images/gk/study.png',     // Study & dressing area
  lounge:   '/images/gk/lounge.png',    // Lounge / sitting area
}
// ─────────────────────────────────────────────────────────────────────────────

export const I = {
  // Hero / large
  hero1:   `${BASE}-1618219908412-a29a1bb7b86e?w=1800&q=85&auto=format&fit=crop`,
  hero2:   `${BASE}-1600210492493-0946911123ea?w=1800&q=85&auto=format&fit=crop`,
  hero3:   `${BASE}-1618220048045-10a6dbdf83e0?w=1800&q=85&auto=format&fit=crop`,
  cta:     `${BASE}-1616046229478-9901c5536a45?w=1600&q=80&auto=format&fit=crop`,
  about:   `${BASE}-1600880292203-757bb62b4baf?w=1200&q=80&auto=format&fit=crop`,

  // Living rooms
  living1: DLF.living2,
  living2: DLF.living1,
  living3: DLF.living3,

  // Bedrooms
  bed1:    GK.bedroom1,
  bed2:    GK.bedroom3,
  bed3:    GK.bedroom2,

  // Kitchens
  kit1:    `${BASE}-1556909114-f6e7ad7d3136?w=900&q=80&auto=format&fit=crop`,
  kit2:    `${BASE}-1556742049-0cfed4f6a45d?w=900&q=80&auto=format&fit=crop`,

  // Other rooms
  din1:    DLF.dining1,
  off1:    `${BASE}-1497366216548-37526070297c?w=900&q=80&auto=format&fit=crop`,

  // Materials / details
  ward:    GK.wardrobe,
  floor:   `${BASE}-1600585154526-990dced4db0d?w=900&q=80&auto=format&fit=crop`,
  ceil:    DLF.tvWall,
  wall:    GK.bedroom2,
  win:     DLF.living3,   // living room showcasing windows & drapes
  furn:    DLF.living1,
}
