const Logo = () => {
  return (
    <div className='flex items-center text-black'>
      <img
        className='h-8 relative mr-2 rounded-full'
        src='../assets/logo.png'
        alt='logo'
      />
      <h1 className='font-bold text-md sm:text-2xl'>Gymba</h1>
    </div>
  )
}
export default Logo
