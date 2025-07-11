"use client"

import { discount } from "../app/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter()

  const handleSignup = () => {
    router.push('/signup')
  }

  const handleExplore = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
  }

  return <>
    <div className="absolute bg-blue-gradient z-[10] h-[200px] w-[400px] top-96 right-32 blur-[200px] rounded-full">
    </div>
    <div className="absolute bg-blue-gradient z-[10] h-[200px] w-[200px] top-24 left-32 blur-[120px] rounded-full">
    </div>
    <section id="home" className="flex md:flex-row flex-col relative z-0 mb-20 w-full sm:py-16 py-6">
      <div
        className="flex flex-col relative sm:px-16 px-6 w-full mt-20 items-center max-w-7xl"
      >
        <div className="flex flex-row items-center py-1.5 px-4 bg-discount-gradient rounded-xl mb-4">
          <Image src={discount} alt="discount" className="w-8 h-8" />
          <p className="font-poppins font-normal text-dimWhite text-sm sm:text-lg leading-8 ml-2">
            Analyze now!
          </p>
        </div>
        <div className="flex flex-row justify-center items-center w-full">
          <h1 className="text-center font-poppins font-semibold text-5xl sm:text-7xl text-white ss:leading-24 leading-16">
            The Next{" "}
            <span className="text-gradient">Generation</span>
            <br />
            <span>Stock Analysis.</span>
          </h1>
        </div>
        <p className="font-poppins font-normal text-dimWhite text-sm sm:text-lg leading-8 max-w-3xl mt-5 text-center">
          Analyze your stocks with our AI agent and make informed investment decisions with real-time market insights and comprehensive financial data.
        </p>
        <div className="flex flex-row justify-center items-center mt-8 gap-6">
          <button onClick={handleSignup} className="bg-blue-gradient text-black px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95">Get started</button>
          <button onClick={handleExplore} className="bg-black-gradient text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95">Explore now</button>
        </div>
      </div>
    </section>
  </>
}

export default Hero;
