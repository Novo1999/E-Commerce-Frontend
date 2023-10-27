import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { GiHamburgerMenu } from 'react-icons/gi'
import { GrClose } from 'react-icons/gr'
import { Login, Register } from './Tab'
import { useState } from 'react'

interface DropDownProps {
  isHamburgerMenuOpen: boolean
  setIsHamburgerMenuOpen: (arg: boolean) => boolean | void
}

const DropDown = ({
  isHamburgerMenuOpen,
  setIsHamburgerMenuOpen,
}: DropDownProps) => {
  const [currentOpen, setCurrentOpen] = useState('')
  return (
    <div className='text-2xl md:hidden p-1'>
      <DropdownMenu
        onOpenChange={() => {
          setIsHamburgerMenuOpen(!isHamburgerMenuOpen)
          setCurrentOpen('')
        }}
      >
        <DropdownMenuTrigger className='md:hidden'>
          {isHamburgerMenuOpen ? <GrClose /> : <GiHamburgerMenu />}
        </DropdownMenuTrigger>
        {isHamburgerMenuOpen && (
          <DropdownMenuContent className='w-screen h-screen border-0 flex flex-col items-center md:hidden relative top-2'>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='text-2xl'>
              All Products
            </DropdownMenuItem>
            <DropdownMenuItem className='text-2xl'>About</DropdownMenuItem>
            <DropdownMenuItem className='text-2xl'>Contact</DropdownMenuItem>
            <DropdownMenuLabel
              onClick={() => setCurrentOpen('register')}
              className='text-2xl'
            >
              Register
            </DropdownMenuLabel>
            <DropdownMenuLabel
              onClick={() => setCurrentOpen('login')}
              className='text-2xl'
            >
              Login
            </DropdownMenuLabel>
            {currentOpen === 'register' && <Register on='mobile' />}
            {currentOpen === 'login' && <Login on='mobile' />}
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  )
}
export default DropDown
