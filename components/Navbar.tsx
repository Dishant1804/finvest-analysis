"use client"

import { useState } from "react";
import { close, logoGreen, menu } from "../app/assets";
import { navLinks } from "../app/constants";
import Image from "next/image";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <div className="flex flex-row items-center gap-3">
        <Image src={logoGreen} alt="Finvest" className="w-6 h-6" />
        <h1 className="text-white text-xl">Finvest Analysis</h1>
      </div>
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-md ${index === navLinks.length - 1 ? "mr-0" : "mr-10"
              } text-white relative group`}
          >
            <a href={`#${nav.id}`}>{nav.title}</a>
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></div>
          </li>
        ))}
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <Image
          src={toggle ? close : menu}
          alt="menu"
          className="w-7 h-7 object-contain"
          onClick={() => setToggle((prev) => !prev)}
        />
        <div
          className={`${toggle ? "flex" : "hidden"
            } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-36 rounded-xl sidebar`}
        >
          <ul className="list-none flex flex-col justify-end items-center flex-1">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-normal cursor-pointer text-md ${index === navLinks.length - 1 ? "mr-0" : "mb-4"
                  } text-white relative group`}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
