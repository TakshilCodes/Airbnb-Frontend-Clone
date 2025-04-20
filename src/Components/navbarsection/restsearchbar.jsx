import React, { useState, useEffect, useRef } from 'react';
import Searchimg from '../../assets/Icons/search.png';
import plusmius from '../../assets/Icons/plus-minus.png';
import Checkingcomponent from './checkingcomponent';
import GuestsComponent from './guests';
import { format } from 'date-fns';

const RestSearchBar = () => {
    const [isClicked, setIsClicked] = useState("Home");
    const [activeField, setActiveField] = useState(null);
    const [dateVisible, setDateVisible] = useState(false);
    const [firstClickReset, setFirstClickReset] = useState(false);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [isActive, setisActive] = useState(false);
    const [guestcount, setguestcount] = useState({ adults: 0, childrens: 0 });
    const [infants, setInfants] = useState(0);
    const [pets, setPetsCount] = useState(0);
    const [isGuestClick, setIsGuestClick] = useState(false);
    const [bufferday, setbufferday] = useState(null);

    const searchBarRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
                setActiveField(null);
                setDateVisible(false);
                setFirstClickReset(false);
                setisActive(false);
                setIsGuestClick(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleFieldClick = (field) => (e) => {
        e.stopPropagation();

        if (activeField === field) {
            setActiveField(null);
            setDateVisible(false);
            setFirstClickReset(false);
        } else if (activeField !== null && !firstClickReset) {
            setActiveField(null);
            setDateVisible(false);
            setFirstClickReset(true);
        } else {
            setActiveField(field);
            setDateVisible(true);
            setFirstClickReset(false);
        }
    };

    return (
        <div ref={searchBarRef} className="relative w-full">
            {/* Tabs */}
            <div className='flex justify-center gap-10'>
                <button
                    onClick={() => {
                        setIsClicked("Home");
                        setDateVisible(false);
                        setisActive(false);
                        setActiveField(null);
                    }}
                    className={`text-lg font-normal ${isClicked === "Home" ? "text-black" : "text-gray-500"} cursor-pointer`}
                >
                    Homes
                </button>

                <button
                    onClick={() => {
                        setIsClicked("Experiences");
                        setDateVisible(false);
                        setisActive(false);
                        setActiveField(null);
                    }}
                    className={`text-lg font-normal ${isClicked === "Experiences" ? "text-black" : "text-gray-500"} cursor-pointer`}
                >
                    Experiences
                </button>
            </div>

            {/* Search Bar */}
            <div className={`flex flex-wrap sm:flex-nowrap justify-center items-center gap-2 sm:gap-4 shadow-[0px_2px_8px_rgba(0,0,0,0.30)] rounded-full mt-5  w-full max-w-[3000px] mx-auto bg-white
        ${isGuestClick || dateVisible ? "bg-[#e4e3e3fb]" : ""}`}>

                {/* Where */}
                <div className="flex flex-col flex-1 min-w-[120px] hover:bg-[#e4e3e3fb] px-5  py-3 rounded-full cursor-pointer">
                    <label className="text-sm">Where</label>
                    <input type="text" placeholder="Search destinations" className="text-sm focus:outline-none w-full" />
                </div>

                {/* Check-in / Check-out for "Home" */}
                {isClicked === "Home" && (
                    <>
                        <div
                            onClick={(e) => {
                                handleFieldClick("checkin")(e);
                                setIsGuestClick(false);
                            }}
                            className={`flex flex-col flex-1 hover:bg-[#e4e3e3fb] p-3 rounded-full cursor-pointer ${activeField === "checkin" ? "bg-[#e4e3e3fb]" : ""}`}
                        >
                            <label className="text-sm">Check in</label>
                            <p className="text-sm text-gray-500 flex items-center gap-2">
                                {checkInDate ? format(checkInDate, "MMM d") : "Add dates"}{" "}
                                {bufferday && (
                                    <span className="flex items-center gap-1">
                                        <img src={plusmius} className="w-4 h-4" alt="plus-minus" />
                                        <span>{bufferday}</span>
                                    </span>
                                )}
                            </p>
                        </div>

                        <div
                            onClick={(e) => {
                                handleFieldClick("checkout")(e);
                                setIsGuestClick(false);
                            }}
                            className={`flex flex-col flex-1 min-w-[120px] hover:bg-[#e4e3e3fb] p-3 rounded-full cursor-pointer ${activeField === "checkout" ? "bg-[#e4e3e3fb]" : ""}`}
                        >
                            <label className="text-sm">Check out</label>
                            <p className="text-sm text-gray-500 flex items-center gap-2">
                                {checkOutDate ? format(checkOutDate, "MMM d") : "Add dates"}{" "}
                                {bufferday && (
                                    <span className="flex items-center gap-1">
                                        <img src={plusmius} className="w-4 h-4" alt="plus-minus" />
                                        <span>{bufferday}</span>
                                    </span>
                                )}
                            </p>
                        </div>
                    </>
                )}

                {/* Date for Experiences */}
                {isClicked !== "Home" && (
                    <div
                        className={`flex flex-col flex-1 min-w-[120px]  hover:bg-[#e4e3e3fb] p-3 rounded-full cursor-pointer ${isActive ? "bg-[#e4e3e3fb]" : ""}`}
                        onClick={() => {
                            setDateVisible(!dateVisible);
                            setisActive(!isActive);
                        }}
                    >
                        <label className="text-sm">Date</label>
                        <p className="text-sm text-gray-500">
                            {checkInDate && checkOutDate
                                ? `${format(checkInDate, "MMM d")} - ${format(checkOutDate, "MMM d")}`
                                : "Add dates"}
                        </p>
                    </div>
                )}

                {/* Guests + Search */}
                <div
                    className={`hover:bg-[#e4e3e3fb] py-2.5 px-4 rounded-full cursor-pointer ${isGuestClick ? "bg-[#e4e3e3fb]" : ""
                        }`}
                    onClick={() => {
                        setActiveField(null);
                        setIsGuestClick(!isGuestClick);
                        setDateVisible(false);
                    }}
                >
                    <div className="flex items-center justify-between gap-[60px] sm:gap-[60px] w-full max-w-[340px] sm:max-w-none">
                        {/* Guest text section */}
                        <div className="flex flex-col overflow-hidden">
                            <label className="text-sm">Who</label>
                            <p className=" flex text-wrap text-sm text-gray-500 truncate max-w-[200px] sm:max-w-[300px]">
                                {guestcount.adults + guestcount.childrens > 0
                                    ? `${guestcount.adults + guestcount.childrens} Guests`
                                    : "Add guests"}
                                {infants > 0 ? `, ${infants} Inf...` : ""}
                            </p>

                        </div>

                        {/* Search button */}
                        <button className="bg-[#ff0044] p-3 rounded-full flex items-center justify-center shrink-0">
                            <img src={Searchimg} alt="Search" className="w-5" />
                            {isGuestClick && <span className="text-white text-sm ml-1">Search</span>}
                        </button>
                    </div>
                </div>



            </div>

            {/* Date Picker */}
            <div className="flex justify-center">
                {dateVisible && (
                    <Checkingcomponent
                        checkInDate={checkInDate}
                        setCheckInDate={setCheckInDate}
                        checkOutDate={checkOutDate}
                        setCheckOutDate={setCheckOutDate}
                        isActive={isActive}
                        bufferday={bufferday}
                        setbufferday={setbufferday}
                    />
                )}
            </div>

            {/* Guests Modal */}
            <div className="flex justify-end">
                {isGuestClick && (
                    <GuestsComponent
                        guestcount={guestcount}
                        setguestcount={setguestcount}
                        infants={infants}
                        setInfants={setInfants}
                        pets={pets}
                        setPetsCount={setPetsCount}
                    />
                )}
            </div>
        </div>
    );
};

export default RestSearchBar;
