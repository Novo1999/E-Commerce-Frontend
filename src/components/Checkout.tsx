import { useGetCart } from '@/hooks/useGetCart'
import customFetch from '@/utils/customFetch'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { CreatePaymentMethodData } from '@stripe/stripe-js'
import { FormEvent, useState } from 'react'
import { Message } from 'react-hook-form'
import toast from 'react-hot-toast'
import { UserCart } from './Cart'
import { RxCrossCircled } from 'react-icons/rx'
import { CartItem } from '@/hooks/useHandleCart'
import { IoBagCheckOutline } from 'react-icons/io5'

const CARD_OPTIONS = {
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#fff',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '20px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': { color: '#fce883' },
      '::placeholder': { color: '#87bbfd' },
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee',
    },
  },
}

const Checkout = () => {
  const [success, setSuccess] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  const { data: userCart } = useGetCart()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const { error, paymentMethod } = await stripe!.createPaymentMethod({
      type: 'card',
      card: elements?.getElement(CardElement),
    } as CreatePaymentMethodData)

    if (!error) {
      try {
        const { id } = paymentMethod
        const response = await customFetch.post('/checkout', {
          amount: 1000,
          id,
        })
        if (response.data.success) {
          console.log('Successful Payment')
          setSuccess(true)
        }
      } catch (error) {
        console.log('Error', error)
      }
    } else {
      toast.error(error.message as Message)
    }
  }

  return (
    <div className='min-h-screen font-poppins'>
      {/* finalized cart item */}
      <h2 className='text-center text-2xl mb-4 flex items-center gap-4 justify-center'>
        {' '}
        <IoBagCheckOutline /> Checkout
      </h2>
      <hr className='mb-10 border-black' />
      <div className='px-4 lg:px-40 mb-10'>
        <div className='grid grid-cols-4 ml-6 mb-4'>
          <p className='text-xs'>Image</p>
          <p className='text-xs'>Name</p>
          <p className='text-xs ml-6'>Price</p>
          <p className='text-xs'>Quantity</p>
        </div>
        {(userCart as UserCart)?.data?.cart[0]?.products.map(
          (product: CartItem) => {
            const { link, name, price, quantity, productId } = product
            return (
              <div
                className='grid grid-cols-7 gap-4 p-4 items-center border-2 border-black border-opacity-50 mb-4 rounded-xl'
                key={productId}
              >
                <img
                  className='w-12 h-12 object-contain'
                  src={link}
                  alt='product'
                />
                <p className='text-sm col-span-3 sm:ml-20 xl:ml-24 2xl:ml-40'>
                  {name}
                </p>
                <p className='text-sm relative sm:right-6 xl:right-14 2xl:right-24'>
                  ${price}
                </p>
                <p className='text-sm ml-5 sm:ml-10 xl:ml-16 2xl:ml-20'>
                  {quantity}
                </p>
                <button
                  className='text-xl text-red-600 tooltip w-fit'
                  data-tip='Delete Item'
                >
                  <RxCrossCircled />
                </button>
              </div>
            )
          }
        )}
      </div>
      {!success ? (
        <form onSubmit={handleSubmit} className='lg:flex flex-col items-center'>
          <p className='mb-6 text-center'>Complete Your Payment</p>
          <fieldset className='FormGroup lg:w-[44rem]'>
            <CardElement options={CARD_OPTIONS} />
          </fieldset>
          <div className='flex justify-center items-center'>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded'>
              Pay
            </button>
          </div>
        </form>
      ) : (
        <div>
          <h2>You just bought a sweet stuff</h2>
        </div>
      )}
    </div>
  )
}
export default Checkout
