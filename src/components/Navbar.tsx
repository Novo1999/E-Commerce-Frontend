import { useEffect, useState } from 'react'
import { Logo, DropDown, Tab, Navlinks, Profile } from '.'
import { ModeToggle } from './ModeToggle'

const Navbar = () => {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false)
  const [isNavbarSticky, setIsNavbarSticky] = useState(false)
  const [opacityZero, setOpacityZero] = useState(false)

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
        <span className='visible lg:hidden'>
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
