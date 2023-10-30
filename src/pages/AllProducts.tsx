import { useGetAllProducts } from '@/hooks/useGetAllProducts'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Product {
  _id: string
  name: string
  brand: string
  price: string
  category: string
  description: string
  link: string
}

const AllProducts = () => {
  const data = useGetAllProducts()
  const allProducts = data?.data

  return (
    <>
      <div className='flex justify-end mt-4 px-12'>
        <Select>
          <SelectTrigger className='sm:w-[180px] w-fit'>
            <SelectValue placeholder='Sort By' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='[a-z]'>Name (A - Z)</SelectItem>
            <SelectItem value='[z-a]'>Name (Z - A)</SelectItem>
            <SelectItem value='price[a-z]'>Price (Low-High)</SelectItem>
            <SelectItem value='price[z-a]'>Price (High-Low)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='min-h-screen p-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {allProducts?.map((product: Product) => {
          const { _id: id, name, brand, price, category, link } = product
          return (
            <div
              className='card shadow-xl border-2 sm:p-4 sm:gap-2 border-black'
              key={id}
            >
              <div
                className='p-4 h-full cursor-pointer tooltip tooltip-info flex justify-center items-center'
                data-tip='View details'
              >
                <img src={link} alt='Shoes' />
              </div>
              <div className='card-body'>
                <h2 className='card-title text-lg sm:text-lg'>{name}</h2>
                <p className='text-sm sm:text-lg'>By {brand}</p>
                <p className='font-bold'>Price: ${price}</p>
                <div className='card-actions justify-end'>
                  <div className='badge badge-outline'>{category}</div>
                </div>
                <div className='flex justify-between items-center gap-2'>
                  <button className='btn btn-warning'>
                    <AiOutlineMinus />
                  </button>
                  <kbd className='kbd text-white h-full w-full'>0</kbd>
                  <button className='btn btn-warning'>
                    <AiOutlinePlus />
                  </button>
                </div>
                <button className='btn btn-active btn-accent mt-4'>
                  Add To Cart
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
export default AllProducts
