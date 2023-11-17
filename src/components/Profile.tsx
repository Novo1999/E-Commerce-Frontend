import { CgProfile } from 'react-icons/cg'
import { ModeToggle } from './ModeToggle'
import { Cart, ProfileDropdown } from '.'

const Profile = () => {
  return (
    <div className='absolute flex items-center gap-4 text-black right-0 sm:right-3 sm:gap-2 lg:gap-4 lg:right-6 xl:relative'>
      <div className='flex justify-between gap-4 sm:gap-2 lg:gap-4'>
        <ProfileDropdown>
          <CgProfile className='text-3xl' />
        </ProfileDropdown>

        <Cart />
      </div>
      <ModeToggle />
    </div>
  )
}
export default Profile
