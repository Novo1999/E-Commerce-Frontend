import customFetch from '@/utils/customFetch'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const getProductByCategory = async (query: string) => {
  try {
    const products = await customFetch.get(`products/product?category=${query}`)
    return products
  } catch (error) {
    toast.error('Something went wrong')
  }
}

export const useGetProductByCategory = (category: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['product-by-category', category],
    queryFn: async () => await getProductByCategory(category),
  })
  return { data, isLoading }
}
