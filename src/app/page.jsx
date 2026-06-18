import Hero              from '@/components/home/Hero'
import StatsStrip        from '@/components/home/StatsStrip'
import ServicesOverview  from '@/components/home/ServicesOverview'
import FeaturedProjects  from '@/components/home/FeaturedProjects'
import WhyChooseUs       from '@/components/home/WhyChooseUs'
import Testimonials      from '@/components/home/Testimonials'
import InstagramPreview  from '@/components/home/InstagramPreview'
import CTABanner         from '@/components/home/CTABanner'
import Philosophy        from '@/components/home/Philosophy'

export const metadata = {
  title: 'Blubloom Interior & Contractor LLP | Where Spaces Bloom',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <Philosophy />
      <ServicesOverview />
      <FeaturedProjects />
      <WhyChooseUs />
      <Testimonials />
      <InstagramPreview />
      <CTABanner />
    </>
  )
}
