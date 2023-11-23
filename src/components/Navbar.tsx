import { useEffect, useState } from 'react'
import { Logo, DropDown, Tab, Navlinks, Profile, ProfileDropdown } from '.'
import { ModeToggle } from './ModeToggle'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { UserCart } from './Cart'
import { useGetCart } from '@/hooks/useGetCart'

const Navbar = () => {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false)
  const [isNavbarSticky, setIsNavbarSticky] = useState(false)
  const [opacityZero, setOpacityZero] = useState(false)
  const { data } = useGetCart()
  const email = (data as UserCart)?.data?.currentUser?.email || ''
  const name = (data as UserCart)?.data?.currentUser?.name || ''
  const avatar = (data as UserCart)?.data?.currentUser?.avatar

  useEffect(() => {
    const handleScroll = () => {
      const scrollAmount = window.scrollY
      if (scrollAmount > 100) {
        setOpacityZero(true)
      } else {
        setOpacityZero(false)
      }
      if (scrollAmount >= 800) {
        setIsNavbarSticky(true)
      }
      if (scrollAmount < 100) setIsNavbarSticky(false)
    }
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`p-2 sm:p-4 bg-white shadow-md w-full z-20 flex ${
        opacityZero ? 'opacity-0' : 'opacity-100'
      } items-center transition-opacity duration-500 justify-between xl:justify-around ${
        isNavbarSticky ? 'fixed opacity-100' : 'relative opacity-0'
      } xl:gap-40`}
    >
      <Logo />
      <div className='flex justify-center items-center gap-2'>
        <span className='visible lg:hidden flex'>
          <ProfileDropdown>
            <Avatar className='w-8 h-8 mx-6'>
              <AvatarImage className='w-8 h-8 object-cover' src={avatar} />
              <AvatarFallback className='text-xs'>
                {!email ? (
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
          <ModeToggle />
        </span>
        <DropDown
          isHamburgerMenuOpen={isHamburgerMenuOpen}
          setIsHamburgerMenuOpen={setIsHamburgerMenuOpen}
        />
      </div>
      <div className='lg:flex items-center gap-2 hidden mr-4'>
        <Navlinks />
        <Tab />
        <div className='flex justify-center items-center'>
          <Profile />
        </div>
      </div>
    </nav>
  )
}
export default Navbar
