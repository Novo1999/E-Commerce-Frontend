import { Link } from 'react-router-dom'

const AllYouNeed = () => {
  return (
    <section className='flex items-center justify-center mt-10 mx-6 sm:mx-16 lg:mx-20 xl:mx-8 relative hover:opacity-95 transition-opacity duration-300'>
      <img
        src='/assets/section.jpg'
        className='w-fit 2xl:w-[86rem]'
        alt='all you need image'
      />
      <Link
        className='bg-white text-black rounded-full absolute p-3 min-[375px]:p-4 lg:p-8 lg:text-lg sm:p-6 sm:text-sm text-xs hover:text-white hover:bg-black shadow-xl w-fit'
        to='/all-products'
      >
        Shop Now
      </Link>
      <p className='absolute font-poppins bottom-2 sm:text-4xl lg:text-6xl lg:bottom-10 sm:bottom-6 text-white font-semibold text-lg drop-shadow-lg'>
        We have all you need
      </p>
    </section>
  )
}
export default AllYouNeed
