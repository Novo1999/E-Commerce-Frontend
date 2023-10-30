import customFetch from '@/utils/customFetch'
import toast from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'

export const getAllProducts = async () => {
  try {
    return await customFetch.get('products/all-product?sort=price[a-z]')
  } catch (error) {
    toast.error('Something went wrong')
    return null
  }
}

export const useGetAllProducts = () => {
  const { data } = useQuery({
    queryKey: ['all-products'],
    queryFn: getAllProducts,
  })
  return data
}
