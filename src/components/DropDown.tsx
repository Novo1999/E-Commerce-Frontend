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
import { Cart, Login, Register } from '.'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { UserCart } from './Cart'
import { useGetCart } from '@/hooks/useGetCart'

interface DropDownProps {
  isHamburgerMenuOpen: boolean
  setIsHamburgerMenuOpen: (arg: boolean) => boolean | void
}

const DropDown = ({
  isHamburgerMenuOpen,
  setIsHamburgerMenuOpen,
}: DropDownProps) => {
  const [currentOpen, setCurrentOpen] = useState('')
  const { data } = useGetCart()
  const email = (data as UserCart)?.data?.currentUser?.email || ''
  return (
    <div className='text-2xl md:hidden p-1'>
      <DropdownMenu
        onOpenChange={() => {
          setIsHamburgerMenuOpen(!isHamburgerMenuOpen)
          setCurrentOpen('')
        }}
        open={isHamburgerMenuOpen}
      >
        <DropdownMenuTrigger className='md:hidden'>
          {isHamburgerMenuOpen ? <GrClose /> : <GiHamburgerMenu />}
        </DropdownMenuTrigger>

        <DropdownMenuContent className='w-screen h-screen border-0 flex flex-col items-center md:hidden relative top-2'>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setIsHamburgerMenuOpen(false)}
            className='text-2xl'
          >
            <Link to='/'>Home</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsHamburgerMenuOpen(false)}
            className='text-2xl'
          >
            <Link to='/all-products'>All Products</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className='text-2xl'>About</DropdownMenuItem>
          <DropdownMenuItem className='text-2xl'>Contact</DropdownMenuItem>
          <DropdownMenuLabel
            onClick={() => setCurrentOpen('register')}
            className='text-2xl'
          >
            Register
          </DropdownMenuLabel>
          {!email && (
            <DropdownMenuLabel
              onClick={() => setCurrentOpen('login')}
              className='text-2xl'
            >
              Login
            </DropdownMenuLabel>
          )}
          <DropdownMenuLabel
            onClick={() => setCurrentOpen('')}
            className='text-2xl flex items-center gap-1'
          >
            <Cart />
          </DropdownMenuLabel>
          {currentOpen === 'register' && <Register on='mobile' />}
          {currentOpen === 'login' && <Login on='mobile' />}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
export default DropDown
