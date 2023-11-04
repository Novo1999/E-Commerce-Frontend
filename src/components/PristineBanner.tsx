import { Link } from 'react-router-dom'

const PristineBanner = () => {
  return (
    <section className='flex flex-col gap-4 items-center justify-center lg:flex-row w-fit mt-10 mx-6 sm:mx-auto lg:mx-20 xl:mx-auto xl:gap-20'>
      <figure className='relative hover:opacity-90 transition-opacity'>
        <img
          className='h-fit lg:h-[35rem] xl:h-[37.3rem] object-cover'
          src='/assets/pristine-1.jpg'
          alt='image'
        />
        <figcaption className='text-base sm:text-3xl drop-shadow-lg text-center font-poppins mt-4 absolute bottom-3 right-3 text-white lg:text-3xl xl:text-6xl whitespace-nowrap font-semibold'>
          In Pristine Condition
        </figcaption>
        <Link
          className='bg-white text-black rounded-full absolute xl:bottom-24 p-2 min-[375px]:p-4 xl:p-6 lg:p-4 bottom-14 right-4 invisible sm:visible sm:text-lg text-sm hover:text-white hover:bg-black shadow-xl w-fit'
          to='/all-products'
        >
          Shop Now
        </Link>
      </figure>
      <figure className='relative flex flex-col items-center hover:opacity-90 transition-opacity'>
        <img
          className='h-fit lg:h-[35rem] xl:h-[37.3rem] object-cover'
          src='/assets/pristine-2.jpg'
          alt='image'
        />
        <figcaption className='absolute text-white font-poppins bottom-32 sm:bottom-64 sm:text-5xl lg:text-3xl lg:bottom-32 xl:bottom-36 text-2xl min-[375px]:text-3xl drop-shadow-xl'>
          Fitness ready
        </figcaption>
        <Link
          className='bg-white text-black rounded-full absolute p-3 min-[375px]:p-4 sm:p-6 xl:p-6 xl:bottom-12 sm:bottom-32 m-auto lg:bottom-14 lg:p-4 left-0 right-0 bottom-10 sm:text-lg text-sm hover:text-white hover:bg-black shadow-xl w-fit'
          to='/all-products'
        >
          Shop Now
        </Link>
      </figure>
    </section>
  )
}
export default PristineBanner
