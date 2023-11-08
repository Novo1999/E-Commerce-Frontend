import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router'
import { Navbar } from './components'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from './components/theme-provider'
import { createContext, useState } from 'react'

const queryClient = new QueryClient()

export type cartStatus = Array<{ id: string; quantity: number }>

export const CartContext = createContext({})

const App = () => {
  const [cartStatus, setCartStatus] = useState<cartStatus>([])

  return (
    <QueryClientProvider client={queryClient}>
      <CartContext.Provider value={{ cartStatus, setCartStatus }}>
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
