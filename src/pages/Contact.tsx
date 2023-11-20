import { FaSquarePhone } from 'react-icons/fa6'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { MdAlternateEmail } from 'react-icons/md'
import { ContactMap } from '@/components'

const Contact = () => {
  return (
    <div className='min-h-screen pb-10 sm:grid sm:grid-cols-2'>
      <section className='relative col-span-2'>
        <img
          className='h-96 lg:h-[32rem] xl:h-[40rem] object-cover w-screen'
          src='/assets/contact/contact-img.jpg'
          alt='contact us'
        />
        <p className='text-3xl sm:text-4xl lg:text-5xl xl:text-7xl xl:bottom-40 font-poppins drop-shadow-xl font-semibold text-white text-center absolute bottom-20 left-0 right-0'>
          Want to know about us more?
        </p>
      </section>
      <section className='mt-4 mx-4 shadow-2xl h-72 p-4 flex flex-col lg:justify-center rounded-xl sm:h-80 lg:h-[26rem] lg:mt-4 sm:mt-0'>
        <h1 className='text-4xl font-bold text-center'>Contact Us</h1>
        <div className='flex flex-col gap-4 lg:gap-5 mt-12 lg:items-center'>
          <div className='flex gap-2 lg:gap-4 font-poppins place-items-center'>
            <FaSquarePhone className='text-2xl  lg:text-4xl' /> +8801323879283
          </div>
          <div className='flex gap-2 lg:gap-4 font-poppins place-items-center'>
            <FaMapMarkerAlt className='text-2xl lg:text-4xl' /> Dhanmondi,Dhaka
          </div>
          <div className='flex gap-2 lg:gap-4 font-poppins place-items-center'>
            <MdAlternateEmail className='text-2xl lg:text-4xl' />{' '}
            gymba@yahoo.com
          </div>
        </div>
      </section>
      <section>
        <ContactMap />
      </section>
    </div>
  )
}
export default Contact
