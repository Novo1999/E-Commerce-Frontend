import { Link, useSearchParams } from 'react-router-dom'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useGetProductByCategory } from '@/hooks/useGetProductByCategory'
import { ProductInterface } from '@/pages/AllProducts'

const Product = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const urlCategory = searchParams.get('category')

  const { data, isLoading } = useGetProductByCategory(urlCategory!)

  return (
    <div className='grid grid-cols-1 place-items-center p-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:px-72 gap-y-6'>
      {data?.data?.map((product: ProductInterface) => {
        const { _id: id, name, brand, price, category, link } = product
        return (
          <div
            className='card shadow-xl w-full min-[375px]:w-64 min-[425px]:w-72 border-2 pt-4 sm:p-4 sm:gap-2 border-black'
            key={id}
          >
            <Link
              to={`/products/product/${id}`}
              className='p-4 h-full cursor-pointer tooltip tooltip-info flex justify-center items-center'
              data-tip='View details'
            >
              <img className='h-24 sm:h-32' src={link} alt='Shoes' />
            </Link>
            <div className='card-body'>
              <h2 className='card-title text-sm sm:text-lg'>{name}</h2>
              <p className='text-sm'>By {brand}</p>
              <p className='font-bold text-sm'>Price: ${price}</p>
              <div className='card-actions justify-end'>
                <div className='badge text-xs lg:text-md badge-outline'>
                  {category}
                </div>
              </div>
              <div className='flex justify-between items-center gap-2'>
                <button className='btn-sm rounded-lg btn-warning'>
                  <AiOutlineMinus />
                </button>
                <kbd className='kbd text-white h-full w-full'>0</kbd>
                <button className='btn-sm rounded-lg btn-warning'>
                  <AiOutlinePlus />
                </button>
              </div>
              <button className='btn-sm rounded-lg btn-active btn-accent mt-4'>
                Add To Cart
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default Product
