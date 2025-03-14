import plus from '../../assets/Icons/plus.png'
import minus from '../../assets/Icons/minus.png'

const GuestsComponent = ({ guestcount,infants,setInfants, setguestcount, pets, setPetsCount }) => {

    const handleGueststotal = (type, operation) => {
        setguestcount((prev) => {
          const newValue =
            operation === "increment"
              ? Math.min(15, prev[type] + 1)
              : Math.max(0, prev[type] - 1);
    
          return { ...prev, [type]: newValue };
        });
      };

  return (
    <div className='w-80 p-5 shadow-lg rounded-2xl fixed bg-white mt-3'>
        <div className='flex justify-between py-5 border-b border-b-zinc-300'>
            <div className='flex flex-col'>
                <p>Adults</p>
                <p className='paracolor text-sm'>Ages 13 or above</p>
            </div>

            <div className='flex flex-row items-center gap-3'>
                <img src={minus} alt="minus" className={`w-5 ${guestcount.adults === 0 ? "opacity-50" : "opacity-100"}`} onClick={() => handleGueststotal("adults", "dicrement")}/>
                <span>{guestcount.adults}</span>
                <img src={plus} alt="plus" className={`w-5 ${guestcount.adults === 15 ? "opacity-50" : "opacity-100"}`} onClick={() => handleGueststotal("adults", "increment")}/>
            </div>
        </div>

        <div className='flex justify-between py-5 border-b border-b-zinc-300'>
            <div>
                <p>Children</p>
                <p className='paracolor text-sm'>Ages 2-12</p>
            </div>
            
            <div className="flex items-center gap-3">
                <img src={minus} alt="minus" className={`w-5 ${guestcount.childrens === 0 ? "opacity-50" : "opacity-100"}`} onClick={() => handleGueststotal("childrens", "decrement")}/>
                <span>{guestcount.childrens}</span>
                <img src={plus} alt="plus" className={`w-5 ${guestcount.childrens === 15 ? "opacity-50" : "opacity-100"}`} onClick={() => handleGueststotal("childrens", "increment")}/>
            </div>
        </div>

        <div className="flex justify-between py-5 border-b border-b-zinc-300">
        <div>
          <p>Infants</p>
          <p className="paracolor text-sm">Under 2</p>
        </div>
        <div className="flex items-center gap-3">
          <img src={minus} alt="minus" className={`w-5 ${infants === 0 ? "opacity-50" : "opacity-100"}`} onClick={() => setInfants((c) => Math.max(0, c - 1))}/>
          <span>{infants}</span>
          <img src={plus} alt="plus" className={`w-5 ${infants === 5 ? "opacity-50" : "opacity-100"}`} onClick={() => setInfants((c) => Math.min(5, c + 1))} />
        </div>
      </div>

        <div className='flex justify-between py-5'>
            <div>
                <p>Pets</p>
                <a href="" className='paracolor underline text-sm'>Bringing a service animal?</a>
            </div>
            
            <div className="flex items-center gap-3">
                <img src={minus} alt="minus"className={`w-5 ${pets === 0 ? "opacity-50" : "opacity-100"}`} onClick={() => setPetsCount((c) => Math.max(0, c - 1))}/>
                <span>{pets}</span>
                <img src={plus} alt="plus" className={`w-5 ${pets === 5 ? "opacity-50" : "opacity-100"} `} onClick={() => setPetsCount((c) => Math.min(5, c + 1))}/>
            </div>
        </div>
    </div>
  )
}

export default GuestsComponent