import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useGetCart } from '@/hooks/useGetCart'
import customFetch from '@/utils/customFetch'
import { QueryClient, useQueryClient } from '@tanstack/react-query'
import { ReactElement } from 'react'
import toast from 'react-hot-toast'
import { Link, NavigateFunction, useNavigate } from 'react-router-dom'
import { UserCart } from './Cart'

const logOut = async (queryClient: QueryClient, navigate: NavigateFunction) => {
  try {
    await customFetch.post('/auth/logout')
    sessionStorage.clear()
    toast.success('Logged Out Successfully')
    queryClient.invalidateQueries({ queryKey: ['user'] })
    navigate('/')
  } catch (error) {
    toast.error('Something went wrong')
  }
}

const ProfileDropdown = ({ children }: { children: ReactElement }) => {
  const queryClient = useQueryClient()
  const { data } = useGetCart()
  const email = (data as UserCart)?.data?.currentUser?.email || ''
  const navigate = useNavigate()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Profile</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to='/profile'>Settings</Link>
        </DropdownMenuItem>
        {email && (
          <DropdownMenuItem
            onClick={() => {
              logOut(queryClient, navigate)
            }}
          >
            Log Out
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default ProfileDropdown
