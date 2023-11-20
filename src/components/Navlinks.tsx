import { NavLink } from 'react-router-dom'
import { buttonVariants } from '@/components/ui/button'

const setActiveTabStyle = () => {
  return ({ isActive }: { isActive: boolean }) =>
    isActive
      ? `${buttonVariants({
          variant: 'ghost',
        })} bg-slate-400 text-white`
      : buttonVariants({ variant: 'ghost' })
}

const Navlinks = () => {
  return (
    <div className='flex gap-0 lg:gap-4 relative sm:right-2 lg:right-10 xl:left-20'>
      <NavLink className={setActiveTabStyle()} to='/'>
        Home
      </NavLink>
      <NavLink
        className={setActiveTabStyle()}
        to={{ pathname: '/all-products', search: '?page=1' }}
      >
        All Products
      </NavLink>
      <NavLink className={setActiveTabStyle()} to='/about'>
        About
      </NavLink>
      <NavLink className={setActiveTabStyle()} to='/contact'>
        Contact
      </NavLink>
    </div>
  )
}
export default Navlinks
