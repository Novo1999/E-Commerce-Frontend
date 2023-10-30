import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='carousel w-full'>
      {/* IMG 1 */}
      <div id='slide1' className='carousel-item relative w-full'>
        <div className='absolute bottom-3 right-4 font-cuprum text-2xl z-10 text-white flex lg:bottom-24 xl:bottom-[10rem] xl:text-7xl flex-col sm:text-6xl'>
          <Link
            className='bg-white text-black rounded-full absolute right-0 bottom-8 sm:text-2xl text-sm p-3 sm:p-10 xl:bottom-20 sm:bottom-16 hover:text-white hover:bg-black shadow-xl w-fit'
            to='/all-products'
          >
            Shop Now
          </Link>

          <h1>
            Your Go To <span className='text-red-500'>Gym</span> Store
          </h1>
        </div>
        <img
          src='../../public/assets/hero-1.jpg'
          alt='hero-img'
          className='w-full xl:object-cover xl:h-[60rem]'
        />
        <div className='absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between'>
          <a href='#slide3' className='btn btn-circle'>
            ❮
          </a>
          <a href='#slide2' className='btn btn-circle'>
            ❯
          </a>
        </div>
      </div>
      {/* IMG 2 */}
      <div id='slide2' className='carousel-item relative w-full'>
        <div className='absolute bottom-3 right-4 font-cuprum text-2xl text-white flex lg:bottom-24 xl:bottom-[10rem] xl:text-7xl flex-col sm:text-6xl'>
          <Link
            className='bg-white text-black rounded-full absolute right-0 bottom-8 sm:text-2xl text-sm p-3 sm:p-10 xl:bottom-20 sm:bottom-16 hover:text-white hover:bg-black shadow-xl w-fit'
            to='/all-products'
          >
            Shop Now
          </Link>
          <h1>
            Delivering <span className='text-red-500'>Everlasting</span> Quality
          </h1>
        </div>
        <img
          src='../../public/assets/hero-2.jpg'
          alt='hero-img'
          className='w-full xl:object-cover xl:h-[60rem]'
        />
        <div className='absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between'>
          <a href='#slide1' className='btn btn-circle'>
            ❮
          </a>
          <a href='#slide3' className='btn btn-circle'>
            ❯
          </a>
        </div>
      </div>
      {/* IMG 3 */}
      <div id='slide3' className='carousel-item relative w-full'>
        <div className='absolute bottom-3 right-4 font-cuprum text-2xl text-white flex lg:bottom-24 drop-shadow-xl xl:bottom-[8rem] xl:text-7xl flex-col sm:text-6xl'>
          <Link
            className='bg-white text-black rounded-full absolute right-0 bottom-8 sm:text-2xl text-sm p-3 sm:p-10 xl:bottom-20 sm:bottom-16 hover:text-white hover:bg-black shadow-xl w-fit'
            to='/all-products'
          >
            Shop Now
          </Link>
          <h1>
            A all in <span className='text-red-500'>one</span> center
          </h1>
        </div>
        <img
          src='../../public/assets/hero-3.jpg'
          alt='hero-img'
          className='w-full xl:h-[60rem] xl:object-cover'
        />
        <div className='absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between'>
          <a href='#slide2' className='btn btn-circle'>
            ❮
          </a>
          <a href='#slide1' className='btn btn-circle'>
            ❯
          </a>
        </div>
      </div>
    </div>
  )
}
export default Hero
