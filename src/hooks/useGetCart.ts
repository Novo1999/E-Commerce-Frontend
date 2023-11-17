import customFetch from '@/utils/customFetch'
import { useQuery } from '@tanstack/react-query'

export const getUserCart = async () => {
  try {
    const userCart = await customFetch.get('/current-user')
    return userCart
  } catch (error) {
    return error
  }
}

export const useGetCart = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserCart(),
    refetchOnMount: false,
  })
  return { data, isLoading }
}
