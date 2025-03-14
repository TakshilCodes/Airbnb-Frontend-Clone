import Calendar from "./calendar";
import plusminusimg from '../../assets/Icons/plus-minus.png'

const Checkingcomponent = ({ checkInDate, setCheckInDate, checkOutDate, setCheckOutDate, isActive, bufferday, setbufferday }) => {

  return (
    <div className="fixed w-[720px] h-auto bg-white shadow-lg rounded-[70px] mt-5 p-5 ">
      <div className={`flex gap-5 bg-[#e4e3e3fb] rounded-full w-fit mx-auto my-3 ${isActive ? "hidden" : ""}`}>
        <button className="hover:bg-[#d4d3d3] py-2 px-5 rounded-full">Dates</button>
        <button className="hover:bg-[#d4d3d3] py-2 px-5 rounded-full">Months</button>
        <button className="hover:bg-[#d4d3d3] py-2 px-5 rounded-full">Flexible</button>
      </div>

      {/* Pass Props to Daterange */}
      <div className="flex justify-center">
        <Calendar
          checkInDate={checkInDate}
          setCheckInDate={setCheckInDate}
          checkOutDate={checkOutDate}
          setCheckOutDate={setCheckOutDate}
        />
      </div>

      <div className={`flex gap-3 justify-center ${isActive ? "hidden" : "" }`}>
        <button className={`flex items-center text-sm p-1 rounded-full px-2 border-1 transition-transform duration-200 active:scale-90 ${bufferday === null ? "border-2 border-black bg-[#f3f3f3fb]" : ""}`}
          onClick={() => setbufferday(null)}
        >Exact dates</button>

        <button className={`flex items-center text-[12px] gap-2 p-1 rounded-full px-2 border-1 transition-transform duration-200 active:scale-90 ${bufferday === 1 ? "border-2 border-black bg-[#f3f3f3fb]" : ""}`}
                 onClick={() => setbufferday(1)}>
          <img src={plusminusimg} alt="plusminusimg" className="w-4" />
          1 day</button>

        <button className={`flex items-center text-[12px] gap-2 p-1 rounded-full px-2 border-1 transition-transform duration-200 active:scale-90 ${bufferday === 2 ? "border-2 border-black bg-[#f3f3f3fb]" : ""}`}
                onClick={() => setbufferday(2)}>
          <img src={plusminusimg} alt="plusminusimg" className="w-4" />
          2 days</button>

        <button className={`flex items-center text-[12px] gap-2 p-1 rounded-full px-2 border-1 transition-transform duration-200 active:scale-90 ${bufferday === 3 ? "border-2 border-black bg-[#f3f3f3fb]" : ""}`}
                onClick={() => setbufferday(3)}>
          <img src={plusminusimg} alt="plusminusimg" className="w-4" />
          3 days</button>

        <button className={`flex items-center text-[12px] gap-2 p-1 rounded-full px-2 border-1 transition-transform duration-200 active:scale-90 ${bufferday === 7 ? "border-2 border-black bg-[#f3f3f3fb]" : ""}`}
                onClick={() => setbufferday(7)}>
          <img src={plusminusimg} alt="plusminusimg" className="w-4" />
          7 days</button>

        <button className={`flex items-center text-[12px] gap-2 p-1 rounded-full px-2 border-1 transition-transform duration-200 active:scale-90 ${bufferday === 14 ? "border-2 border-black bg-[#f3f3f3fb]" : ""}`}
                onClick={() => setbufferday(14)}>
          <img src={plusminusimg} alt="plusminusimg" className="w-4" />
          14 days</button>
      </div>
    </div>
  );
};

export default Checkingcomponent;
