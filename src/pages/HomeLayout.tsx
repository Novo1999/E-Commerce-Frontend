import CustomerReview from '@/components/CustomerReview/CustomerReview'
import {
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
    </main>
  )
}
export default HomeLayout
