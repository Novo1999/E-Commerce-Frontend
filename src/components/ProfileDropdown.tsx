import { CartContext } from '@/App'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import customFetch from '@/utils/customFetch'
import { QueryClient, useQueryClient } from '@tanstack/react-query'
import { ReactElement, useContext } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const logOut = async (queryClient: QueryClient) => {
  try {
    await customFetch.get('auth/logout')
    sessionStorage.clear()
    toast.success('Logged Out Successfully')
    return queryClient.invalidateQueries({ queryKey: ['user'] })
  } catch (error) {
    toast.error('Something went wrong')
  }
}

const ProfileDropdown = ({ children }: { children: ReactElement }) => {
  const { setIsAuthenticated } = useContext(CartContext)
  const queryClient = useQueryClient()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Profile</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to='/profile'>Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            logOut(queryClient)
            setIsAuthenticated(false)
          }}
        >
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default ProfileDropdown
