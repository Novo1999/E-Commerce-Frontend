import customFetch from '@/utils/customFetch'
import toast from 'react-hot-toast'
import { useLoaderData } from 'react-router'

export const loader = async () => {
  try {
    return await customFetch.get('products/all-product?sort=price[z-a]')
  } catch (error) {
    toast.error('Something went wrong')
    return null
  }
}

const AllProducts = () => {
  const allProducts = useLoaderData()

  return <div className='min-h-screen p-10'>all</div>
}
export default AllProducts
