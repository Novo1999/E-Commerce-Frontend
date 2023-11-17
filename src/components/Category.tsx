import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import customFetch from '@/utils/customFetch'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Spinner } from '.'
import { constructQueryString } from '@/utils/handleQueryString'
import { ProductInterface } from '@/pages/AllProducts'

const Category = () => {
  // getting the categories for the select
  const { data: allCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => await customFetch.get('products/categories'),
  })
  const [category, setCategory] = useState('Cardio')

  // getting the products by category
  const { data: productsByCategory, isLoading } = useQuery({
    queryKey: ['product-by-category', category],
    queryFn: async () =>
      await customFetch.get(`products/product?category=${category}`),
  })

  const handleCategory = (value: string) => {
    const query = constructQueryString(value)
    setCategory(query![0])
  }

  return (
    <section className='flex flex-col h-fit sm:h-[50rem] lg:w-[56rem] xl:w-[90rem] 2xl:w-[96rem] category-section'>
      <div className='flex justify-between mx-4 xl:mx-20 text-sm items-center mt-6'>
        <h2 className='font-semibold sm:text-xl'>Shop by category</h2>
        <Select onValueChange={(value) => handleCategory(value)}>
          <SelectTrigger className='sm:w-[180px] w-fit'>
            <SelectValue placeholder='Category' />
          </SelectTrigger>
          <SelectContent>
            {allCategories?.data?.map((category: string) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 m-4 mt-10 xl:mx-20 gap-4'>
          {productsByCategory?.data
            .slice(0, 4)
            .map((product: ProductInterface) => {
              const { _id: id, brand, name, price, link } = product
              return (
                <Link
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                  to={`/products/product/${id}`}
                  className='shadow-md rounded-lg p-4 flex flex-col items-center gap-2 border-2 border-slate-400 relative group w-72 min-[425px]:w-80 lg:w-full'
                  key={id}
                >
                  <div className='absolute bottom-0 opacity-0 transition-opacity group-hover:opacity-100 bg-slate-400 py-2 text-white w-full text-center'>
                    View
                  </div>
                  <img
                    className='h-36 min-[375px]:h-48 m-auto'
                    src={link}
                    alt='product image'
                  />
                  <p className='font-semibold'>{name}</p>
                  <p className='text-xs'>{brand}</p>
                  <p className='font-bold'>${price}</p>
                </Link>
              )
            })}
        </div>
      )}
      {productsByCategory?.data.length > 4 && (
        <Link
          className='ml-4 xl:ml-20 w-fit'
          to={`products/product?category=${category}`}
        >
          <Button variant='outline'>See More</Button>
        </Link>
      )}
    </section>
  )
}
export default Category
