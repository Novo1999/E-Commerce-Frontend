import { CgProfile } from 'react-icons/cg'
import { AiOutlineShoppingCart } from 'react-icons/ai'

const Profile = () => {
  return (
    <button className='rounded-full p-1 absolute bg-transparent text-black right-0 sm:right-6 flex gap-4'>
      <AiOutlineShoppingCart className='text-3xl' />
      <CgProfile className='text-3xl' />
    </button>
  )
}
export default Profile
