import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaRocket, FaTimes } from 'react-icons/fa';

const Header = ({ setIsUser }) => {
  const links = [
    {name: "Home", id:"hero"},
    {name: "Features", id: "features"},
    {name:"Projects", id:"projects"}, 
    {name:"Testimonials", id:"testimonials"},
    {name:"Contact", id:"footer"}
  ];
  
  const [isOpen, setisOpen] = useState(false);
  const toggleOpen = () => setisOpen(!isOpen);

  const [active, setActive] = useState("hero");

  //scroll to section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Update active link on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2; // middle of screen
      links.forEach((link) => {
        const section = document.getElementById(link.id);
        if (section) {
          const offsetTop = section.offsetTop;
          const offsetBottom = offsetTop + section.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
            setActive(link.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [links]);

  return (
    <div className="fixed top-0 w-full backdrop-blur-md border-b border-white/10 z-40">
      <nav>
        <div className="container mx-auto py-2 px-2 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center shadow-lg bg-linear-to-r from-[#b856ca] to-[#622ba4]">
                <FaRocket size={16} className="text-white text-xl" />
            </div>
            <h1 className="font-bold text-xl md:text-2xl text-white">
              AI<span className="text-[#8f43eb]">PPT</span>
            </h1>
          </div>
          {/* Mobile */}
          <div className={`md:hidden absolute ${isOpen ? "translate-x-0" : "-translate-x-full"} top-0 left-0 overflow-hidden transition-all duration-300`}>
            <ul className='relative bg-[#0a0c16] w-screen h-screen flex flex-col justify-center items-center space-y-10 text-center'>
              {links.map((link, id) => (
                  <li key={id} className='hover:bg-linear-to-r hover:to-[#b856ca] hover:from-[#622ba4] hover:text-transparent hover:bg-clip-text cursor-pointer'
                  onClick={() => {scrollToSection(link.id);  setIsOpen(false)}}>
                    {link.name}
                  </li>
              ))}
              <button className="md:hidden border btn border-[#431f6e] cursor-pointer" onClick={() => setIsUser(true)}>
                Get Started
              </button>
              <FaTimes size={24} onClick={toggleOpen} className='absolute top-3 right-7 cursor-pointer hover:text-white/90'/>
            </ul>
          </div>

          {/* Desktop */}
          <ul className='md:flex justify-center items-center space-x-6 lg:space-x-10 hidden '>
          {links.map((link) => (
              <li key={link.id} className='hover:bg-linear-to-r hover:to-[#b856ca] hover:from-[#622ba4] hover:text-transparent hover:bg-clip-text'>
                <button onClick={() => scrollToSection(link.id)} className={`cursor-pointer ${active === link.id ? "bg-linear-to-r from-[#622ba4] to-[#b856ca] text-transparent bg-clip-text" : "text-white"}`}
                >
                  {link.name}
                </button>
              </li>
          ))}
          </ul>
          <button className="md:block hidden border btn border-[#431f6e]" onClick={() => setIsUser(true)}>
            Get Started
          </button>
          <div className='md:hidden'>
            {!isOpen && <FaBars size={23} onClick={toggleOpen} className='cursor-pointer hover:text-white/90'/> }
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
