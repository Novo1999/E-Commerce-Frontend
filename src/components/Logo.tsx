import { useTheme } from './ThemeProvider'

const Logo = () => {
  const { theme } = useTheme()
  return (
    <div className='flex items-center text-black'>
      <img
        className='h-8 relative mr-2 rounded-full'
        src='/assets/logo.png'
        alt='logo'
      />
      <h1
        className={`font-bold ${
          theme === 'dark' ? 'text-white' : 'text-black'
        } text-md sm:text-2xl`}
      >
        Gymba
      </h1>
    </div>
  )
}
export default Logo
