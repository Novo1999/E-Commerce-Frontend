import { useGetCart } from '@/hooks/useGetCart'
import customFetch from '@/utils/customFetch'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { CreatePaymentMethodData } from '@stripe/stripe-js'
import { FormEvent, useContext, useState } from 'react'
import { Message } from 'react-hook-form'
import toast from 'react-hot-toast'
import { UserCart } from './Cart'
import { RxCrossCircled } from 'react-icons/rx'
import { CartItem } from '@/hooks/useHandleCart'
import { IoBagCheckOutline } from 'react-icons/io5'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { Spinner } from '.'
import { CartContext } from '@/App'
import { Link } from 'react-router-dom'

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
  const [isPaying, setIsPaying] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  const { data: userCart } = useGetCart()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { tempCartData } = useContext(CartContext)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const { error, paymentMethod } = await stripe!.createPaymentMethod({
      type: 'card',
      card: elements?.getElement(CardElement),
    } as CreatePaymentMethodData)

    if (!error) {
      try {
        const { id } = paymentMethod
        setIsPaying(true)
        const response = await customFetch.post('/checkout', {
          amount: 1000,
          id,
        })
        if (response.data.success) {
          setSuccess(true)
          setIsPaying(false)
          // deleting all items in cart after payment is successful
          await customFetch.post('/cart/clear')
          queryClient.invalidateQueries({ queryKey: ['user'] })
        }
      } catch (error) {
        console.log('Error', error)
      }
    } else {
      toast.error(error.message as Message)
    }
  }

  const handleDeleteItem = async (id: string) => {
    const quantity = 0
    const product = {
      productId: id,
      quantity,
    }
    const response = await customFetch.post('/cart', product)
    // if cart gets empty, there is no point for the user to stay at the checkout page
    if (response.data.products.length === 0) {
      navigate('/all-products')
      toast.success('Add something to the cart')
    }
    queryClient.invalidateQueries({ queryKey: ['user'] })
  }

  return (
    <div className='min-h-screen font-poppins'>
      {/* finalized cart item */}
      <h2 className='text-center text-2xl mb-4 flex items-center gap-4 justify-center'>
        {' '}
        <IoBagCheckOutline /> Checkout
      </h2>
      <hr className='mb-10 border-black' />
      {/* header */}
      <div className='px-4 lg:px-40 mb-10'>
        {!success && (
          <div className='grid grid-cols-4 ml-6 mb-4'>
            <p className='text-xs'>Image</p>
            <p className='text-xs'>Name</p>
            <p className='text-xs ml-6'>Price</p>
            <p className='text-xs'>Quantity</p>
          </div>
        )}
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
                  onClick={() => handleDeleteItem(productId!)}
                >
                  <RxCrossCircled />
                </button>
              </div>
            )
          }
        )}
      </div>
      {!success ? (
        isPaying ? (
          <Spinner />
        ) : (
          <form
            onSubmit={handleSubmit}
            className='lg:flex flex-col items-center'
          >
            <p className='mb-6 text-center'>
              Complete Your Payment (Test Number: 4242 4242 4242 4242, then any
              number)
            </p>
            <fieldset className='FormGroup lg:w-[44rem]'>
              <CardElement options={CARD_OPTIONS} />
            </fieldset>
            <div className='flex justify-center items-center'>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded'>
                Pay
              </button>
            </div>
          </form>
        )
      ) : (
        <div className='flex flex-col items-center gap-20'>
          <h2 className='text-md sm:text-2xl'>
            Thank You for shopping with us
          </h2>
          <img
            className='w-96 h-96 object-contain'
            src='/assets/checkout.jpg'
            alt='checkout guy image'
          />
          <Link
            className='text-black rounded-full bg-red-500 mt-4 hover:bg-red-400 transition-colors duration-300 p-4'
            to='/all-products'
          >
            Shop More
          </Link>
        </div>
      )}
    </div>
  )
}
export default Checkout
