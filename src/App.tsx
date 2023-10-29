import { Toaster } from 'react-hot-toast'
import { Outlet, useNavigation } from 'react-router'
import { Navbar } from './components'

const App = () => {
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'

  return (
    <>
      <Toaster />
      <Navbar />
      {isLoading ? (
        <span className='loading loading-ring loading-lg min-h-screen fixed m-auto left-0 right-0 bg-white'></span>
      ) : (
        <Outlet />
      )}
    </>
  )
}
export default App
