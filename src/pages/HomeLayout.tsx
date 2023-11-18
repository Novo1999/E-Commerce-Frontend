import CustomerReview from '@/components/CustomerReview/CustomerReview'
import {
  About,
  AllYouNeed,
  Category,
  Contact,
  Hero,
  PristineBanner,
} from '../components'
import { useContext, useEffect } from 'react'
import { UserCart } from '@/components/Cart'
import { useGetCart } from '@/hooks/useGetCart'
import { CartContext } from '@/App'
const HomeLayout = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(CartContext)
  const { data } = useGetCart()

  // setting if user is authenticated
  useEffect(() => {
    if ((data as UserCart)?.data?.currentUser?.email) {
      setIsAuthenticated(true)
    } else setIsAuthenticated(false)
  }, [isAuthenticated, data, setIsAuthenticated])

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
