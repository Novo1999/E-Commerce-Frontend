import customFetch from '@/utils/customFetch'
import toast from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'

export const getAllProducts = async (
  sortBy: string,
  page: number,
  limit: number
) => {
  const handleSkip = () => {
    let skip
    if (page > 1) skip = (page - 1) * limit
    return skip
  }

  try {
    const products = await customFetch.get(
      `products/all-product?sort=${sortBy}&limit=${limit}&skip=${handleSkip()}`
    )
    return products
  } catch (error) {
    console.log(error)
    toast.error('Something went wrong')
    return null
  }
}

export const useGetAllProducts = (
  sortBy: string,
  page: number,
  limit: number
) => {
  const { data, isLoading } = useQuery({
    queryKey: ['all-products', sortBy, page, limit],
    queryFn: async () => getAllProducts(sortBy, page, limit),
  })
  return { data, isLoading }
}
