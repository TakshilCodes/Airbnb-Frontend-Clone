import React, { useState, useEffect, useRef } from 'react';
import Searchimg from '../../assets/Icons/search.png';
import plusmius from '../../assets/Icons/plus-minus.png'
import Checkingcomponent from './checkingcomponent';
import GuestsComponent from './guests'
import { format } from 'date-fns';

const RestSearchBar = () => {
    const [isClicked, setIsClicked] = useState("Home");
    const [activeField, setActiveField] = useState(null);
    const [dateVisible, setDateVisible] = useState(false);
    const [firstClickReset, setFirstClickReset] = useState(false)
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [isActive, setisActive] = useState(false);
    const [guestcount, setguestcount] = useState({ adults: 0, childrens: 0 });
    const [infants, setInfants] = useState(0);
    const [pets, setPetsCount] = useState(0);
    const [isGuestClick, setIsGuestClick] = useState(false);
    const [bufferday,setbufferday] = useState(null)

    const searchBarRef = useRef(null);

    // Handle clicks outside to reset everything
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
        } 
        else if (activeField !== null && !firstClickReset) {
            setActiveField(null);
            setDateVisible(false);
            setFirstClickReset(true);
        } 
        else {
            setActiveField(field);
            setDateVisible(true);
            setFirstClickReset(false);
        }
    };

    return (
        <div ref={searchBarRef} className="relative">
            <div className='flex justify-center gap-10 '>
                <button onClick={() => {
                    setIsClicked("Home");
                    (setDateVisible(false));
                    (setisActive(false));
                    setActiveField(null);
                }}
                    className={`text-lg font-normal ${isClicked === "Home" ? "text-black" : "paracolor"} cursor-pointer`}
                >Homes</button>

                <button onClick={() => {
                    setIsClicked("Experiences");
                    (setDateVisible(false));
                    (setisActive(false));
                    setActiveField(null);
                }}
                    className={`text-lg font-normal ${isClicked === "Experiences" ? "text-black" : "paracolor"} cursor-pointer`}>Experiences</button>
            </div>

            <div className={`flex justify-center items-center shadow-[0px_2px_8px_rgba(0,0,0,0.30)] rounded-full mt-5 ${
                isGuestClick ? "bg-[#e4e3e3fb]" : ""} ${dateVisible ? "bg-[#e4e3e3fb]" : ""
                }`}>
                <div className='flex flex-col hover:bg-[#e4e3e3fb] p-2 px-7 hover:rounded-full cursor-pointer'>
                    <label className='text-sm'>Where</label>
                    <input type="text" placeholder='Search destinations' className='text-sm focus:outline-hidden w-60' />
                </div>

                <div className={`rounded-full ${isClicked === "Home" ? "flex" : "hidden"}`}>
                    <div
                        onClick={(e) => {
                            handleFieldClick("checkin")(e);
                            setIsGuestClick(false);
                        }}
                        className={`flex flex-col hover:bg-[#e4e3e3fb] p-2 hover:rounded-full w-40 cursor-pointer rounded-full
                        ${activeField === "checkin" ? "active" : ""}`}>
                        <label className='text-sm'>Check in</label>
                        <p className='text-sm paracolor flex items-center gap-2'>
                            {checkInDate ? format(checkInDate, "MMM d") : "Add dates"} {bufferday ? 
                            (<div className='flex items-center'><img src={plusmius} className='w-4 h-4'/> <p className='text-sm'>{bufferday}</p></div>) : ""}

                        </p>
                    </div>

                    <div
                        className={`flex flex-col hover:bg-[#e4e3e3fb] p-2 hover:rounded-full w-40 cursor-pointer rounded-full
                         ${activeField === "checkout" ? "active" : ""}`}
                        onClick={(e) => {
                            handleFieldClick("checkout")(e);
                            setIsGuestClick(false);
                        }}>
                        <label className='text-sm'>Check out</label>
                        <p className='text-sm paracolor flex items-center gap-2'>
                            {checkOutDate ? format(checkOutDate, "MMM d") : "Add dates"} {bufferday ? 
                            (<div className='flex items-center'><img src={plusmius} className='w-4 h-4'/> <p className='text-sm'>{bufferday}</p></div>) : ""}

                        </p>
                    </div>
                </div>

                <div className={`flex flex-col hover:bg-[#e4e3e3fb] p-2 hover:rounded-full w-70 cursor-pointer rounded-full ${isClicked === "Home" ? "hidden" : ""} 
                ${isActive ? "active" : ""}`}
                    onClick={() => (setDateVisible(!dateVisible))(setisActive(!isActive))}>
                    <label className='text-sm'>Date</label>
                    <p className='text-sm paracolor'>
                        {checkInDate && checkOutDate
                            ? `${format(checkInDate, "MMM d")} - ${format(checkOutDate, "MMM d")}`
                            : "Add dates"}

                    </p>
                </div>

                <div className={`flex flex-row items-center justify-between hover:bg-[#e4e3e3fb] px-5 py-1 rounded-full cursor-pointer space-x-4 w-72
                    ${isGuestClick ? "active" : ""}`}
                    onClick={() => {
                        setActiveField(null);
                        setIsGuestClick(!isGuestClick);
                        setDateVisible(false);
                    }}
                >
                    <div className="flex flex-col">
                        <label className="text-sm">Who</label>
                        <p className="text-sm paracolor">
                            <p className="text-sm paracolor">
                                {guestcount.adults + guestcount.childrens > 0
                                    ? `${guestcount.adults + guestcount.childrens} Guests`
                                    : "Add guests"}
                                {infants > 0 ? `, ${infants} Infants` : ""}
                                {pets > 0 ? `, ${pets} Pets` : ""}
                            </p>
                        </p>
                    </div>
                    <button className="bg-[#ff0044] p-3 rounded-full flex items-center justify-center gap-3">
                        <img src={Searchimg} alt="Searchimg" className="w-5" />
                        {isGuestClick ? (<p className='text-white'>Search</p>) : null}
                    </button>
                </div>

            </div>

            <div className='flex justify-center'>
                {dateVisible &&
                    <Checkingcomponent
                        checkInDate={checkInDate}
                        setCheckInDate={setCheckInDate}
                        checkOutDate={checkOutDate}
                        setCheckOutDate={setCheckOutDate}
                        isActive={isActive}
                        bufferday={bufferday}
                        setbufferday={setbufferday}
                    />
                }
            </div>

            <div className='flex justify-end'>
                {
                    isGuestClick &&
                    <GuestsComponent
                        guestcount={guestcount}
                        setguestcount={setguestcount}
                        infants={infants}
                        setInfants={setInfants}
                        pets={pets}
                        setPetsCount={setPetsCount}
                    />
                }
            </div>
        </div>
    );
};

export default RestSearchBar;
