import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'
import { useGetCart } from '@/hooks/useGetCart'
import { Dispatch, SetStateAction } from 'react'
import { UserCart } from './Cart'

const Account = ({
  setIsEditing,
  avatar,
}: {
  setIsEditing: Dispatch<SetStateAction<boolean>>
  avatar: string
}) => {
  const { data: userCart } = useGetCart()
  const name = (userCart as UserCart)?.data?.currentUser?.name
  const email = (userCart as UserCart)?.data?.currentUser?.email

  return (
    <>
      <h2 className='text-xl'>My Account</h2>
      <div className='card shadow-xl w-full flex flex-col items-center gap-4'>
        <div className='mt-6'>
          <Avatar className='h-48 w-48 mx-10 lg:h-fit lg:w-fit'>
            <AvatarImage
              className='w-48 h-72 lg:h-96 lg:w-fit object-contain'
              src={avatar}
            />
            <AvatarFallback className='text-xs'>Image</AvatarFallback>
          </Avatar>
        </div>
        <div className='card-body flex flex-col items-center gap-4'>
          <Label htmlFor='Name' className='text-sm'>
            Name
          </Label>
          <h2 className='card-title text-lg break-words'>{name}</h2>
          <Label htmlFor='Email' className='text-sm'>
            Email
          </Label>
          <p className='font-thin break-all'>{email}</p>
          <div className='card-actions justify-end'>
            <button
              onClick={() => setIsEditing(true)}
              className='btn btn-primary'
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default Account
