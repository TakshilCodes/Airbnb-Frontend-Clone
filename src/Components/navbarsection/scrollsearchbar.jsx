import Searchimg from '../../assets/Icons/search.png';

const Scrollsearchbar = ({ onClick }) => {
  return (
    <div
      className="flex flex-wrap sm:flex-nowrap justify-center items-center gap-3 sm:gap-5 bg-white 
      shadow-[0px_2px_8px_rgba(0,0,0,0.30)] px-4 sm:px-6 py-2 rounded-full cursor-pointer w-full max-w-[400px] mx-auto"
      onClick={onClick}
    >
      {/* Anywhere */}
      <button className="text-sm font-medium text-black min-w-[80px]">Anywhere</button>

      {/* Any week */}
      <button className="text-sm font-medium text-black min-w-[80px]">Any week</button>

      {/* Guests + Search */}
      <div className="flex items-center justify-between gap-2 sm:gap-4 flex-1 min-w-[140px]">
        <p className="text-sm text-gray-500 whitespace-nowrap">Add guests</p>
        <button className="bg-[#ff0044] p-2 rounded-full flex items-center justify-center shrink-0">
          <img src={Searchimg} alt="Search" className="w-4" />
        </button>
      </div>
    </div>
  );
};

export default Scrollsearchbar;
