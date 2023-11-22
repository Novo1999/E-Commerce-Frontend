import { whyChooseGymba } from '@/constants'

const WhyChooseGymba = ({
  title,
  description,
}: {
  title: string
  description: string
}) => {
  return (
    <div className='flex flex-col gap-2'>
      <p className='text-lg lg:text-xl font-bold'>{title}:</p>
      <p className='text-sm lg:text-lg'>{description}</p>
    </div>
  )
}

const About = () => {
  return (
    <section className='min-h-screen font-poppins'>
      <div className='relative flex flex-col justify-center items-start'>
        <img
          src='/assets/about.jpg'
          className='h-[34rem] 2xl:h-[40rem] object-cover w-full'
          alt='about-us'
        />
        <div className='absolute flex flex-col text-center items-center px-4 gap-4'>
          <p className='text-4xl md:text-5xl 2xl:text-6xl font-bold text-white'>
            About Us
          </p>
          <p className='text-white text-sm lg:text-xl'>
            At Gymba, we are passionate about empowering individuals on their
            fitness journey. Since our establishment in 2020, we have been
            dedicated to providing top-quality gym instruments that inspire and
            support a healthy lifestyle.
          </p>
        </div>
      </div>
      <section className='mx-4 md:mx-10 2xl:mx-20 mt-4 md:mt-8 flex flex-col gap-4'>
        <p className='text-center text-3xl font-bold'>Our Mission</p>
        <div>
          <p className='text-sm lg:text-xl'>
            Our mission at Gymba is to make fitness accessible to everyone. We
            believe that a strong and healthy body leads to a happier life.
            That's why we curate a diverse range of gym instruments, from
            strength training equipment to cardio essentials, ensuring you have
            everything you need to achieve your fitness goals.
          </p>
        </div>
        <p className='text-center text-xl font-bold'>Why Choose Gymba?</p>
        <div className='flex flex-col gap-2'>
          {whyChooseGymba.map((item, i) => (
            <WhyChooseGymba
              key={i}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
        <section className='text-center py-8'>
          <h2 className='text-3xl font-semibold mb-4'>
            Join the Gymba Community
          </h2>
          <p className='text-lg mb-4'>
            We invite you to join the Gymba community and embark on a journey
            towards a healthier, stronger, and more vibrant you. Explore our
            collection, discover new fitness possibilities, and let Gymba be
            your trusted companion in achieving your fitness aspirations.
          </p>
          <p className='text-lg mb-4'>
            Thank you for choosing Gymba. Let's make every workout count!
          </p>
          <p className='text-sm lg:text-xl'>
            Stay Fit,
            <br />
            <span className='font-bold lg:text-xl'>The Gymba Team</span>
          </p>
        </section>
      </section>
    </section>
  )
}

export default About
