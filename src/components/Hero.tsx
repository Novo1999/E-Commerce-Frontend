import { Button } from "@/components/ui/button"


const Hero = () => {
  return (
    <div className="carousel w-full">
      {/* IMG 1 */}
      <div id="slide1" className="carousel-item relative w-full">
        <div className="absolute bottom-3 right-4 font-cuprum text-2xl text-white sm:bottom-16 sm:text-5xl md:bottom-36 flex flex-col">
        <Button className="bg-white text-black rounded-full hover:text-white hover:bg-black w-20 relative left-32">Shop Now</Button>
        <h1 >
          Your Go To Gym Store
        </h1>
        </div>
        <img src="../../public/assets/hero-1.jpg" className="w-full" />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide3" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      {/* IMG 2 */}
      <div id="slide2" className="carousel-item relative w-full">
        <div className="absolute bottom-3 right-4 font-cuprum text-2xl text-white sm:bottom-16 sm:text-5xl md:bottom-36 flex flex-col">
        <Button className="bg-white text-black rounded-full hover:text-white hover:bg-black w-20 relative left-52">Shop Now</Button>
        <h1 >
          Delivering Everlasting Quality
        </h1>
        </div>
        <img src="../../public/assets/hero-2.jpg" className="w-full" />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide1" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      {/* IMG 3 */}
      <div id="slide3" className="carousel-item relative w-full">
        <div className="absolute bottom-3 right-4 font-cuprum text-2xl text-white sm:bottom-16 sm:text-5xl md:bottom-36 flex flex-col">
        <Button className="bg-white text-black rounded-full hover:text-white hover:bg-black w-20 relative left-24">Shop Now</Button>
        <h1 >
          A all in one center
        </h1>
        </div>
        <img src="../../public/assets/hero-3.jpg" className="w-full" />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide2" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};
export default Hero;
