import { Account, Edit } from '@/components'
import { getUserCart } from '@/hooks/useGetCart'
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
  const data = useLoaderData()
  const navigate = useNavigate()
  useEffect(() => {
    if (!data.data?.currentUser.email) {
      toast.error('Please Log In First')
      navigate('/')
    }
  }, [data, navigate])

  return (
    <div className='h-screen text-center mt-4 mx-10 flex flex-col items-center'>
      {isEditing ? (
        <Edit setIsEditing={setIsEditing} />
      ) : (
        <Account setIsEditing={setIsEditing} />
      )}
    </div>
  )
}
export default Profile
