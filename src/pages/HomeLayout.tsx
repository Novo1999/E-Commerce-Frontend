import CustomerReview from '@/components/CustomerReview/CustomerReview'
import {
  About,
  AllYouNeed,
  Category,
  Contact,
  Hero,
  PristineBanner,
} from '../components'
const HomeLayout = () => {
  return (
    <main className='flex flex-col items-center'>
      <Hero />
      <Category />
      <PristineBanner />
      <AllYouNeed />
      <CustomerReview />
      <Contact />
      <About />
    </main>
  )
}
export default HomeLayout
