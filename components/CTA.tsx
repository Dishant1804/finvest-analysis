"use client"

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const CTA = () => {
  const router = useRouter();

  const handleTryNow = () => {
    router.push('/signup')
  }
  return <section
    className={`w-full flex justify-center items-center sm:my-16 my-6 sm:px-16 px-6 sm:py-12 py-4 sm:flex-row flex-col bg-black-gradient-2 rounded-2xl box-shadow`}
  >
    <div className="flex-1 flex flex-col">
      <h2 className="font-poppins font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full">Try our service now!</h2>
      <p className={`font-poppins font-normal text-dimWhite text-sm sm:text-lg leading-8 max-w-xl mt-5`}>
        Get data-driven insights. Make smarter, faster, and
        more profitable investment decisions anywhere on the planet.
      </p>
    </div>
    <div className={`flex justify-center items-center sm:ml-10 ml-0 sm:mt-0 mt-10`}>
      <Button onClick={handleTryNow} className="bg-blue-gradient text-black font-semibold" size={"lg"}>Try Now</Button>
    </div>
  </section>
};

export default CTA;
