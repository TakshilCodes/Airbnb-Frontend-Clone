


// This was made by ChatGPT with some effort from me




import React, { useState } from "react";
import rightarrow from '../../assets/Icons/right-arrow.png'
import leftarow from '../../assets/Icons/left-arrow.png'
import {
  format,
  addMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isWithinInterval,
  startOfWeek,
  endOfWeek,
  isBefore,
  isAfter,
} from "date-fns";

const Calendar = ({ checkInDate, setCheckInDate, checkOutDate, setCheckOutDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [nextMonth, setNextMonth] = useState(addMonths(new Date(), 1));

  // Generate the days for a given month with correct alignment
  const generateMonthDays = (month) => {
    const start = startOfMonth(month);
    const end = endOfMonth(month);
    const startDay = startOfWeek(start);
    const endDay = endOfWeek(end);
    return eachDayOfInterval({ start: startDay, end: endDay });
  };

  const handleDateClick = (date) => {
    if (isBefore(date, new Date())) return; // Prevent past dates selection

    if (!checkInDate || (checkInDate && checkOutDate)) {
      setCheckInDate(date);
      setCheckOutDate(null);
    } else if (!checkOutDate && isAfter(date, checkInDate)) {
      setCheckOutDate(date);
    } else {
      setCheckInDate(date);
      setCheckOutDate(null);
    }
  };

  return (
    <div className=" p-6 z-50 w-[720px]  ">
      {/* Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => {
            setCurrentMonth(addMonths(currentMonth, -1));
            setNextMonth(addMonths(nextMonth, -1));
          }}
          className="text-xl font-bold p-3 hover:bg-gray-200 rounded-full"
        >
          <img src={leftarow} alt="rightarrow" className="w-5"/>
        </button>
        <div className="flex gap-24">
          <span className="font-medium">{format(currentMonth, "MMMM yyyy")}</span>
          <span className="font-medium">{format(nextMonth, "MMMM yyyy")}</span>
        </div>
        <button
          onClick={() => {
            setCurrentMonth(addMonths(currentMonth, 1));
            setNextMonth(addMonths(nextMonth, 1));
          }}
          className="text-xl font-bold p-3 hover:bg-gray-200 rounded-full"
        >
          <img src={rightarrow} alt="rightarrow" className="w-5"/>
        </button>
      </div>

      {/* Two Month View */}
      <div className="flex gap-10">
        {[currentMonth, nextMonth].map((month, idx) => (
          <div key={idx} className="w-1/2">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 text-center font-medium mb-2">
              <span>Sun</span> <span>Mon</span> <span>Tue</span> <span>Wed</span> <span>Thu</span> <span>Fri</span> <span>Sat</span>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {generateMonthDays(month).map((date, index) => {
                const isCheckIn = isSameDay(date, checkInDate);
                const isCheckOut = isSameDay(date, checkOutDate);
                const isBetween =
                  checkInDate &&
                  checkOutDate &&
                  isWithinInterval(date, { start: checkInDate, end: checkOutDate });

                return (
                  <div
                    key={index}
                    className={`p-3 cursor-pointer flex items-center justify-center rounded-xl text-sm transition-all ${
                      isBefore(date, new Date())
                        ? "text-gray-400 cursor-not-allowed" // Disable past dates
                        : isCheckIn
                        ? "bg-black text-white font-bold" // Check-in date
                        : isCheckOut
                        ? "bg-black text-white font-bold" // Check-out date
                        : isBetween
                        ? "bg-gray-300" // Highlighted range
                        : "hover:bg-gray-200"
                    }`}
                    onClick={() => handleDateClick(date)}
                  >
                    {format(date, "d")}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
