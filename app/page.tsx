import CTA from "@/components/CTA";
import Billing from "@/components/Billing";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Stats from "@/components/Stats";
import Business from "@/components/Business";
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <div className="bg-[#00040f] text-dim-white flex flex-col w-full h-full overflow-hidden justify-center items-center px-4">
      <div className="flex flex-col w-full justify-center items-center max-w-7xl">
        <Navbar />
        <div className="flex flex-col w-full">
          <Hero />
          <Stats />
        </div>
        <Business />
        <Billing />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}
