import './globals.css'
import Navbar           from '@/components/layout/Navbar'
import Footer           from '@/components/layout/Footer'
import WhatsAppButton   from '@/components/layout/WhatsAppButton'
import MobileCTA        from '@/components/layout/MobileCTA'

export const metadata = {
  title:       'Blubloom Interior & Contractor LLP | Where Spaces Bloom',
  description: 'Premium interior design & contracting across Delhi NCR. Modular kitchens, wardrobes, false ceilings, complete home & commercial interiors.',
  keywords:    'interior design delhi, modular kitchen, wardrobe design, false ceiling, home interiors delhi ncr',
  openGraph: {
    title:       'Blubloom Interior & Contractor LLP',
    description: 'Where Spaces Bloom — premium interior design & contracting.',
    type:        'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <MobileCTA />
      </body>
    </html>
  )
}
