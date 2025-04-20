import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Logo from '../assets/airbnb.svg';
import onlogo from '../assets/onlylogo.png';
import RestSearchBar from '../Components/navbarsection/restsearchbar';
import Scrollsearchbar from '../Components/navbarsection/scrollsearchbar';
import glob from '../assets/Icons/web.png';
import menu from '../assets/Icons/menu.png';
import user from '../assets/Icons/user.png';
import Search from '../assets/Icons/search.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [showFullNavbar, setShowFullNavbar] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1409);
  const [mobileview, setMobileView] = useState(window.innerWidth < 750);
  const [bottomicon, setBotomicon] = useState("Explore");
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1409);
      setMobileView(window.innerWidth < 750);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setShowFullNavbar(false);
        setIsActive(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50 && !showFullNavbar) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showFullNavbar]);

  return (
    <div>
      <motion.div
        id="navbar"
        ref={navbarRef}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed top-0 left-0 w-full z-50 bg-white border-b border-zinc-200 px-4 md:px-20 py-5"
      >
        {!mobileview ? (
          <>
            {/* Desktop Navbar */}
            <div className={`flex ${isScrolled && !showFullNavbar ? "items-center" : "items-start"} ${isSmallScreen ? "justify-center" : "justify-between"} gap-4 w-full`}>
              {/* Logo */}
              <div className="flex-shrink-0">
                {isSmallScreen ? (
                  <img src={onlogo} alt="Logo" className="w-10" />
                ) : (
                  <img src={Logo} alt="Logo" className="w-24" />
                )}
              </div>

              {/* Search Bar */}
              <div className="flex-1 flex justify-center">
                <div className="w-full max-w-[700px] px-2 sm:px-4">
                  {isScrolled && !showFullNavbar ? (
                    <Scrollsearchbar onClick={() => setShowFullNavbar(true)} />
                  ) : (
                    !isSmallScreen && <RestSearchBar />
                  )}
                </div>
              </div>

              {/* Right Side */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button className="hover:bg-gray-200 px-3 py-2 rounded-full text-sm whitespace-nowrap">
                  Airbnb your home
                </button>
                <div className="hover:bg-gray-200 p-2 rounded-full">
                  <img src={glob} alt="Globe" className="h-5 w-5 object-contain" />
                </div>
                <div className="relative">
                  <div
                    className={`flex items-center gap-2 border px-3 py-2 rounded-full cursor-pointer hover:shadow-md ${isActive ? 'shadow-md' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsActive(!isActive);
                      setShowFullNavbar(!showFullNavbar);
                    }}
                  >
                    <img src={menu} alt="Menu" className="h-4 w-4 object-contain" />
                    <img src={user} alt="User" className="h-5 w-5 object-contain" />
                  </div>

                  {isActive && (
                    <div className="absolute right-0 top-[50px] w-56 shadow-lg bg-white rounded-lg overflow-hidden z-50">
                      <p className="hover:bg-gray-100 p-3 text-sm cursor-pointer">Sign up</p>
                      <p className="hover:bg-gray-100 border-b border-gray-200 p-3 text-sm cursor-pointer">Log in</p>
                      <p className="hover:bg-gray-100 p-3 text-sm cursor-pointer">Airbnb your home</p>
                      <p className="hover:bg-gray-100 p-3 text-sm cursor-pointer">Host an experience</p>
                      <p className="hover:bg-gray-100 p-3 text-sm cursor-pointer">Help center</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          // Mobile Search Bar
          <div className="fixed top-0 left-0 bg-white flex items-center justify-center gap-2 px-4 py-3 w-full rounded-full mx-auto mt-4 shadow-md cursor-pointer">
            <img src={Search} alt="Search" className="w-4 h-4" />
            <span className="text-md text-gray-700">Start your search</span>
          </div>
        )}
      </motion.div>

      {/* Bottom Navbar for Mobile */}
      {mobileview && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md z-40 flex justify-around py-2">
          <div onClick={() => {setBotomicon("Explore")}} 
            className={`flex flex-col items-center ${bottomicon === "Explore" ? "text-rose-600" : "text-gray-500"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l-4-4m0 0l4-4m-4 4h16" />
            </svg>
            <span className="text-xs">Explore</span>
          </div>
          <div onClick={() => {setBotomicon("Wishlists")}}
            className={`flex flex-col items-center ${bottomicon === "Wishlists" ? "text-rose-600" : "text-gray-500"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-xs">Wishlists</span>
          </div>
          <div onClick={() => {setBotomicon("Login")}}
            className={`flex flex-col items-center ${bottomicon === "Login" ? "text-rose-600" : "text-gray-500"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A3.001 3.001 0 017 16h10a3 3 0 012.879 1.804M15 11a4 4 0 10-6 0 4 4 0 006 0z" />
            </svg>
            <span className="text-xs">Log in</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
