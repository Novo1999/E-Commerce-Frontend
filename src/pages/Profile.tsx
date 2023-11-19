import { Account, Edit } from '@/components'
import { UserCart } from '@/components/Cart'
import { getUserCart, useGetCart } from '@/hooks/useGetCart'
import { useEffect, useState } from 'react'
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

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const { data: userCart } = useGetCart()
  const avatar = (userCart as UserCart)?.data?.currentUser?.avatar

  const data = useLoaderData()
  const navigate = useNavigate()
  useEffect(() => {
    if (!(data as UserCart).data?.currentUser?.email) {
      toast.error('Please Log In First')
      navigate('/')
    }
  }, [data, navigate])

  return (
    <div className='min-h-screen text-center mt-4 mx-10 flex flex-col items-center'>
      {isEditing ? (
        <Edit avatar={avatar} setIsEditing={setIsEditing} />
      ) : (
        <Account avatar={avatar} setIsEditing={setIsEditing} />
      )}
    </div>
  )
}
export default Profile
