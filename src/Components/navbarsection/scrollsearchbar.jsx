import Searchimg from '../../assets/Icons/search.png';

const Scrollsearchbar = ({ onClick }) => {
  return (
    <div className="flex justify-center items-center gap-5 bg-color shadow-[0px_2px_8px_rgba(0,0,0,0.30)] p-2 rounded-full cursor-pointer px-5" onClick={onClick}>  
        <button>Anywhere</button>
        <button>Any week</button>
        <div className='flex items-center gap-5'>
            <p className='paracolor'>Add guests</p>
            <button className="bg-[#ff0044] p-2 rounded-full flex items-center justify-center gap-3">
                <img src={Searchimg} alt="Searchimg" className="w-4" />
            </button>
        </div>
    </div>
  );
};

export default Scrollsearchbar;
