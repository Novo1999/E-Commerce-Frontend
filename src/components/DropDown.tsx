import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { GiHamburgerMenu } from 'react-icons/gi'
import { GrClose } from 'react-icons/gr'
import { Cart, DropDownItem, Login, Register } from '.'
import { useState } from 'react'
import { UserCart } from './Cart'
import { useGetCart } from '@/hooks/useGetCart'

interface DropDownProps {
  isHamburgerMenuOpen: boolean
  setIsHamburgerMenuOpen: (arg: boolean) => boolean | void
}

const dropDownItems = [
  {
    link: '/',
    pageName: 'Home',
  },
  {
    link: '/all-products',
    pageName: 'All Products',
  },
  {
    link: '/about',
    pageName: 'About',
  },
  {
    link: '/contact',
    pageName: 'Contact',
  },
]

const DropDown = ({
  isHamburgerMenuOpen,
  setIsHamburgerMenuOpen,
}: DropDownProps) => {
  const [currentOpen, setCurrentOpen] = useState('')
  const { data } = useGetCart()
  const email = (data as UserCart)?.data?.currentUser?.email || ''
  return (
    <div className='text-2xl lg:hidden p-1'>
      <DropdownMenu
        onOpenChange={() => {
          setIsHamburgerMenuOpen(!isHamburgerMenuOpen)
          setCurrentOpen('')
        }}
        open={isHamburgerMenuOpen}
      >
        <DropdownMenuTrigger className='lg:hidden mt-2'>
          {isHamburgerMenuOpen ? <GrClose /> : <GiHamburgerMenu />}
        </DropdownMenuTrigger>

        <DropdownMenuContent className='w-screen h-screen border-0 flex flex-col items-center lg:hidden relative top-2'>
          <DropdownMenuSeparator />
          {dropDownItems.map((item, index) => {
            const { link, pageName } = item
            return (
              <DropDownItem
                key={index}
                link={link}
                pageName={pageName}
                setIsHamburgerMenuOpen={setIsHamburgerMenuOpen}
              />
            )
          })}

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
