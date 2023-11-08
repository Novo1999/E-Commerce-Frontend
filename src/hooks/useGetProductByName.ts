import customFetch from '@/utils/customFetch'
import toast from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'

const getProductByName = async (name: string) => {
  try {
    const product = await customFetch.get(`products/${name}`)
    return product
  } catch (error) {
    toast.error(error?.response?.data?.msg)
  }
}

export const useGetProductByName = (name: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['product-by-name', name],
    queryFn: async () => {
      if (name) return await getProductByName(name)
      return { data: [] }
    },
  })

  return { data, isLoading }
}
