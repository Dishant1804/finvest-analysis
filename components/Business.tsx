import { features } from "../app/constants";
import { Button } from "./ui/button";
import Image from "next/image";

const FeatureCard = ({ icon, title, content, index }: { icon: string; title: string; content: string; index: number }) => (
  <div
    className={`flex flex-row p-6 rounded-[20px] ${index !== features.length - 1 ? "mb-6" : "mb-0"
      } feature-card transition-all duration-300 ease-in-out cursor-pointer hover:bg-black-gradient`}
  >
    <div
      className={`w-[64px] h-[64px] rounded-full flex justify-center items-center bg-dimBlue`}
    >
      <Image src={icon} alt="icon" className="w-[50%] h-[50%] object-contain" />
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23px] mb-1">
        {title}
      </h4>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px] mb-1">
        {content}
      </p>
    </div>
  </div>
);

const Business = () => {
  return (
    <section id="features" className="flex md:flex-row flex-col">
      <div className="flex-1 flex justify-center md:items-start items-center flex-col text-center md:text-left">
        <h2 className="font-poppins font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full">
          You make the trades,
          <br className="sm:block hidden" /> we’ll handle the analysis.
        </h2>
        <p className={`font-poppins font-normal text-dimWhite text-sm sm:text-[18px] leading-[30.8px] max-w-[470px] mt-5`}>
          Analyze market trends, predict stock movements, and make informed investment decisions. Our
          AI agent processes vast amounts of financial data to give you the edge.
        </p>
        <Button className="mt-10 bg-blue-gradient text-black font-semibold" size={"lg"} >Analyze Now</Button>
      </div>

      <div className="flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative flex-col items-start w-full">
        {features.map((feature, index) => (
          <FeatureCard key={feature.id} {...feature} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Business;
