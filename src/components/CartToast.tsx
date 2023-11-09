import { getSingleProduct } from '@/hooks/useGetSingleProduct'
import toast from 'react-hot-toast'

export const showCartToast = async (id: string) => {
  const addedProduct = await getSingleProduct(id)

  return toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className='flex-1 w-0 p-4'>
          <div className='flex items-start'>
            <div className='flex-shrink-0 pt-0.5'>
              <img
                className='h-10 w-10 rounded-full object-contain'
                src={addedProduct?.data.product.link}
                alt=''
              />
            </div>
            <div className='ml-3 flex-1'>
              <p className='text-sm font-medium text-gray-900'>
                {addedProduct?.data.product.name} added to Cart Successfully
              </p>
              <p className='mt-1 text-sm text-gray-500'>
                Price: {addedProduct?.data.product.price}
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
    { duration: 2000 }
  )
}
