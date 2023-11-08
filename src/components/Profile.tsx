import { CgProfile } from 'react-icons/cg'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { ModeToggle } from './mode-toggle'

const Profile = () => {
  return (
    <div className='absolute flex items-center gap-4 text-black right-0 sm:right-3 sm:gap-2 lg:gap-4 lg:right-6 xl:relative'>
      <button className='flex justify-between gap-4 sm:gap-2 lg:gap-4'>
        <AiOutlineShoppingCart className='text-3xl' />
        <CgProfile className='text-3xl' />
      </button>
      <ModeToggle />
    </div>
  )
}
export default Profile
