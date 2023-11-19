import { useSearchParams } from 'react-router-dom'

import { useGetProductByCategory } from '@/hooks/useGetProductByCategory'
import { ProductInterface } from './AllProducts'
import { Product, Spinner } from '@/components'

const ProductByCategory = () => {
  const [searchParams] = useSearchParams()
  const urlCategory = searchParams.get('category')

  const { data, isLoading } = useGetProductByCategory(urlCategory!)

  return (
    <div className='grid grid-cols-1 place-items-center p-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:px-60 gap-y-6 min-h-screen'>
      {data?.data?.map((product: ProductInterface) => {
        return isLoading ? (
          <Spinner />
        ) : (
          <Product key={product._id} product={product} />
        )
      })}
    </div>
  )
}
export default ProductByCategory
