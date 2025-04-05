import React, { useState, useEffect } from 'react';
import PriceRangeGraph from '../filtercomponent/pricerangegraph';
import Roomcounter from '../filtercomponent/roomcounter';
import AmenitiesList from '../filtercomponent/amenities';
import filterimg from '../../assets/Icons/filter.png';
import closeimg from '../../assets/Icons/close.png';

const FilterButton = () => {
    const [isActive, setIsActive] = useState(false);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [roomCounter, setRoomCounter] = useState({ bedrooms: 0, beds: 0, bathrooms: 0 });
    const [selectedAmenities, setSelectedAmenities] = useState([]);

    const clearAllFilters = () => {
        setPriceRange([0, 1000]);
        setRoomCounter({ bedrooms: 0, beds: 0, bathrooms: 0 });
        setSelectedAmenities([]);
    };

    useEffect(() => {
        const navbar = document.getElementById("navbar");
        if (isActive) {
            document.body.classList.add("overflow-hidden");
            if (navbar) {
                navbar.style.transition = "none"; // Disable any transition effect
                navbar.style.zIndex = "30";
            }
        } else {
            document.body.classList.remove("overflow-hidden");
            if (navbar) {
                navbar.style.transition = "none"; // Ensure instant reset
                navbar.style.zIndex = "50";
            }
        }

        return () => {
            document.body.classList.remove("overflow-hidden");
            if (navbar) {
                navbar.style.transition = "none";
                navbar.style.zIndex = "50";
            }
        };
    }, [isActive]);


    return (
        <div>
            <button
                className="flex gap-2 items-center border p-4 border-zinc-300 flex-nowrap rounded-xl hover:border-black hover:bg-gray-100 
                            transition-all cursor-pointer"
                onClick={() => setIsActive(true)}
            >
                <img src={filterimg} alt="filter" className="w-4 h-4" />
                <p className="text-sm">Filters</p>
            </button>

            {isActive && (
                <div className="fixed inset-0 z-[60] bg-black/20 flex justify-center items-center w-full p-5">
                    <div className="bg-white rounded-3xl shadow-lg w-full max-w-[600px] h-[90vh] flex flex-col animate-fade-in">
                        <nav className="sticky top-0 z-10 rounded-t-full bg-white border-b border-zinc-300 p-5 flex items-center justify-between">
                            <button className="p-2 hover:bg-gray-100 rounded-full" onClick={() => setIsActive(false)}>
                                <img src={closeimg} alt="close" className="w-4 h-4" />
                            </button>
                            <p className="text-md font-medium text-center flex-1">Filters</p>
                            <div className="w-6"></div>
                        </nav>

                        <div className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-5 py-3">
                            <PriceRangeGraph priceRange={priceRange} setPriceRange={setPriceRange} />
                            <Roomcounter roomCounter={roomCounter} setRoomCounter={setRoomCounter} />
                            <AmenitiesList selectedAmenities={selectedAmenities} setSelectedAmenities={setSelectedAmenities} />
                        </div>

                        <div className="sticky bottom-0 bg-white p-5 flex justify-between items-center border-t border-zinc-300 shadow-[0px_-10px_30px_rgba(0,0,0,0.1)] w-full rounded-b-3xl">
                            <button
                                onClick={clearAllFilters}
                                className="text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition font-medium"
                            >
                                Clear all
                            </button>
                            <button
                                onClick={() => setIsActive(false)}
                                className="text-white bg-black px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                            >
                                Show 1,000+ places
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterButton;
