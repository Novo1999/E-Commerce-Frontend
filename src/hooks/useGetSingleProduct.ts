import customFetch from '@/utils/customFetch'
import toast from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'

export const getSingleProduct = async (id: string) => {
  try {
    const product = await customFetch.get(`products/product/${id}`)
    return product
  } catch (error) {
    toast.error(error?.response?.data?.msg)
  }
}

export const useGetSingleProduct = () => {
  const { id } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['single-product', id],
    queryFn: async () => await getSingleProduct(id!),
  })

  return { data, isLoading }
}
