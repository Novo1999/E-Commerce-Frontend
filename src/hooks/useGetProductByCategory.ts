import customFetch from '@/utils/customFetch'
import { useQuery } from '@tanstack/react-query'

export const getProductBySort = async () => {
  try {
    const products = await customFetch.get(`products/product?`)
  } catch (error) {}
}
