import { NavLink } from 'react-router-dom'
import { buttonVariants } from '@/components/ui/button'

const Navlinks = () => {
  return (
    <div className='flex gap-0 lg:gap-4 relative sm:right-2 lg:right-10'>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? `${buttonVariants({
                variant: 'ghost',
              })} bg-slate-400 text-white`
            : buttonVariants({ variant: 'ghost' })
        }
        to='/'
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? `${buttonVariants({
                variant: 'ghost',
              })} bg-slate-400 text-white`
            : buttonVariants({ variant: 'ghost' })
        }
        to={{ pathname: '/all-products', search: '?page=1' }}
      >
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
