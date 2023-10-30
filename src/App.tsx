import { Toaster } from 'react-hot-toast'
import { Outlet, useNavigation } from 'react-router'
import { Navbar } from './components'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()
const App = () => {
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Navbar />
      {isLoading ? (
        <span className='loading loading-ring loading-lg min-h-screen fixed m-auto left-0 right-0 bg-white'></span>
      ) : (
        <Outlet />
      )}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
export default App
