import { useEffect, useState } from 'react';
import Category from '../Components/filtercomponent/category';
import FilterButton from '../Components/filtercomponent/filterbutton';
import { Switch } from "antd";

const Filtering = () => {
    const [checked, setChecked] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showFullNavbar, setShowFullNavbar] = useState(false);

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
        <div
            className={`fixed left-0 w-full z-40 ${
                isScrolled && !showFullNavbar ? "top-[89px] bg-white" : "top-[140px] bg-transparent"
            } flex items-center gap-x-4 sm:gap-x-6 md:gap-x-8 lg:gap-x-10 justify-start lg:justify-center px-5 sm:px-8 md:px-10 lg:px-20 py-2 sm:py-3`}
        >
            <div className="max-w-fit">
                <Category />
            </div>
            <div className=" hidden lg:block">
                <FilterButton />
            </div>
            <div className="hidden 2xl:flex border rounded-xl cursor-pointer p-4 sm:p-4 items-center gap-1 sm:gap-2 border-zinc-200 hover:border-gray-700 
                            text-[11px] sm:text-[13px]">
                <p className='text-nowrap'>Display total before taxes</p>
                <Switch
                    checked={checked}
                    onChange={(value) => setChecked(value)}
                    style={{
                        backgroundColor: checked ? "#000" : "",
                    }}
                />
            </div>
        </div>
    );
};

export default Filtering;
