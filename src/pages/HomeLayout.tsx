import { About, Category, Contact, Hero, Navbar } from '../components'
const HomeLayout = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Category />
      <Contact />
      <About />
    </main>
  )
}
export default HomeLayout
