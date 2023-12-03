import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { Checkout } from '../components'

const PUBLIC_KEY =
  'pk_test_51OICPrK0DJ2x8ORvgPHHFmGO9lE4HY1R6Byk7j950t2mzhbChm2InlGyLBPER2Opi7WWkvWDzd66jaypUwtBJo0r00UEB1CVTE'
const stripePromise = loadStripe(PUBLIC_KEY)

const StripeContainer = () => {
  return (
    <div className='mt-4'>
      <Elements stripe={stripePromise}>
        <Checkout />
      </Elements>
    </div>
  )
}
export default StripeContainer
