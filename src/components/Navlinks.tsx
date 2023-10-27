import { NavLink } from 'react-router-dom'
import { buttonVariants } from '@/components/ui/button'

const Navlinks = () => {
  return (
    <div className='flex gap-4'>
      <NavLink className={buttonVariants({ variant: 'ghost' })} to='/'>
        All Products
      </NavLink>
      <NavLink className={buttonVariants({ variant: 'ghost' })} to='/'>
        About
      </NavLink>
      <NavLink className={buttonVariants({ variant: 'ghost' })} to='/'>
        Contact
      </NavLink>
    </div>
  )
}
export default Navlinks
