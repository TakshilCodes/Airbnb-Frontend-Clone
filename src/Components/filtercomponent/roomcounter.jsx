import React from 'react';
import minusimg from '../../assets/Icons/minuswithoutcircle.png';
import plusimg from '../../assets/Icons/pluswithoutcircle.png';

const Roomcounter = ({ roomCounter, setRoomCounter }) => {
    function handleCounter(type, operator) {
        setRoomCounter((prev) => {
            const newValue =
                operator === "increment"
                    ? Math.min(8, prev[type] + 1)
                    : Math.max(0, prev[type] - 1);

            return { ...prev, [type]: newValue };
        });
    }

    return (
        <div className="w-140 mx-auto flex flex-col p-5 mt-2 border-b border-b-zinc-300">
            <h1 className="text-lg font-medium">Rooms and beds</h1>

            {/* Bedrooms Counter */}
            <div className="mt-5 flex justify-between">
                <p>Bedrooms</p>
                <div className="flex items-center gap-5">
                    <button
                        className={`border border-gray-400 p-2 rounded-full ${
                            roomCounter.bedrooms === 0 ? "opacity-20 cursor-not-allowed" : "opacity-100 hover:border-black cursor-pointer"
                        }`}
                        onClick={() => handleCounter("bedrooms", "decrement")}
                        disabled={roomCounter.bedrooms === 0}
                    >
                        <img src={minusimg} alt="minusimg" className="w-3 h-3" />
                    </button>

                    {roomCounter.bedrooms > 0 ? (
                        <span className="flex items-center gap-1">{roomCounter.bedrooms}<img src={plusimg} className='w-3 h-3'/></span>
                    ) : (
                        "Any"
                    )}

                    <button
                        className={`border border-gray-400 p-2 rounded-full ${
                            roomCounter.bedrooms === 8 ? "opacity-20 cursor-not-allowed" : "opacity-100 hover:border-black cursor-pointer"
                        }`}
                        onClick={() => handleCounter("bedrooms", "increment")}
                        disabled={roomCounter.bedrooms === 8}
                    >
                        <img src={plusimg} alt="plusimg" className="w-3 h-3" />
                    </button>
                </div>
            </div>

            {/* Beds Counter */}
            <div className="mt-5 flex justify-between">
                <p>Beds</p>
                <div className="flex items-center gap-5">
                    <button
                        className={`border border-gray-400 p-2 rounded-full ${
                            roomCounter.beds === 0 ? "opacity-20 cursor-not-allowed" : "opacity-100 hover:border-black cursor-pointer"
                        }`}
                        onClick={() => handleCounter("beds", "decrement")}
                        disabled={roomCounter.beds === 0}
                    >
                        <img src={minusimg} alt="minusimg" className="w-3 h-3" />
                    </button>

                    {roomCounter.beds > 0 ? (
                        <span className="flex items-center gap-1">{roomCounter.beds}<img src={plusimg} className='w-3 h-3'/></span>
                    ) : (
                        "Any"
                    )}

                    <button
                        className={`border border-gray-400 p-2 rounded-full ${
                            roomCounter.beds === 8 ? "opacity-20 cursor-not-allowed" : "opacity-100 hover:border-black cursor-pointer"
                        }`}
                        onClick={() => handleCounter("beds", "increment")}
                        disabled={roomCounter.beds === 8}
                    >
                        <img src={plusimg} alt="plusimg" className="w-3 h-3" />
                    </button>
                </div>
            </div>

            {/* Bathrooms Counter */}
            <div className="mt-5 flex justify-between">
                <p>Bathrooms</p>
                <div className="flex items-center gap-5">
                    <button
                        className={`border border-gray-400 p-2 rounded-full ${
                            roomCounter.bathrooms === 0 ? "opacity-20 cursor-not-allowed" : "opacity-100 hover:border-black cursor-pointer"
                        }`}
                        onClick={() => handleCounter("bathrooms", "decrement")}
                        disabled={roomCounter.bathrooms === 0}
                    >
                        <img src={minusimg} alt="minusimg" className="w-3 h-3" />
                    </button>

                    {roomCounter.bathrooms > 0 ? (
                        <span className="flex items-center gap-1">{roomCounter.bathrooms}<img src={plusimg} className='w-3 h-3'/></span>
                    ) : (
                        "Any"
                    )}

                    <button
                        className={`border border-gray-400 p-2 rounded-full ${
                            roomCounter.bathrooms === 8 ? "opacity-20 cursor-not-allowed" : "opacity-100 hover:border-black cursor-pointer"
                        }`}
                        onClick={() => handleCounter("bathrooms", "increment")}
                        disabled={roomCounter.bathrooms === 8}
                    >
                        <img src={plusimg} alt="plusimg" className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Roomcounter;
