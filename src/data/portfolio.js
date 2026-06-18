import { I, DLF, GK } from '@/constants/images'

/**
 * @typedef {{ id: number, title: string, cat: string, loc: string, img: string, h: number }} Project
 * @type {Project[]}
 */
export const PORTFOLIO = [
  // ── DLF Camellias, Gurgaon ──────────────────────────────────────────────
  { id: 1,  title: 'DLF Camellias — Red Lounge',       cat: 'Residential', loc: 'DLF 5, Gurgaon',           img: DLF.living1,   h: 420 },
  { id: 2,  title: 'DLF Camellias — Luxury Living',    cat: 'Residential', loc: 'DLF 5, Gurgaon',           img: DLF.living2,   h: 320 },
  { id: 3,  title: 'DLF Camellias — Drawing Room',     cat: 'Residential', loc: 'DLF 5, Gurgaon',           img: DLF.living3,   h: 350 },
  { id: 4,  title: 'DLF Camellias — Media Room',       cat: 'Residential', loc: 'DLF 5, Gurgaon',           img: DLF.mediaRoom, h: 380 },
  { id: 5,  title: 'DLF Camellias — TV Wall',          cat: 'Residential', loc: 'DLF 5, Gurgaon',           img: DLF.tvWall,    h: 300 },
  { id: 6,  title: 'DLF Camellias — Dining Room',      cat: 'Residential', loc: 'DLF 5, Gurgaon',           img: DLF.dining1,   h: 330 },
  { id: 7,  title: 'DLF Camellias — Kitchen Dining',   cat: 'Kitchen',     loc: 'DLF 5, Gurgaon',           img: DLF.dining2,   h: 290 },

  // ── Greater Kailash Unit, Delhi ─────────────────────────────────────────
  { id: 8,  title: 'GK Unit — Master Bedroom',         cat: 'Residential', loc: 'Greater Kailash, Delhi',   img: GK.bedroom1,   h: 400 },
  { id: 9,  title: 'GK Unit — Bedroom Suite',          cat: 'Residential', loc: 'Greater Kailash, Delhi',   img: GK.bedroom2,   h: 310 },
  { id: 10, title: 'GK Unit — Luxury Bedroom',         cat: 'Residential', loc: 'Greater Kailash, Delhi',   img: GK.bedroom3,   h: 350 },
  { id: 11, title: 'GK Unit — Walk-In Wardrobe',       cat: 'Wardrobe',    loc: 'Greater Kailash, Delhi',   img: GK.wardrobe,   h: 280 },
  { id: 12, title: 'GK Unit — Study & Dressing',       cat: 'Residential', loc: 'Greater Kailash, Delhi',   img: GK.study,      h: 300 },
  { id: 13, title: 'GK Unit — Lounge Area',            cat: 'Residential', loc: 'Greater Kailash, Delhi',   img: GK.lounge,     h: 320 },

  // ── Other projects ───────────────────────────────────────────────────────
  { id: 14, title: 'Executive Office Space',           cat: 'Commercial',  loc: 'Connaught Place, Delhi',   img: I.off1,        h: 380 },
  { id: 15, title: 'Modular Kitchen',                  cat: 'Kitchen',     loc: 'Gurgaon',                  img: I.kit1,        h: 300 },
]

/** Unique filter categories derived from the data */
export const PORTFOLIO_CATS = ['All', ...new Set(PORTFOLIO.map(p => p.cat))]
