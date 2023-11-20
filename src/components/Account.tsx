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
  const name = (userCart as UserCart)?.data?.currentUser?.name || ''
  const email = (userCart as UserCart)?.data?.currentUser?.email || ''

  return (
    <>
      <h2 className='text-xl'>My Account</h2>
      <div className='card shadow-xl w-full lg:w-[60rem] lg:h-[42rem] flex flex-col items-center gap-4'>
        <div className='mt-6'>
          <Avatar className='w-fit h-fit mx-6'>
            <AvatarImage className='w-48 h-48 object-cover' src={avatar} />
            <AvatarFallback className='text-xs'>
              {!name ? (
                <img
                  className='w-48 h-48'
                  src='/assets/avatar-placeholder.gif'
                />
              ) : (
                <img
                  src={`https://eu.ui-avatars.com/api/?name=${name}&size=250`}
                ></img>
              )}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className='card-body flex flex-col items-center gap-4'>
          <Label htmlFor='Name' className='text-sm lg:text-xl'>
            Name
          </Label>
          <h2 className='card-title text-lg lg:text-2xl break-words'>{name}</h2>
          <Label htmlFor='Email' className='text-sm lg:text-xl'>
            Email
          </Label>
          <p className='font-thin break-all lg:text-3xl'>{email}</p>
          {email && (
            <div className='card-actions'>
              <button
                onClick={() => setIsEditing(true)}
                className='btn btn-primary'
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
export default Account
