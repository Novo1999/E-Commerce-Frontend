import { Link } from 'react-router-dom'
import { Carousel } from '.'

const slides = [
  '/assets/hero-1.jpg',
  '/assets/hero-2.jpg',
  '/assets/hero-3.jpg',
]

const Hero = () => {
  return (
    <div className=''>
      <Carousel>
        {slides.map((src: string, index) => {
          return (
            <div
              key={index}
              id='slide1'
              className='carousel-item relative w-full'
            >
              <div className='absolute bottom-3 right-4 font-cuprum text-2xl z-10 text-white flex lg:bottom-24 lg:right-7 xl:bottom-[10rem] xl:text-7xl flex-col sm:text-6xl'>
                <Link
                  className='bg-white text-black rounded-full absolute right-0 bottom-8 z-20 sm:text-2xl text-sm p-3 sm:p-10 xl:bottom-20 sm:bottom-16 hover:text-white hover:bg-black shadow-xl w-fit'
                  to='/all-products'
                >
                  Shop Now
                </Link>
                <h1>
                  Your Go To <span className='text-red-500'>Gym</span> Store
                </h1>
              </div>
              <img
                src={src}
                alt='hero-img'
                className='w-full xl:object-cover xl:h-[60rem]'
              />
            </div>
          )
        })}
      </Carousel>
    </div>
  )
}
export default Hero
