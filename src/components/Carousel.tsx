import { useState, useEffect, useCallback, ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type CarouselProps = {
  children: ReactNode
  autoSlide?: boolean
  autoSlideInterval?: number
}

const Carousel = ({
  children: slides,
  autoSlide = true,
  autoSlideInterval = 3000,
}: CarouselProps) => {
  const [curr, setCurr] = useState(0)

  const prev = () =>
    setCurr((curr) =>
      curr === 0 ? (Array.isArray(slides) ? slides.length - 1 : 0) : curr - 1
    )

  const next = useCallback(
    () =>
      setCurr((curr) =>
        curr === (Array.isArray(slides) ? slides.length - 1 : 0) ? 0 : curr + 1
      ),
    [slides]
  )

  useEffect(() => {
    if (!slides || (Array.isArray(slides) && slides.length === 0))
      // Handle the case when slides are null, undefined, or an empty array
      return

    if (!autoSlide) return

    const slideInterval = setInterval(next, autoSlideInterval)
    return () => clearInterval(slideInterval)
  }, [autoSlide, autoSlideInterval, next, slides])

  if (!slides || (Array.isArray(slides) && slides.length === 0)) {
    // Return a message or placeholder when slides are null, undefined, or an empty array
    return <p>No slides available</p>
  }

  return (
    <div className='overflow-hidden relative'>
      <div
        className='flex transition-transform ease-out duration-500'
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides}
      </div>
      <div className='absolute inset-0 h-fit m-auto flex items-center justify-between p-4'>
        <button
          onClick={prev}
          className='p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white'
        >
          <ChevronLeft size={40} />
        </button>
        <button
          onClick={next}
          className='p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white'
        >
          <ChevronRight size={40} />
        </button>
      </div>
    </div>
  )
}

export default Carousel
