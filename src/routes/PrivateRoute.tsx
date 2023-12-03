import { CartContext } from '@/App'
import { UserCart } from '@/components/Cart'
import { getUserCart } from '@/hooks/useGetCart'
import { ReactNode, useContext, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useLoaderData, useNavigate } from 'react-router'

export const loader = async () => {
  try {
    const data = await getUserCart()
    return data
  } catch (error) {
    return null
  }
}

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const data = useLoaderData()
  const navigate = useNavigate()
  const { tempCartData } = useContext(CartContext)

  useEffect(() => {
    if (!(data as UserCart).data?.currentUser?.email) {
      toast.error('Please Log In First')
      navigate('/')
    }
  }, [data, navigate, tempCartData])
  return (
    <>
      {(data as UserCart).data?.currentUser?.email ? (
        children
      ) : (
        <p className='text-2xl text-center h-screen mt-40'>
          Log in first ❗❗❗
        </p>
      )}
    </>
  )
}
export default PrivateRoute
