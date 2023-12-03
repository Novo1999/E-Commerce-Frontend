import { Account, Edit } from '@/components'
import { UserCart } from '@/components/Cart'
import { useGetCart } from '@/hooks/useGetCart'
import { useState } from 'react'

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const { data: userCart } = useGetCart()
  const avatar = (userCart as UserCart)?.data?.currentUser?.avatar

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
