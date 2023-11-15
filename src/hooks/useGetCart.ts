import customFetch from '@/utils/customFetch'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export const getUserCart = async () => {
  try {
    const userCart = await customFetch.get('/current-user')
    console.log(userCart)
    return userCart
  } catch (error) {
    toast.error('Something went wrong getting cart')
    return error
  }
}

export const useGetCart = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['user-cart'],
    queryFn: () => getUserCart(),
  })
  return { data, isLoading }
}
