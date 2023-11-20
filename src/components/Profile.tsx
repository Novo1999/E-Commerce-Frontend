import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ModeToggle } from './ModeToggle'
import { Cart, ProfileDropdown } from '.'
import { useGetCart } from '@/hooks/useGetCart'
import { UserCart } from './Cart'

const Profile = () => {
  const { data: userCart } = useGetCart()
  const avatar = (userCart as UserCart)?.data?.currentUser?.avatar
  const name = (userCart as UserCart)?.data?.currentUser?.name || ''

  return (
    <div className='absolute flex items-center gap-4 text-black right-0 sm:right-3 sm:gap-2 lg:gap-4 lg:right-6 xl:relative'>
      <div className='flex justify-between gap-4 sm:gap-0 lg:gap-0 items-center'>
        <ProfileDropdown>
          <Avatar className='w-8 h-8 mx-6'>
            <AvatarImage className='w-8 h-8 object-cover' src={avatar} />
            <AvatarFallback className='text-xs'>
              {!name ? (
                <img
                  src='/assets/avatar-placeholder.gif'
                  alt='Avatar Placeholder'
                />
              ) : (
                <img
                  className='w-24 h-24 object-cover'
                  src={`https://eu.ui-avatars.com/api/?name=${name}&size=250`}
                  alt='Generated Avatar'
                />
              )}
            </AvatarFallback>
          </Avatar>
        </ProfileDropdown>
        <Cart />
      </div>
      <ModeToggle />
    </div>
  )
}
export default Profile
