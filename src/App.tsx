import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router'
import { Navbar } from './components'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from './components/ThemeProvider'
import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { CartItem } from './hooks/useHandleCart'

const queryClient = new QueryClient()

export type CartStatus = Array<{ id: string; quantity: number }>

interface CartContextProps {
  cartStatus: CartStatus
  setCartStatus: Dispatch<SetStateAction<CartStatus>>
  tempCartData: Array<CartItem>
  setTempCartData: Dispatch<SetStateAction<Array<CartItem>>>
}

export const CartContext = createContext<CartContextProps>({
  cartStatus: [{ id: '', quantity: 0 }],
  setCartStatus: () => {},
  tempCartData: [{}],
  setTempCartData: () => {},
})

const App = () => {
  const [cartStatus, setCartStatus] = useState<CartStatus>([])
  const [tempCartData, setTempCartData] = useState<Array<CartItem>>([])

  return (
    <QueryClientProvider client={queryClient}>
      <CartContext.Provider
        value={{
          cartStatus,
          setCartStatus,
          tempCartData,
          setTempCartData,
        }}
      >
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          <Toaster />
          <Navbar />
          <Outlet />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </CartContext.Provider>
    </QueryClientProvider>
  )
}
export default App
