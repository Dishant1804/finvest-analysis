import Image from "next/image";
import { logoGreen } from "../app/assets";
import { socialMedia } from "../app/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => (
  <section className="w-full flex justify-center items-center sm:py-16 py-6 flex-col">
    <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-2 border-t-[#3f3e45]">
      <div className="flex flex-row w-full gap-3">
        <Image src={logoGreen} alt="" className="w-5 h-6" />
        <p className="font-poppins font-normal text-center text-lg leading-7 text-white">
          Finvest Analysis
        </p>
      </div>
      <div className="flex felx-row md:mt-0 mt-6">
        {socialMedia.map((social, index) => (
          <a
            key={social.id}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`cursor-pointer ${index !== socialMedia.length - 1 ? "mr-6" : "mr-0"}`}
          >
            <FontAwesomeIcon
              icon={social.icon}
              className="w-[21px] h-[21px] text-white hover:text-gray-300 transition-colors"
            />
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default Footer;
