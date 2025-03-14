import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Logo from '../assets/airbnb.svg';
import RestSearchBar from '../Components/navbarsection/restsearchbar';
import Scrollsearchbar from '../Components/navbarsection/scrollsearchbar';
import glob from '../assets/Icons/web.png';
import menu from '../assets/Icons/menu.png';
import user from '../assets/Icons/user.png';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [showFullNavbar, setShowFullNavbar] = useState(false);
    const navbarRef = useRef(null);

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
        <motion.div
            ref={navbarRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`fixed top-0 left-0 w-full bg-white shadow-md z-50 px-20 flex justify-between transition-all duration-300 py-5 ${
                isScrolled && !showFullNavbar ? 'py-5 items-center' : 'py-5 items-start'
            }`}
        >
            <div>
                <img src={Logo} alt="Logo" className="w-24" />
            </div>

            <motion.div
                key={isScrolled && !showFullNavbar ? "scroll" : "full"}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
            >
                {isScrolled && !showFullNavbar ? (
                    <Scrollsearchbar onClick={() => setShowFullNavbar(true)} />
                ) : (
                    <RestSearchBar />
                )}
            </motion.div>

            <div className="flex gap-3 items-center relative">
                <button className="hover:bg-gray-200 p-2 rounded-full text-sm">
                    Airbnb your home
                </button>
                <div className="hover:bg-gray-200 p-2 rounded-full">
                    <img src={glob} alt="Globe" className="h-5" />
                </div>

                <div className="relative">
                    <div
                        className={`flex gap-3 items-center border p-2 rounded-full cursor-pointer hover:shadow-md ${
                            isActive ? 'shadow-md' : ''
                        }`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsActive(!isActive);
                            setShowFullNavbar(!showFullNavbar);
                        }}
                    >
                        <img src={menu} alt="Menu" className="h-4" />
                        <img src={user} alt="User" className="h-5" />
                    </div>

                    {isActive && (
                        <div
                            className="absolute right-0 top-[50px] w-56 shadow-lg bg-white rounded-lg overflow-hidden"
                        >
                            <p className="hover:bg-gray-100 p-3 text-sm cursor-pointer">Sign up</p>
                            <p className="hover:bg-gray-100 border-b border-gray-200 p-3 text-sm cursor-pointer">Log in</p>
                            <p className="hover:bg-gray-100 p-3 text-sm cursor-pointer">Airbnb your home</p>
                            <p className="hover:bg-gray-100 p-3 text-sm cursor-pointer">Host an experience</p>
                            <p className="hover:bg-gray-100 p-3 text-sm cursor-pointer">Help center</p>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default Navbar;
