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
            className={`fixed left-0 w-full bg-white z-40 border-b border-gray-200 transition-all ${
                isScrolled && !showFullNavbar ? "top-[89px]" : "top-[140px]"
            } flex items-center gap-x-6 justify-center px-10 py-3`}
        >
            <div className="max-w-fit">
                <Category />
            </div>
            <div className="max-w-fit">
                <FilterButton />
            </div>
            <div className="border rounded-xl cursor-pointer p-3 flex items-center gap-2 w-fit border-zinc-200 hover:border-gray-700 text-[13px]">
                <p>Display total before taxes</p>
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
