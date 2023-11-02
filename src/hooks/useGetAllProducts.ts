import customFetch from '@/utils/customFetch'
import toast from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'

export const getAllProducts = async (
  sortBy: string,
  skip: number,
  limit: number
) => {
  try {
    const products = await customFetch.get(
      `products/all-product?sort=${sortBy}&limit=${limit}&skip=${skip}`
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
  skip: number,
  limit: number
) => {
  const { data, isLoading } = useQuery({
    queryKey: ['all-products', sortBy, skip, limit],
    queryFn: async () => getAllProducts(sortBy, skip, limit),
  })
  return { data, isLoading }
}
