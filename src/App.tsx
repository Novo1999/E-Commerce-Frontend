import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router'
import { Navbar } from './components'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from './components/theme-provider'
import { createContext, useState } from 'react'
import { cartItem } from './hooks/useHandleCart'

const queryClient = new QueryClient()

export type cartStatus = Array<{ id: string; quantity: number }>

export const CartContext = createContext({
  cartStatus: [{ id: '', quantity: 0 }],
  setCartStatus: (currentItems) => {},
  tempCartData: [{}],
  setTempCartData: (currentItems) => {},
})

const App = () => {
  const [cartStatus, setCartStatus] = useState<cartStatus>([])
  const [tempCartData, setTempCartData] = useState<Array<cartItem>>([])

  return (
    <QueryClientProvider client={queryClient}>
      <CartContext.Provider
        value={{ cartStatus, setCartStatus, tempCartData, setTempCartData }}
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
