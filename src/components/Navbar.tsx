import { useState } from 'react'
import { Logo, DropDown, Tab, Navlinks, Profile } from '.'

const Navbar = () => {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false)
  return (
    <nav className='p-2 sm:p-4 bg-white shadow-md relative w-full z-20 flex items-center justify-between xl:justify-around xl:gap-40'>
      <Logo />
      <DropDown
        isHamburgerMenuOpen={isHamburgerMenuOpen}
        setIsHamburgerMenuOpen={setIsHamburgerMenuOpen}
      />
      <div className='md:flex items-center gap-2 hidden'>
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
