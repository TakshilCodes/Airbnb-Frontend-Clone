import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Laurelwreathimg from "../../assets/amenitiesicon/laurelwreath.png";
import amenitiesData from "../../Constants/amenities.json";

const Amenities = ({ selectedAmenities, setSelectedAmenities }) => {
    const [showAll, setShowAll] = React.useState(false);

    // Function to toggle amenity selection
    const toggleItemActive = (title) => {
        setSelectedAmenities((prev) =>
            prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]
        );
    };

    return (
        <div className="p-5 max-w-xl mx-auto">
            <div className="py-5 border-b border-b-zinc-300">
                <h2 className="text-lg font-medium mb-3">Amenities</h2>

                {amenitiesData["Essentials"] && (
                    <>
                        <h3 className="text-md font-medium py-3">Essentials</h3>
                        <div className="flex flex-wrap gap-2">
                            {amenitiesData["Essentials"].map((item) => (
                                <div
                                    key={item.title}
                                    className={`flex items-center gap-2 px-5 py-4 rounded-full text-sm border border-gray-200 hover:border-gray-700 cursor-pointer 
                                        transition-transform duration-200 active:scale-90 
                                        ${selectedAmenities.includes(item.title) ? "border-2 border-gray-700 bg-gray-100" : ""}`}
                                    onClick={() => toggleItemActive(item.title)}
                                >
                                    <img src={item.icon} alt={item.name} className="w-5 h-5" />
                                    <span>{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {showAll && (
                    <div className="mt-3">
                        {Object.entries(amenitiesData)
                            .filter(([category]) => category !== "Essentials" && category !== "BookingOptions")
                            .map(([category, items]) => (
                                <div key={category} className="mt-4">
                                    <h3 className="text-md font-medium mb-2">{category}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {items.map((item) => (
                                            <div
                                                key={item.title}
                                                className={`flex items-center gap-2 px-5 py-4 rounded-full text-sm border border-gray-200 hover:border-gray-700 
                                                    cursor-pointer transition-transform duration-200 active:scale-90 
                                                    ${selectedAmenities.includes(item.title) ? "border-2 border-gray-700 bg-gray-100" : ""}`}
                                                onClick={() => toggleItemActive(item.title)}
                                            >
                                                <img src={item.icon} alt={item.name} className="w-5 h-5" />
                                                <span>{item.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                    </div>
                )}

                <div className="mt-3">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="text-black text-sm py-5 font-medium flex items-center gap-1 underline cursor-pointer"
                    >
                        {showAll ? "Show less" : "Show more"} {showAll ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                </div>
            </div>

            {amenitiesData["BookingOptions"] && (
                <>
                    <h3 className="text-lg font-medium py-5">Booking Options</h3>
                    <div className="flex flex-wrap gap-2 py-5 border-b border-b-zinc-300">
                        {amenitiesData["BookingOptions"].map((item) => (
                            <div
                                key={item.title}
                                className={`flex items-center gap-2 px-5 py-4 rounded-full text-sm border border-gray-200 hover:border-gray-700 cursor-pointer 
                                    transition-transform duration-200 active:scale-90 
                                    ${selectedAmenities.includes(item.title) ? "border-2 border-gray-700 bg-gray-100" : ""}`}
                                onClick={() => toggleItemActive(item.title)}
                            >
                                <img src={item.icon} alt={item.name} className="w-5 h-5" />
                                <span>{item.name}</span>
                            </div>
                        ))}
                    </div>
                </>
            )}

            <div className="py-5 border-b border-b-zinc-300">
                <div
                    className={`border rounded-xl cursor-pointer p-3 flex items-center gap-3 w-60 
                    ${selectedAmenities.includes("guestfav") ? "border-2 border-gray-700 bg-gray-100" : "border-zinc-200 hover:border-gray-700"}`}
                    onClick={() => toggleItemActive("guestfav")}
                >
                    <img src={Laurelwreathimg} alt="Laurelwreathimg" className="w-10" />
                    <div className="flex flex-col">
                        <h3 className="text-lg font-medium">Guest Favourite</h3>
                        <p className="text-sm text-gray-500">The most loved homes on Airbnb</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Amenities;
